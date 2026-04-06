**Slide 1**
**Tiêu đề chính:** Chương 7. Một số mô hình Deep Learning cho Thị giác máy tính
**Tiêu đề phụ:** Tiết 3 - Tối ưu hóa cho thiết bị di động & Tổng kết
**Nội dung:**
*   7.2. Mô hình MobileNet (Thiết kế tinh gọn, hiệu năng cao)
*   Tổng kết và Ứng dụng thực tiễn

---

**Slide 2**
**Tiêu đề:** 7.2. Mô hình MobileNet - Bối cảnh & Mục tiêu
**Nội dung:**
*   **Thách thức thực tế:** Các mô hình kinh điển như VGG, ResNet có độ chính xác rất cao nhưng dung lượng khổng lồ và chi phí tính toán (FLOPs) quá lớn, không thể chạy trực tiếp trên thiết bị di động, IoT hay trình duyệt web.
*   **Mục tiêu của MobileNet:** Được Google thiết kế chuyên biệt để trở thành các mô hình "tinh gọn" (streamlined), nhắm tới sự cân bằng tối ưu giữa kích thước nhỏ, tốc độ nhanh (độ trễ thấp) và độ chính xác ở mức chấp nhận được.
*   **Nguyên lý đánh đổi:** Chấp nhận hy sinh một phần nhỏ độ chính xác để giảm thiểu nhiều lần khối lượng tham số và phép toán.

---

**Slide 3**
**Tiêu đề:** Đột phá cốt lõi: Tích chập tách biệt chiều sâu (Depthwise Separable Convolution)
**Nội dung:**
*   MobileNet (cũng như Xception) dựa trên nguyên lý tách rời hoàn toàn việc học các mẫu không gian (spatial patterns) và các mẫu chéo kênh (cross-channel patterns).
*   Thay vì dùng một lớp tích chập tiêu chuẩn tốn kém, quá trình này được chia làm 2 bước độc lập:
    1.  **Tích chập chiều sâu (Depthwise Convolution):** Áp dụng một bộ lọc không gian duy nhất (thường là $3 \times 3$) cho *từng* kênh đầu vào một cách riêng biệt.
    2.  **Tích chập điểm (Pointwise Convolution):** Sử dụng lớp tích chập $1 \times 1$ để kết hợp tuyến tính đầu ra của bước 1 dọc theo chiều sâu (cross-channel).
*   *(Hình ảnh minh họa đề xuất: "Hình 14-20. Lớp tích chập tách biệt chiều sâu" - Nguồn: Tài liệu "Hands-On Machine Learning with Scikit-Learn and PyTorch...", Trang 447).*

---

**Slide 4**
**Tiêu đề:** Hiệu quả của Tích chập tách biệt chiều sâu
**Nội dung:**
*   **Giảm thiểu tham số:** Tích chập tách biệt chiều sâu sử dụng số lượng tham số ít hơn đáng kể so với tích chập tiêu chuẩn (chỉ tăng tuyến tính thay vì bậc hai theo số lượng kênh).
*   **Tiết kiệm phép toán:** Giảm thiểu lượng lớn các phép nhân-cộng (MACs/FLOPs). Khối lượng tính toán giảm khoảng $K^2$ lần (với $K$ là kích thước kernel, ví dụ với kernel $3 \times 3$, khối lượng tính toán giảm khoảng 8 đến 9 lần).
*   **Kết quả MobileNetV1:** Đạt độ chính xác Top-1 trên ImageNet là 70.6% với chỉ 4.2 triệu tham số và 569 triệu MACs (nhỏ hơn và nhanh hơn rất nhiều so với VGG16).

---

**Slide 5**
**Tiêu đề:** Sự tiến hóa: MobileNetV2 và Khối "Thắt cổ chai đảo ngược"
**Nội dung:**
*   **Cải tiến từ V1:** MobileNetV2 (2018) giữ nguyên tích chập tách biệt chiều sâu nhưng bổ sung thêm cấu trúc **Thắt cổ chai đảo ngược (Inverted Residuals)** và **Cổ chai tuyến tính (Linear Bottlenecks)**.
*   **Cơ chế hoạt động của khối (Block) mới:**
    1.  **Mở rộng (Expand):** Dùng tích chập $1 \times 1$ để *tăng* số lượng kênh (ngược với ResNet thường dùng $1 \times 1$ để giảm).
    2.  **Trích xuất (Depthwise):** Dùng tích chập chiều sâu $3 \times 3$ trên không gian kênh đã mở rộng.
    3.  **Thu hẹp (Squeeze):** Dùng tích chập $1 \times 1$ (không có hàm kích hoạt) để nén số kênh lại, sau đó dùng *kết nối tắt (skip connection)* cộng với đầu vào ban đầu.
*   *(Hình ảnh minh họa đề xuất: "Hình 4.13(b) - Building blocks of MobileNetV2" - Nguồn: Tài liệu "Advanced Methods and Deep Learning in Computer Vision", Trang 175).*

---

