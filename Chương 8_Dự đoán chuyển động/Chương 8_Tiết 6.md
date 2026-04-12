**Slide 1**
**Tiêu đề:** Tổng kết môn học & Trình bày Đồ án
**Tiêu đề phụ:** Tiết 6 - Nhìn lại hành trình Thị giác máy tính và Đánh giá cuối kỳ
**Nội dung:**
*   Mục tiêu chuẩn đầu ra: CLO3, CLO4.
*   Phần 1: Ôn tập chuỗi quy trình Thị giác máy tính (Từ Trích xuất đặc trưng đến Xử lý Video).
*   Phần 2: Hoạt động Nhóm - Báo cáo, Thuyết trình đồ án thực tế.
*   Phần 3: Giảng viên nhận xét và đánh giá.

---

**Slide 2**
**Tiêu đề:** Bức tranh toàn cảnh: Chuỗi quy trình Thị giác máy tính
**Nội dung:**
*   **1. "Mắt" - Trích xuất đặc trưng (Chương 4):** SIFT, SURF, HOG, LBP. Nhận diện các điểm, cạnh, kết cấu cơ bản.
*   **2. "Cầu nối" - Biểu diễn dữ liệu (Chương 5):** Mô hình Bag-of-Features (BoF). Lượng hóa và đồng nhất kích thước vector.
*   **3. "Não bộ" - Phân lớp ảnh (Chương 5):** KNN, SVM. Đưa ra phán quyết, phân loại đối tượng dựa trên vector đặc trưng.
*   **4. Kỷ nguyên Học sâu (Chương 6 & 7):** CNN, VGG, ResNet, MobileNet. Tự động hóa trọn gói quy trình học đặc trưng và phân loại (End-to-end).
*   **5. Không gian thời gian (Chương 8):** Phân tích chuỗi Video và Dự đoán chuyển động.

---

**Slide 3**
**Tiêu đề:** Nhìn lại: Trích xuất đặc trưng thủ công (Hand-crafted Features)
**Nội dung:**
*   **Đặc trưng điểm (Point Features):**
    *   **SIFT:** "Tiêu chuẩn vàng", bất biến với tỷ lệ và phép xoay, tạo ra vector 128 chiều mạnh mẽ.
    *   **SURF:** "Người anh em siêu tốc" của SIFT, sử dụng ảnh tích phân (Integral Images) để đạt tốc độ thời gian thực.
*   **Đặc trưng vùng và kết cấu (Region & Texture):**
    *   **HOG (Histogram of Oriented Gradients):** Trích xuất cấu trúc hình dáng, tiêu chuẩn cho bài toán phát hiện người đi bộ.
    *   **LBP (Local Binary Patterns):** Phân tích kết cấu bề mặt, cực nhanh và miễn nhiễm với thay đổi cường độ sáng.
*   *(Hình minh họa đề xuất: Sơ đồ Quy trình 4 giai đoạn của SIFT hoặc Hình ảnh mô tả HOG/LBP áp dụng trên hình người đi bộ/bức tường gạch)*.

---

**Slide 4**
**Tiêu đề:** Nhìn lại: Phân lớp ảnh Truyền thống (Image Classification)
**Nội dung:**
*   **Bag-of-Features (BoF):** Giải quyết "Nghịch lý kích thước", biến đổi hàng ngàn đặc trưng cục bộ (từ SIFT/SURF) thành một vector tần suất (Histogram) có độ dài cố định để đại diện cho toàn bức ảnh.
*   **K-Nearest Neighbors (KNN):** Học máy "lười biếng" (lazy learning) dựa trên khoảng cách. Quyết định nhãn bằng cách bầu chọn đa số từ $K$ láng giềng gần nhất.
*   **Support Vector Machine (SVM):** Tìm kiếm "siêu mặt phẳng" phân tách tối ưu nhất (lề tối đa) để phân loại ảnh một cách chính xác.
*   *(Hình minh họa đề xuất: Sơ đồ minh họa bộ mô tả BoF kết hợp cùng bộ phân loại SVM tuyến tính)*.

