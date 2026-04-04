**Slide 1**
**Tiêu đề:** Chương 6. Mạng CNN (Tiếp theo)
**Tiêu đề phụ:** Tiết 3 - Ứng dụng CNN: Nhận diện và Phát hiện đối tượng
**Nội dung:**
*   6.4. Ứng dụng CNN
*   6.4.1. Nhận diện đối tượng (Image Classification)
*   6.4.2. Định vị và Phát hiện đối tượng (Localization & Object Detection)

---

**Slide 2**
**Tiêu đề:** 6.4.1. Nhận diện đối tượng (Image Classification)
**Nội dung:**
*   **Khái niệm:** Là bài toán cơ bản nhất trong thị giác máy tính, mục tiêu là gán một nhãn (label) phân lớp duy nhất cho toàn bộ bức ảnh (Ví dụ: "ảnh này chứa con mèo").
*   **Kiến trúc tổng quát:** Ảnh đầu vào $\rightarrow$ Các lớp Tích chập & Gộp (Trích xuất đặc trưng) $\rightarrow$ Làm phẳng (Flatten) $\rightarrow$ Các lớp Kết nối đầy đủ (Phân loại).
*   **Đầu ra:** Thường sử dụng hàm kích hoạt Softmax ở lớp cuối cùng để tính toán xác suất ảnh thuộc về từng phân lớp cụ thể.

---

**Slide 3**
**Tiêu đề:** Phân loại và Định vị (Classification and Localization)
**Nội dung:**
*   **Mở rộng bài toán:** Không chỉ phân loại ảnh chứa gì, mà còn phải xác định vị trí của đối tượng đó trong ảnh bằng một hộp giới hạn (Bounding box).
*   **Bài toán Hồi quy (Regression task):** Việc định vị được xem là một tác vụ hồi quy.
*   **Đầu ra dự đoán:** Mạng cần dự đoán 4 giá trị số để tạo thành hộp giới hạn: tọa độ ngang và dọc của tâm đối tượng, cùng với chiều cao và chiều rộng của nó.
*   Mô hình được thêm một lớp Dense thứ hai (gồm 4 nơ-ron) song song với lớp phân loại và thường được huấn luyện bằng hàm mất mát MSE (Sai số toàn phương trung bình).

---

**Slide 4**
**Tiêu đề:** Đánh giá vị trí: Chỉ số IoU (Intersection over Union)
**Nội dung:**
*   **Vấn đề:** Mặc dù MSE tốt cho việc huấn luyện, nhưng nó không phải là thước đo tốt nhất để đánh giá độ chính xác thực tế của hộp giới hạn.
*   **Giải pháp - Chỉ số IoU:** Là thước đo phổ biến nhất để đánh giá dự đoán hộp giới hạn.
*   **Công thức:** IoU được tính bằng tỷ lệ giữa **diện tích phần giao nhau** (Overlap/Intersection) của hộp dự đoán và hộp chuẩn (Ground truth), chia cho **diện tích phần hợp nhất** (Union) của hai hộp.
*   Giá trị IoU dao động từ 0 (không giao nhau chút nào) đến 1 (khớp hoàn hảo tuyệt đối).

---

**Slide 5**
**Tiêu đề:** 6.4.2. Phát hiện đối tượng (Object Detection) & Cửa sổ trượt
**Nội dung:**
*   **Phát hiện đối tượng:** Là tác vụ phân loại và định vị *nhiều* đối tượng cùng lúc trong một bức ảnh.
*   **Phương pháp Cửa sổ trượt (Sliding CNN):** Cách tiếp cận truyền thống là lấy một mạng CNN đã được huấn luyện, trượt nó qua các vùng khác nhau của ảnh và đưa ra dự đoán ở mỗi bước.
*   **Dự đoán ở mỗi vùng:** Ở mỗi bước trượt, mạng dự đoán xác suất phân lớp, hộp giới hạn và một **điểm đối tượng (objectness score)**.
*   *Điểm đối tượng* là xác suất ước tính cho biết thực sự có một đối tượng nằm ở tâm của vùng đang xét hay không.

**Slide 6**
**Tiêu đề:** Hậu xử lý: Triệt tiêu cực đại cục bộ (Non-max Suppression - NMS)
**Nội dung:**
*   Hạn chế của cửa sổ trượt là hệ thống thường phát hiện cùng một đối tượng nhiều lần ở các vị trí hơi lệch nhau.
*   **Non-max Suppression (NMS)** là kỹ thuật hậu xử lý bắt buộc để loại bỏ các hộp giới hạn (bounding boxes) dư thừa:
    1. Loại bỏ tất cả các hộp có *điểm đối tượng (objectness score)* dưới một ngưỡng cho trước (do mạng tin rằng không có đối tượng ở đó).
    2. Tìm hộp có điểm đối tượng cao nhất, giữ lại nó và loại bỏ tất cả các hộp khác trùng lặp nhiều với nó (ví dụ: giao diện IoU > 60%).
    3. Lặp lại bước 2 cho đến khi không còn hộp nào để loại bỏ.

