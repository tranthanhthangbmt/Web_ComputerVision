### Phần 1: Mức độ Dễ (Môi trường & Thao tác cơ bản)

**Câu 1:** Thư viện Python nào đóng vai trò nền tảng để biểu diễn hình ảnh dưới dạng các mảng đa chiều trong bộ nhớ máy tính?
A. Pandas (Python Data Analysis Library).
B. NumPy (Numerical Python).
C. Matplotlib (Plotting Library).
D. Scikit-learn (Machine Learning).
*   **Đáp án đúng:** B
*   **Lý do:** Slide 3 và tài liệu đều khẳng định NumPy là thư viện lõi để xử lý mảng đa chiều, và trong OpenCV, ảnh chính là các mảng NumPy.

**Câu 2:** Khi sử dụng hàm `cv2.imread()` để đọc một bức ảnh màu, OpenCV mặc định sắp xếp các kênh màu theo thứ tự nào?
A. R-G-B (Red - Green - Blue).
B. C-M-Y (Cyan - Magenta - Yellow).
C. B-G-R (Blue - Green - Red).
D. H-S-V (Hue - Saturation - Value).
*   **Đáp án đúng:** C
*   **Lý do:** Slide 4 nhấn mạnh rằng OpenCV mặc định đọc ảnh theo thứ tự BGR (Blue-Green-Red), khác với chuẩn RGB thông thường.

**Câu 3:** Lệnh `cv2.waitKey(0)` có ý nghĩa gì khi hiển thị ảnh trong cửa sổ giao diện?
A. Chờ đúng 0 mili-giây rồi tự động đóng cửa sổ hiển thị ngay lập tức.
B. Chờ người dùng nhấn một phím bất kỳ vô hạn thời gian trước khi tiếp tục.
C. Chờ cho đến khi video phát hết toàn bộ các khung hình rồi mới dừng lại.
D. Khởi động lại hệ thống cửa sổ hiển thị về trạng thái ban đầu (reset).
*   **Đáp án đúng:** B
*   **Lý do:** Slide 5 và đoạn mã mẫu trong tài liệu giải thích `cv2.waitKey(0)` sẽ tạm dừng chương trình vô hạn cho đến khi có phím được nhấn.

**Câu 4:** Để truy cập vào webcam mặc định của máy tính, tham số nào cần được truyền vào hàm `cv2.VideoCapture()`?
A. Đường dẫn file video (ví dụ: "webcam.mp4").
B. Số nguyên 0 (hoặc -1).
C. Địa chỉ IP của camera mạng.
D. Tên thiết bị (ví dụ: "USB Camera").
*   **Đáp án đúng:** B
*   **Lý do:** Slide 8 và Bài tập 2 chỉ ra rằng `cap = cv2.VideoCapture(0)` dùng để khởi tạo webcam mặc định, với 0 là ID của thiết bị.

**Câu 5:** Tại sao khi sử dụng `plt.imshow()` của Matplotlib để hiển thị trực tiếp ảnh vừa đọc bằng OpenCV, màu sắc thường bị sai (ví dụ: da người bị ám xanh dương)?
A. Do Matplotlib không hỗ trợ độ phân giải cao như OpenCV.
B. Do định dạng file ảnh gốc bị lỗi trong quá trình tải về.
C. Do sự sai lệch thứ tự kênh màu (OpenCV là BGR, Matplotlib là RGB).
D. Do màn hình máy tính chưa được hiệu chỉnh màu sắc chính xác.
*   **Đáp án đúng:** C
*   **Lý do:** Slide 4 cảnh báo về sự không tương thích này: OpenCV dùng BGR trong khi Matplotlib mong đợi RGB, dẫn đến việc kênh Đỏ và Xanh dương bị hoán đổi.

**Câu 6:** Cách kiểm tra an toàn nhất để biết một bức ảnh có được đọc thành công bằng `cv2.imread` hay không là gì?
A. Kiểm tra xem tên file có kết thúc bằng .jpg hay không.
B. Kiểm tra xem biến chứa ảnh có giá trị là `None` hay không.
C. Kiểm tra kích thước file trên ổ đĩa cứng trước khi đọc.
D. Sử dụng hàm `cv2.isShow()` để xem ảnh có hiện lên không.
*   **Đáp án đúng:** B
*   **Lý do:** Slide 5 và tài liệu lưu ý luôn phải kiểm tra `if image is None:` để tránh lỗi đường dẫn sai hoặc file hỏng.

---

### Phần 2: Mức độ Trung bình (Code Logic & Xử lý Video)

