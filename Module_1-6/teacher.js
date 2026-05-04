const teacherApp = {
    state: {
        allResults: [],
        filteredResults: [],
        classes: new Set(),
        currentFilter: 'ALL'
    },

    init: function () {
        this.fetchResults();
        
        document.getElementById('class-filter').addEventListener('change', (e) => {
            this.filterByClass(e.target.value);
        });
    },

    fetchResults: async function () {
        try {
            const response = await fetch('/api/results');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            if (data.status === 'error') throw new Error(data.message);
            
            this.state.allResults = data;
            
            // Extract unique classes
            this.state.classes = new Set(data.map(item => item.class_name).filter(c => c && c !== 'N/A'));
            this.populateClassDropdown();
            
            // Initial render
            this.filterByClass('ALL');
            
        } catch (error) {
            console.error("Error fetching results:", error);
            document.getElementById('results-tbody').innerHTML = `
                <tr>
                    <td colspan="7" class="px-6 py-10 text-center text-red-500 font-medium bg-red-50">
                        <i class="fa-solid fa-triangle-exclamation mr-2"></i> Lỗi không thể tải dữ liệu: ${error.message} <br>
                        <span class="text-xs text-slate-500 mt-2 block">Hãy chắc chắn rằng bạn đang chạy exam_server.py</span>
                    </td>
                </tr>
            `;
        }
    },

    populateClassDropdown: function () {
        const select = document.getElementById('class-filter');
        // Keep the first "ALL" option
        select.innerHTML = '<option value="ALL">Tất cả các lớp</option>';
        
        const sortedClasses = Array.from(this.state.classes).sort();
        sortedClasses.forEach(className => {
            const opt = document.createElement('option');
            opt.value = className;
            opt.textContent = `Lớp ${className}`;
            select.appendChild(opt);
        });
    },

    filterByClass: function (className) {
        this.state.currentFilter = className;
        
        if (className === 'ALL') {
            this.state.filteredResults = [...this.state.allResults];
        } else {
            this.state.filteredResults = this.state.allResults.filter(item => item.class_name === className);
        }
        
        this.updateStats();
        this.renderTable();
    },

    updateStats: function () {
        const results = this.state.filteredResults;
        
        // Total
        document.getElementById('stat-total').textContent = results.length;
        
        // Average Score
        if (results.length === 0) {
            document.getElementById('stat-avg').textContent = "0.0";
        } else {
            const totalScore = results.reduce((sum, item) => sum + parseFloat(item.score || 0), 0);
            document.getElementById('stat-avg').textContent = (totalScore / results.length).toFixed(1);
        }
        
        // Cheat
        const cheatCount = results.filter(item => parseInt(item.cheat_count || 0) > 0).length;
        document.getElementById('stat-cheat').textContent = cheatCount;
        
        // Class
        document.getElementById('stat-class').textContent = this.state.currentFilter === 'ALL' ? 'Tất Cả' : this.state.currentFilter;
    },

    renderTable: function () {
        const tbody = document.getElementById('results-tbody');
        tbody.innerHTML = '';
        
        if (this.state.filteredResults.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="px-6 py-10 text-center text-slate-500">
                        Không có dữ liệu bài thi nào được tìm thấy.
                    </td>
                </tr>
            `;
            return;
        }

        this.state.filteredResults.forEach((item, index) => {
            const scoreNum = parseFloat(item.score);
            let scoreClass = "text-slate-700";
            if (scoreNum >= 8.5) scoreClass = "text-emerald-600";
            else if (scoreNum < 5.0) scoreClass = "text-red-600";
            
            let cheatBadge = '<span class="text-slate-400">-</span>';
            if (parseInt(item.cheat_count) > 0) {
                cheatBadge = `<span class="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded border border-red-200" title="${item.cheat_count} lần vi phạm">${item.cheat_count} Lần</span>`;
            }

            const tr = document.createElement('tr');
            tr.className = "bg-white hover:bg-slate-50 transition-colors";
            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-500">${item.timestamp}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded text-xs border border-blue-100">${item.class_name}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-slate-800">${item.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center font-bold ${scoreClass}">${item.score}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-slate-600">${item.time_taken}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">${cheatBadge}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                    <button onclick="teacherApp.openDetailModal(${item.id})" class="text-mit hover:text-red-700 font-medium text-sm bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors">
                        <i class="fa-solid fa-magnifying-glass mr-1"></i> Chi tiết
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    openDetailModal: function (resultId) {
        const item = this.state.allResults.find(r => r.id === resultId);
        if (!item) return;

        // Populate Header
        document.getElementById('detail-email').textContent = item.email;
        document.getElementById('detail-class').textContent = item.class_name;
        document.getElementById('detail-score').textContent = item.score;

        // Render Details
        const container = document.getElementById('detail-questions');
        container.innerHTML = '';
        
        if (!item.details || item.details.length === 0) {
            container.innerHTML = '<div class="p-10 text-center text-slate-500">Bản ghi này không có chi tiết lưu trữ (Có thể do thi phiên bản cũ).</div>';
        } else {
            item.details.forEach((q) => {
                const isCorrect = q.isCorrect;
                const isUnattempted = !q.userAnswer;
                
                let borderClass = isCorrect ? 'border-emerald-500' : 'border-red-500';
                if(isUnattempted) borderClass = 'border-amber-500';
                
                const div = document.createElement('div');
                div.className = `bg-white border-l-4 ${borderClass} p-5 rounded-r-xl shadow-sm border-t border-r border-b border-slate-200`;
                
                let statusBadge = '';
                if(isCorrect) statusBadge = '<span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded border border-emerald-200">Đúng</span>';
                else if(isUnattempted) statusBadge = '<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded border border-amber-200">Bỏ trống</span>';
                else statusBadge = '<span class="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded border border-red-200">Sai</span>';

                let optionsHtml = '';
                if(q.options && Array.isArray(q.options)) {
                    q.options.forEach(opt => {
                        let optClass = "text-slate-600";
                        let icon = "";
                        
                        if (opt.key === q.correctAnswer) {
                            optClass = "text-emerald-700 font-bold bg-emerald-50 p-2 rounded border border-emerald-100";
                            icon = '<i class="fa-solid fa-check text-emerald-500 mr-2"></i>';
                        } else if (opt.key === q.userAnswer) {
                            optClass = "text-red-600 line-through bg-red-50 p-2 rounded border border-red-100";
                            icon = '<i class="fa-solid fa-xmark text-red-500 mr-2"></i>';
                        } else {
                            optClass = "p-2";
                            icon = '<span class="w-4 inline-block mr-2 text-slate-400">' + opt.key + '.</span>';
                        }

                        optionsHtml += `<div class="${optClass} text-sm mt-1">${icon} ${opt.text}</div>`;
                    });
                } else {
                    optionsHtml = `<div class="text-sm text-slate-500 italic mt-2">Dữ liệu đáp án không đầy đủ. SV chọn: ${q.userAnswer || 'Không'}, Đáp án: ${q.correctAnswer}</div>`;
                }

                div.innerHTML = `
                    <div class="flex justify-between items-start mb-3 border-b border-slate-100 pb-3">
                        <h4 class="font-bold text-slate-800 text-base leading-relaxed">
                            <span class="text-mit mr-1">Câu ${q.questionIndex}:</span> ${q.questionContent}
                        </h4>
                        <div class="ml-4 flex flex-col items-end gap-2 flex-shrink-0">
                            ${statusBadge}
                            <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">Module ${q.moduleId}</span>
                        </div>
                    </div>
                    <div class="space-y-1">
                        ${optionsHtml}
                    </div>
                `;
                container.appendChild(div);
            });
        }

        // Show Modal
        const modal = document.getElementById('modal-detail');
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            document.getElementById('modal-detail-content').classList.remove('scale-95');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    },

    closeModal: function () {
        const modal = document.getElementById('modal-detail');
        modal.classList.add('opacity-0');
        document.getElementById('modal-detail-content').classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restore body scroll
        }, 300);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    teacherApp.init();
});
