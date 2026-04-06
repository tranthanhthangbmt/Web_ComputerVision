**Slide 1**
**Tiêu đề chính:** Chương 7. Một số mô hình Deep Learning cho Thị giác máy tính
**Tiêu đề phụ:** Tiết 1 - Sự khởi đầu và sức mạnh của độ sâu mạng
**Nội dung:**
* 7.4. Mô hình AlexNet (Cột mốc lịch sử)
* 7.1. Mô hình VGG16 (Sức mạnh của sự đơn giản)

---

**Slide 2**
**Tiêu đề:** Bối cảnh: Kỷ nguyên của các Mô hình Tiền huấn luyện (Pretrained Models)
**Nội dung:**
* **Cuộc thi ILSVRC (ImageNet):** Thử thách phân loại 1.000 lớp đối tượng trên tập dữ liệu hàng triệu hình ảnh lớn.
* **Sự bứt phá:** Trong 6 năm, tỷ lệ lỗi (top-5) của bài toán phân loại ảnh giảm mạnh từ hơn 26% xuống dưới 2,3% nhờ sự tiến hóa của CNN.
* **Ý nghĩa thực tiễn:** Các mô hình chiến thắng cuộc thi này đã trở thành kiến trúc nền tảng. Thay vì huấn luyện từ đầu, chúng được tái sử dụng rộng rãi làm bộ trích xuất đặc trưng thông qua kỹ thuật **Học chuyển giao (Transfer Learning)**.

---

**Slide 3**
**Tiêu đề:** 7.4. Mô hình AlexNet (2012)
**Nội dung:**
* **Tác giả:** Alex Krizhevsky, Ilya Sutskever và Geoffrey Hinton.
* **Thành tựu:** Vô địch ILSVRC 2012 với tỷ lệ lỗi áp đảo 17% (đối thủ thứ 2 là 26%).
* **Đặc điểm kiến trúc:**
  * Kế thừa cấu trúc mạng LeNet-5 cổ điển nhưng với quy mô lớn hơn và sâu hơn nhiều.
  * **Bước ngoặt:** Là kiến trúc đầu tiên **xếp chồng trực tiếp các lớp tích chập** lên nhau, thay vì bắt buộc xen kẽ một lớp gộp (pooling) sau mỗi lớp tích chập.
* *(Hình ảnh minh họa đề xuất: "Bảng 14-2. Kiến trúc AlexNet" - Nguồn: Tài liệu "CHƯƠNG 14. THỊ GIÁC MÁY TÍNH CHUYÊN SÂU SỬ DỤNG MẠNG NƠ-RON TÍCH CHẬP", Trang 17-18).*

---

**Slide 4**
**Tiêu đề:** Các kỹ thuật đột phá trong AlexNet
**Nội dung:**
* **Tránh bão hòa Gradient:** Sử dụng hàm kích hoạt **ReLU** thay cho Sigmoid hay Tanh.
* **Kỹ thuật giảm Quá khớp (Overfitting):**
  * **Dropout:** Áp dụng tỷ lệ loại bỏ 50% trong quá trình huấn luyện tại các lớp kết nối đầy đủ (F9, F10).
  * **Tăng cường dữ liệu (Data Augmentation):** Tạo thêm dữ liệu bằng cách dịch chuyển, lật ngang ảnh và thay đổi điều kiện ánh sáng.
* **Chuẩn hóa phản hồi cục bộ (LRN):** Tạo sự kích hoạt cạnh tranh giữa các nơ-ron, giúp các bản đồ đặc trưng chuyên biệt hóa và cải thiện tính tổng quát.
* *(Hình ảnh minh họa đề xuất: "Hình 14-13. Tạo các phiên bản huấn luyện mới từ các phiên bản hiện có (Data Augmentation)" - Nguồn: Tài liệu "CHƯƠNG 14. THỊ GIÁC MÁY TÍNH CHUYÊN SÂU SỬ DỤNG MẠNG NƠ-RON TÍCH CHẬP", Trang 18-19).*