---

**Slide 5**
**Tiêu đề:** Nhìn lại: Sức mạnh của Deep Learning & Mạng CNN
**Nội dung:**
*   **Hạn chế mạng truyền thống:** Đặc trưng thủ công gặp giới hạn khi dữ liệu quá phức tạp.
*   **Kiến trúc CNN kinh điển:**
    *   *AlexNet & VGG16:* Sự khởi đầu và sức mạnh của việc xếp chồng các bộ lọc tích chập.
    *   *ResNet:* Đột phá với kết nối tắt (Skip Connections) triệt tiêu lỗi đạo hàm, đẩy mạng sâu lên hàng trăm lớp.
    *   *MobileNet:* Thiết kế tinh gọn bằng tích chập tách biệt chiều sâu, tối ưu hóa cho Edge AI và thiết bị di động.
*   **Học chuyển giao (Transfer Learning):** Tái sử dụng các mô hình khổng lồ (Pretrained Models) kết hợp đóng băng trọng số và tinh chỉnh (Fine-tuning) để giải bài toán mới với ít dữ liệu.
*   *(Hình minh họa đề xuất: Sơ đồ tiến hóa các mạng CNN từ VGG -> Inception -> ResNet -> MobileNet hoặc Quy trình Transfer Learning)*.

---

**Slide 6**
**Tiêu đề:** Nhìn lại: Xử lý Video và Dự đoán Chuyển động (Chương 8)
**Nội dung:**
*   **Chuyển động tịnh tiến & Tham số:** Xử lý các dịch chuyển cơ bản và biến đổi toàn cục (Affine, Homography) phục vụ bài toán như Ổn định video.
*   **Chuyển động dạng Spline:** Mô phỏng sự biến dạng đàn hồi cục bộ bằng mạng lưới điểm điều khiển (Quadtree Spline).
*   **Luồng quang (Optical Flow):** Ước lượng trường vector vận tốc cho mọi điểm ảnh (Lucas-Kanade, Horn-Schunck, RAFT) dựa trên ràng buộc độ sáng không đổi.
*   **Chuyển động phân lớp:** Tách video thành các mặt phẳng độ sâu, giải quyết bài toán che khuất (occlusions) ứng dụng trong nội suy khung hình và theo dõi đối tượng.

---

**Slide 7**
**Tiêu đề:** Phần 2: Báo cáo Đồ án Cuối kỳ (Final Project Presentation)
**Nội dung:**
*   **Mục tiêu:** Sinh viên báo cáo, demo và bảo vệ dự án Thị giác máy tính đã thực hiện trong suốt học kỳ.
*   **Đáp ứng Chuẩn đầu ra môn học:**
    *   **CLO3:** Lập trình được một ứng dụng xử lý ảnh hoàn chỉnh với thuật toán áp dụng cụ thể và các chức năng đầy đủ,.
    *   **CLO4:** Có kỹ năng làm việc cá nhân và làm việc theo nhóm,.
*   **Quy cách:** Mỗi nhóm có 15 phút trình bày (bao gồm Live Demo) và 5 phút hỏi đáp (Q&A) phản biện cùng Giảng viên.

---

**Slide 8**
**Tiêu đề:** Tiêu chí Đánh giá Chuyên môn & Ứng dụng (CLO3)
**Nội dung:**
*   **Tính hoàn thiện của ứng dụng:** Chương trình/phần mềm có hoạt động trơn tru không? Đánh giá thông qua phần Live Demo trực tiếp.
*   **Mức độ hiểu thuật toán:** Giải thích được cơ sở lý thuyết, điểm mạnh/yếu của các mô hình đã sử dụng (ví dụ: SIFT, SVM, YOLO, VGG16, Optical Flow).
*   **Kỹ năng lập trình:** Sử dụng thành thạo các thư viện cốt lõi (OpenCV, TensorFlow, PyTorch). Mã nguồn (code) có cấu trúc tốt, logic và có sự đóng góp tự viết.
*   **Đánh giá mô hình:** Có sử dụng các độ đo học thuật (Accuracy, mAP, FPS, Validation Loss) để đánh giá tính hiệu quả của mô hình một cách khách quan.

