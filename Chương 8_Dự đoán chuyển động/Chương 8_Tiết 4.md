**Slide 1**
**Tiêu đề:** Chương 8. Dự đoán chuyển động (Phần 2)
**Tiêu đề phụ:** Tiết 4 - Luồng quang học (Optical Flow)
**Nội dung:**
*   Mục tiêu CĐR: CLO1, CLO2, CLO3, CLO4.
*   8.4. Khái niệm Luồng quang (Optical Flow).
*   Phương trình ràng buộc độ sáng (Brightness Constancy Equation).
*   Giải pháp kinh điển: Lucas-Kanade & Horn-Schunck.
*   Thực hành: Trực quan hóa Luồng quang bằng OpenCV.

---

**Slide 2**
**Tiêu đề:** Đặt vấn đề: Nhu cầu về một Trường chuyển động dày đặc
**Nội dung:**
*   **Nhìn lại các mô hình trước:**
    *   Mô hình tham số (Affine, Homography): Dùng một số ít tham số để đại diện cho chuyển động của *toàn bộ* bức ảnh.
    *   Mô hình Spline: Điều khiển chuyển động bằng một *mạng lưới điểm* (control vertices).
*   **Thực tế phức tạp:** Làm thế nào để mô tả một khung cảnh nơi *mỗi điểm ảnh* (pixel) di chuyển theo một hướng hoàn toàn độc lập (ví dụ: dòng xe cộ đan chéo, lá rụng, người đi bộ)?
*   **Giải pháp:** Tính toán một trường vector vận tốc độc lập cho từng điểm ảnh. Đó chính là bài toán **Luồng quang (Optical Flow)**.

---

**Slide 3**
**Tiêu đề:** 8.4. Khái niệm Luồng quang (Optical Flow)
**Nội dung:**
*   **Định nghĩa:** Luồng quang là trường vector vận tốc biểu diễn sự dịch chuyển (displacement) của mọi điểm ảnh giữa hai khung hình liên tiếp.
*   **Đặc điểm:** 
    *   Tạo ra một trường vector dày đặc (dense field). Đối với ảnh kích thước $H \times W$, luồng quang là một tensor kích thước $(2, H, W)$, chứa các thành phần dịch chuyển dọc và ngang $(u, v)$ cho từng pixel.
*   **Trực quan hóa (Visualization):** 
    *   *Đồ thị Vector (Quiver plot):* Vẽ các mũi tên chỉ hướng và độ lớn.
    *   *Biểu đồ Màu (Color mapping):* Biểu diễn hướng bằng màu sắc (Hue) và độ lớn vận tốc bằng độ bão hòa/độ sáng (Saturation/Value).
*   *(Hình minh họa đề xuất: Hình 9.1 (e, f) - Ảnh mẫu và luồng quang được mã hóa bằng màu sắc - Nguồn: "Computer Vision: Algorithms and Applications", Trang 444)*.

---

**Slide 4**
**Tiêu đề:** Phân biệt: Luồng quang vs. Trường chuyển động
**Nội dung:**
*   **Trường chuyển động (Motion Field):** Là sự dịch chuyển vật lý thực sự của vật thể trong không gian 3D được chiếu lên mặt phẳng ảnh 2D.
*   **Luồng quang (Optical Flow):** Là sự chuyển động *biểu kiến* (apparent motion) của các mô hình độ sáng trên ảnh.
*   **Chúng không phải lúc nào cũng đồng nhất!** (Ảo ảnh thị giác):
    *   *Có chuyển động nhưng không có luồng quang:* Một quả cầu nhẵn hoàn hảo xoay dưới ánh sáng cố định $\rightarrow$ Ảnh không thay đổi $\rightarrow$ Luồng quang bằng 0.
    *   *Có luồng quang nhưng không có chuyển động:* Một quả cầu đứng im nhưng nguồn sáng di chuyển $\rightarrow$ Độ sáng trên ảnh thay đổi $\rightarrow$ Có luồng quang.
*   *(Hình minh họa đề xuất: Hình 7.18 - Quả cầu quay và Nguồn sáng di chuyển, minh họa luồng quang không tương đương với trường chuyển động - Nguồn: "3-D Computer Vision", Trang 227)*.

---