**Slide 6**
**Tiêu đề:** Các kiến trúc tối ưu khác: CSPNet và EfficientNet
**Nội dung:**
*   **CSPNet (Cross Stage Partial Network):** Tương tự như DenseNet, nhưng kiến trúc này cho phép một phần đầu vào của mỗi khối dày đặc (dense block) được nối thẳng trực tiếp vào đầu ra của khối đó mà không cần đi qua các lớp tính toán bên trong.
*   **EfficientNet:** Áp dụng phương pháp "tăng tỷ lệ hỗn hợp" (compound scaling) một cách có nguyên tắc. Phương pháp này tối ưu hóa đồng thời cả ba yếu tố: chiều sâu (số lớp), chiều rộng (số lượng bộ lọc) và độ phân giải của ảnh đầu vào.
*   **Thành tựu:** EfficientNet đạt hiệu suất vượt trội trên mọi mức độ ngân sách tính toán, hiện vẫn đang nằm trong top những kiến trúc CNN tốt nhất.

---

**Slide 7**
**Tiêu đề:** Tiêu chí Lựa chọn Kiến trúc CNN phù hợp
**Nội dung:**
Giữa vô số kiến trúc CNN, việc lựa chọn phụ thuộc hoàn toàn vào các ưu tiên và ràng buộc của dự án:
*   **Độ chính xác (Accuracy):** Bài toán yêu cầu phân loại với độ tin cậy tối đa hay có thể chấp nhận một sai số nhỏ?
*   **Kích thước mô hình (Model size):** Yếu tố sống còn khi triển khai lên thiết bị di động, IoT hay trình duyệt (nên ưu tiên MobileNet).
*   **Tốc độ suy luận (Inference Speed):** Đòi hỏi tốc độ xử lý nhanh trên CPU hay GPU?
*   *Lưu ý thực tế:* Các mô hình lớn hơn thường chính xác hơn, nhưng không phải lúc nào cũng đúng (ví dụ: EfficientNetB2 nhỏ gọn hơn nhưng lại chính xác hơn InceptionV3). Mạng Inception-v3 nhanh hơn trên CPU, nhưng họ ResNet lại cực kỳ nhanh khi chạy trên GPU.

---

**Slide 8**
**Tiêu đề:** Thư viện Mô hình Tiền huấn luyện (Keras Applications)
**Nội dung:**
*   Thư viện `tf.keras.applications` cung cấp sẵn hàng loạt các kiến trúc CNN kinh điển đã được huấn luyện trước trên tập dữ liệu khổng lồ ImageNet, có thể dễ dàng gọi ra sử dụng.
*   **Các đại diện tiêu biểu trong bộ thư viện (Trích Bảng 14-3):**
    *   **MobileNetV2:** Dung lượng siêu nhỏ (~14MB), tốc độ cực nhanh, độ chính xác Top-5 đạt 90.1%.
    *   **ResNet50V2:** Dung lượng tầm trung (~98MB), cân bằng tốt giữa tốc độ và độ chính xác (Top-5 đạt 93.0%).
    *   **EfficientNetB0 - B7:** Cung cấp dải lựa chọn đa dạng từ nhẹ (29MB) đến rất nặng (256MB), với độ chính xác Top-5 có thể lên tới 97.0%.

---

**Slide 9**
**Tiêu đề:** Triển khai Keras: Gọi mô hình và Cắt bỏ phần đỉnh
**Nội dung:**
*   Trong thực hành, ta có thể khởi tạo các mô hình cơ sở này qua một câu lệnh chuẩn:
    `base_model = ResNet50(weights='imagenet', include_top=False)`.
*   **Tham số `include_top=False`:**
    *   Loại bỏ hoàn toàn các lớp kết nối đầy đủ (Fully Connected) chuyên dùng để phân loại 1.000 đối tượng của ImageNet ở cuối mạng.
    *   Mô hình lúc này chỉ còn lại phần "thân" (backbone), đóng vai trò như một bộ trích xuất đặc trưng thuần túy.
*   **Đóng băng trọng số:** Bằng lệnh `layer.trainable = False`, ta khóa các trọng số đã học để không bị phá hỏng trong quá trình huấn luyện lớp phân loại mới.

---

**Slide 10**
**Tiêu đề:** Kiến trúc CNN làm "Mạng Xương Sống" (Backbone)
**Nội dung:**
*   Các mô hình VGG, ResNet, Inception hay MobileNet hiếm khi chỉ được dùng độc lập để phân loại ảnh.
*   **Ứng dụng cốt lõi:** Chúng được cấy ghép làm **Mạng xương sống (Backbone)** – cung cấp bản đồ đặc trưng (feature maps) chất lượng cao cho các hệ thống thị giác máy tính phức tạp ở phía sau.
*   **Ví dụ định hướng:**
    *   **Phát hiện đối tượng (Object Detection):** Các backbone CNN đóng vai trò quét qua ảnh, cung cấp dữ liệu cho các mạng đề xuất vùng (Faster R-CNN) hoặc mạng dự đoán trực tiếp (YOLO, SSD).
    *   **Phân đoạn ngữ nghĩa (Semantic Segmentation):** Kế thừa đặc trưng từ backbone kết hợp với mạng tích chập hoàn toàn (FCN) để phân loại tới từng pixel.

