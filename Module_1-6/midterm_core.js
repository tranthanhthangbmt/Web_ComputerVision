console.log("🚀 [MIDTERM_CORE] ĐÃ NẠP THÀNH CÔNG HỆ THỐNG MỚI - BYPASS CACHE 100%");

const midtermApp = {
    config: {
        totalQuestions: 40, // 4 chương × 10 câu = 40 (sẽ tăng khi thêm chương 5-8)
        questionsPerModule: 10,
        timeLimitMinutes: 40, // 40 phút cho 40 câu
        allowedEmailDomain: '@donga.edu.vn',
        // Mỗi chương có thể chứa nhiều file CSV (các tiết), hệ thống sẽ gom lại rồi random
        modules: [
            { id: 1, name: "Chương 1 - Tổng quan TGMT", files: [
                "DB/MD_Chuong1-T1.csv",
                "DB/MD_Chuong1-T2.csv",
                "DB/MD_Chuong1-T3.csv"
            ]},
            { id: 2, name: "Chương 2 - Nâng cấp & Khôi phục ảnh", files: [
                "DB/MD_Chuong2-T1.csv",
                "DB/MD_Chuong2-T2.csv",
                "DB/MD_Chuong2-T3.csv",
                "DB/MD_Chuong2-T4.csv",
                "DB/MD_Chuong2-T5.csv",
                "DB/MD_Chuong2-T6.csv"
            ]},
            { id: 3, name: "Chương 3 - Phân đoạn ảnh", files: [
                "DB/MD_Chuong3-T1.csv",
                "DB/MD_Chuong3-T2.csv",
                "DB/MD_Chuong3-T3.csv"
            ]},
            { id: 4, name: "Chương 4 - Phát hiện & mô tả đặc trưng", files: [
                "DB/MD_Chuong4-T1.csv",
                "DB/MD_Chuong4-T2.csv",
                "DB/MD_Chuong4-T3.csv"
            ]}
            // === THÊM CHƯƠNG MỚI TẠI ĐÂY ===
            // { id: 5, name: "Chương 5 - Phân lớp ảnh", files: ["DB/MD_Chuong5-T1.csv", ...] },
            // { id: 6, name: "Chương 6 - Mạng CNN", files: ["DB/MD_Chuong6-T1.csv", ...] },
            // { id: 7, name: "Chương 7 - Deep Learning cho TGMT", files: ["DB/MD_Chuong7-T1.csv", ...] },
            // { id: 8, name: "Chương 8 - Dự đoán chuyển động", files: ["DB/MD_Chuong8-T1.csv", ...] },
        ]
    },
    state: {
        user: null, // { email: string, name: string, picture: string }
        questions: [], // Array of 60 questions
        answers: {}, // map index -> selectedKey
        currentIndex: 0,
        timerInterval: null,
        timeLeft: 0, // in seconds
        cheatCount: 0,
        isSubmitted: false,
        startTime: null,
        endTime: null
    },

    init: function () {
        // Đảm bảo DOM đã tải xong
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startApp());
        } else {
            this.startApp();
        }
    },

    startApp: function () {
        this.setupAntiCheat();
        this.showView('view-intro');
    },

    // --- View Routing ---
    showView: function (viewId) {
        document.querySelectorAll('.view-section').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('fade-in');
        });
        const view = document.getElementById(viewId);
        if (view) {
            view.classList.remove('hidden');
            void view.offsetWidth; // trigger reflow
            view.classList.add('fade-in');
        }
    },

    // --- Authentication ---
    handleCredentialResponse: function (response) {
        try {
            // Decode JWT to get user info
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            const email = payload.email;

            if (email.endsWith(this.config.allowedEmailDomain)) {
                this.loginSuccess({
                    email: email,
                    name: payload.name,
                    picture: payload.picture
                });
            } else {
                this.showLoginError();
            }
        } catch (error) {
            console.error("Auth error:", error);
            this.showLoginError();
        }
    },

    mockLogin: function () {
        this.loginSuccess({
            email: "sinhvien_test@donga.edu.vn",
            name: "Sinh Viên Test",
            picture: ""
        });
    },

    customLogin: function () {
        const emailInput = document.getElementById('student-email');
        const email = emailInput.value.trim();

        if (email && email.endsWith(this.config.allowedEmailDomain)) {
            document.getElementById('login-error').classList.add('hidden');
            this.loginSuccess({
                email: email,
                name: email.split('@')[0],
                picture: ""
            });
        } else {
            this.showLoginError();
        }
    },

    showLoginError: function () {
        document.getElementById('login-error').classList.remove('hidden');
    },

    loginSuccess: function (user) {
        this.state.user = user;

        // Update header
        const headerInfo = document.getElementById('header-user-info');
        headerInfo.classList.remove('hidden');
        document.getElementById('user-email').textContent = user.email;
        if (user.picture) {
            document.getElementById('user-avatar').src = user.picture;
        } else {
            // Default avatar
            document.getElementById('user-avatar').src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2394a3b8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>';
        }

        this.showView('view-intro');
    },

    handleClassSelection: function () {
        const select = document.getElementById('student-class-select');
        const otherContainer = document.getElementById('other-class-container');
        const textInput = document.getElementById('student-class');

        if (select.value === 'OTHER') {
            otherContainer.classList.remove('hidden');
            textInput.focus();
        } else {
            otherContainer.classList.add('hidden');
            if (select.value) {
                textInput.value = select.value;
            } else {
                textInput.value = '';
            }
        }
    },

    // --- Loading Questions ---
    startExam: async function () {
        console.log("Starting exam process...");
        const emailInput = document.getElementById('student-email');
        const select = document.getElementById('student-class-select');
        const classInput = document.getElementById('student-class');
        const nameInput = document.getElementById('student-name');
        const idInput = document.getElementById('student-id');
        const modeSelect = document.getElementById('exam-mode');

        const errorDiv = document.getElementById('form-error');
        const errorMsg = document.getElementById('error-message');

        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        
        // Validation
        if (!email || !email.endsWith('@donga.edu.vn')) {
            if (errorDiv) {
                errorDiv.classList.remove('hidden');
                errorMsg.textContent = "Email không hợp lệ. Vui lòng sử dụng email @donga.edu.vn";
            }
            if (emailInput) emailInput.focus();
            return;
        }

        if (!nameInput || !nameInput.value.trim()) {
            if (errorDiv) {
                errorDiv.classList.remove('hidden');
                errorMsg.textContent = "Vui lòng nhập Họ và Tên của bạn!";
            }
            if (nameInput) nameInput.focus();
            return;
        }

        if (!select || !select.value) {
            if (errorDiv) {
                errorDiv.classList.remove('hidden');
                errorMsg.textContent = "Vui lòng chọn Lớp sinh hoạt của bạn!";
            }
            if (select) select.focus();
            return;
        }

        let finalClassName = "";
        if (select.value === 'OTHER') {
            if (!classInput || !classInput.value.trim()) {
                if (errorDiv) {
                    errorDiv.classList.remove('hidden');
                    errorMsg.textContent = "Vui lòng nhập tên lớp của bạn!";
                }
                if (classInput) classInput.focus();
                return;
            }
            finalClassName = classInput.value.trim().toUpperCase();
        } else {
            finalClassName = select.value;
        }

        // Hide error if all good
        if (errorDiv) errorDiv.classList.add('hidden');

        // Store user info
        this.state.user = this.state.user || {};
        this.state.user.email = email;
        this.state.user.fullName = nameInput.value.trim();
        this.state.user.studentId = idInput ? idInput.value.trim().toUpperCase() : "N/A";
        this.state.user.className = finalClassName;
        this.state.user.examMode = modeSelect ? modeSelect.value : "Thi thử";

        const loading = document.getElementById('loading');
        if (loading) loading.classList.remove('hidden');

        try {
            console.log("Loading questions...");
            await this.loadAllQuestions();

            // Initialize Exam State
            this.state.answers = {};
            this.state.currentIndex = 0;
            this.state.isSubmitted = false;
            this.state.cheatCount = 0;
            this.state.startTime = new Date();

            this.renderPalette();
            this.renderQuestion();
            this.startTimer();
            
            console.log("All ready, switching view.");
            this.showView('view-quiz');
        } catch (error) {
            console.error("Error loading questions:", error);
            this.showToast("Lỗi tải đề thi: " + (error.message || "Vui lòng kiểm tra kết nối mạng"), "error");
        } finally {
            if (loading) loading.classList.add('hidden');
        }
    },

    loadAllQuestions: async function () {
        // Hỗ trợ cả format mới (files: []) và format cũ (file: "")
        const modulePromises = this.config.modules.map(async mod => {
            const csvFiles = mod.files || [mod.file]; // Tương thích ngược
            
            // Tải tất cả các file CSV của chương này
            const filePromises = csvFiles.map(csvFile => {
                return new Promise((resolve, reject) => {
                    Papa.parse(csvFile, {
                        download: true,
                        header: true,
                        skipEmptyLines: true,
                        complete: (results) => {
                            const validData = results.data.filter(row => row.QuestionContent && row.QuestionContent.trim() !== "");
                            console.log(`📂 [${mod.name}] ${csvFile}: ${validData.length} câu hợp lệ`);
                            resolve(validData);
                        },
                        error: (err) => {
                            console.warn(`⚠️ Không tải được ${csvFile}:`, err);
                            resolve([]); // Bỏ qua file lỗi, không reject cả module
                        }
                    });
                });
            });

            const allFileResults = await Promise.all(filePromises);
            const allModuleQuestions = allFileResults.flat();
            console.log(`📚 [${mod.name}] Tổng: ${allModuleQuestions.length} câu từ ${csvFiles.length} file`);

            // Trộn ngẫu nhiên tất cả câu hỏi của chương rồi chọn ra N câu
            this.shuffleArray(allModuleQuestions);
            const picked = allModuleQuestions.slice(0, this.config.questionsPerModule).map(q => ({
                ...q,
                _moduleId: mod.id,
                _moduleName: mod.name
            }));
            return picked;
        });

        const results = await Promise.all(modulePromises);
        let allPicked = results.flat();

        // Tự động tính lại tổng số câu = số chương × questionsPerModule
        const expectedTotal = this.config.modules.length * this.config.questionsPerModule;
        this.config.totalQuestions = expectedTotal;

        // Final shuffle of all questions
        this.shuffleArray(allPicked);

        // Safety check
        if (allPicked.length < this.config.totalQuestions) {
            console.warn(`⚠️ Chỉ tải được ${allPicked.length}/${this.config.totalQuestions} câu. Tự điều chỉnh.`);
            this.config.totalQuestions = allPicked.length;
        }

        this.state.questions = allPicked.slice(0, this.config.totalQuestions);
        console.log(`✅ Đề thi: ${this.state.questions.length} câu từ ${this.config.modules.length} chương`);
        
        // Khởi tạo sẵn options cho tất cả câu hỏi để tránh lỗi khi nộp bài mà chưa xem hết các câu
        this.state.questions.forEach(q => this.prepareOptions(q));
    },

    prepareOptions: function(question) {
        if (question._options) return;

        let optionKeys = [
            { key: 'A', text: question.AAnsver || question.AAnswer || question.A },
            { key: 'B', text: question.BAnswer || question.B },
            { key: 'C', text: question.CAnswer || question.C },
            { key: 'D', text: question.DAnswer || question.D }
        ].filter(opt => opt.text && opt.text.trim() !== "");

        this.shuffleArray(optionKeys);
        question._options = optionKeys;
    },

    shuffleArray: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    checkSheetStatus: function(className) {
        const badge = document.getElementById('class-status-badge');
        const badgeClassName = document.getElementById('badge-class-name');
        const badgeStatusIcon = document.getElementById('badge-status-icon');
        const badgeStatusText = document.getElementById('badge-status-text');
        
        badge.classList.remove('hidden');
        badge.classList.remove('bg-blue-600', 'bg-emerald-600', 'bg-amber-500', 'bg-red-600');
        
        badgeClassName.textContent = className;
        
        // Với Firebase, dữ liệu được truyền thẳng vào máy chủ Google siêu tốc
        badge.classList.add('bg-emerald-600');
        badgeStatusIcon.className = 'fa-solid fa-cloud-check';
        badgeStatusText.textContent = 'Trạng thái: Máy chủ Firebase đã sẵn sàng';
    },

    // --- Anti-Cheat ---
    setupAntiCheat: function () {
        document.addEventListener('contextmenu', e => {
            const quizView = document.getElementById('view-quiz');
            const resultsView = document.getElementById('view-results');
            
            const isQuizVisible = quizView && !quizView.classList.contains('hidden');
            const isResultsVisible = resultsView && !resultsView.classList.contains('hidden');
            
            if (isQuizVisible || isResultsVisible) {
                e.preventDefault();
                if (isQuizVisible) this.recordCheat("Click chuột phải");
            }
        });

        // Prevent Copy/Paste/Cut
        document.addEventListener('copy', e => this.preventCheatEvent(e, "Copy"));
        document.addEventListener('cut', e => this.preventCheatEvent(e, "Cut"));
        document.addEventListener('paste', e => this.preventCheatEvent(e, "Paste"));

        // Prevent typical inspect element shortcuts (F12, Ctrl+Shift+I, etc)
        document.addEventListener('keydown', e => {
            const quizView = document.getElementById('view-quiz');
            const resultsView = document.getElementById('view-results');
            
            const isQuizVisible = quizView && !quizView.classList.contains('hidden');
            const isResultsVisible = resultsView && !resultsView.classList.contains('hidden');
            
            if (!isQuizVisible && !isResultsVisible) return;

            // Block Ctrl+C, Ctrl+V, etc
            if (e.ctrlKey || e.metaKey) {
                if (['c', 'v', 'x', 'p', 's', 'u'].includes(e.key.toLowerCase())) {
                    e.preventDefault();
                    if (isQuizVisible) this.recordCheat(`Phím tắt Ctrl+${e.key.toUpperCase()}`);
                }
            }
        });

        // Visibility API (Detect tab switching)
        document.addEventListener('visibilitychange', () => {
            const quizView = document.getElementById('view-quiz');
            if (this.state.isSubmitted || (quizView && quizView.classList.contains('hidden'))) return;
            
            if (document.hidden) {
                this.recordCheat("Chuyển tab hoặc thu nhỏ trình duyệt");
            }
        });
    },

    preventCheatEvent: function (e, actionName) {
        const quizView = document.getElementById('view-quiz');
        const resultsView = document.getElementById('view-results');
        
        const isQuizVisible = quizView && !quizView.classList.contains('hidden');
        const isResultsVisible = resultsView && !resultsView.classList.contains('hidden');

        if (isQuizVisible || isResultsVisible) {
            e.preventDefault();
            if (isQuizVisible) this.recordCheat(actionName);
        }
    },

    recordCheat: function (action) {
        this.state.cheatCount++;
        this.showToast(`CẢNH BÁO: Hành vi ${action} không được phép! (Lần ${this.state.cheatCount})`, "error");
        // We can choose to automatically submit after 3 warnings, but for now just warn.
    },

    // --- Timer ---
    startTimer: function () {
        this.state.timeLeft = this.config.timeLimitMinutes * 60;
        this.updateTimerDisplay();

        this.state.timerInterval = setInterval(() => {
            this.state.timeLeft--;
            this.updateTimerDisplay();

            if (this.state.timeLeft <= 0) {
                clearInterval(this.state.timerInterval);
                this.showToast("Hết giờ! Tự động nộp bài.", "warning");
                this.submitExam(true);
            }
        }, 1000);
    },

    updateTimerDisplay: function () {
        const m = Math.floor(this.state.timeLeft / 60);
        const s = this.state.timeLeft % 60;
        const display = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        const timerContainer = document.getElementById('timer-display').parentElement;
        document.getElementById('timer-display').querySelector('span').textContent = display;

        if (this.state.timeLeft <= 300) { // 5 minutes warning
            timerContainer.classList.add('timer-warning');
        }
    },

    // --- Quiz Logic ---
    renderPalette: function () {
        const container = document.getElementById('question-palette');
        container.innerHTML = '';

        // Cập nhật số câu hỏi động trên UI
        const totalCountEl = document.getElementById('total-question-count');
        if (totalCountEl) totalCountEl.textContent = this.config.totalQuestions;

        this.state.questions.forEach((_, index) => {
            const btn = document.createElement('button');
            btn.className = 'palette-item w-full aspect-square rounded-lg bg-slate-100 text-slate-600 text-sm font-medium flex items-center justify-center border border-slate-200 hover:bg-slate-200 focus:outline-none';
            btn.textContent = index + 1;
            btn.onclick = () => this.jumpToQuestion(index);
            btn.id = `palette-btn-${index}`;
            container.appendChild(btn);
        });

        this.updatePaletteStats();
    },

    renderQuestion: function () {
        const qIndex = this.state.currentIndex;
        const question = this.state.questions[qIndex];

        document.getElementById('current-question-number').textContent = qIndex + 1;
        document.getElementById('question-module-badge').textContent = question._moduleName;
        document.getElementById('question-text').textContent = question.QuestionContent;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        // Options đã được khởi tạo sẵn ở loadAllQuestions
        if (!question._options) {
            this.prepareOptions(question);
        }

        const currentAnswer = this.state.answers[qIndex];

        question._options.forEach(opt => {
            const el = document.createElement('div');
            const isSelected = currentAnswer === opt.key;

            el.className = `quiz-option p-4 rounded-xl flex items-center gap-4 ${isSelected ? 'selected' : 'border-slate-200 bg-white'}`;
            el.dataset.key = opt.key;
            el.onclick = () => this.selectAnswer(opt.key);

            el.innerHTML = `
                <div class="option-label w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-sm border transition-colors
                    ${isSelected ? '' : 'bg-slate-100 text-slate-600 border-slate-200'}">
                    ${opt.key}
                </div>
                <div class="font-medium text-slate-700 select-none">${opt.text}</div>
            `;
            optionsContainer.appendChild(el);
        });

        // Update nav buttons
        document.getElementById('btn-prev').disabled = qIndex === 0;
        document.getElementById('btn-next').disabled = qIndex === this.config.totalQuestions - 1;

        this.updatePaletteActive();
    },

    selectAnswer: function (key) {
        if (this.state.isSubmitted) return;

        this.state.answers[this.state.currentIndex] = key;

        // Re-render question to show selection
        this.renderQuestion();

        // Update palette
        const paletteBtn = document.getElementById(`palette-btn-${this.state.currentIndex}`);
        paletteBtn.classList.remove('bg-slate-100', 'text-slate-600');
        paletteBtn.classList.add('bg-mit', 'text-white', 'border-mit');

        this.updatePaletteStats();
    },

    jumpToQuestion: function (index) {
        this.state.currentIndex = index;
        this.renderQuestion();
    },

    nextQuestion: function () {
        if (this.state.currentIndex < this.config.totalQuestions - 1) {
            this.state.currentIndex++;
            this.renderQuestion();
        }
    },

    prevQuestion: function () {
        if (this.state.currentIndex > 0) {
            this.state.currentIndex--;
            this.renderQuestion();
        }
    },

    updatePaletteActive: function () {
        document.querySelectorAll('.palette-item').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`palette-btn-${this.state.currentIndex}`);
        if (activeBtn) activeBtn.classList.add('active');
    },

    updatePaletteStats: function () {
        const answered = Object.keys(this.state.answers).length;
        document.getElementById('count-answered').textContent = answered;
        document.getElementById('count-unanswered').textContent = this.config.totalQuestions - answered;
    },

    // --- Submission ---
    submitExamConfirm: function () {
        const answeredCount = Object.keys(this.state.answers).length;
        if (answeredCount < this.config.totalQuestions) {
            document.getElementById('modal-confirm-text').textContent = `Bạn mới hoàn thành ${answeredCount}/${this.config.totalQuestions} câu. Bạn có chắc chắn muốn nộp bài ngay?`;
        } else {
            document.getElementById('modal-confirm-text').textContent = "Bạn đã hoàn thành tất cả câu hỏi. Bạn có chắc chắn muốn nộp bài?";
        }

        const modal = document.getElementById('modal-confirm');
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
    },

    closeModal: function () {
        const modal = document.getElementById('modal-confirm');
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 300);
    },

    submitExam: function (autoSubmit = false) {
        if (!autoSubmit) this.closeModal();

        clearInterval(this.state.timerInterval);
        this.state.isSubmitted = true;
        this.state.endTime = new Date();

        // Disable class to allow selecting text in results view if needed
        document.body.classList.remove('anti-cheat-enabled');

        try {
            this.calculateAndShowResults();
        } catch (err) {
            console.error("Lỗi tính toán kết quả:", err);
            this.showView('view-results'); // Cố gắng hiện view dù lỗi
        }
        
        // Đảm bảo việc lưu server được gọi dù có lỗi hiển thị
        this.saveResultsToServer();
    },

    calculateAndShowResults: function () {
        let correctCount = 0;
        let wrongCount = 0;
        let unattemptedCount = 0;

        this.state.questions.forEach((q, index) => {
            const userAns = this.state.answers[index];
            const correctAns = (q.Answer || "").toString().trim().toUpperCase();

            if (!userAns) {
                unattemptedCount++;
            } else if (userAns.trim().toUpperCase() === correctAns) {
                correctCount++;
            } else {
                wrongCount++;
            }
        });

        // 10 point scale
        const score = ((correctCount / this.config.totalQuestions) * 10).toFixed(2);

        // Time taken
        const timeTakenSec = Math.floor((this.state.endTime - this.state.startTime) / 1000);
        const m = Math.floor(timeTakenSec / 60);
        const s = timeTakenSec % 60;
        const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        // Update UI
        document.getElementById('result-user-email').textContent = this.state.user.email;
        document.getElementById('stat-correct').textContent = `${correctCount}/${this.config.totalQuestions}`;
        document.getElementById('stat-wrong').textContent = wrongCount + unattemptedCount;
        document.getElementById('stat-time').textContent = timeStr;

        let rank = "Yếu";
        let rankColor = "text-red-600";
        if (score >= 8.5) { rank = "Giỏi"; rankColor = "text-emerald-600"; }
        else if (score >= 7.0) { rank = "Khá"; rankColor = "text-blue-600"; }
        else if (score >= 5.0) { rank = "Trung bình"; rankColor = "text-amber-600"; }

        const rankEl = document.getElementById('stat-rank');
        rankEl.textContent = rank;
        rankEl.className = `text-lg font-bold mt-1 ${rankColor}`;

        // Animate Circle
        document.getElementById('score-text').textContent = score;
        const circle = document.getElementById('score-circle');
        const circumference = 283; // 2 * pi * r (r=45)
        const offset = circumference - (score / 10) * circumference;

        this.showView('view-results');

        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
            if (score < 5) circle.style.stroke = "#ef4444";
            else if (score < 8) circle.style.stroke = "#3b82f6";
        }, 500);

        this.generateReviewContent();
    },

    toggleReview: function () {
        const area = document.getElementById('review-area');
        area.classList.toggle('hidden');
    },

    generateReviewContent: function () {
        const container = document.getElementById('review-list');
        container.innerHTML = '';

        this.state.questions.forEach((q, index) => {
            const userAns = this.state.answers[index];
            const correctAns = (q.Answer || "").toString().trim().toUpperCase();
            
            // Đảm bảo options tồn tại
            if (!q._options) this.prepareOptions(q);
            const isCorrect = userAns === correctAns;
            const isUnattempted = !userAns;

            let borderClass = isCorrect ? 'border-emerald-500' : 'border-red-500';
            if (isUnattempted) borderClass = 'border-amber-500';

            const div = document.createElement('div');
            div.className = `bg-slate-50 border-l-4 ${borderClass} p-5 rounded-r-xl shadow-sm`;

            let statusBadge = '';
            if (isCorrect) statusBadge = '<span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">Đúng</span>';
            else if (isUnattempted) statusBadge = '<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">Bỏ trống</span>';
            else statusBadge = '<span class="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">Sai</span>';

            let optionsHtml = '';
            q._options.forEach(opt => {
                let optClass = "text-slate-600";
                let icon = "";

                if (opt.key === correctAns && !isUnattempted) {
                    optClass = "text-emerald-700 font-bold bg-emerald-50 p-2 rounded";
                    icon = '<i class="fa-solid fa-check text-emerald-500 mr-2"></i>';
                } else if (opt.key === userAns) {
                    optClass = "text-red-600 line-through bg-red-50 p-2 rounded";
                    icon = '<i class="fa-solid fa-xmark text-red-500 mr-2"></i>';
                } else {
                    optClass = "p-2 text-slate-600";
                    icon = `<span class="w-4 inline-block mr-2 font-bold">${opt.key}.</span>`;
                }

                optionsHtml += `<div class="${optClass} text-sm">${icon} ${opt.text}</div>`;
            });

            div.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <h4 class="font-bold text-slate-800">Câu ${index + 1}: ${q.QuestionContent}</h4>
                    ${statusBadge}
                </div>
                <div class="space-y-1 mt-3">
                    ${optionsHtml}
                </div>
            `;
            container.appendChild(div);
        });
    },

    // --- Data Storage ---
    saveResultsToServer: function () {
        console.log("🔥 [FIREBASE] === BẮT ĐẦU LƯU KẾT QUẢ ===");
        var syncStatusDiv = document.getElementById('firebase-sync-status');
        if (syncStatusDiv) {
            syncStatusDiv.className = "mb-6 p-4 rounded-xl border flex items-center justify-center gap-3 bg-blue-50 border-blue-200 text-blue-700";
            syncStatusDiv.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin text-xl"></i><span class="font-bold">Đang gửi kết quả lên Firebase...</span>';
        }
        var payload;
        try {
            console.log("🔥 [FIREBASE] Bước 1: Tạo payload...");
            var detailedAnswers = [];
            for (var i = 0; i < this.state.questions.length; i++) {
                var q = this.state.questions[i];
                var userAns = this.state.answers[i] || null;
                var correctAns = (q.Answer || "").toString().trim().toUpperCase();
                detailedAnswers.push({
                    questionIndex: i + 1,
                    questionContent: q.QuestionContent || "N/A",
                    userAnswer: userAns,
                    correctAnswer: correctAns,
                    isCorrect: userAns === correctAns
                });
            }
            // Đảm bảo không có giá trị undefined/NaN gây lỗi Firestore
            var cleanPayload = {
                email: (this.state.user && this.state.user.email) ? this.state.user.email : "unknown",
                fullName: (this.state.user && this.state.user.fullName) ? this.state.user.fullName : "N/A",
                studentId: (this.state.user && this.state.user.studentId) ? this.state.user.studentId : "N/A",
                className: (this.state.user && this.state.user.className) ? this.state.user.className : "unknown",
                examMode: (this.state.user && this.state.user.examMode) ? this.state.user.examMode : "Thi thử",
                subjectName: "Thị Giác Máy Tính",
                score: document.getElementById('score-text') ? document.getElementById('score-text').textContent : "0",
                cheatCount: this.state.cheatCount || 0,
                timeTaken: document.getElementById('stat-time') ? document.getElementById('stat-time').textContent : "00:00",
                detailedAnswers: detailedAnswers,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            };
            
            // Xóa bỏ mọi thuộc tính undefined một cách triệt để
            payload = JSON.parse(JSON.stringify(cleanPayload));
            console.log("🔥 [FIREBASE] Payload OK. Size:", JSON.stringify(payload).length);
        } catch (e) {
            console.error("🔥 [FIREBASE] LỖI tạo payload:", e);
            if (syncStatusDiv) {
                syncStatusDiv.className = "mb-6 p-4 rounded-xl border flex items-center justify-center gap-2 bg-red-50 border-red-200 text-red-700";
                syncStatusDiv.innerHTML = '<i class="fa-solid fa-bug text-xl"></i><span class="font-bold">Lỗi: ' + e.message + '</span>';
            }
            return;
        }

        // Kiểm tra Firebase
        if (!window.firebaseDB) {
            console.error("🔥 [FIREBASE] window.firebaseDB NULL!");
            if (syncStatusDiv) {
                syncStatusDiv.className = "mb-6 p-4 rounded-xl border flex items-center justify-center gap-2 bg-red-50 border-red-200 text-red-700";
                syncStatusDiv.innerHTML = '<i class="fa-solid fa-plug-circle-xmark text-xl"></i><span class="font-bold">Firebase chưa khởi tạo!</span>';
            }
            return;
        }
        console.log("🔥 [FIREBASE] Bước 2: firebaseDB OK");

        // Gửi lên Firebase
        console.log("🔥 [FIREBASE] Bước 3: Gọi .add()...");
        var self = this;
        var done = false;
        var tid = setTimeout(function() {
            if (!done) {
                done = true;
                console.warn("🔥 [FIREBASE] ⏰ TIMEOUT 20s!");
                if (syncStatusDiv) {
                    syncStatusDiv.className = "mb-6 p-4 rounded-xl border flex flex-col items-center justify-center gap-2 bg-amber-50 border-amber-200 text-amber-700 text-center";
                    syncStatusDiv.innerHTML = '<i class="fa-solid fa-clock text-xl animate-pulse"></i><span class="font-bold">Mạng quá chậm (20s chưa xong).</span><span class="text-sm">Hãy kiểm tra lại kết nối hoặc Firestore Rules.</span>';
                }
            }
        }, 20000);
        try {
            window.firebaseDB.collection('ExamSubmissions').add(payload)
                .then(function(docRef) {
                    if (done) return;
                    done = true;
                    clearTimeout(tid);
                    console.log("🔥 [FIREBASE] ✅ THÀNH CÔNG! ID:", docRef.id);
                    if (syncStatusDiv) {
                        syncStatusDiv.className = "mb-6 p-4 rounded-xl border flex items-center justify-center gap-3 bg-emerald-50 border-emerald-200 text-emerald-700";
                        syncStatusDiv.innerHTML = '<i class="fa-solid fa-check-circle text-xl"></i><span class="font-bold">✅ Đã lưu an toàn trên Firebase</span>';
                    }
                    self.showToast("Đã đồng bộ lên Firebase!", "success");
                })
                .catch(function(error) {
                    if (done) return;
                    done = true;
                    clearTimeout(tid);
                    console.error("🔥 [FIREBASE] ❌ LỖI:", error);
                    if (syncStatusDiv) {
                        syncStatusDiv.className = "mb-6 p-4 rounded-xl border flex flex-col items-center justify-center gap-2 bg-red-50 border-red-200 text-red-700 text-center";
                        syncStatusDiv.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-xl"></i><span class="font-bold">Lỗi: ' + error.message + '</span>';
                    }
                });
            console.log("🔥 [FIREBASE] Lệnh .add() đã gửi, chờ callback...");
        } catch (fatal) {
            done = true;
            clearTimeout(tid);
            console.error("🔥 [FIREBASE] 💀 FATAL:", fatal);
            if (syncStatusDiv) {
                syncStatusDiv.className = "mb-6 p-4 rounded-xl border flex items-center justify-center gap-2 bg-red-50 border-red-200 text-red-700";
                syncStatusDiv.innerHTML = '<i class="fa-solid fa-skull-crossbones text-xl"></i><span class="font-bold">Lỗi: ' + fatal.message + '</span>';
            }
        }
    },

    // --- Đăng xuất & Cho sinh viên khác thi ---
    logoutAndRetake: function () {
        if (confirm("Bắt đầu bài thi mới với tài khoản khác?")) {
            localStorage.removeItem('midterm_state');
            window.location.reload();
        }
    },

    // --- UI Utilities ---
    showToast: function (message, type = "info") {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');

        let bgClass = "bg-slate-800 text-white";
        let icon = '<i class="fa-solid fa-circle-info text-blue-400"></i>';

        if (type === "error" || type === "warning") {
            bgClass = "bg-red-50 text-red-700 border border-red-200";
            icon = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i>';
        } else if (type === "success") {
            bgClass = "bg-emerald-50 text-emerald-700 border border-emerald-200";
            icon = '<i class="fa-solid fa-circle-check text-emerald-500"></i>';
        }

        toast.className = `px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 toast-enter ${bgClass}`;
        toast.innerHTML = `${icon} <span class="font-medium text-sm">${message}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('toast-enter');
            toast.classList.add('toast-leave');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Global callback for Google Login
function handleCredentialResponse(response) {
    midtermApp.handleCredentialResponse(response);
}

document.addEventListener('DOMContentLoaded', () => {
    midtermApp.init();
});
