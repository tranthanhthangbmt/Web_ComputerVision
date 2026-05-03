### **Slide 1: Trang tiêu đề**
*   **Tiêu đề chính:** TRÍ TUỆ NHÂN TẠO TẠO SINH (GenAI) TRONG THỊ GIÁC MÁY TÍNH
*   **Tiêu đề phụ:** Phần 2: Giải quyết điểm nghẽn huấn luyện & Các kiến trúc tiên tiến (DCGAN, WGAN & StyleGAN)
*   **Nội dung văn bản:**
    *   Môn học: Thị giác máy tính
    *   Mục tiêu: Từ ảnh mờ nhòe của Vanilla GAN đến kỷ nguyên ảnh chân dung siêu thực và công nghệ Deepfake.
*   **Ảnh minh họa đề xuất:** Hình ảnh minh họa sự tiến hóa chất lượng ảnh từ Vanilla GAN (mờ, nhiễu) sang ảnh khuôn mặt sắc nét của StyleGAN.

---

### **Slide 2: Những thách thức kinh điển của GAN cơ bản**
*   **Tiêu đề:** Nút thắt cổ chai: Tại sao Vanilla GAN lại khó huấn luyện?
*   **Nội dung văn bản:** 
    *   **Giới hạn kiến trúc:** Vanilla GAN ban đầu sử dụng các lớp kết nối đầy đủ (Dense/Fully Connected layers), do đó nó không tận dụng được sức mạnh trích xuất đặc trưng không gian của Mạng Tích chập (CNN), dẫn đến ảnh sinh ra có độ phân giải thấp và mờ nhòe.
    *   **Tính không ổn định (Unstable Training):** Quá trình huấn luyện GAN là một trò chơi đối nghịch. Nếu một trong hai mạng (Generator hoặc Discriminator) trở nên quá giỏi quá nhanh, mạng kia có thể không theo kịp, dẫn đến sự mất cân bằng và thuật toán không thể hội tụ.
    *   **Nhạy cảm với siêu tham số:** GAN cơ bản cực kỳ "khó tính" với việc lựa chọn tốc độ học (learning rate) hay kích thước lô (batch size).
*   **Ảnh minh họa đề xuất:** Đồ thị minh họa hàm Loss dao động bất ổn của Generator và Discriminator, không đi đến điểm hội tụ (Nash Equilibrium).

---

### **Slide 3: Ác mộng "Sụp đổ chế độ" (Mode Collapse)**
*   **Tiêu đề:** Sụp đổ chế độ (Mode Collapse): Sự nghèo nàn trong sáng tạo
*   **Nội dung văn bản:**
    *   **Định nghĩa:** Đây là một trong những lỗi nghiêm trọng nhất của GAN. Bộ sinh (Generator) mất đi sự đa dạng trong việc tạo ảnh và chỉ sinh ra một vài mẫu đầu ra giống hệt nhau lặp đi lặp lại.
    *   **Nguyên nhân:** Xảy ra khi Generator tìm ra một "lỗ hổng" hoặc một mẫu ảnh cụ thể nào đó đánh lừa được Discriminator với tỷ lệ thành công cực cao. Thay vì học toàn bộ phân phối dữ liệu đa dạng, nó trở nên "lười biếng" và chỉ sinh ra mẫu ảnh đó.
    *   **Hệ quả:** Ví dụ khi học sinh ảnh các con vật, AI có thể chỉ sinh ra toàn ảnh chó mà không thể sinh ra ảnh mèo hay chim, dù dữ liệu gốc rất phong phú.
*   **Ảnh minh họa đề xuất:** Một lưới ảnh kết quả của GAN bị Mode Collapse (ví dụ: 16 ô ảnh nhưng hiển thị cùng một khuôn mặt bị lặp lại hoặc các chữ số giống hệt nhau).

---