---

**Slide 5**
**Tiêu đề:** 7.1. Mô hình VGGNet (2014)
**Nội dung:**
* **Tác giả:** Karen Simonyan và Andrew Zisserman (Nhóm VGG, Đại học Oxford).
* **Thành tựu:** Á quân thử thách ILSVRC 2014.
* **Đặc điểm kiến trúc:**
  * Sở hữu kiến trúc cổ điển, cực kỳ đơn giản và mạch thẳng.
  * Xếp chồng liên tiếp 2 hoặc 3 lớp tích chập rồi mới đến 1 lớp gộp (đạt độ sâu 16 hoặc 19 lớp).
  * **Điểm nhấn:** Chỉ sử dụng các bộ lọc (kernel) kích thước rất nhỏ **$3 \times 3$**, nhưng sử dụng **số lượng bộ lọc rất lớn**.
  * **Ứng dụng:** Là mạng trích xuất đặc trưng cực kỳ mạnh mẽ và phổ biến trong Transfer Learning dù khối lượng tính toán lớn.

---
**Slide 6**
**Tiêu đề:** Phân tích chi tiết Kiến trúc VGG16
**Nội dung:**
* **Tổng số lớp:** Bao gồm 16 lớp có trọng số, bao gồm 13 lớp tích chập (Convolutional) và 3 lớp kết nối đầy đủ (Fully Connected).
* **Cấu trúc dạng khối (Blocks):** Kiến trúc được chia làm 5 khối chính. Các lớp tích chập liên tiếp nhau được nhóm thành một khối, kết thúc mỗi khối là một lớp gộp tối đa (Max Pooling) $2 \times 2$ với stride 2 để giảm một nửa kích thước không gian,.
* **Sự gia tăng bộ lọc:** Số lượng kênh (filters) được nhân đôi sau mỗi lớp gộp, bắt đầu từ 64 ở khối đầu tiên và tăng dần lên 128, 256, đến 512 ở các lớp sâu nhất, giúp tăng cường khả năng trích xuất đặc trưng phức tạp,.
* *(Hình ảnh minh họa đề xuất: Sơ đồ các khối kiến trúc tuần tự của VGG16).*

---

**Slide 7**
**Tiêu đề:** Sức mạnh của bộ lọc nhỏ $3 \times 3$ trong VGG
**Nội dung:**
* **Khác biệt cốt lõi:** VGG từ bỏ hoàn toàn các bộ lọc kích thước lớn (như $11 \times 11$ hay $5 \times 5$ từng tạo nên thành công của AlexNet), mạng chỉ sử dụng duy nhất các bộ lọc nhỏ $3 \times 3$.
* **Tối ưu hóa "Vùng cảm nhận" (Receptive Field):** Việc xếp chồng hai lớp tích chập $3 \times 3$ sẽ tạo ra vùng cảm nhận tương đương một lớp $5 \times 5$; xếp chồng ba lớp $3 \times 3$ tương đương một lớp $7 \times 7$.
* **Tăng cường tính phi tuyến:** Việc sử dụng nhiều lớp tích chập nhỏ liên tiếp cho phép chèn thêm nhiều hàm kích hoạt (ReLU) hơn, giúp mạng học được các biểu diễn phức tạp mang tính phân biệt cao hơn so với dùng một lớp tích chập lớn.
* **Giảm tham số:** Cách làm này cũng giúp giảm số lượng trọng số cần huấn luyện so với việc dùng một bộ lọc kích thước lớn tương đương.

---

