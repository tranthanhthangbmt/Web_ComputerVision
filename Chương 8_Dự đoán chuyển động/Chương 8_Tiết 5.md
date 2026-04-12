**Slide 1**
**Tiêu đề:** Chương 8. Dự đoán chuyển động (Phần 3 & Tổng kết)
**Tiêu đề phụ:** Tiết 5 - Deep Learning trong Luồng quang & Chuyển động phân lớp
**Nội dung:**
*   Luồng quang bằng Học sâu (Deep Learning approaches): FlowNet, SPyNet, RAFT.
*   8.5. Chuyển động phân lớp (Layered motion).
*   Ứng dụng thực tiễn: Nội suy khung hình, tách nền, theo dõi đối tượng.

---

**Slide 2**
**Tiêu đề:** Kỷ nguyên Deep Learning trong Luồng quang
**Nội dung:**
*   **Vấn đề của phương pháp truyền thống:** Các thuật toán kinh điển (Lucas-Kanade, Horn-Schunck) phụ thuộc mạnh vào giả định độ sáng không đổi, dễ thất bại khi có sự che khuất (occlusions), ánh sáng thay đổi phức tạp, hoặc chuyển động quá lớn.
*   **Sự dịch chuyển (Paradigm Shift):** Chuyển từ việc giải các phương trình toán học tối ưu hóa sang việc sử dụng Mạng nơ-ron (Neural Networks) để học cách ước lượng luồng quang trực tiếp (end-to-end) từ các cặp hình ảnh đầu vào.
*   **Ưu điểm:** Khả năng tổng quát hóa tốt hơn với các điều kiện thực tế, tốc độ suy luận cực nhanh (thời gian thực) sau khi mạng đã được huấn luyện.

---

**Slide 3**
**Tiêu đề:** FlowNet - Mô hình CNN tiên phong
**Nội dung:**
*   **Đột phá (Dosovitskiy et al., 2015):** FlowNet là mạng nơ-ron tích chập (CNN) đầu tiên chứng minh khả năng học và dự đoán trực tiếp trường luồng quang học.
*   **Cơ chế hoạt động:** 
    *   Mạng nhận đầu vào là hai khung hình liên tiếp (Frame t và Frame t+1) được xếp chồng lên nhau.
    *   Mạng tự động trích xuất đặc trưng và tính toán trường vector vận tốc dày đặc (Dense Optical Flow) cho mọi điểm ảnh.
*   **Ý nghĩa:** Mở ra một hướng đi hoàn toàn mới, biến bài toán tìm kiếm chuyển động thành một bài toán học có giám sát (Supervised Learning) dựa trên các bộ dữ liệu có nhãn luồng quang chuẩn (như Sintel, KITTI).

---

**Slide 4**
**Tiêu đề:** SPyNet - Tiếp cận theo Kim tự tháp Không gian
**Nội dung:**
*   **Giới thiệu:** SPyNet (Spatial Pyramid Network) kết hợp nguyên lý toán học kinh điển với sức mạnh của học sâu.
*   **Chiến lược Từ thô đến tinh (Coarse-to-fine):** 
    *   Xây dựng kim tự tháp ảnh (Image Pyramids) cho cả 2 khung hình.
    *   Tính toán luồng quang ở độ phân giải thấp nhất, sau đó phóng to (upsample) và tinh chỉnh dần ở các tầng độ phân giải cao hơn.
*   **Sự tinh gọn:** Nhờ thiết kế phân cấp này, mạng SPyNet đơn giản hơn rất nhiều và có kích thước **nhỏ hơn tới 96%** (về số lượng tham số) so với mạng FlowNet ban đầu.
*   *(Hình minh họa đề xuất: Hình 9.9 - Sơ đồ ước lượng luồng quang lặp từ thô đến tinh bằng mạng nơ-ron - Nguồn: "Computer Vision: Algorithms and Applications", Trang 466)*.

---