**Slide 5**
**Tiêu đề:** Phương trình Ràng buộc Độ sáng (Brightness Constancy)
**Nội dung:**
*   **Giả định cốt lõi:** Độ sáng của một điểm ảnh (pixel) trên vật thể không thay đổi khi nó di chuyển từ khung hình $t$ sang khung hình $t+dt$:
    $$f(x, y, t) = f(x+dx, y+dy, t+dt)$$
*   **Khai triển Taylor (loại bỏ bậc cao):**
    $$f_x u + f_y v + f_t = 0$$ *(hoặc $I_x u + I_y v + I_t = 0$)*.
*   **Trong đó:**
    *   $f_x, f_y$: Đạo hàm (gradient) không gian của ảnh theo trục X và Y.
    *   $f_t$: Đạo hàm thời gian (sự thay đổi độ sáng giữa 2 khung hình).
    *   $u, v$: Vector vận tốc cần tìm ($dx/dt$, $dy/dt$).
*   **Vấn đề (Bài toán thiếu điều kiện - Ill-posed problem):** Một phương trình tuyến tính nhưng có đến HAI ẩn số $(u, v)$. Không thể giải duy nhất nếu không có thêm các ràng buộc!

---

**Slide 6**
**Tiêu đề:** Thách thức toán học: Bài toán thiếu điều kiện (Ill-posed Problem)
**Nội dung:**
*   **Vấn đề:** Phương trình ràng buộc độ sáng $f_x u + f_y v + f_t = 0$ chỉ cung cấp MỘT phương trình tuyến tính nhưng lại chứa tới HAI ẩn số $(u, v)$ cho mỗi điểm ảnh,.
*   **Đồ thị vận tốc:** Trong không gian vận tốc $(u, v)$, các giá trị nghiệm thỏa mãn phương trình này sẽ tạo thành một đường thẳng vô tận, chứ không phải là một điểm duy nhất.
*   **Hệ quả:** Hệ thống có vô số nghiệm. Bài toán được phân loại là "thiếu điều kiện" (ill-posed / ill-conditioned problem) và hoàn toàn không thể giải chính xác,.
*   **Hướng giải quyết:** Bắt buộc phải bổ sung thêm các giả định hoặc "ràng buộc" (constraints) từ môi trường/vật thể thực tế để thu hẹp không gian nghiệm,.

---

**Slide 7**
**Tiêu đề:** Giải pháp Cục bộ: Phương pháp Lucas-Kanade
**Nội dung:**
*   **Cách tiếp cận:** Tối ưu hóa cục bộ dựa trên khu vực lân cận (patch-based / window-based approach).
*   **Giả định cốt lõi:** Các điểm ảnh lân cận nhau (trong một cửa sổ không gian nhỏ) trên cùng một vật thể sẽ có chuyển động như nhau, tức là chia sẻ chung một vector $(u, v)$,.
*   **Biến đổi toán học:** Thay vì giải 1 phương trình cho 1 pixel, ta xét một cửa sổ kích thước $N \times N$. Hệ thống lúc này có $N^2$ phương trình (cho $N^2$ pixel) nhưng vẫn chỉ có 2 ẩn $(u, v)$.
*   **Giải pháp:** Áp dụng phương pháp Bình phương tối thiểu (Least Squares) để tìm ra nghiệm $(u, v)$ sao cho tổng bình phương sai số trong toàn bộ cửa sổ đó là nhỏ nhất,.

---

**Slide 8**
**Tiêu đề:** Đánh giá phương pháp Lucas-Kanade
**Nội dung:**
*   **Ưu điểm:** Tính toán cực kỳ nhanh và hoạt động xuất sắc tại các vùng ảnh có nhiều kết cấu (texture) đan chéo hoặc tại các điểm góc (corners). 
*   **Nhược điểm - Bài toán Khẩu độ (Aperture problem):** Nếu cửa sổ tính toán rơi vào một vùng ảnh trơn nhẵn (flat region) hoặc chỉ chứa một đường biên thẳng (edge), ma trận hệ phương trình sẽ bị suy biến và không thể xác định được chuyển động dọc theo đường biên đó.
*   **Ứng dụng thực tế:** Lucas-Kanade thường không tính luồng quang cho toàn ảnh mà chỉ kết hợp với các bộ phát hiện góc (như Harris hay Shi-Tomasi) để theo dõi các "điểm đặc trưng rời rạc" (Sparse Optical Flow) qua các khung hình.

