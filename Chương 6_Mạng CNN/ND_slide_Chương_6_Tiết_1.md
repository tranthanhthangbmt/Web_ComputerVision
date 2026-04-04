**Slide 1**
**Tiêu đề:** Chương 6. Mạng CNN
**Tiêu đề phụ:** Tiết 1 - Kiến trúc Mạng CNN và Các kỹ thuật cơ bản
**Nội dung:**
*   6.1. Kiến trúc CNN
*   6.2. Các kỹ thuật cơ bản

---

**Slide 2**
**Tiêu đề:** Hạn chế của Mạng Nơ-ron Truyền thống (ANN) trong Xử lý ảnh
**Nội dung:**
*   **Vấn đề kích thước:** Mạng ANN truyền thống (Fully Connected) hoạt động tốt với ảnh nhỏ, nhưng thất bại với ảnh lớn.
*   **Bùng nổ tham số:** Một bức ảnh nhỏ kích thước 100 × 100 pixel có 10,000 pixel. 
*   Nếu lớp ẩn đầu tiên chỉ có 1,000 nơ-ron, mạng sẽ cần tới **10 triệu kết nối** (trọng số) chỉ cho lớp đầu tiên.
*   **Hệ quả:** Tiêu tốn lượng lớn bộ nhớ, khối lượng tính toán khổng lồ và rất dễ dẫn đến hiện tượng quá khớp (overfitting).

---

**Slide 3**
**Tiêu đề:** Giới thiệu Mạng Nơ-ron Tích chập (CNN)
**Nội dung:**
*   **Cảm hứng sinh học:** CNN bắt nguồn từ nghiên cứu về vỏ não thị giác của con người và động vật.
*   **Vùng cảm nhận cục bộ (Local Receptive Field):** Các nơ-ron sinh học trong vỏ não thị giác chỉ phản ứng với các kích thích thị giác nằm trong một vùng không gian hạn chế.
*   **Giải pháp của CNN:** Giải quyết vấn đề bùng nổ tham số bằng cách sử dụng các **lớp kết nối cục bộ (partially connected layers)** và cơ chế **chia sẻ trọng số (weight sharing)**.

---

**Slide 4**
**Tiêu đề:** Kiến trúc tổng quát của Mạng CNN
**Nội dung:**
*   Một kiến trúc CNN điển hình thường xếp chồng luân phiên các khối cơ bản, kích thước ảnh sẽ thu nhỏ dần nhưng độ sâu (số lượng đặc trưng) sẽ tăng lên.
*   **Các thành phần (lớp) chính**:
    1.  **Lớp tích chập (Convolutional Layers):** Trích xuất đặc trưng.
    2.  **Lớp gộp (Pooling Layers):** Giảm kích thước và tính toán.
    3.  **Lớp kết nối đầy đủ (Fully Connected Layers):** Nằm ở cuối mạng để thực hiện dự đoán (ví dụ: phân loại).

---

**Slide 5**
**Tiêu đề:** Lớp tích chập (Convolutional Layer)
**Nội dung:**
*   Là khối xây dựng quan trọng nhất của mạng CNN.
*   **Kết nối cục bộ:** Nơ-ron không kết nối với toàn bộ pixel của ảnh đầu vào, mà chỉ kết nối với các pixel nằm trong vùng cảm nhận (receptive field) của nó,.
*   **Bộ lọc (Filters/Kernels):** Mạng sử dụng các bộ lọc trượt trên ảnh để nhận diện các đặc trưng như đường thẳng, góc cạnh.
*   **Bản đồ đặc trưng (Feature Map):** Kết quả áp dụng một bộ lọc lên toàn bộ ảnh sẽ tạo ra một bản đồ đặc trưng.
*   **Chia sẻ trọng số:** Tất cả các nơ-ron trong cùng một bản đồ đặc trưng đều sử dụng chung một bộ trọng số và độ lệch (bias), giúp giảm mạnh số lượng tham số cần học,.

**Slide 6**
**Tiêu đề:** Các tham số của Lớp tích chập
**Nội dung:**
*   **Bước trượt (Stride):** Là khoảng cách (số pixel) mà bộ lọc di chuyển sau mỗi lần trượt trên ảnh. 
    *   Bước trượt lớn (>1) giúp giảm nhanh kích thước không gian của bản đồ đặc trưng (giảm chiều) và giảm độ phức tạp tính toán.