**Slide 5**
**Tiêu đề:** RAFT - Độ chính xác cao hiện đại
**Nội dung:**
*   **Mô hình RAFT (Recurrent All-Pairs Field Transforms):** Kiến trúc hiện đại, thường được cung cấp sẵn trọng số trong các thư viện học sâu (như PyTorch/Torchvision).
*   **Đặc tính kỹ thuật:** 
    *   Nhận đầu vào là ảnh RGB (thường được chuẩn hóa và thay đổi kích thước cho phù hợp).
    *   **Bản chất lặp (Iterative):** Thay vì xuất kết quả một lần, RAFT sử dụng cơ chế hồi quy (Recurrent) để tinh chỉnh dần trường luồng quang qua nhiều bước lặp (ví dụ: 12 vòng lặp) để đạt độ chính xác cực cao.
*   **Đầu ra:** Một tensor chứa trường chuyển động theo phương ngang và dọc $(u, v)$ với đơn vị là pixel cho mỗi điểm ảnh.
*   *(Hình minh họa đề xuất: Ảnh GIF/Video hiển thị kết quả phân tích luồng quang trên video chuyển động thực tế (như xe cộ di chuyển) được mã hóa bằng hệ màu HSV)*.

---


**Slide 6**
**Tiêu đề:** 8.5. Chuyển động phân lớp (Layered Motion)
**Nội dung:**
*   **Khởi nguồn:** Trong nhiều tình huống thực tế, chuyển động thị giác trong một đoạn video thường được gây ra bởi sự dịch chuyển của một số ít các đối tượng nằm ở các độ sâu (depths) khác nhau trong không gian.
*   **Giải pháp Phân lớp:** Thay vì cố gắng tính toán một trường luồng quang học dày đặc và dễ bị nhiễu cho từng điểm ảnh đơn lẻ, ta có thể nhóm các điểm ảnh có cùng quỹ đạo chuyển động thành các **đối tượng** hoặc **lớp (layers)** riêng biệt.
*   **Ý tưởng cốt lõi:** Mô hình hóa cảnh video thành nhiều lớp xếp chồng lên nhau. Việc dịch chuyển và tổng hợp các lớp này theo thứ tự từ sau ra trước (back-to-front order) sẽ tái tạo lại chính xác chuỗi video gốc.

---

**Slide 7**
**Tiêu đề:** Cấu trúc của một Lớp chuyển động (Layer Components)
**Nội dung:**
*   Mỗi lớp (layer) trong mô hình phân lớp (ví dụ tiêu biểu của Wang và Adelson) thường bao gồm 3 thành phần cốt lõi:
    *   **1. Bản đồ Cường độ/Màu sắc (Intensity/Color Image):** Ghi lại hình ảnh, kết cấu bề mặt của riêng đối tượng đó.
    *   **2. Mặt nạ Alpha (Alpha Mask/Matte):** Xác định độ trong suốt hoặc ranh giới hình dáng của đối tượng (màu đen = trong suốt/không thuộc lớp).
    *   **3. Trường chuyển động tham số (Parametric Motion Field):** Mô tả cách toàn bộ lớp này di chuyển trong không gian (thường dùng mô hình Affine tịnh tiến, xoay, thu phóng).
*   *(Hình minh họa đề xuất: Hình 9.12 - Khung ước lượng chuyển động phân lớp gồm Bản đồ Cường độ, Bản đồ Alpha và Bản đồ Vận tốc vector - Nguồn: "Computer Vision: Algorithms and Applications", Trang 470)*.

---

**Slide 8**
**Tiêu đề:** Sức mạnh của Phân lớp: Giải quyết Bài toán Che khuất
**Nội dung:**
*   **Khó khăn kinh điển:** Các phương pháp luồng quang học truyền thống thường thất bại nặng nề tại các vùng ranh giới nơi một vật thể tiền cảnh che khuất vật thể hậu cảnh, do "Phương trình độ sáng không đổi" bị phá vỡ hoàn toàn.
*   **Khắc phục bằng Layered Motion:** Bằng cách tách biệt thành các lớp ở các độ sâu khác nhau, hệ thống có thể duy trì thông tin (bộ nhớ) của lớp nền ngay cả khi nó tạm thời bị che khuất bởi lớp tiền cảnh.
*   **Kết quả:** Mô hình biểu diễn cực kỳ chính xác diện mạo của các điểm ảnh ngay tại ranh giới bị đứt gãy chuyển động (motion discontinuities). Các cảnh vật phức tạp (như nhìn qua hàng rào, tán cây) được xử lý mượt mà.

