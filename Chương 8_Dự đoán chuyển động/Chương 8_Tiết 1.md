**Slide 1**
**Tiêu đề:** Chương 8. Dự đoán chuyển động (Motion Estimation)
**Tiêu đề phụ:** Tiết 1 - Giới thiệu & Phép liên kết chuyển đổi
**Nội dung:**
*   Mở đầu về Xử lý Video và Chuyển động.
*   8.1. Phép liên kết chuyển đổi (Translational alignment).

---

**Slide 2**
**Tiêu đề:** Mục tiêu Tiết 1
**Nội dung:**
*   **Mở rộng không gian:** Nắm bắt khái niệm video là sự mở rộng của ảnh tĩnh theo trục thời gian.
*   **Hiểu ứng dụng:** Nhận biết tầm quan trọng của dự đoán chuyển động trong thực tiễn (nén video, ổn định hình ảnh, theo dõi đối tượng).
*   **Mô hình tịnh tiến:** Hiểu cơ chế của phép liên kết chuyển đổi và hàm đánh giá sai số SSD (Sum of Squared Differences).
*   **Giải pháp tối ưu:** Nắm được cách áp dụng khai triển Taylor để giải quyết bài toán tìm kiếm chuyển động ở độ chính xác mức điểm ảnh phụ (sub-pixel).
*   *(Đáp ứng chuẩn đầu ra: CLO1, CLO2, CLO4)*

---

**Slide 3**
**Tiêu đề:** Mở đầu về Xử lý Video và Chuyển động
**Nội dung:**
*   **Video là gì?** Video là sự mở rộng của hình ảnh tĩnh dọc theo trục thời gian. 
*   **Biểu diễn toán học:** Nếu một bức ảnh tĩnh được biểu diễn bằng hàm không gian 2D $f(x,y)$, thì video là một hàm 3D $f(x,y,t)$, mô tả sự thay đổi của điểm ảnh qua từng thời điểm $t$.
*   **Bản chất:** Video thực chất là một chuỗi các khung hình (frames) được thu nhận liên tiếp với các khoảng thời gian đều đặn (thường từ 25-30 khung hình/giây).
*   **Sự khác biệt cốt lõi:** Đặc trưng độc quyền của video so với ảnh tĩnh chính là **thông tin chuyển động (motion information)**.

---

**Slide 4**
**Tiêu đề:** Tầm quan trọng của Dự đoán chuyển động
**Nội dung:**
*   **Nén video (Video Compression):** Loại bỏ sự dư thừa thông tin giữa các khung hình liên tiếp (MPEG/H.264/HEVC), tiết kiệm băng thông và dung lượng lưu trữ.
*   **Ổn định hình ảnh (Video Stabilization):** Loại bỏ rung lắc của camera trong quá trình quay, cải thiện chất lượng hình ảnh.
*   **Theo dõi đối tượng (Object Tracking):** Xác định và bám sát quỹ đạo của đối tượng chuyển động qua các khung hình phục vụ giám sát, xe tự lái.
*   *(Hình ảnh minh họa đề xuất: Hình 4.3 - Trường vector chuyển động toàn cục xếp chồng lên ảnh gốc, thể hiện hướng và vận tốc chuyển động của đối tượng - Nguồn: "3-D Computer Vision", Trang 110)*. Hoặc *(Hình 9.1 - Ví dụ về phân lớp chuyển động và trường luồng quang học - Nguồn: "Computer Vision: Algorithms and Applications", Trang 444)*.

---

**Slide 5**
**Tiêu đề:** 8.1. Phép liên kết chuyển đổi (Translational Alignment)
**Nội dung:**
*   **Bài toán:** Tìm sự dịch chuyển hoặc véc-tơ chuyển động $(u, v)$ để căn chỉnh một bức ảnh (hoặc vùng ảnh) gốc $I_0(x)$ khớp với vị trí của nó trong bức ảnh mục tiêu $I_1(x)$.
*   **Giả định cốt lõi:** Ràng buộc độ sáng không đổi (Brightness constancy constraint) - Điểm ảnh duy trì cường độ sáng giống nhau khi di chuyển giữa hai khung hình.
*   **Hàm mất mát SSD (Sum of Squared Differences):** Đánh giá sai số bằng tổng bình phương sai khác giữa các điểm ảnh: 
    $$E_{SSD}(u) = \sum_{i} [I_1(x_i + u) - I_0(x_i)]^2 = \sum_{i} e_i^2$$
*   Trong đó: $e_i = I_1(x_i + u) - I_0(x_i)$ là sai số dư (residual error).
*   **Mục tiêu:** Tìm véc-tơ $(u, v)$ sao cho giá trị của hàm $E_{SSD}(u)$ là nhỏ nhất.

---

