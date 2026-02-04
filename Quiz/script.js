const app = {
    config: {
        modules: [
            { name: "Module 1: Khai thác dữ liệu và thông tin", file: "DB/MD1.csv?v=2" },
            { name: "Module 2: Giao tiếp và hợp tác trong môi trường số", file: "DB/MD2.csv?v=2" },
            { name: "Module 3: Sáng tạo nội dung số", file: "DB/MD3.csv?v=2" },
            { name: "Module 4: An toàn thông tin", file: "DB/MD4.csv?v=2" },
            { name: "Module 5: Giải quyết vấn đề", file: "DB/MD5.csv?v=2" },
            { name: "Module 6: Ứng dụng trí tuệ nhân tạo", file: "DB/MD6.csv?v=2" }
        ]
    },
    state: {
        currentModule: null,
        allQuestions: [], // All questions from the CSV
        parts: [], // List of unique parts (IdContent)
        currentPart: null,
        quizQuestions: [], // Questions for the current part
        currentQuestionIndex: 0,
        userResults: {} // Map of questionIndex -> 'correct' | 'wrong' (or null)
    },

    // Define Groups here for easy management
    groupDefinitions: {
        'Chuong1': [
            { name: "Phần 1: Nhận biết & Định nghĩa", file: "../Chương 1_Tổng quan về thị giác máy tính/DB/MD_Chuong1-T1.csv" },
            { name: "Phần 2: Hiểu & Phân tích", file: "../Chương 1_Tổng quan về thị giác máy tính/DB/MD_Chuong1-T2.csv" },
            { name: "Phần 3: Vận dụng & Tổng hợp", file: "../Chương 1_Tổng quan về thị giác máy tính/DB/MD_Chuong1-T3.csv" }
        ],
        // Add more groups as needed
    },

    init: function () {
        this.setupEventListeners();

        const urlParams = new URLSearchParams(window.location.search);
        const moduleParam = urlParams.get('module');
        const groupParam = urlParams.get('group');

        // Check Group
        if (groupParam && this.groupDefinitions[groupParam]) {
            // Load Group Mode
            this.config.modules = this.groupDefinitions[groupParam];
            this.showView('view-modules');
            this.renderModuleSelection();
            document.getElementById('header-title').textContent = "Bài Tập: " + groupParam;
        }
        // Check Single Module
        else if (moduleParam) {
            const modName = urlParams.get('name') || "Bài Trắc Nghiệm";
            this.loadCustomModule(moduleParam, modName);
        }
        // Default
        else {
            this.showView('view-modules');
            this.renderModuleSelection();
            document.getElementById('header-title').textContent = "Trang chủ (Default)";
        }
    },

    setupEventListeners: function () {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('view-quiz').classList.contains('hidden')) return;

            if (e.key === 'ArrowRight') this.nextQuestion();
            if (e.key === 'ArrowLeft') this.prevQuestion();
        });
    },

    // --- Navigation & Views ---

    showView: function (viewId) {
        document.querySelectorAll('.view-section').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('fade-in');
        });
        const view = document.getElementById(viewId);
        view.classList.remove('hidden');
        // Trigger reflow to restart animation
        void view.offsetWidth;
        view.classList.add('fade-in');
    },

    goHome: function () {
        this.state.currentModule = null;
        this.state.currentPart = null;
        this.showView('view-modules');
        document.getElementById('header-title').textContent = 'Trang chủ';
    },

    backToParts: function () {
        this.state.currentPart = null;
        this.showView('view-parts');
        document.getElementById('header-title').textContent = this.config.modules[this.state.currentModule].name;
    },

    // --- Module Selection ---

    renderModuleSelection: function () {
        const container = document.getElementById('module-list');
        container.innerHTML = '';

        this.config.modules.forEach((mod, index) => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 cursor-pointer flex flex-col items-center text-center group';
            card.onclick = () => this.loadModule(index);

            card.innerHTML = `
                <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <i class="fa-solid fa-book-open text-2xl"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">${mod.name}</h3>
                <span class="text-sm text-gray-500">Nhấn để bắt đầu</span>
            `;
            container.appendChild(card);
        });
    },

    // --- Test Mode Logic ---

    showTestSetup: function () {
        const container = document.getElementById('test-module-list');
        container.innerHTML = '';

        this.config.modules.forEach((mod, index) => {
            const div = document.createElement('div');
            div.className = 'flex items-center';
            div.innerHTML = `
                <input type="checkbox" id="mod-check-${index}" value="${index}" class="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary">
                <label for="mod-check-${index}" class="ml-3 text-gray-700 font-medium cursor-pointer select-none">${mod.name}</label>
            `;
            container.appendChild(div);
        });

        document.getElementById('max-questions').textContent = 'Tùy chọn';
        this.showView('view-test-setup');
        document.getElementById('header-title').textContent = 'Tạo Đề Kiểm Tra';
    },

    startCustomTest: async function () {
        const selectedIndices = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
            selectedIndices.push(parseInt(cb.value));
        });

        if (selectedIndices.length === 0) {
            alert("Vui lòng chọn ít nhất một module!");
            return;
        }

        const countInput = document.getElementById('question-count');
        const requestedCount = parseInt(countInput.value);

        if (isNaN(requestedCount) || requestedCount < 1) {
            alert("Vui lòng nhập số lượng câu hỏi hợp lệ!");
            return;
        }

        document.getElementById('loading').classList.remove('hidden');

        try {
            // Fetch all selected modules
            const promises = selectedIndices.map(index => {
                return new Promise((resolve, reject) => {
                    Papa.parse(this.config.modules[index].file, {
                        download: true,
                        header: true,
                        skipEmptyLines: true,
                        complete: (results) => resolve(results.data),
                        error: (err) => reject(err)
                    });
                });
            });

            const results = await Promise.all(promises);
            let allQuestions = results.flat();

            // Shuffle all questions
            this.shuffleArray(allQuestions);

            // Slice to requested count
            if (allQuestions.length > requestedCount) {
                allQuestions = allQuestions.slice(0, requestedCount);
            }

            this.state.isTestMode = true;
            this.state.quizQuestions = allQuestions;
            this.state.currentQuestionIndex = 0;
            this.state.userResults = {};

            this.renderQuestionPalette();
            this.renderQuestion();
            this.showView('view-quiz');
            document.getElementById('header-title').textContent = `Bài Kiểm Tra (${allQuestions.length} câu)`;

        } catch (error) {
            console.error(error);
            alert("Có lỗi khi tải dữ liệu. Vui lòng thử lại.");
        } finally {
            document.getElementById('loading').classList.add('hidden');
        }
    },

    shuffleArray: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    loadModule: function (index) {
        this.state.currentModule = index;
        const moduleConfig = this.config.modules[index];

        document.getElementById('loading').classList.remove('hidden');

        Papa.parse(moduleConfig.file, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                document.getElementById('loading').classList.add('hidden');
                if (results.errors.length > 0) {
                    console.error("CSV Errors:", results.errors);
                    alert("Có lỗi khi đọc file dữ liệu. Vui lòng kiểm tra console.");
                    return;
                }
                this.processData(results.data);

                // OPTIMIZATION: If there is only 1 part, start it immediately
                if (this.state.parts.length === 1) {
                    this.startQuiz(this.state.parts[0]);
                } else {
                    this.renderPartSelection();
                    this.showView('view-parts');
                    document.getElementById('header-title').textContent = moduleConfig.name;
                }
            },
            error: (err) => {
                document.getElementById('loading').classList.add('hidden');
                console.error("Fetch Error:", err);

                let msg = "Không thể tải file dữ liệu: " + moduleConfig.file;
                if (window.location.protocol === 'file:') {
                    msg += "\n\nLƯU Ý: Bạn đang chạy file trực tiếp (file://). Trình duyệt chặn tải dữ liệu CSV vì lý do bảo mật.\nVui lòng sử dụng 'Live Server' trong VS Code để chạy trang web này.";
                } else {
                    msg += "\nChi tiết: " + (err.message || JSON.stringify(err));
                }
                alert(msg);
            }
        });
    },

    loadCustomModule: function (file, name) {
        document.getElementById('loading').classList.remove('hidden');

        Papa.parse(file, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                document.getElementById('loading').classList.add('hidden');
                if (results.errors.length > 0) {
                    console.error("CSV Errors:", results.errors);
                    alert("Có lỗi khi đọc file dữ liệu. Vui lòng kiểm tra console.");
                    return;
                }
                this.processData(results.data);

                // Add to config to support existing logic
                this.config.modules.push({ name: name, file: file });
                this.state.currentModule = this.config.modules.length - 1;

                this.renderPartSelection();
                this.showView('view-parts');
                document.getElementById('header-title').textContent = name;

                // Hide home button if in single module mode (optional, but good UX)
                // document.getElementById('btn-home').classList.add('hidden'); 
            },
            error: (err) => {
                document.getElementById('loading').classList.add('hidden');
                console.error("Fetch Error:", err);
                alert("Không thể tải file dữ liệu: " + file);
            }
        });
    },

    processData: function (data) {
        // Filter out empty rows or rows without a question content
        // This safeguards against "ghost" questions from trailing empty lines in CSV
        const validData = data.filter(row => row.QuestionContent && row.QuestionContent.trim() !== "");

        this.state.allQuestions = validData;
        this.state.parts = [];

        const CHUNK_SIZE = 30;
        const totalQuestions = validData.length;
        const totalParts = Math.ceil(totalQuestions / CHUNK_SIZE);

        for (let i = 0; i < totalParts; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, totalQuestions);
            const chunk = validData.slice(start, end);

            this.state.parts.push({
                id: i + 1,
                name: `Phần ${i + 1} (Câu ${start + 1} - ${end})`,
                questions: chunk
            });
        }
    },

    renderPartSelection: function () {
        const container = document.getElementById('part-list');
        const moduleName = this.config.modules[this.state.currentModule].name;
        document.getElementById('module-name-display').textContent = moduleName;

        container.innerHTML = '';

        if (this.state.parts.length === 0) {
            container.innerHTML = '<p class="text-gray-500 col-span-full text-center">Không tìm thấy dữ liệu nào trong module này.</p>';
            return;
        }

        this.state.parts.forEach(part => {
            const btn = document.createElement('div');
            btn.className = 'bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary hover:shadow-md cursor-pointer transition-all flex justify-between items-center';
            btn.onclick = () => this.startQuiz(part);

            btn.innerHTML = `
                <div>
                    <span class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Bài tập</span>
                    <span class="text-xl font-bold text-gray-800">${part.name}</span>
                </div>
                <div class="text-right">
                    <span class="block text-2xl font-bold text-primary">${part.questions.length}</span>
                    <span class="text-xs text-gray-500">Câu hỏi</span>
                </div>
            `;
            container.appendChild(btn);
        });
    },

    // --- Quiz Logic ---

    startQuiz: function (part) {
        this.state.currentPart = part;
        this.state.quizQuestions = part.questions;

        if (this.state.quizQuestions.length === 0) {
            alert("Không có câu hỏi nào trong phần này.");
            return;
        }

        this.state.currentQuestionIndex = 0;
        this.state.userResults = {}; // Reset results

        this.renderQuestionPalette();
        this.renderQuestion();
        this.showView('view-quiz');
        document.getElementById('header-title').textContent = `${part.name} - ${this.config.modules[this.state.currentModule].name}`;
    },

    renderQuestion: function () {
        const qIndex = this.state.currentQuestionIndex;
        const question = this.state.quizQuestions[qIndex];
        const total = this.state.quizQuestions.length;

        // Update Progress
        const progress = ((qIndex + 1) / total) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('current-question-number').textContent = `${qIndex + 1}/${total}`;

        // Reset UI state
        document.getElementById('feedback-area').classList.add('hidden');
        document.getElementById('question-status').textContent = this.state.userResults[qIndex] === 'correct' ? 'Đã hoàn thành' : 'Chưa hoàn thành';
        document.getElementById('question-status').className = this.state.userResults[qIndex] === 'correct' ? 'text-sm font-medium text-green-600' : 'text-sm font-medium text-gray-500';

        // Render Text
        document.getElementById('question-text').textContent = question.QuestionContent;

        // Render Options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        // Note: CSV headers might have typos like "AAnsver" based on previous file view
        // We map standard keys A, B, C, D to the CSV columns
        let optionKeys = [
            { key: 'A', text: question.AAnsver || question.AAnswer }, // Handle typo
            { key: 'B', text: question.BAnswer },
            { key: 'C', text: question.CAnswer },
            { key: 'D', text: question.DAnswer }
        ];

        // Always shuffle options for randomness
        this.shuffleArray(optionKeys);

        const isAnsweredCorrectly = this.state.userResults[qIndex] === 'correct';

        optionKeys.forEach(opt => {
            if (!opt.text) return; // Skip empty options if any

            const el = document.createElement('div');
            el.className = 'quiz-option bg-white p-4 rounded-lg border flex items-center group';
            el.dataset.key = opt.key;

            // If already answered correctly, show state
            if (isAnsweredCorrectly) {
                el.classList.add('disabled');
                if (opt.key === question.Answer) {
                    el.classList.add('correct');
                }
            } else {
                el.onclick = () => this.checkAnswer(opt.key, question.Answer, el);
            }

            el.innerHTML = `
                <span class="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center mr-4 group-hover:bg-white border border-gray-200 transition-colors">${opt.key}</span>
                <span class="text-gray-700 font-medium">${opt.text}</span>
            `;
            optionsContainer.appendChild(el);
        });

        // Update buttons
        document.getElementById('btn-prev').disabled = qIndex === 0;
        document.getElementById('btn-next').disabled = qIndex === total - 1;

        // Update Palette Active State
        this.updatePaletteActiveState();
    },

    checkAnswer: function (selectedKey, correctKey, element) {
        // Clean keys just in case (trim whitespace)
        const selected = selectedKey.trim().toUpperCase();
        const correct = correctKey.trim().toUpperCase();

        const feedbackArea = document.getElementById('feedback-area');
        const feedbackText = document.getElementById('feedback-text');

        if (selected === correct) {
            // Correct
            element.classList.add('correct');
            element.classList.add('disabled');
            element.classList.add('flex-wrap'); // Allow content to wrap for explanation

            // Disable all other options
            const allOptions = document.querySelectorAll('.quiz-option');
            allOptions.forEach(opt => opt.classList.add('disabled'));

            feedbackArea.className = 'mt-6 p-4 rounded-lg border-l-4 bg-green-50 border-green-500 text-green-700 fade-in';
            feedbackText.innerHTML = '<i class="fa-solid fa-check-circle mr-2"></i> Chính xác!';
            feedbackArea.classList.remove('hidden');

            this.state.userResults[this.state.currentQuestionIndex] = 'correct';
            this.updatePaletteItem(this.state.currentQuestionIndex, 'correct');

            // Update status text
            document.getElementById('question-status').textContent = 'Đã hoàn thành';
            document.getElementById('question-status').className = 'text-sm font-medium text-green-600';

            // SHOW REASONING INSIDE OPTION
            const question = this.state.quizQuestions[this.state.currentQuestionIndex];
            if (question.Explanation && question.Explanation.trim() !== "") {
                const reasonDiv = document.createElement('div');
                reasonDiv.className = 'basis-full mt-3 pt-3 border-t border-green-200 text-sm text-green-800 animate-fade-in';
                reasonDiv.innerHTML = `<strong>Giải thích:</strong> ${question.Explanation}`;
                element.appendChild(reasonDiv);
            }

        } else {
            // Wrong
            element.classList.add('wrong');

            feedbackArea.className = 'mt-6 p-4 rounded-lg border-l-4 bg-red-50 border-red-500 text-red-700 fade-in';
            feedbackText.innerHTML = '<i class="fa-solid fa-circle-exclamation mr-2"></i> Sai rồi, hãy thử lại!';
            feedbackArea.classList.remove('hidden');

            // If not already marked correct, mark as wrong (or 'attempted')
            if (this.state.userResults[this.state.currentQuestionIndex] !== 'correct') {
                this.state.userResults[this.state.currentQuestionIndex] = 'wrong';
                this.updatePaletteItem(this.state.currentQuestionIndex, 'wrong');
            }
        }
    },

    // --- Palette & Navigation Helpers ---

    renderQuestionPalette: function () {
        const container = document.getElementById('question-palette');
        container.innerHTML = '';

        this.state.quizQuestions.forEach((_, index) => {
            const btn = document.createElement('button');
            btn.className = 'palette-item w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 text-gray-600 text-xs sm:text-sm font-medium flex items-center justify-center hover:bg-gray-200 focus:outline-none';
            btn.textContent = index + 1;
            btn.onclick = () => this.jumpToQuestion(index);
            btn.id = `palette-btn-${index}`;
            container.appendChild(btn);
        });
    },

    updatePaletteItem: function (index, status) {
        const btn = document.getElementById(`palette-btn-${index}`);
        if (!btn) return;

        // Reset base classes
        btn.className = 'palette-item w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center focus:outline-none transition-colors';

        if (status === 'correct') {
            btn.classList.add('bg-green-500', 'text-white');
        } else if (status === 'wrong') {
            btn.classList.add('bg-red-500', 'text-white');
        } else {
            btn.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
        }

        // Re-add active state if needed
        if (index === this.state.currentQuestionIndex) {
            btn.classList.add('active');
        }
    },

    updatePaletteActiveState: function () {
        // Remove active from all
        document.querySelectorAll('.palette-item').forEach(btn => btn.classList.remove('active'));
        // Add to current
        const btn = document.getElementById(`palette-btn-${this.state.currentQuestionIndex}`);
        if (btn) btn.classList.add('active');
    },

    jumpToQuestion: function (index) {
        this.state.currentQuestionIndex = index;
        this.renderQuestion();
    },

    nextQuestion: function () {
        if (this.state.currentQuestionIndex < this.state.quizQuestions.length - 1) {
            this.state.currentQuestionIndex++;
            this.renderQuestion();
        }
    },

    prevQuestion: function () {
        if (this.state.currentQuestionIndex > 0) {
            this.state.currentQuestionIndex--;
            this.renderQuestion();
        }
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
