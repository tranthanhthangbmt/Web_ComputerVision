import http.server
import socketserver
import json
import sqlite3
import os
import datetime

PORT = 8000
DB_FILE = "midterm_results.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            email TEXT,
            class_name TEXT,
            score TEXT,
            time_taken TEXT,
            cheat_count INTEGER,
            details TEXT
        )
    ''')
    conn.commit()
    conn.close()

class ExamRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/save_result':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                self.save_result_to_db(data)
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "Result saved successfully"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
            
    def do_GET(self):
        if self.path.startswith('/api/results'):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            try:
                conn = sqlite3.connect(DB_FILE)
                conn.row_factory = sqlite3.Row
                c = conn.cursor()
                c.execute("SELECT * FROM results ORDER BY timestamp DESC")
                rows = c.fetchall()
                
                results = []
                for r in rows:
                    results.append({
                        "id": r["id"],
                        "timestamp": r["timestamp"],
                        "email": r["email"],
                        "class_name": r["class_name"],
                        "score": r["score"],
                        "time_taken": r["time_taken"],
                        "cheat_count": r["cheat_count"],
                        "details": json.loads(r["details"]) if r["details"] else []
                    })
                conn.close()
                self.wfile.write(json.dumps(results).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
        else:
            # Fallback to serving static files
            super().do_GET()

    def save_result_to_db(self, data):
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        email = data.get('email', 'unknown')
        class_name = data.get('className', 'N/A').upper()
        score = data.get('score', '0')
        time_taken = data.get('timeTaken', '00:00')
        cheat_count = int(data.get('cheatCount', 0))
        details = json.dumps(data.get('detailedAnswers', []))
        
        c.execute('''
            INSERT INTO results (timestamp, email, class_name, score, time_taken, cheat_count, details)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (timestamp, email, class_name, score, time_taken, cheat_count, details))
        
        conn.commit()
        conn.close()

if __name__ == "__main__":
    init_db()
    Handler = ExamRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        print(f"Results will be saved to SQLite DB: {DB_FILE}")
        httpd.serve_forever()