**Slide 6**
**Tiêu đề:** Nhu cầu Tối ưu hóa & Độ chính xác Điểm ảnh phụ (Sub-pixel)
**Nội dung:**
*   **Hạn chế của tìm kiếm toàn cục:** Phương pháp quét mọi vị trí (full search) chỉ ước lượng được chuyển động ở mức số nguyên, thường chậm và thiếu chính xác.
*   **Độ chính xác Sub-pixel:** Các ứng dụng thực tế như ổn định video hay khâu ảnh yêu cầu độ chính xác ở mức điểm ảnh phụ (nhỏ hơn 1 pixel) để đạt kết quả mượt mà.
*   **Giải pháp:** Thay vì tìm kiếm mù quáng, ta sử dụng các phương pháp gia số (incremental methods) để tinh chỉnh dần dự đoán chuyển động.

---

**Slide 7**
**Tiêu đề:** 8.1. Phương pháp Gia số (Incremental Refinement)
**Nội dung:**
*   **Ý tưởng cốt lõi:** Bắt đầu với một dự đoán $u$ ban đầu, thuật toán (tiêu biểu là Lucas-Kanade) thực hiện cập nhật từng bước gia số nhỏ $\Delta u$ để cộng dồn vào chuyển động.
*   **Khó khăn:** Hàm tính độ sáng điểm ảnh là phi tuyến tính, rất khó để tối ưu hóa trực tiếp hàm SSD.
*   **Khai triển Taylor:** Sử dụng chuỗi Taylor bậc 1 để xấp xỉ và tuyến tính hóa hàm độ sáng:
    $I_1(x_i + u + \Delta u) \approx I_1(x_i + u) + J_1(x_i+u)\Delta u$.
*   Trong đó, $J_1$ là vector gradient của ảnh (đạo hàm theo không gian) tại vị trí đó.

---

**Slide 8**
**Tiêu đề:** Tuyến tính hóa Hàm mất mát SSD
**Nội dung:**
*   Khi thay xấp xỉ Taylor vào hàm mất mát SSD ban đầu, ta chuyển bài toán thành dạng bình phương tối thiểu tuyến tính (Linear Least Squares).
*   **Công thức SSD xấp xỉ:**
    $E(u + \Delta u) \approx \sum_i [J_1(x_i + u)\Delta u + e_i]^2$.
*   **Sai số phần dư (Residual error):** 
    $e_i = I_1(x_i + u) - I_0(x_i)$,.
*   **Mục tiêu mới:** Bài toán phức tạp ban đầu giờ đây trở thành việc tìm $\Delta u$ sao cho tổng bình phương sai số tuyến tính này là nhỏ nhất.

---

**Slide 9**
**Tiêu đề:** Phương trình Ràng buộc Độ sáng (Brightness Constancy Constraint)
**Nội dung:**
*   Dạng tuyến tính hóa của bước cập nhật gia số SSD cũng chính là cơ sở cho phương trình kinh điển trong Thị giác máy tính: Phương trình ràng buộc Luồng quang học,.
*   **Phương trình cơ bản:**
    $I_x u + I_y v + I_t = 0$.
*   **Ý nghĩa các thành phần:**
    *   $I_x, I_y$: Đạo hàm không gian của ảnh theo trục X và Y (Gradient).
    *   $I_t$: Đạo hàm thời gian, thể hiện sự thay đổi độ sáng của cùng một điểm ảnh giữa hai khung hình liên tiếp ($e_i$).

---

**Slide 10**
**Tiêu đề:** Giải pháp Tối ưu - Hệ phương trình chuẩn (Normal Equations)
**Nội dung:**
*   Để tìm ra vector $\Delta u$ tối ưu nhằm cực tiểu hóa sai số, thuật toán sẽ giải hệ phương trình chuẩn: $A\Delta u = b$.
*   **Ma trận A (Xấp xỉ Hessian):** Chứa thông tin về cấu trúc gradient của vùng ảnh.
    $A = \begin{bmatrix} \sum I_x^2 & \sum I_x I_y \\ \sum I_x I_y & \sum I_y^2 \end{bmatrix}$.
*   **Vector b (Phần dư trọng số):**
    $b = -\begin{bmatrix} \sum I_x I_t \\ \sum I_y I_t \end{bmatrix}$.
*   **Cơ chế lặp:** Cập nhật vị trí $u \leftarrow u + \Delta u$, tính lại $A$ và $b$, lặp lại quá trình cho đến khi $\Delta u$ đạt mức cực nhỏ (thuật toán hội tụ),.

---

