### Phần 1: Mức độ Dễ (Nhận biết & Khái niệm)

**Câu 1:** Mô hình camera đơn giản nhất về mặt hình học được sử dụng trong thị giác máy tính để mô tả quá trình tạo ảnh là gì?
A. Mô hình Camera mắt cá (Fisheye Camera Model).
B. Mô hình Camera lỗ kim (Pinhole Camera Model).
C. Mô hình Camera toàn cảnh (Panoramic Camera Model).
D. Mô hình Camera lập thể (Stereo Camera Model).
*   **Đáp án đúng:** B
*   **Lý do:** Tài liệu khẳng định mô hình camera lỗ kim là mô hình hình học đơn giản nhất nhưng quan trọng nhất, mô tả ánh sáng đi qua một lỗ nhỏ (tâm chiếu) và tạo ảnh ngược chiều trên mặt phẳng ảnh.

**Câu 2:** Quá trình "Số hóa" (Digitization) chuyển đổi một cảnh liên tục thành ảnh số bao gồm hai bước chính nào?
A. Lấy mẫu (Sampling) và Lượng tử hóa (Quantization).
B. Lọc nhiễu (Filtering) và Nén dữ liệu (Compression).
C. Phơi sáng (Exposure) và Cân bằng trắng (White Balance).
D. Chụp ảnh (Capturing) và Lưu trữ (Storing).
*   **Đáp án đúng:** A
*   **Lý do:** Quá trình số hóa gồm 2 bước: Lấy mẫu (chia không gian thành lưới pixel) và Lượng tử hóa (gán giá trị số nguyên cho cường độ sáng).

**Câu 3:** Trong thư viện OpenCV, một bức ảnh màu mặc định được lưu trữ trong bộ nhớ theo thứ tự kênh màu nào?
A. R-G-B (Red - Green - Blue).
B. C-M-Y (Cyan - Magenta - Yellow).
C. B-G-R (Blue - Green - Red).
D. H-S-V (Hue - Saturation - Value).
*   **Đáp án đúng:** C
*   **Lý do:** Tài liệu lưu ý quan trọng rằng trong bộ nhớ, OpenCV mặc định lưu trữ ảnh theo thứ tự BGR, không phải RGB.

**Câu 4:** Thư viện Python nào đóng vai trò là công cụ lõi để xử lý ảnh dưới dạng các mảng đa chiều (ma trận số)?
A. Matplotlib.
B. NumPy.
C. Scikit-learn.
D. Pandas.
*   **Đáp án đúng:** B
*   **Lý do:** NumPy là thư viện nền tảng cho tính toán khoa học, cung cấp đối tượng mảng đa chiều. Trong CV, ảnh chính là mảng NumPy.

**Câu 5:** Không gian màu nào được tạo ra bằng cách kết hợp ba nguồn sáng cơ bản: Đỏ, Lục và Lam?
A. Không gian màu CMYK.
B. Không gian màu HSV.
C. Không gian màu Grayscale.
D. Không gian màu RGB.
*   **Đáp án đúng:** D
*   **Lý do:** RGB là mô hình cộng (additive), nơi màu sắc được tạo ra bằng cách trộn ánh sáng Đỏ, Lục, Lam.

**Câu 6:** Một điểm ảnh (Pixel) trong ảnh số được định nghĩa là gì?
A. Một đơn vị đo chiều dài vật lý trên cảm biến camera.
B. Một phần tử ảnh nhỏ nhất mang giá trị số biểu thị cường độ sáng hoặc màu sắc.
C. Một hình vuông nhỏ nhất có thể nhìn thấy được bằng mắt thường trên màn hình.
D. Một vector chỉ hướng của ánh sáng đi vào ống kính camera.
*   **Đáp án đúng:** B
*   **Lý do:** Pixel (Picture Element) là thành phần cấu tạo cơ bản nhất của ảnh số, mang giá trị số biểu thị đặc tính ánh sáng tại vị trí đó.

---

### Phần 2: Mức độ Trung bình (Hiểu & Áp dụng)