---

**Slide 9**
**Tiêu đề:** Tiêu chí Đánh giá Kỹ năng Mềm (CLO4)
**Nội dung:**
*   **Tổ chức & Làm việc nhóm:** Sự phân công công việc rõ ràng, hợp lý. Tất cả các thành viên đều nắm được tổng thể dự án và thể hiện được sự phối hợp đồng đều.
*   **Kỹ năng Thuyết trình:** Phong thái tự tin, diễn đạt trôi chảy, đúng trọng tâm. Bố cục Slide báo cáo chuyên nghiệp, trực quan.
*   **Kỹ năng Phản biện (Q&A):** Khả năng lắng nghe câu hỏi, bảo vệ quan điểm logic và bình tĩnh xử lý tình huống (ngay cả khi Demo gặp lỗi ngoài ý muốn).
*   **Quản lý dự án:** Việc sử dụng các công cụ quản lý mã nguồn (Git) và chuẩn bị tài liệu báo cáo/báo cáo tổng kết chỉn chu.

---

**Slide 10**
**Tiêu đề:** Tiến hành Báo cáo - Phiên 1 (Session 1)
**Nội dung:**
*   **Quy định tại lớp:**
    *   Các nhóm chuẩn bị sẵn mã nguồn, khởi động môi trường (Jupyter Notebook, Colab hoặc App) sẵn sàng để tiết kiệm thời gian.
    *   Các nhóm bên dưới chú ý lắng nghe, chuẩn bị câu hỏi phản biện cho nhóm đang trình bày để lấy điểm tương tác.
*   **Danh sách trình bày Phiên 1:**
    *   *Nhóm 1: [Tên đề tài của Nhóm 1]*
    *   *Nhóm 2: [Tên đề tài của Nhóm 2]*
    *   *Nhóm 3: [Tên đề tài của Nhóm 3]*

---

Dưới đây là nội dung chi tiết cho 5 slide cuối cùng (Slide 11 - 15) của Tiết 6. Đây là phần khép lại buổi báo cáo đồ án, đưa ra nhận xét tổng thể từ giảng viên, mở rộng góc nhìn về tương lai công nghệ và chính thức nói lời chia tay môn học "Thị giác máy tính".

**Slide 11**
**Tiêu đề:** Tiến hành Báo cáo - Phiên 2 (Session 2)
**Nội dung:**
*   **Tiếp tục phần trình bày của các nhóm còn lại:**
    *   *Nhóm 4: [Tên đề tài]* - (Gợi ý: Ứng dụng mạng học chuyển giao Transfer Learning với VGG16/ResNet),.
    *   *Nhóm 5: [Tên đề tài]* - (Gợi ý: Hệ thống phát hiện đối tượng thời gian thực với YOLO/SSD).
    *   *Nhóm 6: [Tên đề tài]* - (Gợi ý: Phân tích và theo dõi chuyển động video / Video Tracking).
*   **Tiêu điểm phản biện (Q&A):** Tập trung vào việc giải thích sự lựa chọn kiến trúc mạng (tại sao dùng kiến trúc này thay vì kiến trúc khác) và cách nhóm tối ưu hóa tốc độ hoặc độ chính xác của mô hình,.

---

**Slide 12**
**Tiêu đề:** Đánh giá & Nhận xét chung từ Giảng viên (CLO3, CLO4)
**Nội dung:**
*   **Ghi nhận nỗ lực (CLO4):** Đánh giá cao tinh thần làm việc nhóm, sự phối hợp phân chia công việc (thu thập dữ liệu, lập trình, viết báo cáo) và kỹ năng thuyết trình của các nhóm.
*   **Điểm sáng chuyên môn (CLO3):** 
    *   Nhiều nhóm đã biết tận dụng triết lý "Đứng trên vai người khổng lồ" - áp dụng tốt Học chuyển giao (Transfer Learning) từ các mô hình tiền huấn luyện thay vì huấn luyện từ đầu,.
    *   Khả năng tích hợp mã nguồn và giao diện người dùng (UI) khá tốt.