**Câu 7:** Để truy cập giá trị của một điểm ảnh (pixel) tại hàng `y` và cột `x` trong mảng ảnh `img`, cú pháp nào sau đây là đúng?
A. `value = img(x, y)`
B. `value = img[x, y]`
C. `value = img[y, x]`
D. `value = img.get(x, y)`
*   **Đáp án đúng:** C
*   **Lý do:** Trong NumPy, chỉ số mảng được truy cập theo thứ tự `[hàng, cột]`, tương ứng với tọa độ `[y, x]` trong ảnh.

**Câu 8:** Trong bài tập ghi video 10 giây, nếu camera hoạt động ở tốc độ 30 FPS, vòng lặp ghi hình cần chạy bao nhiêu lần?
A. 10 lần.
B. 30 lần.
C. 100 lần.
D. 300 lần.
*   **Đáp án đúng:** D
*   **Lý do:** Slide 9 đưa ra công thức: Tổng số khung hình = FPS x Thời gian = 30 x 10 = 300 frames.

**Câu 9:** Khi khởi tạo đối tượng `cv2.VideoWriter` để ghi video, tham số nào quyết định định dạng mã hóa (codec) của file đầu ra?
A. Tốc độ khung hình (FPS).
B. Mã FourCC (ví dụ: 'MJPG', 'XVID').
C. Kích thước khung hình (Frame Size).
D. Tên file đầu ra.
*   **Đáp án đúng:** B
*   **Lý do:** Slide 9 và Bài tập 3 đề cập đến việc cần xác định Codec thông qua mã FourCC (ví dụ: `cv2.VideoWriter_fourcc(*'MJPG')`).

**Câu 10:** Lệnh `img.shape` trả về kết quả là `(480, 640, 3)`. Thông số này có ý nghĩa gì?
A. Ảnh có chiều rộng 480, chiều cao 640 và 3 kênh màu.
B. Ảnh có chiều cao 480, chiều rộng 640 và 3 kênh màu.
C. Ảnh có độ phân giải 480x640 và dung lượng 3 MB.
D. Ảnh có 480 lớp, 640 điểm ảnh và 3 hệ màu.
*   **Đáp án đúng:** B
*   **Lý do:** Slide 4 và tài liệu giải thích shape của mảng ảnh là `(Height, Width, Channels)`. Do đó 480 là chiều cao (số hàng).

**Câu 11:** Để tách riêng kênh màu Xanh dương (Blue) từ một bức ảnh màu `img` (chuẩn BGR) bằng kỹ thuật cắt lát (slicing) của NumPy, câu lệnh nào đúng?
A. `blue_channel = img[:, :, 0]`
B. `blue_channel = img[:, :, 1]`
C. `blue_channel = img[:, :, 2]`
D. `blue_channel = img[0, :, :]`
*   **Đáp án đúng:** A
*   **Lý do:** Slide 6 và tài liệu cho biết OpenCV sắp xếp theo BGR, nên kênh Blue nằm ở chỉ số 0 của chiều thứ 3 (kênh màu).

**Câu 12:** Trong vòng lặp hiển thị video, lệnh `if cv2.waitKey(1) & 0xFF == ord('q'): break` có tác dụng gì?
A. Tự động thoát chương trình sau 1 giây nếu không có tín hiệu video.
B. Chờ 1ms, nếu người dùng nhấn phím 'q' thì thoát khỏi vòng lặp.
C. Chuyển đổi video sang định dạng chất lượng cao (Quality) sau 1ms.
D. Tạm dừng video và chờ người dùng nhập lệnh tiếp theo.
*   **Đáp án đúng:** B
*   **Lý do:** Slide 8 giải thích logic thoát chương trình khi nhấn phím 'q' với thời gian chờ 1ms giữa các frame để video chạy mượt.

**Câu 13:** Phương thức `cap.release()` và `video_out.release()` ở cuối chương trình xử lý video có vai trò quan trọng gì?
A. Giải phóng bộ nhớ RAM đã cấp phát cho các biến cục bộ.
B. Đóng kết nối camera và đóng file video để lưu dữ liệu an toàn.
C. Xóa toàn bộ video vừa ghi để dọn dẹp ổ đĩa cứng.
D. Tự động gửi file video qua email cho người quản trị.
*   **Đáp án đúng:** B
*   **Lý do:** Slide 10 nhấn mạnh tầm quan trọng của việc giải phóng tài nguyên (release) để đóng file, đảm bảo dữ liệu được lưu trọn vẹn.

---

### Phần 3: Mức độ Khó (Thao tác mảng NumPy & Thuật toán)

**Câu 14:** Công thức chuẩn để chuyển đổi thủ công một pixel màu (R, G, B) sang giá trị xám (Gray) dựa trên độ nhạy của mắt người là gì?
A. $Gray = (R + G + B) / 3$
B. $Gray = 0.5 \cdot R + 0.5 \cdot B$
C. $Gray = 0.299 \cdot R + 0.587 \cdot G + 0.114 \cdot B$
D. $Gray = 0.33 \cdot R + 0.33 \cdot G + 0.33 \cdot B$
*   **Đáp án đúng:** C
*   **Lý do:** Slide 12 trình bày công thức chuyển đổi ảnh xám dựa trên cảm nhận mắt người: nhạy nhất với màu Lục (0.587) và ít nhất với màu Lam (0.114).