---

**Slide 11**
**Tiêu đề:** Thực hành: Phân loại ảnh trực tiếp với ResNet50
**Nội dung:**
*   **Gọi mô hình:** Trong Keras, việc tải mô hình cực kỳ đơn giản:
    `model = tf.keras.applications.ResNet50(weights="imagenet")`.
*   **Yêu cầu tiền xử lý:** Cần thay đổi kích thước ảnh đầu vào về đúng chuẩn mà mạng mong đợi (ví dụ: ResNet-50 yêu cầu ảnh kích thước $224 \times 224$ pixel).
*   **Đặc điểm dự đoán:** Mô hình sẽ xuất ra xác suất cho 1.000 lớp của ImageNet. Ngay cả khi đối tượng trong ảnh không thuộc 1.000 lớp này, mô hình vẫn đưa ra những dự đoán hợp lý dựa trên sự tương đồng về đặc trưng (ví dụ: dự đoán "hoa cúc" hoặc "bình hoa" khi đầu vào là "hoa thược dược").

---

**Slide 12**
**Tiêu đề:** Thực hành: Xây dựng cấu trúc Học chuyển giao (Transfer Learning)
**Nội dung:**
*   **Tải mô hình cơ sở (Base Model):** Sử dụng một mạng (như Xception) làm bộ trích xuất đặc trưng và cắt bỏ phần đỉnh:
    `base_model = tf.keras.applications.xception.Xception(weights="imagenet", include_top=False)`
*   **Xây dựng Bộ phân loại mới (Head):**
    *   Thêm lớp `GlobalAveragePooling2D` để lấy trung bình bản đồ đặc trưng, giảm số lượng tham số.
    *   Thêm lớp `Dense` với hàm kích hoạt `softmax` cho số lượng lớp của bài toán mới (`n_classes`).
*   **Kết nối thành mô hình hoàn chỉnh:**
    `model = tf.keras.Model(inputs=base_model.input, outputs=output)`.

---

**Slide 13**
**Tiêu đề:** Thực hành: Quy trình Đóng băng và Tinh chỉnh
**Nội dung:**
*   **Bước 1 (Đóng băng - Freezing):**
    *   Giữ nguyên trọng số mô hình cơ sở (`layer.trainable = False`).
    *   Huấn luyện mô hình với tốc độ học tiêu chuẩn để lớp phân loại mới hội tụ và học được các trọng số cơ bản.
*   **Bước 2 (Tinh chỉnh - Fine-tuning):**
    *   "Mở băng" một số lớp ẩn ở trên cùng của mô hình cơ sở (ví dụ: từ lớp thứ 56 trở lên trong cấu trúc mạng).
    *   **Lưu ý cốt lõi:** Bắt buộc sử dụng tốc độ học (learning rate) cực kỳ nhỏ để mạng điều chỉnh chậm rãi, tránh phá hỏng các đặc trưng trích xuất đã được học từ ImageNet.

---

**Slide 14**
**Tiêu đề:** Xu hướng mới trong Thị giác máy tính: Vision Transformers (ViT)
**Nội dung:**
*   **Sự chuyển dịch kiến trúc:** Mặc dù CNN đã thống trị thị giác máy tính trong suốt thập kỷ qua, từ năm 2020, một kiến trúc mới có tên **Transformers** (vốn tạo ra cuộc cách mạng trong xử lý ngôn ngữ tự nhiên) đã gia nhập lĩnh vực này.
*   **Đại diện tiêu biểu:** Các mô hình như Vision Transformers (ViT), Data-Efficient Image Transformer (DeiT) hay Swin Transformer.
*   **Tiềm năng:** Bằng cơ chế "tự chú ý" (self-attention) xử lý các khối ảnh (patches), kiến trúc này đang đạt hoặc vượt qua các mạng CNN truyền thống trên nhiều điểm chuẩn, hứa hẹn mở ra một chương mới cho xử lý ảnh và video.

---

**Slide 15**
**Tiêu đề:** Tổng kết Chương 7
**Nội dung:**
*   **Dấu ấn các kiến trúc CNN kinh điển:**
    *   **AlexNet & VGG16:** Khẳng định sức mạnh của học sâu và nguyên lý xếp chồng các bộ lọc kích thước nhỏ $3 \times 3$.
    *   **Inception:** Đột phá trong tối ưu hóa không gian mạng với mô-đun đa nhánh và lớp tích chập thắt cổ chai $1 \times 1$.
    *   **ResNet:** Chinh phục bài toán "triệt tiêu đạo hàm" bằng các kết nối tắt (skip connections), mở ra kỷ nguyên mạng siêu sâu.
    *   **MobileNet:** Tinh gọn hóa tài nguyên tính toán bằng lớp tích chập tách biệt chiều sâu, tối ưu cho thiết bị di động.
*   **Triết lý ứng dụng:** Việc huấn luyện mạng từ đầu rất tốn kém; thay vào đó, **Học chuyển giao (Transfer Learning)** từ các mô hình tiền huấn luyện (Pretrained Models) là kỹ thuật "vàng" không thể thiếu khi giải quyết bài toán thực tế.