**Slide 8**
**Tiêu đề:** Thách thức của VGG: Bùng nổ Tham số và Tính toán
**Nội dung:**
* **Khối lượng tham số khổng lồ:** Mạng VGG-16 có khoảng **138 triệu tham số**, lớn hơn gấp đôi so với AlexNet (~60 triệu),. Phần lớn số trọng số này tập trung ở các lớp kết nối đầy đủ (FC) cuối mạng.
* **Chi phí tính toán cao:** Đòi hỏi tới 15.3 tỷ phép toán (MACs) cho mỗi lần dự đoán, gây khó khăn lớn cho việc triển khai trên các thiết bị yếu hoặc yêu cầu thời gian thực.
* **Độ khó trong huấn luyện:** Với cấu trúc quá sâu, mạch thẳng, mạng gặp khó khăn khi hội tụ. Nhóm tác giả ban đầu phải áp dụng "huấn luyện hai bước": huấn luyện mạng nông trước, lấy trọng số đó khởi tạo cho mạng sâu hơn để tránh hiện tượng bất ổn gradient,.

---

**Slide 9**
**Tiêu đề:** So sánh sự tiến hóa: AlexNet và VGG16
**Nội dung:**
* **Quy mô độ sâu:** Tiến hóa từ 8 lớp (AlexNet) lên tới 16 lớp (VGG16), minh chứng rõ ràng cho nguyên lý "mạng càng sâu, khả năng biểu diễn càng tốt",.
* **Chiến lược Kernel:** Chuyển từ việc dùng các bộ lọc đa dạng, kích thước lớn ($11 \times 11$, $5 \times 5$) sang cấu trúc đồng nhất hoàn toàn với các kernel siêu nhỏ ($3 \times 3$),.
* **Tỷ lệ lỗi (ImageNet Top-5):** Giảm mạnh từ mức 17% (AlexNet - vô địch 2012) xuống chỉ còn 6.8% (VGG - á quân 2014),.
* **Dấu ấn kiến trúc:** VGG16 định hình lại cách thiết kế CNN hiện đại, tiên phong trong thiết kế mạng dạng "khối" (block) đồng nhất và ưu tiên xếp chồng các kernel nhỏ.

---

**Slide 10**
**Tiêu đề:** Ứng dụng thực tiễn của VGG: "Bộ trích xuất đặc trưng" hoàn hảo
**Nội dung:**
* Dù cấu trúc rất nặng và không giành ngôi vô địch ILSVRC 2014 (thua GoogLeNet), VGG16 lại sở hữu sức sống bền bỉ và độ phổ biến vượt trội trong cộng đồng thị giác máy tính,.
* **Sức mạnh tổng quát hóa:** Các đặc trưng (features) trích xuất từ các lớp sâu của VGG được chứng minh là vô cùng mạnh mẽ, ổn định (robust) và dễ dàng thích ứng với rất nhiều loại tập dữ liệu ảnh khác nhau.
* **Nền tảng của Transfer Learning (Học chuyển giao):** VGG16 trở thành "mạng xương sống" (backbone) tiêu chuẩn trong nhiều năm liền cho các bài toán thị giác phức tạp hơn như Phân đoạn ngữ nghĩa (Semantic Segmentation) hay Phát hiện đối tượng (Object Detection),.

------

**Slide 11**
**Tiêu đề:** Ứng dụng VGG16 và AlexNet: Tiền huấn luyện (Pretraining)
**Nội dung:**
* **Mô hình tiền huấn luyện:** VGG16 và AlexNet khi được huấn luyện trên tập dữ liệu khổng lồ (như ImageNet) sẽ học được các bộ phát hiện đặc trưng (Feature Detectors) cực kỳ mạnh mẽ.
* **Tính phân cấp đặc trưng:** Các lớp thấp học cấu trúc cơ bản (góc, cạnh, màu sắc), trong khi các lớp cao học các đặc trưng phức tạp mang tính đặc thù của đối tượng.
* **Tái sử dụng (Keras Applications):** Các thư viện như Keras cung cấp sẵn kiến trúc VGG16 với bộ trọng số đã được huấn luyện, cho phép tái sử dụng trực tiếp mà không cần huấn luyện lại từ đầu.

---