*   **Phần đệm (Zero Padding):** Kỹ thuật thêm các viền số 0 xung quanh ảnh đầu vào.
    *   *Mục đích:* Giúp bản đồ đặc trưng đầu ra giữ nguyên được kích thước không gian (chiều cao, chiều rộng) như ảnh đầu vào, tránh việc kích thước ảnh bị thu nhỏ liên tục sau mỗi lớp tích chập.

---

**Slide 7**
**Tiêu đề:** Lớp gộp (Pooling Layer)
**Nội dung:**
*   **Mục tiêu:** Lấy mẫu con (thu nhỏ) ảnh đầu vào, giúp giảm kích thước không gian của bản đồ đặc trưng.
*   **Vai trò quan trọng:** Giảm khối lượng tính toán, tiết kiệm bộ nhớ, và giảm mạnh số lượng tham số cần học, từ đó hạn chế rủi ro quá khớp (overfitting).
*   **Đặc điểm:** Khác với lớp tích chập, các nơ-ron trong lớp gộp **không có trọng số (weights) hay độ lệch (biases)** để học. Nó chỉ tổng hợp các đầu vào bằng một hàm toán học đơn giản (như lấy giá trị lớn nhất hoặc trung bình).

---

**Slide 8**
**Tiêu đề:** Các phép gộp phổ biến
**Nội dung:**
*   **Max Pooling (Gộp tối đa):** Chỉ lấy giá trị lớn nhất trong vùng cảm nhận của bộ lọc.
    *   Là phương pháp phổ biến và hiệu quả nhất hiện nay.
    *   Giữ lại các đặc trưng mạnh nhất (như góc, cạnh), loại bỏ các chi tiết nhiễu, cung cấp tín hiệu rõ ràng cho các lớp tiếp theo.
    *   Tạo ra khả năng bất biến tịnh tiến nhỏ (translation invariance).
*   **Average Pooling (Gộp trung bình):** Lấy giá trị trung bình của tất cả các pixel trong vùng cảm nhận. (Ít được sử dụng hơn Max Pooling trong các kiến trúc hiện đại).

---

**Slide 9**
**Tiêu đề:** Lớp kết nối đầy đủ (Fully Connected Layer / Dense Layer)
**Nội dung:**
*   **Vị trí:** Thường được đặt ở phần cuối cùng của mạng CNN.
*   **Kết nối:** Mỗi nơ-ron được kết nối với tất cả các đầu ra của lớp trước nó (giống hệt mạng ANN truyền thống).
*   **Làm phẳng (Flatten):** Dữ liệu đặc trưng 2D/3D từ các lớp Tích chập và Gộp phía trước bắt buộc phải được làm phẳng thành mảng 1D trước khi đưa vào lớp này.
*   **Chức năng:** Dựa trên các đặc trưng cấp cao đã trích xuất, lớp kết nối đầy đủ thực hiện nhiệm vụ dự đoán cuối cùng (Ví dụ: dùng hàm Softmax ở lớp đầu ra để tính toán xác suất phân loại).

---

**Slide 10**
**Tiêu đề:** 6.2. Các kỹ thuật cơ bản: Hàm kích hoạt (Activation Functions)
**Nội dung:**
*   **Vai trò chung:** Đưa tính phi tuyến tính vào mạng, cho phép mạng lưới học và biểu diễn được các mẫu dữ liệu và mối quan hệ phức tạp.
*   **Hàm ReLU (Rectified Linear Unit):** Có công thức $ReLU(z) = max(0, z)$.
*   **Ưu điểm của ReLU trong CNN:**
    *   Rất nhẹ và tính toán cực kỳ nhanh.
    *   Không bị bão hòa ở các giá trị dương, giúp tránh được lỗi triệt tiêu đạo hàm (vanishing gradients).
    *   Được sử dụng làm hàm kích hoạt mặc định cho hầu hết các lớp ẩn trong mạng học sâu hiện đại vì giúp mạng hội tụ nhanh hơn.

**Slide 11**
**Tiêu đề:** Vấn đề Quá khớp (Overfitting) trong CNN
**Nội dung:**
*   **Đặc điểm của Deep Learning:** Các mạng nơ-ron sâu (như CNN) thường có hàng vạn, thậm chí hàng triệu tham số. 
*   Sự linh hoạt khổng lồ này giúp mạng khớp được các dữ liệu phức tạp, nhưng cũng khiến chúng cực kỳ dễ bị bám vào các nhiễu ngẫu nhiên trong tập huấn luyện,.
*   **Hệ quả:** Mô hình hoạt động rất tốt trên tập huấn luyện nhưng lại đưa ra dự đoán kém (sai lệch) trên dữ liệu thực tế (dữ liệu kiểm tra).
*   **Giải pháp:** Cần áp dụng các kỹ thuật Điều chuẩn (Regularization) để kiểm soát sự phức tạp của mô hình.

