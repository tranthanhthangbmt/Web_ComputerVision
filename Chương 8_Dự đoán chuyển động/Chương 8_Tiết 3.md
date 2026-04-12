**Slide 1**
**Tiêu đề:** Chương 8. Dự đoán chuyển động (Motion Estimation)
**Tiêu đề phụ:** Tiết 3 - Chuyển động dạng Spline & Thực hành
**Nội dung:**
*   8.3. Chuyển động dạng Spline (Spline-based Motion):
    *   Xử lý các biến dạng đàn hồi không đồng nhất.
    *   Mạng lưới điểm điều khiển (Spline control grid) & Quadtree spline.
    *   Ứng dụng: Đăng ký ảnh y tế (Medical image registration).
*   Thực hành & Hoạt động lớp học (CLO1, CLO4).

---

**Slide 2**
**Tiêu đề:** Đặt vấn đề: Giới hạn của Mô hình Tham số toàn cục
**Nội dung:**
*   **Nhắc lại Tiết 2:** Mô hình tham số (Affine, Homography) chỉ biểu diễn được các biến đổi cứng hoặc phẳng của toàn bộ khung hình.
*   **Thách thức thực tế:** Trong tự nhiên, các vật thể thường xuyên xảy ra **biến dạng đàn hồi không đồng nhất (non-rigid/elastic deformations)**. Ví dụ: chuyển động của cơ mặt khi cười, nhịp đập của tim, hoặc sự co giãn của bề mặt nước.
*   **Nhu cầu:** Cần một mô hình linh hoạt hơn mô hình toàn cục, nhưng không quá tốn kém tài nguyên tính toán như việc tìm kiếm luồng quang học (optical flow) độc lập cho từng điểm ảnh.

---

**Slide 3**
**Tiêu đề:** 8.3. Chuyển động dạng Spline (Spline-based Motion)
**Nội dung:**
*   **Ý tưởng cốt lõi:** Biểu diễn trường chuyển động bằng một mạng lưới Spline 2D được chi phối bởi một tập hợp nhỏ các **điểm điều khiển (control vertices)**.
*   **Cơ chế:** Thay vì tính toán vector chuyển động cho từng pixel một, hệ thống chỉ tính toán chuyển động tại các điểm điều khiển. Chuyển động của các điểm ảnh nằm giữa các điểm điều khiển sẽ được nội suy trơn tru.
*   *(Hình ảnh minh họa đề xuất: Hình 9.4 - Trường chuyển động Spline: Các vector dịch chuyển của điểm ảnh được hiển thị bằng dấu (+), bị chi phối bởi số lượng nhỏ các điểm điều khiển hiển thị bằng hình tròn (o) - Nguồn: "Computer Vision: Algorithms and Applications", Trang 459)*.

---

**Slide 4**
**Tiêu đề:** Biểu diễn Toán học của Spline Motion
**Nội dung:**
*   Vector dòng chảy $u_i$ tại một pixel $x_i$ được định nghĩa là tổ hợp tuyến tính của các điểm điều khiển lân cận.
*   **Công thức:** 
    $u_i = \sum_j \hat{u}_j B_j(x_i)$.
*   **Trong đó:**
    *   $\hat{u}_j$: Vector chuyển động tại điểm điều khiển thứ $j$.
    *   $B_j(x_i)$: Các hàm cơ sở (basis functions) của Spline, quyết định mức độ ảnh hưởng của điểm điều khiển lên pixel.
*   **Ưu điểm Tối ưu hóa:** Số lượng biến cần tìm (các $\hat{u}_j$) ít hơn rất nhiều so với số lượng điểm ảnh, giúp bài toán (hệ phương trình tuyến tính thưa) trở nên ổn định, có điều kiện tốt và giải quyết nhanh chóng bằng phân rã Cholesky.

---

**Slide 5**
**Tiêu đề:** Nâng cấp: Lưới Quadtree Spline
**Nội dung:**
*   **Khuyết điểm của lưới đều:** Mô hình Spline lưới đều xử lý rất kém tại các ranh giới đứt gãy chuyển động (motion discontinuities).
*   **Giải pháp - Quadtree Spline:** Nhúng cấu trúc phân cấp Quadtree vào lưới điểm điều khiển.
*   **Cơ chế hoạt động:**
    *   Sử dụng các ô lưới kích thước lớn cho những vùng ảnh có chuyển động trơn tru đồng nhất.
    *   Tự động chia nhỏ (subdivide) ô lưới tại các khu vực có sự đứt gãy chuyển động hoặc có sai số SSD cao.
*   *(Hình ảnh minh họa đề xuất: Hình 9.5 (a) và (c) - Biểu diễn Quadtree spline và lưới biến dạng xếp chồng lên ảnh gốc - Nguồn: "Computer Vision: Algorithms and Applications", Trang 460)*.

---