**Câu 15:** Đoạn code `img[100:110, :] = 0` thực hiện thao tác gì trên bức ảnh?
A. Cắt bỏ vùng ảnh từ hàng 100 đến 110 và lưu vào biến mới.
B. Vẽ một dải màu đen ngang qua toàn bộ chiều rộng ảnh từ hàng 100 đến 110.
C. Làm mờ vùng ảnh từ hàng 100 đến 110 bằng bộ lọc trung bình.
D. Đặt giá trị pixel tại cột 100 đến 110 thành 0 (màu đen).
*   **Đáp án đúng:** B
*   **Lý do:** Slide 11 giải thích thao tác gán giá trị mảng: chọn các hàng từ 100-110 (`100:110`) và tất cả các cột (`:`) rồi gán bằng 0 (đen), tạo ra đường kẻ ngang đen.

**Câu 16:** Kiểu dữ liệu (dtype) phổ biến nhất của mảng NumPy dùng để biểu diễn ảnh 8-bit trong OpenCV là gì?
A. `float32` (Số thực 32-bit).
B. `int64` (Số nguyên 64-bit có dấu).
C. `uint8` (Số nguyên không dấu 8-bit, giá trị 0-255).
D. `bool` (Giá trị đúng/sai).
*   **Đáp án đúng:** C
*   **Lý do:** Tài liệu (mục 1.6.3) và kiến thức về ảnh 8-bit (0-255) xác nhận `uint8` là kiểu dữ liệu chuẩn cho ảnh.

**Câu 17:** Để tạo một ảnh nhị phân `binary_img` từ ảnh xám `gray` với ngưỡng `T=127` bằng NumPy (không dùng `cv2.threshold`), cú pháp nào sau đây đúng?
A. `binary_img = np.where(gray > 127, 255, 0)`
B. `binary_img = np.if(gray > 127, 255, 0)`
C. `binary_img = gray.threshold(127)`
D. `binary_img = gray > 127 ? 255 : 0`
*   **Đáp án đúng:** A
*   **Lý do:** Slide 13 minh họa cách dùng `np.where(condition, x, y)` để phân ngưỡng thủ công trên mảng: lớn hơn 127 thành 255 (trắng), còn lại thành 0 (đen).

**Câu 18:** Hàm `plt.hist(img.ravel(), 256)` được sử dụng để làm gì trong bài tập phân tích ảnh?
A. Làm phẳng ảnh thành mảng 1 chiều và vẽ biểu đồ phân bố độ sáng (Histogram).
B. Cân bằng lại độ sáng của ảnh để tăng độ tương phản.
C. Xoay ảnh đi một góc 256 độ theo chiều kim đồng hồ.
D. Chia ảnh thành 256 vùng nhỏ để xử lý song song.
*   **Đáp án đúng:** A
*   **Lý do:** Slide 13 giải thích việc dùng `plt.hist` kết hợp với `ravel()` (làm phẳng mảng) để vẽ biểu đồ Histogram xem phân bố độ sáng.

**Câu 19:** Khi thực hiện phép toán trên mảng ảnh `img = 255 - img`, kết quả thu được là gì?
A. Ảnh gốc bị xóa trắng hoàn toàn.
B. Ảnh âm bản (Negative image) của ảnh gốc.
C. Ảnh gốc bị giảm độ sáng đi một nửa.
D. Ảnh gốc được chuyển sang định dạng xám.
*   **Đáp án đúng:** B
*   **Lý do:** Tài liệu (mục 2.1.1) giải thích phép toán $s = L - 1 - r$ (với L=256, max=255) chính là phép tạo ảnh âm bản, đảo ngược giá trị sáng tối.

**Câu 20:** Nếu bạn muốn đếm số dòng văn bản trong một trang giấy đã được nhị phân hóa (chữ trắng nền đen), kỹ thuật xử lý mảng nào được gợi ý trong phần mở rộng?
A. Tính tổng giá trị pixel theo trục dọc (Vertical Projection).
B. Tính tổng giá trị pixel theo trục ngang (Horizontal Projection).
C. Tính trung bình cộng của toàn bộ pixel trong ảnh.
D. Đếm số lượng pixel màu trắng trên đường chéo chính.
*   **Đáp án đúng:** B
*   **Lý do:** Slide 14 (Câu hỏi mở rộng) gợi ý sử dụng "Horizontal Projection" (tính tổng theo trục ngang) để xác định vị trí các dòng chữ (nơi có tổng pixel trắng cao).