---

**Slide 9**
**Tiêu đề:** Giải pháp Toàn cục: Phương pháp Horn-Schunck
**Nội dung:**
*   **Khắc phục nhược điểm cục bộ:** Giải quyết bài toán tại các vùng ảnh trơn, thiếu kết cấu mà Lucas-Kanade phải bó tay.
*   **Cách tiếp cận:** Thuật toán Luồng quang dày đặc (Dense Optical Flow) - tính toán vector cho MỌI điểm ảnh.
*   **Giả định cốt lõi (Global Smoothness Constraint):** Ràng buộc về độ trơn toàn cục. Thuật toán giả định rằng trường vector chuyển động của toàn bộ bức ảnh thay đổi một cách mượt mà và chậm rãi,.
*   **Cơ chế:** Lấy thông tin chuyển động đáng tin cậy từ các vùng có kết cấu mạnh (cạnh, góc) và lan truyền (fill-in) sự tính toán đó một cách mượt mà sang các vùng ảnh trơn lân cận.

---

**Slide 10**
**Tiêu đề:** Tối ưu hóa Horn-Schunck: Hàm năng lượng
**Nội dung:**
*   **Bài toán tối ưu:** Thay vì tính từng cụm pixel, Horn-Schunck tìm trường vector $(u,v)$ cho toàn ảnh bằng cách cực tiểu hóa một Hàm năng lượng (Energy function) gồm 2 thành phần,:
    *   **1. Sai số luồng quang ($e_{of}$):** Ép các vector phải thỏa mãn phương trình ràng buộc độ sáng $f_x u + f_y v + f_t = 0$.
    *   **2. Sai số độ trơn ($e_s^2$):** Phạt sự khác biệt quá lớn giữa các vector lân cận, đại diện bằng tổng bình phương đạo hàm không gian của vận tốc: $(\frac{\partial u}{\partial x})^2 + (\frac{\partial u}{\partial y})^2 + (\frac{\partial v}{\partial x})^2 + (\frac{\partial v}{\partial y})^2$.
*   **Điều chỉnh hệ số:** Thuật toán sử dụng một tham số trọng số ($\lambda$ hoặc $w$) để cân bằng. Nếu ảnh nhiều nhiễu, cần tăng trọng số độ trơn lên để ép trường chuyển động mượt mà hơn, bỏ qua các dao động cục bộ,.

---

**Slide 11**
**Tiêu đề:** So sánh Lucas-Kanade và Horn-Schunck
**Nội dung:**
*   **Lucas-Kanade (Tiếp cận Cục bộ):**
    *   Tính toán nhanh, hội tụ tốt tại các điểm có kết cấu mạnh như góc, cạnh.
    *   Thường được dùng để theo dõi các điểm đặc trưng rời rạc (Sparse Optical Flow).
    *   **Nhược điểm:** Bị ảnh hưởng bởi bài toán khẩu độ, không tính được luồng quang ở những vùng ảnh trơn nhẵn.
*   **Horn-Schunck (Tiếp cận Toàn cục):**
    *   Tính toán được trường vector dày đặc (Dense Optical Flow) cho mọi điểm ảnh nhờ ràng buộc độ trơn toàn cục.
    *   **Nhược điểm:** Chi phí tính toán cao (cần giải hệ phương trình lớn hoặc lặp). Ràng buộc độ trơn có xu hướng làm mờ ranh giới chuyển động giữa các vật thể.

---

**Slide 12**
**Tiêu đề:** Đánh giá Chất lượng Luồng quang (Evaluation Metrics)
**Nội dung:**
*   **Các bộ dữ liệu chuẩn (Benchmarks):** Middlebury, MPI Sintel, KITTI là các bộ dữ liệu phổ biến cung cấp ảnh thực tế/tổng hợp kèm theo nhãn luồng quang chuẩn (Ground Truth) để đánh giá thuật toán.
*   **Chỉ số AEE (Average Endpoint Error):** Sai số điểm cuối trung bình.
    *   Đo khoảng cách Euclid giữa vector luồng quang dự đoán $(u, v)$ và vector thực tế $(u_{GT}, v_{GT})$.
    *   Công thức: $\sqrt{(u - u_{GT})^2 + (v - v_{GT})^2}$.