**Slide 6**
**Tiêu đề:** Tối ưu hóa Lưới: Quadtree Spline
**Nội dung:**
*   **Chiến lược Từ thô đến tinh (Coarse-to-fine):** Bắt đầu với một lưới spline đều đặn trên ảnh độ phân giải thấp để tìm ước lượng chuyển động sơ bộ.
*   **Chia nhỏ cục bộ (Subdivision):** Các ô lưới spline tại những khu vực có chuyển động không nhất quán (sai số dư bình phương vượt ngưỡng) sẽ tự động bị chia nhỏ thành các ô nhỏ hơn.
*   **Xử lý vết nứt (Cracks):** Để tránh các vết nứt hình học trên trường chuyển động, các nút ở lưới mịn nằm giáp ranh với lưới thô phải được nội suy và chịu sự phụ thuộc vào các nút cha của chúng.

---

**Slide 7**
**Tiêu đề:** Ứng dụng: Đăng ký ảnh y tế (Medical Image Registration)
**Nội dung:**
*   **Tại sao dùng Spline?** Khả năng biểu diễn xuất sắc các trường biến dạng đàn hồi trơn tru (smooth elastic deformation fields) khiến mô hình spline được sử dụng cực kỳ rộng rãi trong lĩnh vực y tế.
*   **Mục đích:**
    *   Theo dõi sự tiến triển của một bệnh nhân theo thời gian (Nghiên cứu dọc - longitudinal study).
    *   Khớp ảnh của các bệnh nhân khác nhau để tìm điểm chung hoặc phát hiện bệnh lý (Cross-sectional studies).
*   **Xử lý đa phương thức (Multi-modality):** Khi đăng ký ảnh từ các nguồn khác nhau (như CT scan và MRI), hệ thống thường sử dụng độ đo tương đồng "Thông tin tương hỗ" (Mutual information) thay vì so sánh độ sáng điểm ảnh thông thường.

---

**Slide 8**
**Tiêu đề:** Ví dụ: Căn chỉnh ảnh Não & Bề mặt 3D
**Nội dung:**
*   **Căn chỉnh ảnh MRI Não:** Sử dụng lưới biến dạng B-spline đa độ phân giải để khớp ảnh MRI của bệnh nhân với một ảnh bản đồ não (brain atlas image) đã được gán nhãn chuẩn.
*   **Đăng ký thể tích 3D (Volumetric registration):** Đối với dữ liệu không gian 3 chiều, mô hình lưới được mở rộng thành **Octree splines**.
*   **Ứng dụng thực tiễn:** Khớp các mô hình bề mặt y tế phức tạp như đốt sống (vertebrae) hoặc khuôn mặt từ các bệnh nhân khác nhau.
*   *(Hình minh họa đề xuất: Hình 9.6 - Căn chỉnh đàn hồi ảnh não MRI hoặc Hình 9.7 - Đăng ký ảnh bề mặt đốt sống bằng Octree spline - Nguồn: "Computer Vision: Algorithms and Applications", Trang 461-462)*,.

---

**Slide 9**
**Tiêu đề:** Khám phá công nghệ: Demo thuật toán (CLO1)
**Nội dung:**
*   **Hoạt động của Giảng viên:** Demo mã nguồn trực tiếp (Live Coding) để sinh viên quan sát cách các thuật toán liên kết ảnh hoặc dự đoán chuyển động hoạt động trong thực tế.
*   **Công cụ sử dụng:** Thư viện OpenCV (Python) trên môi trường Google Colab hoặc Jupyter Notebook.
*   **Các kỹ thuật minh họa (Gợi ý):**
    *   Sử dụng bộ phát hiện đặc trưng SIFT/SURF kết hợp `cv2.findHomography` để căn chỉnh ảnh (đại diện cho Mô hình chuyển động tham số).
    *   Sử dụng hàm `cv2.calcOpticalFlowFarneback()` để trực quan hóa trường vector chuyển động (Dense Optical Flow) của một đoạn video ngắn.
*   **Yêu cầu:** Sinh viên quan sát, đặt câu hỏi và ghi nhận cách tinh chỉnh các tham số thực tế.

---

**Slide 10**
**Tiêu đề:** Hoạt động lớp học: Làm việc nhóm & Chuẩn bị Đồ án (CLO4)
**Nội dung:**
*   **Mục tiêu:** Nâng cao kỹ năng làm việc nhóm, giao tiếp và khả năng tổng hợp kiến thức chuẩn bị cho giai đoạn đánh giá cuối kỳ (CLO4),.
*   **Nhiệm vụ tại lớp:**
    *   Các nhóm tập hợp, đọc và thảo luận các tài liệu học thuật/kỹ thuật liên quan đến đề tài đồ án môn học.
    *   Lên dàn ý (outline) chi tiết cho bài báo cáo và slide thuyết trình.
    *   Kiểm tra chéo tiến độ lập trình ứng dụng Thị giác máy tính (CLO3), đảm bảo tích hợp đủ các công đoạn đã học: Trích xuất đặc trưng $\rightarrow$ Phân lớp/Học sâu $\rightarrow$ Xử lý chuyển động (nếu có).