**Câu 7:** Trong mô hình camera lỗ kim, mối quan hệ giữa tọa độ ảnh ($x$), tiêu cự ($f$), tọa độ thực tế ($X$) và độ sâu ($Z$) là gì?
A. Tọa độ ảnh $x$ tỉ lệ nghịch với tiêu cự $f$ và tỉ lệ thuận với độ sâu $Z$.
B. Tọa độ ảnh $x$ tỉ lệ thuận với tiêu cự $f$ và tỉ lệ nghịch với độ sâu $Z$.
C. Tọa độ ảnh $x$ bằng tổng của tiêu cự $f$ và độ sâu $Z$.
D. Tọa độ ảnh $x$ không phụ thuộc vào độ sâu $Z$ của vật thể.
*   **Đáp án đúng:** B
*   **Lý do:** Theo công thức tam giác đồng dạng: $x = f \cdot \frac{X}{Z}$. Nghĩa là ảnh càng lớn khi tiêu cự càng lớn, và ảnh càng nhỏ khi vật càng xa (Z lớn).

**Câu 8:** Nhược điểm chính của không gian màu RGB khi áp dụng vào các thuật toán nhận dạng vật thể là gì?
A. Không thể biểu diễn được màu trắng và màu đen tuyệt đối.
B. Thông tin về màu sắc và độ sáng bị trộn lẫn, khiến nó nhạy cảm với thay đổi ánh sáng.
C. Số lượng màu sắc có thể biểu diễn bị giới hạn chỉ trong 256 màu.
D. Tốn nhiều dung lượng bộ nhớ lưu trữ hơn so với các không gian màu khác.
*   **Đáp án đúng:** B
*   **Lý do:** Nhược điểm của RGB là thông tin màu sắc (Chrominance) và độ sáng (Luminance) bị trộn lẫn. Thay đổi độ sáng làm thay đổi giá trị cả 3 kênh, gây khó khăn cho nhận dạng.

**Câu 9:** Trong không gian màu HSV, thành phần "Saturation" (Độ bão hòa) biểu thị điều gì?
A. Loại màu sắc cơ bản (ví dụ: đỏ, xanh, vàng).
B. Độ sáng tối của màu sắc (tương đương với mức xám).
C. Độ tinh khiết hoặc độ đậm nhạt của màu (pha bao nhiêu màu xám).
D. Góc chiếu của ánh sáng lên bề mặt vật thể.
*   **Đáp án đúng:** C
*   **Lý do:** Saturation đo lường "độ tinh khiết" của màu, tức là màu đó pha lẫn bao nhiêu màu xám. S thấp là màu nhạt, S cao là màu rực rỡ.

**Câu 10:** Tham số nội tại (Intrinsic Parameters) của camera bao gồm những thông tin gì?
A. Vị trí và hướng quay của camera trong không gian thế giới thực.
B. Tiêu cự, tọa độ tâm quang học và độ xiên của trục cảm biến.
C. Độ phân giải màn hình hiển thị và tốc độ khung hình video.
D. Độ mở ống kính (khẩu độ) và thời gian phơi sáng.
*   **Đáp án đúng:** B
*   **Lý do:** Tham số nội tại mô tả đặc tính bên trong camera, biểu diễn bằng ma trận $K$ gồm tiêu cự ($f_x, f_y$) và tâm quang học ($c_x, c_y$).

**Câu 11:** Nếu một ảnh màu có kích thước $100 \times 100$ pixel, nó sẽ được biểu diễn trong NumPy dưới dạng ma trận có kích thước (shape) là bao nhiêu?
A. $(100, 100)$
B. $(3, 100, 100)$
C. $(100, 100, 3)$
D. $(10000, 3)$
*   **Đáp án đúng:** C
*   **Lý do:** Ảnh màu là ma trận 3D với kích thước chiều cao x chiều rộng x số kênh màu. Trong OpenCV/Python, shape là $(H, W, Channels)$.