### **Slide 4: Giải pháp đột phá - Kiến trúc DCGAN**
*   **Tiêu đề:** DCGAN (Deep Convolutional GAN): Cuộc cách mạng Tích chập
*   **Nội dung văn bản:**
    *   **Sự kết hợp hoàn hảo:** DCGAN là một trong những cải tiến quan trọng nhất, mang sức mạnh của Mạng nơ-ron Tích chập sâu (Deep CNN) vào kiến trúc GAN truyền thống.
    *   **Loại bỏ các lớp kết nối đầy đủ:** DCGAN thay thế hoàn toàn các lớp Dense truyền thống bằng các lớp Tích chập, giúp mạng giữ lại được cấu trúc không gian của hình ảnh và giảm đáng kể số lượng tham số.
    *   **Hiệu quả:** Việc sử dụng các lớp tích chập giúp DCGAN ổn định hơn rất nhiều trong quá trình huấn luyện và tạo ra các ảnh có chất lượng, độ sắc nét cao hơn hẳn so với GAN "vanilla".
*   **Ảnh minh họa đề xuất:** **Hình 12-25** *(Các chữ số MNIST được sinh ra bởi Generator của mạng DCGAN)*.

---

### **Slide 5: Giải phẫu Kiến trúc DCGAN**
*   **Tiêu đề:** Thiết kế bên trong DCGAN: Generator & Discriminator
*   **Nội dung văn bản:**
    *   **Mạng Sinh (Generator):** Nhận vector nhiễu ngẫu nhiên và sử dụng các lớp **Tích chập chuyển vị (Conv2DTranspose / Fractional-strided convolution)** để tăng dần kích thước không gian (upsampling) tạo ra ảnh độ phân giải cao. Sử dụng hàm kích hoạt **ReLU** (trừ lớp cuối dùng Tanh).
    *   **Mạng Phân biệt (Discriminator):** Sử dụng các lớp Tích chập thông thường với bước trượt (Strided Conv2D) để giảm kích thước không gian (downsampling) và trích xuất đặc trưng. Sử dụng hàm kích hoạt **LeakyReLU**.
    *   **Chuẩn hóa theo lô (Batch Normalization):** Áp dụng Batch Norm ở cả hai mạng để ổn định luồng gradient, giúp mô hình mạnh mẽ hơn trước các khởi tạo tồi.
*   **Ảnh minh họa đề xuất:** Sơ đồ mạng Generator của DCGAN, minh họa quá trình từ vector nhiễu (noise) $100$ chiều, qua các khối Conv2DTranspose mở rộng dần thành ảnh $64 \times 64 \times 3$.


---

### **Slide 6: Giải quyết sự bất ổn định - Wasserstein GAN (WGAN)**
*   **Tiêu đề:** WGAN: Thay đổi thước đo Toán học
*   **Nội dung văn bản:**
    *   **Vấn đề của GAN gốc:** Hàm Loss của GAN truyền thống dựa trên phân kỳ Jensen-Shannon, khiến cho gradient truyền về Mạng Sinh (G) dễ bị biến mất (vanishing gradient) khi Mạng Phân biệt (D) quá xuất sắc, dẫn đến việc G ngừng học.
    *   **Giải pháp của WGAN:** Thay thế thước đo bằng **Khoảng cách Wasserstein (Earth-Mover distance)**. Nó đo lường "chi phí" nhỏ nhất để biến đổi phân phối dữ liệu giả thành phân phối dữ liệu thật.
    *   **Ưu điểm vượt trội:** Khoảng cách Wasserstein cung cấp một gradient mượt mà, liên tục và hữu ích ở hầu hết mọi nơi, giúp quá trình huấn luyện cực kỳ ổn định và giải quyết tình trạng sụp đổ chế độ (Mode Collapse).
*   **Ảnh minh họa đề xuất:** Biểu đồ so sánh giữa hàm Loss của Vanilla GAN (gradient bị triệt tiêu ở hai đầu) và WGAN (đường thẳng liên tục giúp gradient luôn tồn tại để cập nhật).

---