---

**Slide 12**
**Tiêu đề:** 6.2. Các kỹ thuật cơ bản: Điều chuẩn (Regularization)
**Nội dung:**
*   **Khái niệm:** Điều chuẩn là việc giới hạn, ràng buộc mô hình để làm nó đơn giản hơn, từ đó giảm thiểu rủi ro quá khớp.
*   **Các kỹ thuật phổ biến trong CNN:**
    *   **Dừng sớm (Early Stopping):** Dừng quá trình huấn luyện khi sai số trên tập xác thực bắt đầu tăng.
    *   **L1 và L2 Regularization (Weight decay):** Thêm một thành phần phạt (penalty) vào hàm mất mát để ép các trọng số giữ ở mức nhỏ,.
    *   **Tăng cường dữ liệu (Data Augmentation):** Tạo thêm các phiên bản dữ liệu huấn luyện bằng cách dịch chuyển, lật ngang, hoặc thay đổi ánh sáng ngẫu nhiên.
    *   **Dropout:** Kỹ thuật phổ biến và hiệu quả nhất hiện nay.

---

**Slide 13**
**Tiêu đề:** Kỹ thuật Dropout
**Nội dung:**
*   **Cơ chế hoạt động:** Tại mỗi bước huấn luyện, mỗi nơ-ron (bao gồm cả nơ-ron đầu vào nhưng luôn trừ nơ-ron đầu ra) có một xác suất $p$ bị "loại bỏ" (dropped out) tạm thời,.
*   Các nơ-ron bị loại bỏ sẽ bị bỏ qua hoàn toàn và đầu ra của chúng bằng 0 trong bước huấn luyện đó,.
*   **Tỷ lệ loại bỏ (Dropout rate - $p$):** Thường được thiết lập trong khoảng từ 10% đến 50%. Đặc biệt đối với mạng CNN, tỷ lệ này thường gần mức 40% – 50%,.
*   **Lưu ý:** Kỹ thuật này chỉ được kích hoạt trong quá trình huấn luyện. Sau khi huấn luyện xong, không có nơ-ron nào bị loại bỏ khi mô hình thực hiện dự đoán,.

---

**Slide 14**
**Tiêu đề:** Tại sao Dropout lại hiệu quả?
**Nội dung:**
*   **Ngăn chặn sự đồng thích nghi (Co-adaptation):** Các nơ-ron không thể dựa dẫm hoàn toàn vào một vài nơ-ron lân cận, chúng buộc phải tự học cách trở nên hữu ích và chú ý đến mọi nơ-ron đầu vào,.
*   **Tăng tính chống chịu:** Mạng trở nên ít nhạy cảm hơn với những thay đổi nhỏ hoặc nhiễu trong dữ liệu đầu vào,.
*   **Hiệu ứng Tổ hợp (Ensemble):** Vì mỗi nơ-ron có thể xuất hiện hoặc vắng mặt, mỗi bước huấn luyện tạo ra một mạng nơ-ron hoàn toàn khác biệt. Kết quả cuối cùng là một mô hình đóng vai trò như sự trung bình của hàng triệu mạng nơ-ron nhỏ hơn,. 
*   Cải thiện độ chính xác tổng quát hóa từ 1% - 2% đối với các mạng hiện đại.

---

**Slide 15**
**Tiêu đề:** Tổng kết Tiết 1
**Nội dung:**
*   **Kiến trúc CNN** giải quyết bài toán bùng nổ tham số của mạng nơ-ron truyền thống bằng cơ chế kết nối cục bộ và chia sẻ trọng số.
*   **Lớp Tích chập (Conv Layer):** Đóng vai trò trích xuất đặc trưng theo cấu trúc phân cấp từ thấp đến cao.
*   **Lớp Gộp (Pooling Layer):** Giảm kích thước không gian, khối lượng tính toán và giảm rủi ro quá khớp.
*   **Lớp Kết nối đầy đủ (FC Layer):** Thực hiện tính toán xác suất phân loại ở cuối mạng.
*   **Hàm ReLU:** Giúp mạng học nhanh hơn và tránh lỗi triệt tiêu đạo hàm.
*   **Dropout & Data Augmentation:** Các kỹ thuật điều chuẩn thiết yếu giúp CNN tổng quát hóa tốt trên dữ liệu mới,.