**Câu 12:** Tại sao khi hiển thị ảnh đọc bằng OpenCV (`cv2.imread`) trực tiếp bằng Matplotlib (`plt.imshow`) thì màu sắc thường bị sai (ám xanh dương)?
A. Do Matplotlib không hỗ trợ hiển thị ảnh có độ phân giải cao.
B. Do OpenCV đọc ảnh theo chuẩn BGR còn Matplotlib hiển thị theo chuẩn RGB.
C. Do ảnh bị lỗi trong quá trình đọc từ ổ đĩa cứng.
D. Do Matplotlib tự động áp dụng bộ lọc làm mượt ảnh.
*   **Đáp án đúng:** B
*   **Lý do:** OpenCV lưu trữ BGR, trong khi Matplotlib (và hầu hết các thư viện khác) mong đợi RGB. Cần dùng `cv2.cvtColor` để chuyển đổi trước khi hiển thị.

**Câu 13:** Độ sâu bit (Bit Depth) phổ biến nhất là 8-bit, điều này có ý nghĩa gì đối với giá trị của một kênh màu?
A. Mỗi kênh màu có thể nhận giá trị từ 0 đến 1.
B. Mỗi kênh màu có thể nhận giá trị số nguyên từ 0 đến 255.
C. Mỗi kênh màu có thể nhận giá trị từ -128 đến 127.
D. Mỗi kênh màu có thể biểu diễn được 8 triệu màu sắc khác nhau.
*   **Đáp án đúng:** B
*   **Lý do:** $2^8 = 256$, do đó 8-bit cho phép biểu diễn 256 mức giá trị từ 0 đến 255.

---

### Phần 3: Mức độ Khó (Phân tích & Tổng hợp)

**Câu 14:** Ma trận Camera $K$ (Camera Matrix) trong phương trình chiếu đóng vai trò gì?
A. Chuyển đổi tọa độ từ hệ quy chiếu thế giới (World coords) sang hệ quy chiếu camera (Camera coords).
B. Chuyển đổi tọa độ từ hệ quy chiếu camera 3D sang tọa độ pixel 2D trên mặt phẳng ảnh.
C. Loại bỏ biến dạng méo hình (distortion) do thấu kính gây ra.
D. Tính toán độ sáng của từng điểm ảnh dựa trên nguồn sáng môi trường.
*   **Đáp án đúng:** B
*   **Lý do:** Ma trận nội tại $K$ mô tả phép chiếu từ hệ tọa độ camera 3D lên mặt phẳng ảnh 2D và ánh xạ thành đơn vị pixel.

**Câu 15:** Trong phương trình chiếu $x_{img} \sim K [R|t] X_w$, thành phần $[R|t]$ đại diện cho điều gì?
A. Các tham số nội tại, mô tả tiêu cự và tâm ảnh.
B. Các tham số ngoại tại, mô tả phép quay và tịnh tiến từ hệ tọa độ thế giới sang hệ tọa độ camera.
C. Ma trận biến dạng dùng để hiệu chỉnh ống kính mắt cá.
D. Vector màu sắc của điểm ảnh tại vị trí $X_w$.
*   **Đáp án đúng:** B
*   **Lý do:** $[R|t]$ là ma trận tham số ngoại tại (Extrinsic), kết hợp ma trận quay $R$ và vector tịnh tiến $t$, biến đổi điểm từ hệ tọa độ thế giới sang hệ tọa độ camera.

**Câu 16:** Tại sao phép chiếu từ 3D sang 2D được coi là làm mất thông tin (lossy), dẫn đến bản chất "bài toán ngược" của thị giác máy tính?
A. Vì độ phân giải của ảnh luôn thấp hơn độ phân giải của mắt người.
B. Vì thông tin về chiều sâu ($Z$) bị mất đi, nhiều điểm 3D khác nhau có thể cùng chiếu vào một điểm 2D.
C. Vì màu sắc của vật thể bị thay đổi khi đi qua thấu kính camera.
D. Vì các đường thẳng song song trong 3D luôn bị biến thành đường cong trong 2D.
*   **Đáp án đúng:** B
*   **Lý do:** Trong phương trình chiếu $x = f \cdot X/Z$, tất cả các điểm nằm trên cùng một tia chiếu (cùng tỷ lệ $X/Z$) đều chiếu vào cùng một điểm ảnh $x$, do đó thông tin chiều sâu $Z$ cụ thể bị mất.

