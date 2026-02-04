import csv
import re
import os
import sys

def log(msg):
    with open("internal_log.txt", "a", encoding="utf-8") as f:
        f.write(msg + "\n")
    print(msg)

def main():
    log("STARTING QUIZ CONVERSION SCRIPT...")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_dir = os.path.join(base_dir, 'DB')
    
    # Map pattern -> output
    file_mappings = [
        ('Trắc nghiệm T1.md', 'MD_Chuong1-T1.csv'),
        ('Trắc nghiệm T2.md', 'MD_Chuong1-T2.csv'),
        ('Trắc nghiệm T3.md', 'MD_Chuong1-T3.csv'),
    ]

    for input_name, output_file in file_mappings:
        # Try to find file using glob if exact name fails, or just construct path
        input_path = os.path.join(db_dir, input_name)
        
        # Check if exists (try robust search if not)
        if not os.path.exists(input_path):
            print(f"Direct path not found: {input_path}")
            # Try matching closely
            search_pattern = os.path.join(db_dir, input_name.replace(' ', '*'))
            found = glob.glob(search_pattern)
            if found:
                input_path = found[0]
                print(f"Found via glob: {input_path}")
            else:
                # Try generic listing
                print(f"Cannot find input file: {input_name}")
                continue

        output_path = os.path.join(db_dir, output_file)
        
        convert_md_to_csv(input_path, output_path)
        print(f"Successfully processed: {input_name} -> {output_file}")
            
        # Also copy to the Chapter 1 DB folder
        # Note: path might need adjustment depending on where script runs
        # assuming script is in .../Quiz/convert_quiz.py
        chapter1_db_path = os.path.join(base_dir, '..', 'Chương 1_Tổng quan về thị giác máy tính', 'DB', output_file)
        chapter1_db_abs = os.path.abspath(chapter1_db_path)
            
        # Create directory if likely target exists
        target_dir = os.path.dirname(chapter1_db_abs)
        if os.path.exists(target_dir):
            import shutil
            shutil.copy2(output_path, chapter1_db_abs)
            print(f"Copied to Chapter 1 DB: {chapter1_db_abs}")
        else:
            print(f"Target Chapter 1 DB dir not found: {target_dir}")

def convert_md_to_csv(md_file_path, csv_output_path):
    print(f"Reading {md_file_path}...")
    try:
        # Use utf-8-sig to handle BOM if present
        with open(md_file_path, 'r', encoding='utf-8-sig') as f:
            content = f.read()
    except Exception as e:
        # Fallback to utf-8
        try:
             with open(md_file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e2:
            print(f"Error reading file {md_file_path}: {e2}")
            return
            
    # Normalize newlines
    lines = content.split('\n')
    
    matches = []
    
    current_q = {
        "content": "",
        "A": "", "B": "", "C": "", "D": "",
        "Answer": "", "Explanation": ""
    }
    
    print(f"Total lines: {len(lines)}")
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Detect Start of Question: "**Câu 1:**"
        # We handle cases where whitespace might be weird: "**Câu 1 :**"
        line_start = line[:15].lower() # optimization
        if "**câu" in line_start and ":" in line:
            # Save previous
            if current_q["content"] and current_q["Answer"]:
                matches.append(current_q.copy())
            
            # Reset
            current_q = {
                "content": "", "A": "", "B": "", "C": "", "D": "", "Answer": "", "Explanation": ""
            }
            
            # Extract content carefully
            # split by first colon occurrence that follows "Câu"
            # Regex is safer for extraction
            q_match = re.search(r'\*\*Câu\s*\d+\s*:\*\*(.*)', line, re.IGNORECASE)
            if q_match:
                current_q["content"] = q_match.group(1).strip()
            else:
                 # Fallback split
                 parts = line.split(":**", 1)
                 if len(parts) > 1:
                     current_q["content"] = parts[1].strip()
            continue

        # Options
        if line.startswith("A."):
            current_q["A"] = line[2:].strip()
            continue
        if line.startswith("B."):
            current_q["B"] = line[2:].strip()
            continue
        if line.startswith("C."):
            current_q["C"] = line[2:].strip()
            continue
        if line.startswith("D."):
            current_q["D"] = line[2:].strip()
            continue
            
        # Answer: "*   **Đáp án đúng:** B"
        if "Đáp án đúng:**" in line:
            # Split by "Đáp án đúng:**"
            parts = line.split("Đáp án đúng:**")
            if len(parts) > 1:
                current_q["Answer"] = parts[1].strip().upper()
            continue
            
        # Explanation: "*   **Lý do:** ..."
        if "Lý do:**" in line:
            parts = line.split("Lý do:**")
            if len(parts) > 1:
                current_q["Explanation"] = parts[1].strip()
            continue

    # Save last
    if current_q["content"] and current_q["Answer"]:
        matches.append(current_q)

    print(f"Found {len(matches)} questions.")

    with open(csv_output_path, 'w', newline='', encoding='utf-8-sig') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['ID', 'QuestionContent', 'AAnswer', 'BAnswer', 'CAnswer', 'DAnswer', 'Answer', 'Explanation'])
        
        for idx, m in enumerate(matches):
             writer.writerow([
                 idx + 1, 
                 m["content"], 
                 m["A"], m["B"], m["C"], m["D"], 
                 m["Answer"], m["Explanation"]
             ])
