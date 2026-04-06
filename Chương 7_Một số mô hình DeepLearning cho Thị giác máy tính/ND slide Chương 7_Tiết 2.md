**Slide 1**
**Tiêu đề chính:** Chương 7. Một số mô hình Deep Learning cho Thị giác máy tính
**Tiêu đề phụ:** Tiết 2 - Mở rộng chiều ngang và Đột phá chiều sâu
**Nội dung:**
* 7.4. Mô hình Inception V3 / GoogLeNet (Tối ưu hóa đa tỷ lệ)
* 7.3. Mô hình ResNet (Giải quyết bài toán mạng cực sâu)

---

**Slide 2**
**Tiêu đề:** 7.4. Mô hình GoogLeNet (2014) - Bối cảnh & Thành tựu
**Nội dung:**
* **Tác giả:** Christian Szegedy và cộng sự từ Google Research.
* **Thành tựu:** Giành chiến thắng tại thử thách ILSVRC 2014, giảm tỷ lệ lỗi top-5 xuống dưới 7%.
* **Đặc điểm kiến trúc đột phá:** 
  * Mạng sâu hơn rất nhiều so với các kiến trúc trước đó (như AlexNet hay VGG).
  * **Sử dụng tham số cực kỳ hiệu quả:** GoogLeNet có số lượng tham số ít hơn 10 lần so với AlexNet (khoảng 6 triệu tham số thay vì 60 triệu), dù độ sâu lớn hơn rất nhiều.

---

**Slide 3**
**Tiêu đề:** Mô-đun Inception: Đột phá mở rộng chiều ngang
**Nội dung:**
* Thay vì chỉ chọn một kích thước bộ lọc cho mỗi lớp, GoogLeNet áp dụng nhiều bộ lọc song song.
* **Cấu trúc đa đường (Multi-path):** Tín hiệu đầu vào được đưa qua 4 lớp song song bao gồm các tích chập với kích thước kernel khác nhau ($1 \times 1, 3 \times 3, 5 \times 5$) và một lớp gộp cực đại (Max pool).
* **Nắm bắt đa tỷ lệ:** Thiết kế này cho phép mạng nắm bắt các mẫu (patterns) hình ảnh ở nhiều tỷ lệ khác nhau tại cùng một cấp độ trong mạng.
* **Nối theo chiều sâu:** Các bản đồ đặc trưng (feature maps) từ 4 nhánh sau đó được xếp chồng (nối) lại với nhau dọc theo chiều sâu.
* *(Hình ảnh minh họa đề xuất: "Hình 14-14. Mô-đun Inception" - Nguồn: Tài liệu "CHƯƠNG 14. THỊ GIÁC MÁY TÍNH CHUYÊN SÂU...", Trang 20)*.

---

**Slide 4**
**Tiêu đề:** Sức mạnh của Lớp Tích chập $1 \times 1$ (Lớp thắt cổ chai)
**Nội dung:**
Mô-đun Inception chèn thêm các lớp tích chập $1 \times 1$ trước các lớp $3 \times 3$ và $5 \times 5$. Chúng phục vụ 3 mục đích cốt lõi:
* **Lớp thắt cổ chai (Bottleneck):** Giúp giảm số lượng bản đồ đặc trưng (giảm chiều), từ đó cắt giảm đáng kể chi phí tính toán và số lượng tham số, tăng tốc độ huấn luyện.
* **Nắm bắt mẫu chéo kênh:** Dù không nắm bắt các mẫu không gian, kernel $1 \times 1$ giúp nhận diện các mẫu dọc theo chiều sâu (xuyên qua các kênh màu/đặc trưng).
* **Tăng tính phi tuyến:** Sự kết hợp các lớp tích chập nhỏ hoạt động như một mạng nơ-ron mạnh mẽ hơn, tăng cường khả năng biểu diễn các mẫu phức tạp.

---