### **Slide 7: WGAN-GP - Hoàn thiện lý thuyết Toán học**
*   **Tiêu đề:** WGAN-GP: Ràng buộc Lipschitz và Gradient Penalty
*   **Nội dung văn bản:**
    *   **Ràng buộc Lipschitz:** Để Khoảng cách Wasserstein hoạt động, mạng nơ-ron phải thỏa mãn ràng buộc Lipschitz (đảm bảo hàm không biến thiên quá gắt). WGAN ban đầu dùng kỹ thuật **cắt trọng số (Weight Clipping)** để ép buộc điều này, nhưng lại khiến mô hình đôi khi khó hội tụ.
    *   **Đột phá WGAN-GP (Gradient Penalty):** Loại bỏ hoàn toàn Weight Clipping. Thay vào đó, thêm một thành phần "phạt" (penalty) vào hàm Loss của Discriminator dựa trên chuẩn của gradient (chuẩn gradient phải xấp xỉ 1).
    *   **Kết quả:** Sự kết hợp này mang lại một thuật toán sinh ảnh cực kỳ mạnh mẽ, hội tụ nhanh và gần như miễn nhiễm với các lỗi bất ổn định kinh điển của GAN.
*   **Ảnh minh họa đề xuất:** Công thức hàm Loss của WGAN-GP làm nổi bật thành phần phạt Gradient Penalty $\lambda_{gp} \mathbb{E} [(||\nabla D(x)|| - 1)^2]$.

---

### **Slide 8: Rào cản sinh ảnh độ phân giải siêu cao (HD/4K)**
*   **Tiêu đề:** Thách thức mới: Rào cản sinh ảnh độ phân giải cao
*   **Nội dung văn bản:**
    *   Dù DCGAN và WGAN-GP đã giải quyết được tính ổn định, việc sinh trực tiếp một bức ảnh độ phân giải cực cao (ví dụ: $1024 \times 1024$) từ một vector nhiễu ngẫu nhiên vẫn là một nhiệm vụ "bất khả thi".
    *   **Nguyên nhân:** Không gian dữ liệu của ảnh $1024 \times 1024$ là quá lớn. Mạng Phân biệt (D) dễ dàng phát hiện ra các chi tiết bất hợp lý của ảnh giả ngay từ những pixel đầu tiên, dẫn đến việc trả về các gradient nhiễu loạn.
    *   Mạng Sinh (G) bị "ngợp" trước lượng thông tin khổng lồ và thất bại trong việc học cả bố cục tổng thể lẫn chi tiết tinh vi cùng một lúc.
*   **Ảnh minh họa đề xuất:** Một hình ảnh minh họa cảnh Mạng Sinh (G) đang bị "quá tải" thông tin khi cố gắng ánh xạ trực tiếp từ 1 vector nhỏ ra hàng triệu pixel.

---

### **Slide 9: Giải pháp Progressive GAN (ProGAN)**
*   **Tiêu đề:** Progressive GAN (ProGAN): Chiến thuật "Chia để trị"
*   **Nội dung văn bản:**
    *   **Ý tưởng cốt lõi:** ProGAN giải quyết rào cản độ phân giải bằng phương pháp **huấn luyện tăng dần (Progressive training)**.
    *   **Cơ chế hoạt động:** 
        *   Mô hình bắt đầu huấn luyện G và D ở độ phân giải siêu nhỏ ($4 \times 4$). Tại đây, mạng chỉ cần học các đường nét và màu sắc cơ bản.
        *   Khi mô hình đã hội tụ ở $4 \times 4$, ta từ từ "mở khóa" và thêm các lớp mạng mới để nhân đôi độ phân giải lên $8 \times 8, 16 \times 16$, v.v....
    *   Quá trình này lặp lại liên tục cho đến khi đạt được độ phân giải mục tiêu $1024 \times 1024$.
*   **Ảnh minh họa đề xuất:** **Hình 3.5** *(Sơ đồ minh họa quá trình huấn luyện tăng dần của ProGAN, từ mạng nhỏ xíu $4 \times 4$ mở rộng dần thành $1024 \times 1024$)*.