*   **Vai trò Giảng viên:** Đi từng nhóm, lắng nghe, giải đáp thắc mắc và góp ý trực tiếp cho định hướng dự án của từng nhóm.

---

**Slide 11**
**Tiêu đề:** Tích hợp Kiến thức vào Đồ án (CLO3)
**Nội dung:**
*   **Mục tiêu (CLO3):** Sinh viên lập trình được một ứng dụng xử lý ảnh hoàn chỉnh, áp dụng thuật toán cụ thể với các chức năng đầy đủ.
*   **Gợi ý áp dụng Chương 8:** Khuyến khích các nhóm mở rộng bài toán nhận diện trên ảnh tĩnh sang xử lý chuỗi Video bằng cách tích hợp dự đoán chuyển động.
*   **Ví dụ thực tiễn:** Hệ thống phát hiện người đi bộ (HOG + SVM) kết hợp với Ước lượng chuyển động tịnh tiến để theo dõi (Tracking) quỹ đạo di chuyển của đối tượng qua các khung hình.

---

**Slide 12**
**Tiêu đề:** Hướng dẫn Chuẩn bị Báo cáo Đồ án (CLO4)
**Nội dung:**
*   **Mục tiêu (CLO4):** Thể hiện kỹ năng làm việc nhóm, phân công nhiệm vụ, và khả năng báo cáo chuyên môn.
*   **Cấu trúc bài Thuyết trình chuẩn (Gợi ý):**
    *   *Phần 1:* Đặt vấn đề & Tính ứng dụng của dự án.
    *   *Phần 2:* Cơ sở lý thuyết (Các thuật toán đã sử dụng: SIFT, CNN, Optical Flow, v.v.).
    *   *Phần 3:* Kiến trúc hệ thống & Demo chạy mã nguồn (Live Demo).
    *   *Phần 4:* Đánh giá kết quả (Độ chính xác mAP, Tốc độ khung hình FPS) & Hướng phát triển.

---

**Slide 13**
**Tiêu đề:** Hoạt động Nhóm: Thảo luận & Lập Dàn ý
**Nội dung:**
*   **Nhiệm vụ 1:** Các thành viên trong nhóm họp bàn, rà soát lại tiến độ hoàn thiện mã nguồn (Code) của đồ án cuối kỳ.
*   **Nhiệm vụ 2:** Lên dàn ý (Outline) chi tiết cho slide báo cáo sẽ trình bày vào Buổi 14.
*   **Vai trò Giảng viên:** Đi từng nhóm kiểm tra tiến độ, gỡ rối các lỗi lập trình (bug) hoặc giải đáp các lỗ hổng lý thuyết, đóng vai trò "người hướng dẫn" (mentor) cho dự án của từng nhóm.

---

**Slide 14**
**Tiêu đề:** Tổng kết Buổi 13 (Chương 8 - Phần 1)
**Nội dung:**
*   **Phép liên kết chuyển đổi:** Giải quyết chuyển động tịnh tiến bằng cách tối ưu hóa hàm SSD thông qua khai triển Taylor và cập nhật gia số (Lucas-Kanade),.
*   **Chuyển động tham số:** Nâng cấp lên các biến đổi toàn cục (Affine - 6 tham số, Homography - 8 tham số) để xử lý xoay, phóng to, thu nhỏ. Ứng dụng đỉnh cao: Ổn định video,,.
*   **Chuyển động Spline:** Sử dụng lưới điểm điều khiển (Quadtree) để mô phỏng sự biến dạng đàn hồi cục bộ, giải quyết các bài toán phức tạp như Đăng ký ảnh y tế,,.

---

**Slide 15**
**Tiêu đề:** Mở khóa Buổi 14: Đỉnh cao Xử lý Video
**Nội dung:**
*   **Vấn đề:** Các mô hình đã học (Tham số, Spline) vẫn phải phụ thuộc vào một lưới hoặc một bộ thông số chung. Điều gì xảy ra nếu MỖI điểm ảnh trong video lại di chuyển theo một hướng hoàn toàn khác nhau (ví dụ: dòng người tấp nập, lá rơi)?
*   **Giải pháp:** Chúng ta cần một trường vector chuyển động dày đặc (Dense motion field) tính toán độc lập cho mọi pixel.
*   **Đón xem Buổi 14:** 
    *   Khám phá **Luồng quang học (Optical Flow)** và **Chuyển động phân lớp (Layered Motion)**,,.
    *   Tiến hành Báo cáo Thuyết trình Đồ án cuối kỳ.