**Slide 5**
**Tiêu đề:** Kiến trúc tổng thể GoogLeNet & Sự tiến hóa (Inception V3)
**Nội dung:**
* **Xếp chồng Inception:** Cấu trúc mạng là một khối cao bao gồm 9 mô-đun Inception xếp chồng lên nhau, xen kẽ các lớp gộp (pooling) để giảm kích thước không gian.
* **Lớp gộp trung bình toàn cục (Global Average Pooling):** Nằm ở cuối mạng thay cho các lớp kết nối đầy đủ khổng lồ (như trong AlexNet). Nó tính trung bình từng bản đồ đặc trưng, giúp loại bỏ lượng lớn tham số và hạn chế rủi ro quá khớp.
* **Bộ phân loại phụ (Auxiliary classifiers):** Được cắm vào giữa mạng để chống lại hiện tượng triệt tiêu đạo hàm và hỗ trợ điều chuẩn.
* **Sự tiến hóa:** Từ kiến trúc GoogLeNet ban đầu, các nhà nghiên cứu đã liên tục cải tiến thành các phiên bản mạnh mẽ hơn như Inception-v2, **Inception-v3**, và Inception-v4.

---

**Slide 6**
**Tiêu đề:** 7.3. Mô hình ResNet (2015) - Mạng Thặng dư
**Nội dung:**
*   **Tác giả:** Kaiming He và cộng sự (Microsoft Research).
*   **Thành tựu:** Vô địch ILSVRC 2015 với tỷ lệ lỗi top-5 dưới 3.6%.
*   **Đặc điểm quy mô:** Đây là kiến trúc cực kỳ sâu. Phiên bản chiến thắng có tới 152 lớp (so với 8 lớp của AlexNet và 22 lớp của GoogLeNet).
*   **Vấn đề cốt lõi giải quyết:** Triệt tiêu đạo hàm (Vanishing Gradients).
    *   Khi mạng càng sâu, tín hiệu gradient truyền ngược (backpropagation) càng trở nên nhỏ bé.
    *   Hệ quả: Các lớp đầu tiên hầu như không thay đổi trọng số, mạng không thể hội tụ.

---

**Slide 7**
**Tiêu đề:** Đột phá kiến trúc: Kết nối tắt (Skip / Shortcut Connections)
**Nội dung:**
*   **Khái niệm:** ResNet giải quyết vấn đề triệt tiêu đạo hàm bằng cách thêm các đường "kết nối tắt". Tín hiệu đầu vào của một lớp được cộng trực tiếp vào đầu ra của một lớp nằm cao hơn trong mạng.
*   **Lợi ích cơ học:**
    *   Tạo ra một "đường cao tốc" cho phép dòng tín hiệu (và đạo hàm) truyền thẳng qua toàn bộ mạng mà không bị suy giảm.
    *   Nếu một số lớp chưa học được gì, tín hiệu vẫn dễ dàng đi qua an toàn thông qua nhánh kết nối tắt.
*   *(Hình ảnh minh họa đề xuất: "Hình 14-17. Mạng nơ-ron sâu thông thường (trái) và mạng dư thừa sâu (phải)" - Nguồn: Tài liệu "CHƯƠNG 14...", Trang 24)*.

---

**Slide 8**
**Tiêu đề:** Khái niệm "Học Thặng dư" (Residual Learning)
**Nội dung:**
*   **Công thức toán học:** Thay vì bắt mạng học trực tiếp một hàm mục tiêu phức tạp $h(x)$, kết nối tắt ép mạng học hàm thặng dư $f(x) = h(x) - x$.
*   **Cơ chế hoạt động:** 
    *   Khi mới khởi tạo, các trọng số thường gần 0. Với kết nối tắt, mạng sẽ trực tiếp xuất ra bản sao của đầu vào $x$ (hoạt động như hàm đồng nhất - identity function).
    *   Nếu hàm mục tiêu thực tế khá gần với hàm đồng nhất, mạng chỉ cần học những "phần dư" (thay đổi nhỏ), giúp quá trình huấn luyện được tăng tốc đáng kể.