**Slide 11**
**Tiêu đề:** Xử lý chuyển động lớn: Chiến lược Phân cấp
**Nội dung:**
*   **Vấn đề:** Khai triển Taylor và phương pháp gia số (như Lucas-Kanade) chỉ hoạt động tốt và hội tụ với các dịch chuyển rất nhỏ (1-2 pixel). Thuật toán sẽ thất bại nếu đối tượng di chuyển quá nhanh.
*   **Giải pháp:** Sử dụng chiến lược tìm kiếm phân cấp từ thô đến tinh (Hierarchical coarse-to-fine strategy).
*   **Cơ chế:** Xây dựng Kim tự tháp ảnh (Image Pyramid) để giảm độ phân giải. Những chuyển động lớn ở ảnh gốc sẽ biến thành các chuyển động nhỏ (vài pixel) ở các tầng thu nhỏ,.

---

**Slide 12**
**Tiêu đề:** Quy trình Ước lượng Đa độ phân giải (Coarse-to-Fine)
**Nội dung:**
*   **Bước 1 (Mức thô nhất):** Bắt đầu tìm kiếm từ tầng độ phân giải thấp nhất (coarsest level) trên một phạm vi pixel nhỏ để tìm véc-tơ chuyển động tịnh tiến cơ bản.
*   **Bước 2 (Chuyển giao):** Phóng to (upsample) véc-tơ chuyển động vừa tìm được để làm dự đoán ban đầu (seed) cho tầng có độ phân giải cao hơn.
*   **Bước 3 (Tinh chỉnh):** Tại mức chi tiết hơn, dựa trên seed đã có, chỉ cần áp dụng tinh chỉnh gia số (incremental refinement) hoặc tìm kiếm trong phạm vi cực hẹp để đạt độ chính xác điểm ảnh phụ (sub-pixel).
*   Quá trình lặp lại cho đến khi đạt độ phân giải gốc của video.

---

**Slide 13**
**Tiêu đề:** Thách thức: Bài toán Khẩu độ (Aperture Problem)
**Nội dung:**
*   **Định nghĩa:** Sự mơ hồ trong dự đoán chuyển động khi vùng ảnh quan sát (patch) thiếu kết cấu (texture) 2D, ví dụ: vùng ảnh chỉ chứa một đường biên thẳng.
*   **Hệ quả toán học:** Ma trận xấp xỉ Hessian $A$ trong hệ phương trình chuẩn bị suy biến (rank-deficient), xuất hiện giá trị riêng (eigenvalue) gần bằng 0.
*   **Biểu hiện thực tế:** Thuật toán chỉ có thể phục hồi đáng tin cậy thành phần chuyển động *vuông góc* với đường biên, nhưng hoàn toàn "mù" (không thể xác định) đối với chuyển động *dọc theo* đường biên đó.
*   *(Hình minh họa đề xuất: Đồ thị minh họa bài toán khẩu độ - một đường biên nghiêng di chuyển sang phải, nhìn qua một ô cửa sổ tròn nhỏ)*.

---

**Slide 14**
**Tiêu đề:** Các hàm đánh giá sai số thay thế (Robust Metrics)
**Nội dung:**
*   **Hàm SAD (Sum of Absolute Differences):** Tính tổng giá trị tuyệt đối của sai khác điểm ảnh thay vì bình phương. SAD tính toán cực nhanh nên là lựa chọn tiêu chuẩn trong các chuẩn nén video thực tế (MPEG, HEVC),,.
*   **Điểm yếu của SSD:** Việc sử dụng bình phương sai số (Least squares) khiến hệ thống rất nhạy cảm với nhiễu ngoại lai (outliers) hoặc khi xảy ra hiện tượng che khuất (occlusions).
*   **Hàm mất mát cường tráng (Robust error metrics):** Để tăng độ ổn định, người ta sử dụng các hàm penalty như Geman-McClure hoặc L1 norm để triệt tiêu ảnh hưởng của các điểm ảnh lỗi có sai số quá lớn,.

---

**Slide 15**
**Tiêu đề:** Tổng kết Tiết 1 & Mở khóa Tiết 2
**Nội dung:**
*   **Đúc kết Tiết 1:** 
    *   Phép liên kết chuyển đổi giải quyết bài toán tịnh tiến bằng cách cực tiểu hóa SSD/SAD.
    *   Cơ chế Lucas-Kanade khai triển Taylor và giải hệ phương trình chuẩn để đạt độ chính xác sub-pixel,.
    *   Kiến trúc đa độ phân giải (Coarse-to-fine) là chìa khóa để bắt được các chuyển động lớn.
*   **Vấn đề mở đường (Dẫn nhập Tiết 2):** 
    *   Mô hình tịnh tiến $(u, v)$ chỉ mô tả được sự "di chuyển phẳng". Nếu camera xoay góc, phóng to (zoom), hoặc đối tượng biến dạng thì mô hình này hoàn toàn bất lực.
    *   **Tiết 2:** Chúng ta sẽ mở rộng lên các **Mô hình Chuyển động tham số (Parametric Motion)** như Affine và Homography để giải quyết triệt để các chuyển động phức tạp trong không gian.