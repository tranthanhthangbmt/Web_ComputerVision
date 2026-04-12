**Slide 1**
**Tiêu đề:** Chương 8. Dự đoán chuyển động (Motion Estimation)
**Tiêu đề phụ:** Tiết 2 - Chuyển động tham số và Ứng dụng
**Nội dung:**
*   8.2. Chuyển động tham số (Parametric Motion):
    *   Giới hạn của mô hình tịnh tiến.
    *   Các mô hình biến đổi toàn cục (Affine, Homography).
*   Ứng dụng thực tiễn: Ổn định Video (Video Stabilization).

---

**Slide 2**
**Tiêu đề:** Giới hạn của Mô hình tịnh tiến & Nhu cầu Mô hình toàn cục
**Nội dung:**
*   **Hạn chế của mô hình tịnh tiến $(u, v)$:** Chỉ mô tả được sự dịch chuyển phẳng (ngang/dọc) của điểm ảnh, tương đương 2 bậc tự do (DoF).
*   **Thực tế hình ảnh:** Camera trong không gian thực có thể quét (scan), nghiêng (tilt), thu phóng (zoom) hoặc xoay quanh trục. Đối tượng cũng có thể biến dạng đàn hồi.
*   **Giải pháp - Mô hình chuyển động toàn cục (Global Motion):** 
    *   Được định nghĩa bởi một hàm biến đổi không gian có chứa một tập hợp nhỏ các tham số (Parameters) chi phối sự dịch chuyển của toàn bộ điểm ảnh.
*   *(Hình minh họa đề xuất: Hình 4.7 - Các loại chuyển động của camera (Types of camera motion): Scanning, Tilting, Zooming, Translation, Rotation - Nguồn: "3-D Computer Vision", Trang 115).*

---

**Slide 3**
**Tiêu đề:** 8.2. Chuyển động tham số: Biến đổi Affine (6 tham số)
**Nội dung:**
*   **Khái niệm:** Trường chuyển động $x'(x; p)$ được chi phối bởi vector tham số $p$.
*   **Biến đổi Affine (Affine Transformation):** Sử dụng ma trận $2 \times 3$, có 6 bậc tự do (6 DoF).
*   **Công thức toán học:**
    $x' = a_{00}x + a_{01}y + t_x$
    $y' = a_{10}x + a_{11}y + t_y$
*   **Đặc điểm hình học:** 
    *   Bao gồm: Tịnh tiến (Translation), Xoay (Rotation), Thu phóng (Scale) và Kéo xô (Shear).
    *   Bảo toàn các đường thẳng và tính song song của các đường thẳng sau khi biến đổi.

---

**Slide 4**
**Tiêu đề:** 8.2. Chuyển động tham số: Biến đổi Homography (8 tham số)
**Nội dung:**
*   **Biến đổi Phối cảnh / Homography (Projective Transformation):** Hoạt động trên hệ tọa độ đồng nhất (Homogeneous coordinates) với ma trận $3 \times 3$, có 8 bậc tự do (8 DoF).
*   **Công thức toán học:** Biến đổi phi tuyến với phép chia cho chiều sâu.
    $x' = (h_{00}x + h_{01}y + h_{02}) / (h_{20}x + h_{21}y + 1)$
    $y' = (h_{10}x + h_{11}y + h_{12}) / (h_{20}x + h_{21}y + 1)$
*   **Đặc điểm hình học:** 
    *   Đại diện cho: Mặt phẳng di chuyển trong không gian 3D, hoặc camera chỉ xoay tại chỗ (Pure rotation).
    *   Bảo toàn đường thẳng nhưng **không** bảo toàn tính song song (tạo ra hiệu ứng biến dạng góc nhìn/Perspective).
*   *(Hình minh họa đề xuất: Table 2.1 - Hệ thống phân cấp các biến đổi 2D (Translation $\rightarrow$ Rigid $\rightarrow$ Similarity $\rightarrow$ Affine $\rightarrow$ Projective) - Nguồn: "Computer Vision: Algorithms and Applications", Trang 34).*

---

**Slide 5**
**Tiêu đề:** Ứng dụng thực tiễn: Ổn định Video (Video Stabilization)
**Nội dung:**
*   **Mục tiêu:** Loại bỏ sự rung lắc ngẫu nhiên tần số cao của camera (camera shake) trong quá trình quay tay hoặc gắn trên xe, tạo ra video mượt mà.
*   **Cách tiếp cận bằng Chuyển động tham số:**
    *   Thuật toán sẽ liên kết các khung hình để tìm ra **Chuyển động nền toàn cục (Background Motion)**.
    *   Thường sử dụng mô hình Affine hoặc Similarity (4 tham số: tịnh tiến, xoay, zoom) để ước lượng.
*   **Thách thức cốt lõi:** Thuật toán phải "khóa" (lock) đúng vào nền (background), không bị đánh lừa bởi các đối tượng tiền cảnh di chuyển độc lập (independently moving foreground objects).
*   *(Hình minh họa đề xuất: Các bước của ổn định video: Ước lượng chuyển động $\rightarrow$ Làm mượt chuyển động (trừ đi thành phần rung lắc) $\rightarrow$ Warping/Biến đổi lại hình ảnh).*