---

**Slide 9**
**Tiêu đề:** Cấu trúc của Đơn vị Thặng dư (Residual Unit)
**Nội dung:**
*   Mạng ResNet bản chất là một ngăn xếp rất sâu của các Đơn vị thặng dư (RU).
*   **RU cơ bản (dành cho ResNet-34):**
    *   Gồm hai lớp tích chập $3 \times 3$, kết hợp với Chuẩn hóa theo lô (Batch Normalization) và hàm kích hoạt ReLU.
    *   Không sử dụng lớp gộp (pooling) bên trong khối.
*   **Xử lý lệch kích thước:** Khi số lượng bản đồ đặc trưng nhân đôi, kích thước không gian sẽ bị chia đôi (dùng stride = 2). Lúc này, nhánh kết nối tắt phải đi qua một lớp tích chập $1 \times 1$ với stride = 2 để ép khớp kích thước trước khi cộng.
*   *(Hình ảnh minh họa đề xuất: "Hình 14-19. Kết nối bỏ qua khi thay đổi kích thước..." - Nguồn: Tài liệu "CHƯƠNG 14...")*.

---

**Slide 10**
**Tiêu đề:** Khối "Thắt cổ chai" (Bottleneck Block) cho mạng siêu sâu
**Nội dung:**
*   **Vấn đề:** Với các phiên bản siêu sâu (ResNet-50, ResNet-101, ResNet-152), việc dùng hai lớp $3 \times 3$ liên tiếp sẽ làm bùng nổ số lượng tham số.
*   **Cải tiến cấu trúc (Dùng 3 lớp thay vì 2):**
    *   **Lớp 1 (Tích chập $1 \times 1$):** Giảm số lượng kênh (ví dụ: từ 256 xuống 64), đóng vai trò "thắt cổ chai" để giảm chi phí tính toán.
    *   **Lớp 2 (Tích chập $3 \times 3$):** Trích xuất đặc trưng trên số kênh đã bị thu hẹp.
    *   **Lớp 3 (Tích chập $1 \times 1$):** Phục hồi độ sâu (tăng lại số kênh lên 256) trước khi cộng với kết nối tắt.
*   **Kết quả:** Cho phép mạng đạt độ sâu 152 lớp nhưng vẫn có thể tính toán hiệu quả hơn cả mạng VGG mỏng hơn.


---

**Slide 11**
**Tiêu đề:** Sự kết hợp và Tiến hóa: Inception-v4 & Inception-ResNet
**Nội dung:**
*   **Ý tưởng cốt lõi:** Các nhà nghiên cứu của Google đã kết hợp sức mạnh của hai kiến trúc hàng đầu là GoogLeNet (Inception) và ResNet.
*   **Đặc điểm kiến trúc:** 
    * Tích hợp **mô-đun Inception** (trích xuất đặc trưng đa tỷ lệ hiệu quả) với **các kết nối tắt - skip connections** (giúp luồng gradient truyền mượt mà trong các mạng rất sâu).
*   **Thành tựu:** Kiến trúc Inception-v4 đã đạt được tỷ lệ lỗi top-5 ấn tượng là gần 3% trong bài toán phân loại ImageNet, tối ưu hóa đáng kể tốc độ hội tụ so với việc dùng riêng lẻ từng kiến trúc.

---

**Slide 12**
**Tiêu đề:** Biến thể Xception (Extreme Inception)
**Nội dung:**
*   **Tác giả:** François Chollet (tác giả của thư viện Keras) giới thiệu năm 2016, vượt trội hơn Inception-v3 trên tập dữ liệu hình ảnh khổng lồ.
*   **Đột phá kiến trúc:** Xception thay thế hoàn toàn các mô-đun Inception bằng **lớp tích chập tách biệt chiều sâu (depthwise separable convolution layer)**.
*   **Cơ sở lý thuyết:** Dựa trên giả định mạnh mẽ rằng các mẫu không gian (spatial patterns) và các mẫu chéo kênh (cross-channel patterns) có thể được mô hình hóa hoàn toàn riêng biệt.
*   **Thiết kế:** Mạng bắt đầu bằng 2 lớp tích chập thông thường, sau đó toàn bộ 34 lớp tiếp theo chỉ sử dụng các tích chập tách biệt chiều sâu.