*   **Chỉ số AE (Angular Error):** Sai số góc.
    *   Đo góc lệch giữa vector dự đoán và vector thực tế trong không gian 3D không gian-thời gian $(u, v, 1)$.
*   *(Hình minh họa đề xuất: Hình 9.8 - Bảng so sánh kết quả đánh giá các thuật toán Optical Flow trên Middlebury - Nguồn: "Computer Vision: Algorithms and Applications", Trang 464)*.

---

**Slide 13**
**Tiêu đề:** Thực hành: Luồng quang với OpenCV (CLO1, CLO2)
**Nội dung:**
*   **Hàm sử dụng:** `cv2.calcOpticalFlowFarneback()`.
*   **Cơ sở thuật toán:** Dựa trên thuật toán của Gunnar Farneback (2003), sử dụng khai triển đa thức để xấp xỉ các vùng lân cận của điểm ảnh, từ đó ước lượng luồng quang dày đặc (Dense flow).
*   **Các tham số quan trọng:**
    *   `prev`, `next`: Khung hình trước và khung hình sau (ảnh xám 1 kênh).
    *   `pyr_scale`, `levels`: Tỷ lệ thu nhỏ và số tầng của Kim tự tháp ảnh (để xử lý chuyển động lớn).
    *   `winsize`: Kích thước cửa sổ trung bình (càng lớn càng chịu nhiễu tốt nhưng dễ làm mờ chi tiết cục bộ).

---

**Slide 14**
**Tiêu đề:** Trực quan hóa Trường Luồng quang (Visualization)
**Nội dung:**
*   Đầu ra của Luồng quang là một ma trận chứa 2 kênh $(u, v)$, khó có thể quan sát trực tiếp bằng mắt thường. Cần biến đổi để trực quan hóa:
*   **1. Đồ thị Vector (Quiver Plot):** Vẽ các mũi tên nhỏ phân bố đều trên lưới điểm ảnh để thể hiện trực tiếp hướng và độ lớn của chuyển động.
*   **2. Mã hóa bằng Màu sắc (Color Encoding - Không gian HSV):**
    *   Sử dụng hàm `cv2.cartToPolar()` chuyển vector $(u, v)$ sang hệ tọa độ cực (Độ lớn, Góc).
    *   **Góc (Angle) $\rightarrow$ Kênh H (Hue - Sắc độ):** Màu sắc thể hiện hướng di chuyển (vd: Đỏ = đi sang phải, Xanh = đi lên trên).
    *   **Độ lớn (Magnitude) $\rightarrow$ Kênh S (Saturation) / V (Value):** Cường độ màu thể hiện vận tốc (di chuyển càng nhanh màu càng đậm),.

---

**Slide 15**
**Tiêu đề:** Tổng kết Tiết 4 & Mở khóa Tiết 5
**Nội dung:**
*   **Đúc kết Tiết 4:**
    *   Luồng quang học giải bài toán dịch chuyển của mọi pixel dựa trên giả định độ sáng không đổi.
    *   Lucas-Kanade tối ưu cục bộ bằng cửa sổ lân cận, trong khi Horn-Schunck lan truyền chuyển động bằng ràng buộc trơn toàn cục.
    *   Thư viện OpenCV cung cấp các hàm mạnh mẽ để tính toán và trực quan hóa luồng quang.
*   **Vấn đề mở đường (Dẫn nhập Tiết 5):**
    *   Các phương pháp toán học kinh điển gặp rắc rối lớn khi ánh sáng thay đổi, hoặc xuất hiện hiện tượng che khuất (Occlusions) khiến phương trình độ sáng bị phá vỡ.
    *   **Tiết 5:** Chúng ta sẽ bước vào kỷ nguyên **Deep Learning cho Luồng quang**. Làm thế nào các mạng Nơ-ron (như FlowNet, SPyNet, RAFT) học được cách dự đoán luồng quang trực tiếp từ dữ liệu với tốc độ và độ chính xác đáng kinh ngạc?,.