---

**Slide 7**
**Tiêu đề:** Mạng tích chập hoàn toàn (Fully Convolutional Networks - FCN)
**Nội dung:**
*   **Vấn đề:** Phương pháp cửa sổ trượt truyền thống yêu cầu chạy mạng CNN trượt qua rất nhiều vùng của ảnh, dẫn đến tốc độ rất chậm.
*   **Giải pháp (FCN):** Thay thế các lớp kết nối đầy đủ (Dense Layers) ở đỉnh của mạng CNN bằng các lớp tích chập (Convolutional Layers). Khái niệm này được Jonathan Long và cộng sự giới thiệu năm 2015.
*   **Đặc điểm:** Trong khi lớp Dense yêu cầu kích thước đầu vào cố định, một mạng lưới toàn các lớp tích chập (FCN) có thể xử lý ảnh đầu vào với kích thước bất kỳ.

---

**Slide 8**
**Tiêu đề:** Hiệu quả của FCN trong Phát hiện đối tượng
**Nội dung:**
*   Khi chuyển đổi CNN truyền thống thành FCN, mạng có thể quét toàn bộ bức ảnh lớn **chỉ trong một lần truyền qua (one pass)** thay vì trượt nhiều lần.
*   **Đầu ra dạng lưới (Grid output):** Kết quả của FCN không phải là một véc-tơ 1D mà là một lưới (ví dụ: 8x8), trong đó mỗi ô chứa dự đoán cho một vùng cụ thể của bức ảnh.
*   Mỗi ô trong lưới chứa các con số đại diện cho: Xác suất phân lớp, 1 điểm đối tượng (objectness score), và 4 tọa độ của hộp giới hạn.
*   Cách tiếp cận này hiệu quả và tiết kiệm tính toán hơn rất nhiều so với cửa sổ trượt.

---

**Slide 9**
**Tiêu đề:** Kiến trúc YOLO (You Only Look Once) - Tổng quan
**Nội dung:**
*   YOLO là một trong những kiến trúc phát hiện đối tượng một giai đoạn (single-stage) cực kỳ phổ biến và chính xác, do Joseph Redmon và cộng sự đề xuất năm 2015.
*   **"Nhìn một lần":** Kế thừa sự hiệu quả của FCN, YOLO xử lý toàn bộ hình ảnh chỉ trong một lần chạy, mang lại tốc độ cực nhanh (có thể chạy theo thời gian thực trên video với hơn 50 fps).
*   **Cơ chế chia lưới:** YOLO chia ảnh đầu vào thành một lưới $S \times S$.
*   Mỗi ô lưới chịu trách nhiệm phát hiện đối tượng **nếu tâm của hộp giới hạn** của đối tượng đó nằm ngay trong ô lưới này.

---

**Slide 10**
**Tiêu đề:** Kiến trúc YOLO - Đặc điểm nổi bật
**Nội dung:**
*   **Dự đoán trực tiếp:** Mỗi ô lưới dự đoán các hộp giới hạn (với tọa độ tương đối so với ô lưới đó) và điểm số tin cậy (confidence/objectness score) cùng với xác suất cho từng phân lớp đối tượng.
*   **Ưu điểm:** Thiết kế mạng xương sống (backbone) dựa trên tích chập tối ưu giúp tăng cường tốc độ cực nhanh.
*   **Sự cải tiến:** Các phiên bản YOLO sau này (YOLOv2, v3, v4...) đã tích hợp thêm **hộp mỏ neo (anchor boxes)** kết hợp những ưu tiên về hình dáng (ví dụ: người có hộp dọc, ô tô có hộp ngang) để tăng mạnh độ chính xác, đặc biệt trong việc định vị.

Dưới đây là nội dung chi tiết cho 5 slide cuối cùng của Tiết 3, hoàn thiện toàn bộ giáo án trình chiếu cho Chương 6:

**Slide 11**
**Tiêu đề:** Mạng phát hiện đối tượng hai giai đoạn: Faster R-CNN
**Nội dung:**
*   Là mô hình tiêu biểu cho phương pháp tiếp cận hai giai đoạn (two-stage detector), nổi tiếng với độ chính xác rất cao.
*   **Giai đoạn 1 - Mạng đề xuất vùng (Region Proposal Network - RPN):** Thay vì dùng các thuật toán bên ngoài chậm chạp, Faster R-CNN sử dụng một mạng con tích chập (RPN) hoàn toàn trượt trên bản đồ đặc trưng để dự đoán và đề xuất các hộp giới hạn có khả năng chứa đối tượng nhất,,.
*   **Giai đoạn 2 - Phân loại & Tinh chỉnh:** Các vùng đề xuất (Region of Interest) được trích xuất đặc trưng và đưa qua các lớp kết nối đầy đủ (Fully Connected) để phân loại đối tượng cụ thể và hồi quy tinh chỉnh lại tọa độ hộp giới hạn cho thật chính xác.

---

**Slide 12**
**Tiêu đề:** Mạng phát hiện đối tượng một giai đoạn khác: SSD
**Nội dung:**
*   **SSD (Single Shot MultiBox Detector):** Là một mô hình một giai đoạn có tốc độ tương đương YOLO nhưng thường cho độ chính xác cao hơn, đặc biệt đối với các đối tượng nhỏ.
*   **Dự đoán trên nhiều tỷ lệ (Multiscale Features):** Điểm khác biệt cốt lõi là SSD không chỉ dự đoán trên một bản đồ lưới cuối cùng. Nó thực hiện dự đoán hộp giới hạn và phân lớp trên **nhiều bản đồ đặc trưng ở các kích thước (scale) khác nhau** của mạng CNN,.
*   **Hộp mỏ neo (Anchor boxes):** Kế thừa ý tưởng từ RPN, SSD dùng nhiều hộp mỏ neo với các tỷ lệ khung hình khác nhau tại mỗi vị trí trên lưới để bao quát sự đa dạng về hình dáng của đối tượng.

---

**Slide 13**
**Tiêu đề:** Đánh giá mô hình Phát hiện đối tượng: Chỉ số mAP
**Nội dung:**
*   Khác với bài toán phân lớp ảnh đơn thuần chỉ dùng độ chính xác (Accuracy), bài toán phát hiện đối tượng phức tạp hơn và thường được đánh giá bằng **mAP (Mean Average Precision)**.
*   Một dự đoán chỉ được coi là "Đúng" (True Positive) nếu nó đoán đúng nhãn của đối tượng **VÀ** hộp giới hạn dự đoán khớp với hộp chuẩn (Ground truth) với chỉ số IoU vượt qua một ngưỡng quy định (thường là IoU > 0.5),.
*   **Cách tính:** Tính diện tích dưới đường cong Precision/Recall (gọi là Average Precision - AP) cho từng phân lớp đối tượng riêng biệt, sau đó lấy trung bình cộng (mean) AP của tất cả các lớp.

---

**Slide 14**
**Tiêu đề:** Tổng kết Chương 6 & Tiết 3
**Nội dung:**
*   **Mạng CNN:** Khối xây dựng nền tảng của Deep Learning trong thị giác máy tính, với khả năng trích xuất đặc trưng tự động qua các lớp Tích chập và Gộp.
*   **Học chuyển giao (Transfer Learning):** Giúp tái sử dụng các mô hình khổng lồ để giải quyết bài toán mới với chi phí và dữ liệu thấp.
*   **Phát hiện đối tượng (Object Detection):** Bao gồm cả định vị vị trí (Localization) và phân loại (Classification).
    *   *Mô hình một giai đoạn (YOLO, SSD):* Ưu tiên tốc độ, xử lý trong thời gian thực.
    *   *Mô hình hai giai đoạn (Faster R-CNN):* Ưu tiên độ chính xác cao thông qua cơ chế đề xuất vùng (RPN).

---

**Slide 15**
**Tiêu đề:** Bài tập thực hành: Transfer Learning
**Nội dung:**
*   **Nhiệm vụ:** Xây dựng một ứng dụng nhận diện ảnh cá nhân đơn giản.
*   **Yêu cầu:** 
    *   Sử dụng thư viện TensorFlow/Keras hoặc PyTorch (TorchVision).
    *   Tải một mô hình Pre-trained phổ biến (như VGG16 hoặc ResNet50) đã được huấn luyện sẵn trọng số trên tập dữ liệu ImageNet,.
    *   Tìm và tải 1 hình ảnh bất kỳ từ Internet (con vật, đồ vật, xe cộ,...).
    *   Tiền xử lý ảnh (đổi kích thước về đúng chuẩn của mạng, ví dụ 224x224).
    *   Đưa ảnh qua mạng CNN và in ra màn hình top 3 nhãn phân loại có xác suất cao nhất.