---

**Slide 6**
**Tiêu đề:** Ước lượng Chuyển động Tham số bằng Lucas-Kanade
**Nội dung:**
*   **Mở rộng thuật toán:** Thay vì tìm một véc-tơ tịnh tiến duy nhất $u$, ta tìm tập tham số $p$ chi phối trường chuyển động biến đổi không gian $x'(x; p)$.
*   **Cập nhật gia số (Incremental update):** Áp dụng khai triển Taylor tương tự mô hình tịnh tiến để tìm lượng tinh chỉnh nhỏ $\Delta p$.
*   **Công thức hàm mất mát:**
    $E(p + \Delta p) \approx \sum_i [I_1(x'_i) + J_1(x'_i)\Delta p - I_0(x_i)]^2$.
*   **Đặc điểm:** Yêu cầu tính toán Jacobian $J_1(x'_i)$ (đạo hàm của ảnh theo các tham số chuyển động) tại mỗi bước lặp.

---

**Slide 7**
**Tiêu đề:** Phương pháp Thành phần (Compositional Approach)
**Nội dung:**
*   **Khó khăn:** Tính toán Jacobian cho các chuyển động phức tạp (như Homography) đòi hỏi chi phí tính toán rất lớn và phải thực hiện lại ở mỗi bước lặp.
*   **Giải pháp (Szeliski & Shum, 1997):** 
    *   Đầu tiên, biến đổi (warp) toàn bộ ảnh mục tiêu $I_1$ dựa trên dự đoán chuyển động $p$ hiện tại: $\tilde{I}_1(x) = I_1(x'(x; p))$.
    *   Sau đó, so sánh trực tiếp ảnh đã biến đổi $\tilde{I}_1(x)$ với ảnh gốc (template) $I_0(x)$.
*   **Lợi ích:** Cho phép tính toán trước (tiền tính toán) ma trận Hessian $A$, giúp thuật toán tối ưu tham số chạy cực kỳ nhanh và ổn định.

---

**Slide 8**
**Tiêu đề:** Đi sâu: 3 Giai đoạn của Ổn định Video (Video Stabilization)
**Nội dung:**
*   **Giai đoạn 1 - Ước lượng chuyển động (Motion Estimation):** Tính toán chuyển động (thường dùng mô hình Similarity: tịnh tiến, xoay, thu phóng) giữa các khung hình liên tiếp.
*   **Giai đoạn 2 - Làm mượt chuyển động (Motion Smoothing):** Tách lọc chuyển động camera thành 2 thành phần:
    *   *Tần số thấp:* Chuyển động quét, xoay có chủ ý của người quay (giữ lại).
    *   *Tần số cao:* Rung lắc ngẫu nhiên, không mong muốn (loại bỏ).
*   **Giai đoạn 3 - Biến đổi ảnh (Image Warping):** Bù trừ các rung lắc tần số cao để kết xuất (render) lại khung hình mượt mà.

---

**Slide 9**
**Tiêu đề:** Thách thức 1: Phân tách Tiền cảnh & Hậu cảnh
**Nội dung:**
*   **Vấn đề:** Ổn định video yêu cầu thuật toán phải "khóa" (lock) chính xác vào **chuyển động nền** (do camera di chuyển tạo ra).
*   **Yếu tố gây nhiễu:** Các đối tượng tiền cảnh di chuyển độc lập (independently moving foreground objects) sẽ đánh lừa thuật toán ước lượng toàn cục.
*   **Giải pháp xử lý:** 
    *   Sử dụng cơ chế loại bỏ nhiễu ngoại lai mạnh mẽ (Robust outlier rejection).
    *   Tính toán chuyển động theo từng khối (blocks) rồi tiến hành khớp lặp lại để loại trừ các khối thuộc về vật thể đang di chuyển.

---

**Slide 10**
**Tiêu đề:** Thách thức 2: Xử lý Vùng biên bị khuyết (Artifacts)
**Nội dung:**
*   **Vấn đề:** Khi thuật toán Warping dịch chuyển và xoay khung hình để bù trừ rung lắc, nó sẽ để lộ ra các vùng viền ảnh màu đen (missing borders) ở các rìa.
*   **Giải pháp xử lý:**
    *   **Phóng to (Zoom-in):** Cắt xén (crop) phần viền và phóng to phần trung tâm lên một chút (cách đơn giản và phổ biến nhất).
    *   **Lấp đầy (Inpainting):** Dùng thuật toán điền khuyết dựa trên ngữ cảnh để tự động "ảo giác" (hallucinate) các phần viền bị mất.
    *   **Mượn điểm ảnh:** Lấy các điểm ảnh sắc nét từ những khung hình lân cận (có ít chuyển động hơn) để bù đắp vào các phần bị mờ.

---

**Slide 11**
**Tiêu đề:** Ổn định Video: Làm mượt chuyển động (Motion Smoothing)
**Nội dung:**
*   **Mục tiêu:** Tính toán một quỹ đạo camera "ảo" mượt mà hơn để thay thế quỹ đạo gốc bị rung lắc.
*   **Kỹ thuật phân tách tần số:** 
    *   *Tần số thấp (Low-frequency):* Đại diện cho chuyển động quét, xoay có chủ ý của người quay (cần được giữ lại).
    *   *Tần số cao (High-frequency):* Đại diện cho rung lắc ngẫu nhiên, không mong muốn (cần được loại bỏ).
*   **Tối ưu hóa L1:** Các thuật toán hiện đại thường sử dụng phương pháp cực tiểu hóa L1 (L1 minimization) cho các đạo hàm chuyển động để mô phỏng chính xác các quỹ đạo camera chuyên nghiệp (như di chuyển tuyến tính hoặc khóa góc máy).

---

**Slide 12**
**Tiêu đề:** Ổn định Video: Xử lý Nhòe chuyển động (Motion Blur)
**Nội dung:**
*   **Vấn đề:** Khi camera bị rung lắc mạnh và nhanh, thời gian phơi sáng của cảm biến sẽ khiến các khung hình bị nhòe (motion blur). Quá trình làm mượt quỹ đạo sẽ làm lộ rõ các khung hình nhòe này, gây khó chịu cho người xem.
*   **Giải pháp xử lý:**
    *   **Khử nhòe (Deblurring):** Sử dụng các thuật toán khôi phục ảnh để giảm độ mờ trực tiếp trên khung hình.
    *   **"Mượn" điểm ảnh (Pixel Stealing):** Hệ thống sẽ tự động tìm kiếm và "mượn" các điểm ảnh sắc nét từ những khung hình lân cận (những lúc camera ít di chuyển hoặc lấy nét tốt hơn) để thay thế vào vùng bị nhòe.

---

**Slide 13**
**Tiêu đề:** Thách thức nâng cao: Hiệu ứng Màn trập cuộn (Rolling Shutter)
**Nội dung:**
*   **Nguyên nhân:** Đa số camera điện thoại dùng cảm biến CMOS có cơ chế "màn trập cuộn" (lưu dữ liệu từng hàng pixel theo thứ tự thời gian). Khi rung lắc nhanh, các hàng pixel bị lệch thời gian, gây ra hiện tượng méo hình, nghiêng ngả như thạch (jello effect / wobble).
*   **Hệ quả:** Chuyển động toàn cục (như Affine/Homography) tính toán trên toàn khung hình không thể bù trừ được độ biến dạng phi tuyến tính này.
*   **Hướng giải quyết:** Đòi hỏi các mô hình ước lượng luồng quang học ở mức độ từng điểm ảnh (per-pixel), hoặc kết hợp dữ liệu từ cảm biến con quay hồi chuyển (IMU) để nội suy và nắn chỉnh lại biến dạng,.

---

**Slide 14**
**Tiêu đề:** Đánh giá Mô hình Chuyển động Tham số (Parametric Motion)
**Nội dung:**
*   **Ưu điểm:**
    *   Sử dụng rất ít tham số (6 cho Affine, 8 cho Homography), giúp tính toán nhanh và dễ dàng hội tụ.
    *   Mô tả cực kỳ hiệu quả các chuyển động toàn cục của camera (xoay, thu phóng, quét ngang).
*   **Nhược điểm:**
    *   Thường phải giả định cảnh vật nằm trên một mặt phẳng hoặc ở rất xa camera.
    *   Hầu hết các chuyển động trong thực tế là quá phức tạp so với mô hình tham số chiều thấp. Mô hình này bất lực trước các vật thể biến dạng mềm/đàn hồi (non-rigid deformations) như nụ cười trên khuôn mặt, mặt nước gợn sóng, hay quần áo bay trong gió.

---

**Slide 15**
**Tiêu đề:** Tổng kết Tiết 2 & Mở khóa Tiết 3
**Nội dung:**
*   **Đúc kết Tiết 2:** 
    *   Mô hình chuyển động tham số (Affine, Homography) giúp chúng ta thoát khỏi giới hạn của phép tịnh tiến để ước lượng các biến đổi không gian phức tạp hơn.
    *   Ứng dụng đỉnh cao của nó là khả năng "khóa" chuyển động nền để tạo ra hệ thống Ổn định Video (Video Stabilization) tự động.
*   **Vấn đề mở đường (Dẫn nhập Tiết 3):** 
    *   Làm thế nào để máy tính ước lượng được chuyển động của một vật thể biến dạng đàn hồi mà các mô hình toàn cục đã thất bại?
    *   **Tiết 3:** Chúng ta sẽ chia nhỏ bức ảnh và sử dụng mạng lưới điểm điều khiển (Control Vertices) trong **Chuyển động dạng Spline (Spline-based Motion)** để mô phỏng chính xác sự co giãn cục bộ của mọi điểm ảnh,.