---

**Slide 13**
**Tiêu đề:** Kiến trúc SENet (Mạng Nén và Kích thích - 2017)
**Nội dung:**
*   **Thành tựu:** Là kiến trúc vô địch thử thách ILSVRC 2017 với tỷ lệ lỗi top-5 giảm xuống mức đáng kinh ngạc: **2.25%**.
*   **Cơ chế:** SENet không phải là một kiến trúc độc lập hoàn toàn mà nó mở rộng và tăng cường các mạng hiện có (như Inception và ResNet) để tạo ra các phiên bản **SE-Inception** và **SE-ResNet**.
*   **Khối SE (SE block):** Mạng cắm thêm một mạng nơ-ron nhỏ gọi là khối SE vào mỗi mô-đun Inception hoặc đơn vị dư thừa (RU).
*   **Mục tiêu:** Tập trung phân tích theo chiều sâu của bản đồ đặc trưng để học cách các đặc trưng thường xuất hiện cùng nhau (ví dụ: phát hiện "miệng" thì thường sẽ đi kèm với "Mắt", "Mũi").

---

**Slide 14**
**Tiêu đề:** Cơ chế hoạt động của Khối SE (Squeeze-and-Excitation)
**Nội dung:**
Khối SE bao gồm 3 lớp với hai bước hoạt động chính:
*   **Bước "Nén" (Squeeze):** Sử dụng một lớp gộp trung bình toàn cục (Global Average Pooling) để nén toàn bộ thông tin không gian của mỗi bản đồ đặc trưng thành một vector chiều thấp duy nhất, buộc mạng phải học biểu diễn tổng quát của các kết hợp đặc trưng,.
*   **Bước "Kích thích" (Excitation):** Vector này đi qua các lớp Dense, sử dụng hàm kích hoạt Sigmoid để xuất ra một vector "hiệu chỉnh lại" (recalibration) chứa các giá trị từ 0 đến 1.
*   **Áp dụng:** Các bản đồ đặc trưng gốc được nhân với vector hiệu chỉnh này. Các đặc trưng quan trọng (điểm gần 1) sẽ được **tăng cường**, trong khi các đặc trưng không liên quan sẽ bị **bóp nghẹt** (scale down).
*   *(Hình ảnh minh họa đề xuất: "Hình 14-22. Khối SE thực hiện hiệu chỉnh lại bản đồ đặc trưng" và "Hình 14-23. Kiến trúc khối SE")*.

---

**Slide 15**
**Tiêu đề:** Tổng kết Tiết 2
**Nội dung:**
*   **Inception / GoogLeNet:** Đột phá trong việc sử dụng mô-đun Inception đa nhánh và lớp thắt cổ chai $1 \times 1$ để nắm bắt đặc trưng đa tỷ lệ, giảm thiểu lượng lớn tham số,.
*   **ResNet:** Tạo ra cột mốc lịch sử với khái niệm **học dư thừa (residual learning)** và **kết nối tắt (skip connections)**, giải quyết triệt để lỗi triệt tiêu đạo hàm, cho phép huấn luyện mạng sâu hàng trăm lớp,.
*   **Xception & SENet:** Khẳng định xu hướng tối ưu hóa sức mạnh của CNN thông qua việc phân tách luồng tính toán (tích chập tách biệt) và áp dụng cơ chế tự chú ý lên các kênh (hiệu chỉnh lại đặc trưng),.
*   **Hành trình tiếp theo (Tiết 3):** Tìm hiểu MobileNet - giải pháp kiến trúc tối ưu cho thiết bị di động và các ứng dụng cụ thể như Nhận diện và Phát hiện đối tượng.