---

**Slide 9**
**Tiêu đề:** Ứng dụng thực tiễn: Nội suy khung hình (Frame Interpolation)
**Nội dung:**
*   **Mục tiêu:** Tạo ra các khung hình "ảo" chèn vào giữa các khung hình thực tế để tăng tốc độ làm tươi (refresh rate) hoặc tạo hiệu ứng quay chậm (Slow motion) mượt mà.
*   **Vai trò của Chuyển động:** Để nội suy chính xác một pixel, ta cần biết vector vận tốc để dời pixel đó từ khung hình $t$ sang đúng vị trí ở khung hình $t+0.5$.
*   **Vai trò của Phân lớp/Che khuất:** Thông tin che khuất là "chìa khóa sống còn" để ngăn chặn màu sắc bị nhòe/ô nhiễm bởi các vật thể tiền cảnh đang chuyển động đè lên điểm ảnh ở khung hình trước hoặc sau.
*   *(Ghi chú: Các mạng Học sâu nội suy hiện đại sử dụng luồng quang học hai chiều (bi-directional flow) kết hợp với cơ chế Softmax splatting để đạt độ chân thực cao)*.

---

**Slide 10**
**Tiêu đề:** Ứng dụng thực tiễn: Phân đoạn & Theo dõi đối tượng
**Nội dung:**
*   **Phân đoạn đối tượng Video (Video Object Segmentation):**
    *   Mở rộng bài toán phân đoạn ảnh tĩnh (như GrabCut/Mask R-CNN) sang chuỗi thời gian.
    *   Mô hình phân lớp tự động nhóm các pixel chuyển động đồng nhất, giúp cắt tách (matting) đối tượng ra khỏi nền video xuyên suốt các khung hình một cách trơn tru.
*   **Theo dõi đối tượng (Video Object Tracking):**
    *   Xác định vị trí và bám sát một hoặc nhiều vật thể mục tiêu qua các khung hình liên tiếp (thường dùng Hộp giới hạn - Bounding box hoặc mặt nạ - mask).
    *   **Ứng dụng cốt lõi:** Camera giám sát (Surveillance), phân tích quỹ đạo cầu thủ thể thao, và hệ thống cảnh báo va chạm trên xe tự lái (Automotive safety).

---

Dưới đây là nội dung chi tiết cho các slide cuối cùng (Slide 11 - 15) của Tiết 5, đi sâu vào thuật toán theo dõi đối tượng DeepSORT, Phân đoạn đối tượng video (VOS), tổng kết phần học và mở đường cho tiết học báo cáo đồ án cuối cùng:

**Slide 11**
**Tiêu đề:** Đi sâu vào Theo dõi đối tượng: Thuật toán DeepSORT
**Nội dung:**
*   **Thách thức:** Theo dõi nhiều đối tượng (Multi-Object Tracking) rất phức tạp do chúng thay đổi kích thước, bị che khuất và thay đổi hình dáng liên tục.
*   **Hệ thống DeepSORT:** Một trong những hệ thống theo dõi phổ biến nhất, kết hợp giữa thuật toán cổ điển và Học sâu.
*   **Cơ chế hoạt động:**
    *   **Bộ lọc Kalman (Kalman filters):** Ước tính vị trí hiện tại có khả năng nhất của đối tượng dựa trên các phát hiện trước đó, giả định đối tượng di chuyển với tốc độ không đổi.
    *   **Mô hình Học sâu:** Đo lường sự tương đồng về ngoại hình giữa các phát hiện mới và đối tượng đang được theo dõi.
    *   **Thuật toán Hungary:** Tìm kiếm kết hợp tối ưu để ánh xạ phát hiện mới vào các quỹ đạo đã có, giảm thiểu khoảng cách và sự khác biệt hình dáng.

