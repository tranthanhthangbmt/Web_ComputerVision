const AdminApp = {
    currentData: [],
    
    init: function() {
        this.bindEvents();
        // Kiểm tra trạng thái đăng nhập
        if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
            document.getElementById('login-modal').classList.replace('hidden', 'flex');
        } else {
            document.getElementById('login-modal').classList.replace('flex', 'hidden');
            this.loadClasses(); // Tải danh sách lớp ngay khi vào trang nếu đã login
            this.fetchData(); // Tự động tải nếu đã đăng nhập
        }
    },

    bindEvents: function() {
        // Đăng nhập
        document.getElementById('btn-login').onclick = () => this.handleLogin();
        document.getElementById('login-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });

        document.getElementById('btn-fetch').onclick = () => this.fetchData();
        document.getElementById('class-select').onchange = () => this.fetchData();
        document.getElementById('date-filter').onchange = () => this.fetchData();
        document.getElementById('btn-export').onclick = () => this.exportCSV();
        document.getElementById('btn-close-modal').onclick = () => {
            document.getElementById('detail-modal').classList.replace('flex', 'hidden');
        };
    },

    handleLogin: function() {
        const user = document.getElementById('login-username').value;
        const pass = document.getElementById('login-password').value;
        const errorMsg = document.getElementById('login-error');
        
        if (user === 'admin' && pass === '-Abcd1234') {
            sessionStorage.setItem('adminLoggedIn', 'true');
            document.getElementById('login-modal').classList.replace('flex', 'hidden');
            errorMsg.classList.add('hidden');
            this.showToast("Đăng nhập thành công!", "success");
            this.loadClasses(); // Tải danh sách lớp cho dropdown
            this.fetchData();
        } else {
            errorMsg.classList.remove('hidden');
        }
    },

    showToast: function(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        let bgClass = 'bg-slate-800';
        let icon = '<i class="fa-solid fa-info-circle text-blue-400"></i>';
        
        if (type === 'success') {
            bgClass = 'bg-emerald-800';
            icon = '<i class="fa-solid fa-check-circle text-emerald-400"></i>';
        } else if (type === 'error') {
            bgClass = 'bg-red-800';
            icon = '<i class="fa-solid fa-triangle-exclamation text-red-400"></i>';
        }

        toast.className = `${bgClass} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 translate-x-full opacity-0 border border-white/10`;
        toast.innerHTML = `${icon} <span class="font-medium text-sm">${message}</span>`;
        
        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full', 'opacity-0');
        });

        // Auto remove
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                if (container.contains(toast)) container.removeChild(toast);
            }, 300);
        }, 4000);
    },

    loadClasses: async function() {
        const select = document.getElementById('class-select');
        try {
            const snapshot = await window.firebaseDB.collection('ExamSubmissions').get();
            const classes = new Set();
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.className) classes.add(data.className);
            });
            
            // Xóa các option cũ trừ option đầu tiên
            while (select.options.length > 1) select.remove(1);
            
            // Thêm các lớp vào dropdown
            Array.from(classes).sort().forEach(cls => {
                const opt = document.createElement('option');
                opt.value = cls;
                opt.textContent = cls;
                select.appendChild(opt);
            });
        } catch (error) {
            console.error("Lỗi tải danh sách lớp:", error);
        }
    },

    fetchData: async function() {
        const selectedClass = document.getElementById('class-select').value;
        const selectedDate = document.getElementById('date-filter').value; // YYYY-MM-DD

        const btn = document.getElementById('btn-fetch');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Đang tải...';
        btn.disabled = true;

        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = `<tr><td colspan="12" class="px-6 py-20 text-center"><i class="fa-solid fa-circle-notch fa-spin text-3xl text-indigo-500 mb-2"></i><p class="text-slate-500">Đang đồng bộ dữ liệu từ Google Servers...</p></td></tr>`;

        try {
            // Truy vấn từ Collection chung 'ExamSubmissions'
            let query = window.firebaseDB.collection('ExamSubmissions');
            
            // Nếu có chọn lớp, lọc theo lớp
            if (selectedClass) {
                query = query.where('className', '==', selectedClass);
            }

            const snapshot = await query.get();
            
            let results = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                const student = { id: doc.id, ...data };
                
                // Lọc theo ngày (Client-side để linh hoạt)
                if (selectedDate) {
                    // student.timestamp có dạng "2026-04-28T02:00:00.000Z"
                    if (!student.timestamp || !student.timestamp.startsWith(selectedDate)) {
                        return; // Bỏ qua nếu không khớp ngày
                    }
                }
                
                results.push(student);
            });
            
            this.currentData = results;
            
            if (this.currentData.length === 0) {
                let msg = "Không tìm thấy dữ liệu phù hợp với bộ lọc.";
                tableBody.innerHTML = `<tr><td colspan="12" class="px-6 py-20 text-center text-slate-500"><i class="fa-solid fa-folder-open text-4xl mb-3 text-slate-300"></i><p>${msg}</p></td></tr>`;
                document.getElementById('student-count').textContent = '0';
                document.getElementById('btn-export').disabled = true;
                return;
            }
            
            // Nếu dùng where thì Firebase không cho chain thêm orderBy nếu chưa tạo Index.
            // Để an toàn, chúng ta sẽ tự sort lại ở client.
            this.currentData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            this.renderTable();
            this.showToast(`Đã tải xong dữ liệu của ${this.currentData.length} bài thi`, "success");
            
            document.getElementById('student-count').textContent = this.currentData.length;
            document.getElementById('btn-export').disabled = false;

        } catch (error) {
            console.error("Lỗi lấy dữ liệu:", error);
            this.showToast("Lỗi kết nối Firebase!", "error");
            tableBody.innerHTML = `<tr><td colspan="12" class="px-6 py-20 text-center text-red-500"><i class="fa-solid fa-triangle-exclamation text-4xl mb-3"></i><p>Đã xảy ra lỗi khi lấy dữ liệu: ${error.message}</p></td></tr>`;
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    },

    renderTable: function() {
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        this.currentData.forEach((student, index) => {
            const date = new Date(student.timestamp);
            const formattedDate = `${date.toLocaleTimeString('vi-VN')} - ${date.toLocaleDateString('vi-VN')}`;
            
            let cheatBadge = '<span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">0</span>';
            if (student.cheatCount > 0) {
                cheatBadge = `<span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">${student.cheatCount} lần</span>`;
            }

            // Điểm dạng text, cần parse float để so sánh
            const scoreNum = parseFloat(student.score);
            let scoreClass = "text-emerald-600 font-bold";
            if (scoreNum < 5) scoreClass = "text-red-600 font-bold";
            else if (scoreNum < 8) scoreClass = "text-amber-600 font-bold";

            const isThiThat = student.examMode === 'Thi thật';
            const modeClass = isThiThat ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600';

            const tr = document.createElement('tr');
            tr.className = "hover:bg-slate-50 transition-colors";
            tr.innerHTML = `
                <td class="px-6 py-4 font-medium text-slate-500">${index + 1}</td>
                <td class="px-6 py-4 font-bold text-slate-900">${student.fullName || 'N/A'}</td>
                <td class="px-6 py-4 text-slate-600 font-medium">${student.studentId || '-'}</td>
                <td class="px-6 py-4"><span class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">${student.className || 'N/A'}</span></td>
                <td class="px-6 py-4"><span class="px-2 py-1 ${modeClass} rounded text-[10px] font-bold uppercase">${student.examMode || 'Thi thử'}</span></td>
                <td class="px-6 py-4"><span class="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-semibold">${student.subjectName || 'Thị Giác Máy Tính'}</span></td>
                <td class="px-6 py-4 font-medium text-slate-600">${student.email}</td>
                <td class="px-6 py-4"><span class="${scoreClass} text-base">${student.score}</span></td>
                <td class="px-6 py-4 text-slate-600">${student.timeTaken}</td>
                <td class="px-6 py-4">${cheatBadge}</td>
                <td class="px-6 py-4 text-slate-500 text-sm">${formattedDate}</td>
                <td class="px-6 py-4 text-center">
                    <button class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded font-medium text-xs transition-colors" onclick="AdminApp.viewDetail(${index})">
                        Chi Tiết
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    viewDetail: function(index) {
        const student = this.currentData[index];
        document.getElementById('modal-student-email').textContent = student.email + " (Lớp: " + student.className + ")";
        
        const content = document.getElementById('modal-content');
        
        if (!student.detailedAnswers || student.detailedAnswers.length === 0) {
            content.innerHTML = '<div class="text-center py-10 text-slate-500"><i class="fa-solid fa-ghost text-4xl mb-3"></i><p>Sinh viên này nộp bài mà không có dữ liệu câu hỏi chi tiết.</p></div>';
        } else {
            let html = '<div class="space-y-4">';
            student.detailedAnswers.forEach((ans, i) => {
                const isCorrect = ans.isCorrect;
                const borderColor = isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50';
                const icon = isCorrect ? '<i class="fa-solid fa-check text-emerald-500"></i>' : '<i class="fa-solid fa-xmark text-red-500"></i>';
                
                let optsHtml = '<ul class="mt-2 space-y-1 text-sm">';
                if (ans.options && ans.options.length > 0) {
                    ans.options.forEach(opt => {
                        let optClass = "text-slate-600";
                        let mark = "";
                        // Đánh dấu đáp án đúng
                        if (opt.key === ans.correctAnswer) {
                            optClass = "text-emerald-700 font-bold bg-emerald-100 rounded px-1";
                            mark = ' <i class="fa-solid fa-check-circle text-emerald-500 text-xs"></i> (Đáp án)';
                        }
                        // Đánh dấu đáp án user chọn sai
                        if (opt.key === ans.userAnswer && opt.key !== ans.correctAnswer) {
                            optClass = "text-red-700 font-bold bg-red-100 rounded px-1 line-through";
                            mark = ' <i class="fa-solid fa-xmark text-red-500 text-xs"></i> (Đã chọn)';
                        }
                        // Nếu user chọn đúng, nó gộp luôn vào điều kiện đầu tiên
                        if (opt.key === ans.userAnswer && opt.key === ans.correctAnswer) {
                            mark = ' <i class="fa-solid fa-check-circle text-emerald-500 text-xs"></i> (SV chọn đúng)';
                        }
                        optsHtml += `<li class="${optClass}">${opt.key}. ${opt.text}${mark}</li>`;
                    });
                }
                optsHtml += '</ul>';

                html += `
                    <div class="p-4 border rounded-xl ${borderColor}">
                        <div class="flex gap-3">
                            <div class="mt-1">${icon}</div>
                            <div class="flex-grow">
                                <p class="font-medium text-slate-800 text-sm">Câu ${ans.questionIndex} (Chương ${ans.moduleId}): ${ans.questionContent}</p>
                                ${optsHtml}
                            </div>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            content.innerHTML = html;
        }

        document.getElementById('detail-modal').classList.replace('hidden', 'flex');
    },

    exportCSV: function() {
        if (this.currentData.length === 0) return;

        let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // BOM cho Excel nhận UTF-8
        
        // Header
        csvContent += "STT,Ho Ten,Ma ID,Lop,Hinh Thuc,Mon Thi,Email,Diem,Thoi_Gian,Gian_Lan,Ngay_Nop\r\n";

        // Rows
        this.currentData.forEach((row, idx) => {
            const date = new Date(row.timestamp);
            const formattedDate = `${date.toLocaleTimeString('vi-VN')} ${date.toLocaleDateString('vi-VN')}`;
            
            const r = [
                idx + 1,
                `"${row.fullName || 'N/A'}"`,
                row.studentId || "N/A",
                row.className,
                row.examMode || "Thi thử",
                `"${row.subjectName || 'Thị Giác Máy Tính'}"`,
                row.email,
                row.score,
                row.timeTaken,
                row.cheatCount,
                formattedDate
            ];
            csvContent += r.join(",") + "\r\n";
        });

        // Tạo link tải
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `BangDiem_${this.currentData[0].className}_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast("Đã tải xuống file CSV", "success");
    }
};

window.onload = () => AdminApp.init();