---

### **Slide 10: Tại sao Học tăng dần (Progressive Learning) lại hiệu quả?**
*   **Tiêu đề:** Phân tích sức mạnh của ProGAN
*   **Nội dung văn bản:**
    *   **Tập trung đúng lúc:** Bằng cách học cấu trúc thô trước (màu da, bố cục) ở độ phân giải thấp, mạng nơ-ron không bị phân tâm. Khi thêm lớp mới để học chi tiết tinh (lỗ chân lông, sợi tóc), mô hình đã có một nền tảng cục diện cực kỳ vững chắc.
    *   **Tối ưu hóa thời gian & Ổn định:** Phân rã một bài toán siêu khó thành các bài toán nhỏ hơn và dễ hơn giúp mô hình rút ngắn thời gian huấn luyện đáng kể và cực kỳ ổn định.
    *   **Kỹ thuật hỗ trợ:** ProGAN còn áp dụng chuẩn hóa vector đặc trưng từng pixel (pixel-wise feature vector normalization) để ngăn chặn sự bùng nổ tham số khi mạng ngày càng sâu và lớn.
*   **Ảnh minh họa đề xuất:** Lưới hình ảnh chân dung siêu thực độ phân giải cao ($1024 \times 1024$) được sinh ra bởi ProGAN để chứng minh năng lực đột phá của mô hình.


---

### **Slide 11: Kỷ nguyên mới của tạo ảnh khuôn mặt - StyleGAN**
*   **Tiêu đề:** StyleGAN: Đỉnh cao của sự kiểm soát và chân thực
*   **Nội dung văn bản:**
    *   **Sự ra đời:** Được phát triển bởi Nvidia, StyleGAN là một kiến trúc tiên tiến cho phép sinh ra các ảnh chân dung với độ phân giải và chất lượng cực cao.
    *   **Đột phá:** Không chỉ tạo ra ảnh đẹp, StyleGAN cung cấp khả năng kiểm soát đáng kinh ngạc đối với các thuộc tính của ảnh (như tuổi, giới tính, kiểu tóc, cảm xúc) thông qua việc thao tác trên không gian tiềm ẩn (latent space).
    *   **Vượt qua giới hạn:** StyleGAN giải quyết triệt để vấn đề "hộp đen" của GAN truyền thống, giúp việc sinh ảnh trở nên có thể lý giải (interpretable).
*   **Ảnh minh họa đề xuất:** Một lưới các khuôn mặt người giả siêu thực được tạo ra bởi StyleGAN, chứng minh độ sắc nét và tính đa dạng mà mắt thường khó phân biệt được với ảnh thật.

---

### **Slide 12: Giải phẫu Kiến trúc StyleGAN**
*   **Tiêu đề:** Kiến trúc đột phá: Từ bỏ Đầu vào Ngẫu nhiên truyền thống
*   **Nội dung văn bản:**
    *   Khác với các mạng GAN trước đây bắt đầu từ một vector nhiễu ngẫu nhiên, mạng sinh của StyleGAN bắt đầu từ một **đầu vào hằng số đã được học (Learnable constant input)**.
    *   **4 Thành phần cốt lõi của Generator:**
        1.  Đầu vào hằng số (Constant input).
        2.  Mạng ánh xạ (Mapping network).
        3.  Điều chế phong cách thông qua AdaIN (Adaptive Instance Normalization).
        4.  Đầu vào nhiễu ngẫu nhiên (Noise inputs).
*   **Ảnh minh họa đề xuất:** **Hình 3.7** *(Minh họa kiến trúc mạng của StyleGAN, cho thấy sự tách biệt giữa Mapping Network và Generator Network, cùng các khối AdaIN và Noise)*.

---