**Slide 12**
**Tiêu đề:** Triển khai Transfer Learning với VGG16
**Nội dung:**
* **Tải mô hình cơ sở (Base Model):** Gọi mô hình VGG16 và cấu hình tải trọng số chuẩn (`weights="imagenet"`).
* **Loại bỏ phần đầu (include_top=False):** Bỏ qua các lớp kết nối đầy đủ (Fully Connected) ở đỉnh mạng (vốn dùng để phân loại 1.000 lớp ImageNet), chỉ giữ lại phần trích xuất đặc trưng,.
* **Thiết kế Đầu (Head) phân loại mới:**
  * Thêm lớp `GlobalAveragePooling2D` (hoặc `Flatten`) để chuyển đổi bản đồ đặc trưng thành mảng 1D,.
  * Thêm lớp `Dense` với số nơ-ron bằng số lớp của bài toán hiện tại, sử dụng hàm kích hoạt `softmax` để xuất ra xác suất.
* *(Hình ảnh minh họa đề xuất: Sơ đồ nối "Base Model" với "Head" mới - Nguồn: Có thể trích từ sơ đồ 6.3.1 Khái niệm Học chuyển giao).*

---

**Slide 13**
**Tiêu đề:** Kỹ thuật Đóng băng trọng số (Freezing Layers)
**Nội dung:**
* **Khái niệm:** Trong giai đoạn đầu, cần thiết lập để trọng số của các lớp trong mô hình cơ sở (VGG16) không bị thay đổi.
* **Mã lệnh Keras:** `layer.trainable = False` áp dụng cho các lớp thuộc `base_model`.
* **Mục đích cốt lõi:**
  * Giữ nguyên vẹn "tri thức" trích xuất đặc trưng đã học được từ tập dữ liệu khổng lồ.
  * Thuật toán hạ gradient (Gradient Descent) sẽ chỉ tập trung cập nhật các trọng số mới được khởi tạo ngẫu nhiên ở lớp phân loại (Head) trên cùng.
  * Giúp mạng hội tụ nhanh chóng và tránh hiện tượng quá khớp (overfitting).

---

**Slide 14**
**Tiêu đề:** Kỹ thuật Tinh chỉnh (Fine-Tuning)
**Nội dung:**
* **Khái niệm:** Sau khi lớp phân loại mới đã học được các trọng số cơ bản, ta tiến hành "mở băng" (unfreeze) một vài lớp tích chập ở tầng cao của VGG16 và tiếp tục huấn luyện.
* **Mục đích:** Cho phép các bộ lọc đặc trưng cấp cao tự điều chỉnh để thích ứng sâu hơn với những đặc thù (chi tiết hình ảnh) của tập dữ liệu mới.
* **Lưu ý cực kỳ quan trọng:** Bắt buộc phải **giảm tốc độ học (learning rate)** xuống mức rất nhỏ khi tinh chỉnh, nhằm tránh phá hủy các trọng số tinh tế đã được mượn từ mô hình tiền huấn luyện,.

---

**Slide 15**
**Tiêu đề:** Tổng kết Tiết 1
**Nội dung:**
* **AlexNet (2012):** Cột mốc khởi đầu kỷ nguyên Deep Learning hiện đại, khẳng định sức mạnh của kiến trúc CNN sâu kết hợp hàm kích hoạt ReLU và kỹ thuật Dropout,.
* **VGG16 (2014):** Tiên phong trong thiết kế mạng dạng khối đồng nhất, chứng minh sức mạnh biểu diễn của việc xếp chồng liên tiếp các bộ lọc siêu nhỏ $3 \times 3$.
* **Giá trị thực tiễn:** Dù có khối lượng tính toán lớn, VGG16 vẫn là mạng nền tảng (backbone) kinh điển, sở hữu các đặc trưng cực kỳ ổn định, là lựa chọn hoàn hảo cho phương pháp Học chuyển giao.
* **Hành trình tiếp theo (Tiết 2):** Khám phá sự đột phá về thiết kế đa tỷ lệ (Inception V3) và giải quyết triệt tiêu đạo hàm cho mạng cực sâu (ResNet).