---

**Slide 12**
**Tiêu đề:** Đỉnh cao của Phân lớp: Phân đoạn đối tượng Video (VOS)
**Nội dung:**
*   **Khái niệm:** Video Object Segmentation (VOS) là nhiệm vụ phân loại từng điểm ảnh (pixel) trong khung hình video là thuộc về hậu cảnh hay thuộc về đối tượng mục tiêu.
*   **Cách tiếp cận:**
    *   Sự mở rộng của bài toán phân đoạn ảnh tĩnh sang không gian thời gian.
    *   Nhiều kiến trúc (như OSVOS, MaskTrack, SegFlow) kết hợp một mạng phân đoạn từng khung hình với thuật toán **ước lượng chuyển động (Optical Flow)** để liên kết và tinh chỉnh mặt nạ giữa các khung hình.
*   *(Hình minh họa đề xuất: Một video clip hiển thị người đang di chuyển, toàn bộ cơ thể người được tô màu (mask) và tách biệt hoàn toàn khỏi nền video)*.

---

**Slide 13**
**Tiêu đề:** Ứng dụng thực tiễn của VOS và Tracking
**Nội dung:**
*   Hộp giới hạn (Bounding box) thường là đủ, nhưng đôi khi ta cần định vị đối tượng với độ chính xác cao hơn nhiều - ở cấp độ điểm ảnh.
*   **Các ứng dụng tiêu biểu:**
    *   **Hội nghị truyền hình:** Phân đoạn cấp pixel giúp loại bỏ hoặc thay thế nền phía sau một người trong các cuộc gọi video một cách chính xác và mượt mà.
    *   **Giám sát và Xe tự lái:** Theo dõi người đi bộ và xe cộ (animal/cell tracking, automotive safety) trong môi trường đô thị phức tạp.
    *   **Chỉnh sửa video chuyên nghiệp:** Xóa đối tượng, chèn hiệu ứng, hoặc theo dõi các đối tượng biến dạng không đồng nhất (non-rigidly deforming objects) như quần áo.

---

**Slide 14**
**Tiêu đề:** Tổng kết Tiết 5 (Chương 8 - Phần 3)
**Nội dung:**
*   **Deep Learning trong Luồng quang:** Sự trỗi dậy của Mạng nơ-ron (FlowNet, SPyNet, RAFT) đã giúp máy tính học được cách dự đoán luồng quang học trực tiếp từ dữ liệu, xử lý tốt hơn các bài toán che khuất và ánh sáng phức tạp.
*   **Chuyển động phân lớp (Layered Motion):** Phân rã video thành các mặt phẳng độc lập theo độ sâu, duy trì được thông tin ngay cả khi vật thể bị che khuất.
*   **Sự hội tụ công nghệ:** Sự kết hợp giữa Ước lượng chuyển động (Motion Estimation) và Học sâu (Deep Learning) chính là chìa khóa cho các hệ thống Nội suy khung hình, Theo dõi (DeepSORT) và Phân đoạn video (VOS).

---

**Slide 15**
**Tiêu đề:** Mở khóa Tiết 6 - Báo cáo Đồ án & Tổng kết môn học
**Nội dung:**
*   **Hành trình đã qua:** Chúng ta đã hoàn thành toàn bộ khối lượng lý thuyết của môn học Thị giác máy tính (INFO3111).
*   **Nội dung Tiết 6 (Tiết học cuối cùng):**
    *   **Nhìn lại bức tranh toàn cảnh:** Ôn tập quy trình trích xuất đặc trưng truyền thống (SIFT/SURF, HOG) $\rightarrow$ Phân lớp (KNN, SVM) $\rightarrow$ Học sâu (CNN, ResNet) $\rightarrow$ Ước lượng chuyển động Video.
    *   **Báo cáo Đồ án cuối kỳ (CLO3, CLO4):** Sinh viên áp dụng kiến thức toàn khóa để trình bày các ứng dụng xử lý ảnh và video thực tế.
    *   Đánh giá kỹ năng làm việc nhóm, bảo vệ dự án và tổng kết điểm số môn học.