### **Slide 13: Mạng Ánh xạ (Mapping Network) & Không gian W**
*   **Tiêu đề:** Bí mật của sự kiểm soát: Không gian W (W Space)
*   **Nội dung văn bản:**
    *   **Vấn đề của không gian Z:** Vector nhiễu ban đầu (Không gian Z) thường bị "vướng mắc" (entangled). Việc thay đổi một đặc điểm (như tuổi) có thể làm biến dạng đặc điểm khác một cách không mong muốn.
    *   **Giải pháp (Mạng ánh xạ):** Một mạng nơ-ron đa lớp (MLP gồm 8 lớp) được dùng để ánh xạ vector $z$ thành một **không gian tiềm ẩn trung gian (W space)**.
    *   **Tác dụng:** Không gian W "tháo gỡ" các đặc điểm bị rối, tạo ra một ánh xạ tuyến tính và liên tục hơn. Nhờ đó, máy tính học được cách tách bạch rành mạch các thuộc tính ngữ nghĩa cấp cao.
*   **Ảnh minh họa đề xuất:** Đồ thị minh họa sự khác biệt giữa không gian Z (cong vênh, dính chùm đặc trưng) và không gian W (đã được duỗi thẳng, các đặc trưng phân tách rõ ràng).

---

### **Slide 14: AdaIN & Nhiễu ngẫu nhiên (Stochastic Variation)**
*   **Tiêu đề:** AdaIN & Noise: Thổi hồn vào từng chi tiết
*   **Nội dung văn bản:**
    *   **Điều khiển Phong cách (AdaIN):** Vector từ không gian W được biến đổi để kiểm soát trực tiếp các lớp AdaIN tại mỗi tầng tích chập của Generator. Điều này cho phép điều chỉnh "phong cách" cục bộ (từ cấu trúc khuôn mặt thô đến màu da) mà không làm hỏng bức ảnh.
    *   **Nhiễu ngẫu nhiên (Noise inputs):** Tại mỗi tầng, mạng còn được cung cấp thêm các tín hiệu nhiễu. Nhánh này đảm nhiệm các **biến thiên ngẫu nhiên (stochastic details)** như vị trí tàn nhang, nếp nhăn nhỏ, hay sự lộn xộn của các sợi tóc.
    *   Sự kết hợp này tách biệt hoàn toàn giữa "Cấu trúc định tính" (do W và AdaIN quyết định) và "Chi tiết ngẫu nhiên" (do Noise quyết định).
*   **Ảnh minh họa đề xuất:** Sơ đồ phóng to khối AdaIN cho thấy cách vector $w$ và nhiễu (Noise) được tiêm (inject) vào sau mỗi lớp Tích chập (Conv 3x3).

---

### **Slide 15: Ứng dụng thực tiễn & Tổng kết Phần 2**
*   **Tiêu đề:** Style Mixing, Inversion và Xương sống của Deepfake
*   **Nội dung văn bản:**
    *   **Trộn phong cách (Style Mixing):** Nhờ không gian W, ta có thể lai tạo mã tiềm ẩn của hai bức ảnh để tạo ra một khuôn mặt mang cấu trúc của người A nhưng có màu tóc, tông da của người B.
    *   **Đảo ngược StyleGAN (StyleGAN Inversion):** Quá trình tìm ra mã tiềm ẩn (latent code) của một **bức ảnh chụp thật**. Sau khi tìm được, ta có thể dùng StyleGAN để chỉnh sửa ảnh thật này (đổi tuổi, thêm nụ cười) một cách dễ dàng.
    *   **Tổng kết Phần 2:** Từ việc khắc phục nhiễu mờ bằng mạng tích chập (DCGAN), ổn định hàm Loss (WGAN), đến việc làm chủ hoàn toàn quá trình tạo ảnh độ phân giải cao bằng phân rã đặc trưng (StyleGAN) – chúng ta đã sẵn sàng bước vào thế giới ứng dụng đa phương thức ở Phần 3!
*   **Ảnh minh họa đề xuất:** **Hình 3.6 (Illustration of StyleMixing)** *(Minh họa việc trộn các cấp độ mã tiềm ẩn khác nhau từ hai khuôn mặt Source A và Source B để tạo ra các khuôn mặt lai)*.