**Câu 17:** Khi thực hiện tách đối tượng dựa trên màu sắc (Color Segmentation), tại sao việc sử dụng ngưỡng trên kênh Hue (H) của không gian HSV lại hiệu quả hơn so với dùng RGB?
A. Vì kênh Hue chứa thông tin độ sáng, giúp tách biên đối tượng rõ hơn.
B. Vì kênh Hue biểu diễn loại màu sắc (đỏ, vàng,...) và tương đối ổn định khi cường độ ánh sáng thay đổi.
C. Vì kênh Hue có độ phân giải cao hơn các kênh R, G, B.
D. Vì kênh Hue được lưu trữ dưới dạng số thực float, cho độ chính xác cao hơn số nguyên.
*   **Đáp án đúng:** B
*   **Lý do:** Kênh Hue tách biệt thông tin màu sắc khỏi độ sáng (Value). Khi bóng đổ hoặc ánh sáng yếu, V thay đổi nhưng H giữ nguyên giá trị loại màu, giúp nhận dạng ổn định.

**Câu 18:** Giả sử bạn muốn làm tối một bức ảnh mà không làm thay đổi màu sắc của nó. Trong không gian màu HSV, bạn cần thao tác như thế nào?
A. Giảm giá trị của kênh H (Hue) và giữ nguyên S, V.
B. Giảm giá trị của cả 3 kênh H, S, V một lượng bằng nhau.
C. Giữ nguyên H và S, chỉ giảm giá trị của kênh V (Value).
D. Tăng giá trị của kênh S (Saturation) và giảm kênh H (Hue).
*   **Đáp án đúng:** C
*   **Lý do:** Kênh V đại diện cho độ sáng. Giảm V sẽ làm ảnh tối đi. Giữ nguyên H và S đảm bảo sắc thái màu và độ đậm nhạt không đổi.

**Câu 19:** Phương pháp truy cập pixel nào trong Python/NumPy là hiệu quả nhất về mặt tốc độ khi muốn xử lý một vùng ảnh (ROI)?
A. Sử dụng hai vòng lặp `for` lồng nhau để duyệt qua từng pixel $(x, y)$.
B. Sử dụng kỹ thuật cắt lát mảng (Array Slicing) của NumPy (ví dụ: `image[y1:y2, x1:x2]`).
C. Chuyển đổi ảnh thành danh sách (List) Python và duyệt qua từng phần tử.
D. Sử dụng hàm `getPixel()` của thư viện PIL.
*   **Đáp án đúng:** B
*   **Lý do:** NumPy được tối ưu hóa cho các thao tác trên mảng. Slicing cho phép truy cập và thao tác trên khối dữ liệu bộ nhớ liền kề cực nhanh, tránh chi phí của vòng lặp Python thuần túy.

**Câu 20:** Nếu tâm chiếu của camera lỗ kim di chuyển lại gần mặt phẳng ảnh (giảm tiêu cự $f$), điều gì sẽ xảy ra với hình ảnh thu được?
A. Hình ảnh sẽ được phóng to (zoom in).
B. Hình ảnh sẽ bị thu nhỏ lại (zoom out) và trường nhìn (FOV) rộng hơn.
C. Hình ảnh sẽ bị mờ đi do mất tiêu điểm.
D. Hình ảnh sẽ bị đảo ngược màu sắc.
*   **Đáp án đúng:** B
*   **Lý do:** Theo công thức $x = f \cdot X/Z$, tọa độ ảnh tỉ lệ thuận với $f$. Nếu $f$ giảm, $x$ giảm, tức là kích thước vật thể trong ảnh nhỏ đi, cho phép thu được vùng cảnh rộng hơn (góc rộng).