*   **Điểm cần khắc phục:** 
    *   Một số mô hình còn hiện tượng Quá khớp (Overfitting) do thiếu dữ liệu hoặc chưa dùng các kỹ thuật điều chuẩn như Dropout, Data Augmentation,.
    *   Cần chú ý hơn đến việc tối ưu hóa khối lượng tính toán (FLOPs) nếu muốn triển khai ứng dụng thực tế trên thiết bị yếu.

---

**Slide 13**
**Tiêu đề:** Hướng phát triển & Tương lai của Thị giác máy tính
**Nội dung:**
*   Hành trình của chúng ta dừng lại ở CNN và Phân tích Video, nhưng thế giới Computer Vision vẫn đang tiến lên với tốc độ chóng mặt:
*   **Kỷ nguyên Vision Transformers (ViT):** Sự chuyển dịch từ kiến trúc CNN truyền thống sang các mô hình Transformers (vốn dùng trong xử lý ngôn ngữ) áp dụng cơ chế "tự chú ý" (self-attention) đang phá vỡ nhiều kỷ lục độ chính xác,.
*   **Edge AI & Thiết bị di động:** Đưa các mô hình khổng lồ xuống điện thoại, camera giám sát thông qua các kiến trúc tinh gọn (như MobileNet, EfficientNet) kết hợp kỹ thuật Lượng tử hóa (Quantization) và Cắt tỉa (Pruning),.
*   **AI Tạo sinh (Generative AI):** Không chỉ "nhìn hiểu" mà còn "sáng tạo" - Mạng đối kháng tạo sinh (GANs) và mô hình Khuếch tán (Diffusion) để tạo ra hình ảnh, video chân thực từ văn bản,.

---

**Slide 14**
**Tiêu đề:** Thông tin Học vụ & Hướng dẫn Nộp bài
**Nội dung:**
*   **Nộp Hồ sơ Đồ án (Final Submission):**
    *   Các nhóm đóng gói toàn bộ Mã nguồn (Source code), Tập dữ liệu (Dataset - nếu có), Slide thuyết trình và Báo cáo tổng kết định dạng PDF.
    *   Tải lên hệ thống E-learning (LMS) của trường trước [Hạn chót: DD/MM/YYYY].
*   **Cơ cấu Điểm số Đồ án (Trọng số 50%):**
    *   Điểm đánh giá kết quả chạy phần mềm/Mô hình thực tế (Trọng tâm CLO3).
    *   Điểm báo cáo, slide và kỹ năng thuyết trình, vấn đáp (Trọng tâm CLO4).
*   **Công bố điểm:** Điểm tổng kết môn học sẽ được cập nhật trên cổng thông tin sinh viên vào tuần tới. Đề nghị các bạn theo dõi và phản hồi nếu có sai sót.

---

**Slide 15**
**Tiêu đề:** Tổng kết Môn học & Lời cảm ơn
**Nội dung:**
*   **Nhìn lại chặng đường:** Từ việc thao tác với từng ma trận điểm ảnh, trích xuất đặc trưng thủ công (SIFT/HOG),, cho đến việc thiết kế các Mạng Nơ-ron sâu (CNN, ResNet), và phân tích dự đoán chuyển động Video. Các em đã nắm trong tay nền tảng vững chắc của Thị giác máy tính.
*   **Lời nhắn nhủ:** Công nghệ sẽ thay đổi, nhưng tư duy toán học và kỹ năng giải quyết vấn đề (problem-solving) các em học được sẽ là hành trang đi theo suốt sự nghiệp Kỹ sư CNTT.
*   **Lời Kết:** Chúc mừng toàn thể lớp đã hoàn thành xuất sắc học phần **Thị giác máy tính (INFO3111)**. Chúc các em nhiều sức khỏe, bảo vệ đồ án tốt nghiệp thành công và tiến xa trên con đường AI / Computer Vision!