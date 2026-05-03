
### **Slide 1: Trang tiêu đề**
*   **Tiêu đề chính:** TRÍ TUỆ NHÂN TẠO TẠO SINH (GenAI) TRONG THỊ GIÁC MÁY TÍNH
*   **Tiêu đề phụ:** Phần 3: Tạo sinh có điều kiện & Kiểm soát đa phương thức (cGAN, CycleGAN & Text-to-Image)
*   **Nội dung văn bản:**
    *   Môn học: Thị giác máy tính
    *   Mục tiêu: Nắm vững các cơ chế kiểm soát AI đa phương thức (văn bản, ảnh phác thảo, nhãn lớp) và ứng dụng thực tiễn.
*   **Ảnh minh họa đề xuất:** Một hình ảnh ghép (collage) thể hiện sự kiểm soát: từ một câu prompt văn bản hoặc một nét vẽ phác thảo thô sơ biến thành một bức ảnh siêu thực hoàn chỉnh (như hình minh họa của DALL-E hoặc Pix2Pix).

---

### **Slide 2: Tại sao Tạo sinh có điều kiện lại là cốt lõi của thương mại?**
*   **Tiêu đề:** Bước ngoặt thực tiễn: Từ "Ngẫu nhiên" đến "Kiểm soát tuyệt đối"
*   **Nội dung văn bản:**
    *   **Hạn chế của GAN truyền thống:** Tạo sinh ngẫu nhiên (từ vector nhiễu $z$) mang tính học thuật cao, nhưng thiếu tính ứng dụng thực tế vì người dùng không thể quyết định AI sẽ vẽ gì.
    *   **Nhu cầu thương mại:** Người dùng thực tế luôn muốn "kiểm soát" AI (ví dụ: yêu cầu AI "tạo một khuôn mặt đang cười", "thay đổi màu tóc", hoặc "phối cảnh lại phòng khách").
    *   **Sức mạnh đa phương thức:** Kết nối các miền dữ liệu khác nhau (Văn bản - Text, Hình ảnh - Image, Phác thảo - Sketch) giúp ứng dụng GenAI sâu rộng vào thiết kế thời trang, chỉnh sửa ảnh y tế, hay công nghiệp giải trí kỹ thuật số.

---

### **Slide 3: Conditional GAN (cGAN) - Ép AI làm theo "Đơn đặt hàng"**
*   **Tiêu đề:** Conditional GAN (cGAN): Đưa điều kiện vào quá trình tạo sinh
*   **Nội dung văn bản:**
    *   **Khái niệm:** cGAN cho phép kiểm soát đầu ra của bộ sinh bằng cách thêm thông tin điều kiện (ký hiệu là $y$) vào cả Mạng Sinh (G) và Mạng Phân biệt (D).
    *   **Thông tin điều kiện ($y$):** Có thể là nhãn lớp (class label), một đoạn văn bản mô tả, hoặc một hình ảnh/bản đồ phác thảo.
    *   **Cơ chế:** Thay vì chỉ nhận nhiễu ngẫu nhiên, Mạng Sinh G sẽ bị "ép" phải biến đổi nhiễu sao cho kết quả đầu ra khớp hoàn toàn với điều kiện $y$ được giao.
*   **Ảnh minh họa đề xuất:** **Hình 3.4b (cGAN) hoặc Hình 5.59b** minh họa cấu trúc của Conditional GAN, cho thấy điều kiện $y$ (class) được đưa vào cả khối Generator và Discriminator cùng lúc.

---

### **Slide 4: Bài toán Chuyển đổi Ảnh sang Ảnh (Image-to-Image Translation)**
*   **Tiêu đề:** Image-to-Image Translation & Thuật toán Pix2Pix
*   **Nội dung văn bản:**
    *   **Mục tiêu:** Ánh xạ cấu trúc từ một miền hình ảnh này sang một miền hình ảnh khác. (Ví dụ: Chuyển bản đồ thành không ảnh thực tế, chuyển ảnh đen trắng thành ảnh màu, chuyển nét vẽ phác thảo thành ảnh chụp).
    *   **Thuật toán Pix2Pix:** Là hệ thống tiên phong ứng dụng cGAN kết hợp với kiến trúc U-Net để thực hiện việc chuyển đổi này.
    *   **Điều kiện khắt khe (Paired Data):** Pix2Pix yêu cầu bắt buộc phải có tập dữ liệu "có cặp tương ứng" (paired images) để huấn luyện. (Tức là phải có ảnh A và ảnh B khớp nhau từng pixel để AI học cách chuyển đổi).
*   **Ảnh minh họa đề xuất:** **Hình 5.60a** minh họa các tác vụ của Pix2Pix (như chuyển nhãn Semantic sang cảnh đường phố, phác thảo túi xách thành ảnh túi xách thật).

---

### **Slide 5: Giới hạn Dữ liệu và Đột phá mang tên CycleGAN**
*   **Tiêu đề:** CycleGAN: Chuyển đổi phong cách không cần dữ liệu cặp
*   **Nội dung văn bản:**
    *   **Vấn đề của Pix2Pix:** Trong thực tế, việc tìm dữ liệu "có cặp" rất đắt đỏ hoặc bất khả thi. (Làm sao tìm được ảnh chụp một con ngựa thường và một con ngựa vằn đứng giống hệt nhau ở cùng một bối cảnh?).
    *   **Giải pháp CycleGAN:** Cho phép thực hiện chuyển đổi ảnh sang ảnh giữa hai tập dữ liệu **không có cặp tương ứng (unpaired)**.
    *   **Kiến trúc:** Sử dụng đồng thời hai Mạng Sinh và hai Mạng Phân biệt để tạo thành một vòng lặp (ví dụ: Ngựa thường $\rightarrow$ Ngựa vằn $\rightarrow$ Ngựa thường) nhằm duy trì cấu trúc gốc của bức ảnh.
*   **Ảnh minh họa đề xuất:** **Hình 12-32** (Kết quả chuyển đổi ảnh ngựa thường thành ngựa vằn của CycleGAN), hoặc **Hình 5.60b** (Chuyển đổi ảnh chụp sang tranh Monet, Mùa hè sang Mùa đông).


---

### **Slide 6: Giải mã CycleGAN - Hàm mất mát Chu trình (Cycle-Consistency Loss)**
*   **Tiêu đề:** Bí ẩn của CycleGAN: Tính nhất quán chu trình
*   **Nội dung văn bản:**
    *   **Vấn đề:** Khi không có dữ liệu cặp (unpaired data), làm sao để AI không biến "một con ngựa đang chạy" thành "một con ngựa vằn đang ăn cỏ"? Làm sao để giữ nguyên nội dung (content) mà chỉ đổi phong cách (style)?
    *   **Giải pháp:** Áp dụng đồng thời 2 bộ sinh (Generator $G$ và $F$) và 2 bộ phân biệt ($D_X$ và $D_Y$).
    *   **Cycle-Consistency Loss:** Đảm bảo rằng nếu ta dùng $G$ chuyển ảnh ngựa ($x$) thành ngựa vằn ($y$), thì khi dùng $F$ chuyển con ngựa vằn đó ngược lại, ta phải thu được chính xác bức ảnh con ngựa ban đầu ($F(G(x)) \approx x$). 
    *   Cơ chế này ép mạng nơ-ron phải bảo toàn bố cục và cấu trúc không gian của bức ảnh gốc.
*   **Ảnh minh họa đề xuất:** **Hình 7.9** *(Sơ đồ framework CycleGAN cho thấy luồng Forward và Reverse cùng với Cycle-consistency loss)*.

---

### **Slide 7: Bước ngoặt Đa phương thức (Multimodal) - Text-to-Image**
*   **Tiêu đề:** Text-to-Image: Dùng ngôn ngữ vẽ nên thế giới
*   **Nội dung văn bản:**
    *   **Định nghĩa:** Text-to-Image là tác vụ tạo sinh hình ảnh có điều kiện, trong đó "điều kiện" đầu vào là một đoạn văn bản ngôn ngữ tự nhiên (Natural Language).
    *   **Thách thức:** Hình ảnh có số chiều cực kỳ lớn (hàng triệu pixel). Việc sinh ra một bức ảnh mạch lạc, tuân thủ đúng một câu mô tả chưa từng xuất hiện trong tập huấn luyện (zero-shot) là một bài toán vô cùng khó.
    *   **Sự tiến hóa:** Từ những mô hình sơ khai dùng mạng RNN kết hợp GAN (như StackGAN sinh ảnh mờ nhòe phân giải thấp 64x64), đến nay chúng ta đã có các siêu mô hình tạo sinh những bức ảnh siêu thực và kết hợp được các khái niệm phi logic (ví dụ: "ghế bành hình quả bơ").
*   **Ảnh minh họa đề xuất:** **Hình 6.49** *(Các kết quả tạo ảnh từ văn bản của hệ thống DALL-E, ví dụ như hình chiếc ghế bành hình quả bơ hoặc củ cải mặc váy)*.

---

### **Slide 8: Cầu nối Ngôn ngữ và Thị giác - Mô hình CLIP**
*   **Tiêu đề:** CLIP: Dạy máy tính hiểu hình ảnh qua ngôn ngữ
*   **Nội dung văn bản:**
    *   Để AI có thể vẽ ảnh từ chữ, trước tiên nó phải "hiểu" sự tương quan giữa chữ và ảnh. Giải pháp mang tính bước ngoặt chính là **CLIP (Contrastive Language-Image Pretraining)**.
    *   **Cơ chế hoạt động:** CLIP tối ưu hóa đồng thời một bộ mã hóa ảnh (Image Encoder) và một bộ mã hóa văn bản (Text Encoder).
    *   Học đối lập (Contrastive Learning): Mô hình được huấn luyện trên hàng trăm triệu cặp ảnh-văn bản từ internet, ép vector đặc trưng của ảnh và vector đặc trưng của câu mô tả phải "nằm gần nhau" (tích vô hướng cao) nếu chúng là một cặp đúng, và đẩy chúng ra xa nếu là cặp sai.
    *   **Vai trò:** CLIP trở thành "giám khảo" đánh giá độ khớp giữa ảnh và văn bản, đóng vai trò cốt lõi trong các hệ thống tạo ảnh mở (open-domain).
*   **Ảnh minh họa đề xuất:** Sơ đồ huấn luyện đối lập của CLIP (Tạo ma trận tương đồng giữa các Text Encoder và Image Encoder). Hoặc **Hình 6.47** minh họa khả năng đọc hiểu text và hình của CLIP.

---

### **Slide 9: Giải phẫu hệ thống DALL-E - VQ-VAE kết hợp Transformer**
*   **Tiêu đề:** DALL-E: Sự kết hợp hoàn hảo giữa VQ-VAE và Transformer
*   **Nội dung văn bản:**
    *   Không dùng GAN, các hệ thống Text-to-Image đỉnh cao như DALL-E sử dụng kiến trúc khác biệt hoàn toàn: **VQ-VAE** và **Transformer Decoder**.
    *   **Giai đoạn 1 (VQ-VAE):** Thay vì làm việc với hàng triệu pixel, VQ-VAE nén bức ảnh thành một lưới nhỏ (ví dụ 32x32) các "từ vựng thị giác" (visual words) rời rạc (lấy từ một từ điển/codebook giới hạn).
    *   **Giai đoạn 2 (Transformer):** Văn bản đầu vào được mã hóa thành các token. Một mạng Transformer Decoder sẽ nhận chuỗi token văn bản này và dự đoán tuần tự (autoregressively) các "token hình ảnh" cho lưới 32x32.
    *   Cuối cùng, Decoder của VQ-VAE giải mã lưới token này thành bức ảnh RGB hoàn chỉnh.
*   **Ảnh minh họa đề xuất:** **Hình 5.58** *(Sơ đồ mô hình VQ-VAE cho thấy quá trình lượng tử hóa vector và từ điển codebook)*.

---

### **Slide 10: Ứng dụng Text-to-Face (Tạo và chỉnh sửa khuôn mặt từ văn bản)**
*   **Tiêu đề:** Text-to-Face: Điều khiển khuôn mặt bằng "Mệnh lệnh"
*   **Nội dung văn bản:**
    *   **Định nghĩa:** Là một nhánh chuyên sâu của Text-to-Image, nhằm tạo hoặc chỉnh sửa ảnh khuôn mặt người chất lượng cao sao cho nhất quán về mặt ngữ nghĩa với văn bản đầu vào.
    *   **Cách thức thực hiện:** Thường kết hợp sức mạnh tạo ảnh chân dung của **StyleGAN** với khả năng hiểu ngôn ngữ của **CLIP**.
    *   **Ví dụ (TediGAN / StyleCLIP):** Mạng nơ-ron ánh xạ đoạn văn bản (ví dụ: *"một người đàn ông có râu, tóc đen"*) vào không gian tiềm ẩn $W$ của StyleGAN. Sau đó, thao tác trên không gian này để thay đổi thuộc tính khuôn mặt theo đúng ý muốn của người dùng.
    *   Mở ra kỷ nguyên tạo Avatar, hồ sơ tội phạm và chỉnh sửa ảnh bằng giọng nói/văn bản.
*   **Ảnh minh họa đề xuất:** **Hình 3.10** *(Minh họa ứng dụng Text-to-Face của hệ thống TediGAN và Talk-to-Edit, nơi văn bản thay đổi trực tiếp thuộc tính khuôn mặt)*.

---

### **Slide 11: Kiểm soát Đa phương thức - Từ Phác thảo & Phân đoạn đến Ảnh thực (Sketch/Parsing-to-Image)**
*   **Tiêu đề:** Điều khiển AI bằng Phác thảo (Sketch) và Bản đồ Ngữ nghĩa (Parsing)
*   **Nội dung văn bản:**
    *   **Phân đoạn thành Ảnh (Parsing-to-Face/Image):** Sử dụng các bản đồ ngữ nghĩa (semantic mask) để chỉ định chính xác vị trí của các bộ phận (mắt, mũi, bối cảnh). Các mô hình như Pix2Pix hoặc pSp sẽ ánh xạ bản đồ này thành một bức ảnh siêu thực, cho phép thao tác không gian linh hoạt.
    *   **Phác thảo thành Ảnh (Sketch-to-Face/Image):** Phác thảo là một dạng biểu diễn trừu tượng hơn. Hệ thống (như iGAN, pSp, CocosNet) tìm sự tương ứng giữa nét vẽ phác thảo thô sơ và không gian đặc trưng của ảnh thật để "tô màu" và kết xuất thành ảnh hoàn chỉnh.
    *   **Ý nghĩa:** Cung cấp cho nghệ sĩ và người dùng công cụ kiểm soát bố cục hình học tuyệt đối thay vì chỉ dùng văn bản.
*   **Ảnh minh họa đề xuất:** Hình ảnh minh họa một nét vẽ phác thảo con mèo biến thành ảnh chụp con mèo thật của DALL-E, hoặc giao diện biến nét vẽ thành ảnh phong cảnh/khuôn mặt.

---

### **Slide 12: Chỉnh sửa Thuộc tính Khuôn mặt (Attribute-to-Face Editing)**
*   **Tiêu đề:** Chỉnh sửa Thuộc tính: Thương mại hóa sự sáng tạo
*   **Nội dung văn bản:**
    *   **Bài toán:** Thay đổi một hoặc nhiều thuộc tính (thêm kính, đổi màu tóc, thay đổi tuổi, tạo nụ cười) trong khi vẫn phải giữ nguyên danh tính (identity) của người trong ảnh gốc.
    *   **Tiếp cận qua Image-to-Image:** Mô hình **StarGAN** và **StarGANv2** cho phép huấn luyện đồng thời nhiều tập dữ liệu với nhiều miền thuộc tính khác nhau trong cùng một mô hình duy nhất, thay vì chỉ chuyển đổi 1-1.
    *   **Thao tác trên Không gian Tiềm ẩn (Latent Space Manipulation):** Tìm ra các "hướng đi" (directions) mang ý nghĩa ngữ nghĩa trong không gian tiềm ẩn của StyleGAN. Ví dụ, di chuyển vector dọc theo hướng "nụ cười" sẽ làm khuôn mặt dần mỉm cười một cách tự nhiên.
*   **Ảnh minh họa đề xuất:** Lưới hình ảnh kết quả của StarGAN hiển thị một khuôn mặt gốc được chuyển đổi mượt mà qua các thuộc tính khác nhau (đổi màu tóc, thêm giới tính, thêm biểu cảm).

---

### **Slide 13: Ứng dụng Thực tiễn - Tại sao GenAI thay đổi thế giới?**
*   **Tiêu đề:** Đưa GenAI vào Đời sống & Công nghiệp
*   **Nội dung văn bản:**
    *   Khả năng sáng tạo có kiểm soát của GANs và các mô hình tạo sinh đã mở ra vô số ứng dụng đột phá có giá trị thương mại cao:
    *   **Tăng cường dữ liệu (Data Augmentation):** Khắc phục tình trạng thiếu dữ liệu huấn luyện trong y tế (tạo ảnh X-quang giả có khối u) hoặc xe tự lái (tạo cảnh thời tiết khắc nghiệt).
    *   **Tăng cường độ phân giải (Super-resolution):** Phục hồi chi tiết cho các bức ảnh hoặc video chất lượng thấp, ứng dụng mạnh trong camera an ninh và y tế.
    *   **Công nghiệp Sáng tạo:** Tạo nhân vật game, tài sản số (digital assets), thiết kế thời trang, và chuyển đổi phong cách nghệ thuật (Style Transfer).
*   **Ảnh minh họa đề xuất:** Kết quả chuyển đổi CycleGAN biến ảnh chụp con ngựa thường thành ngựa vằn, hoặc chuyển đổi phong cách ảnh từ mùa hè sang mùa đông.

---

### **Slide 14: Mặt trái của GenAI - Vấn đề Deepfake & Bảo mật**
*   **Tiêu đề:** Lưỡi gươm hai lưỡi: Deepfake & Đạo đức AI
*   **Nội dung văn bản:**
    *   **Deepfake là gì?** Là công nghệ sử dụng mạng nơ-ron sâu để chỉnh sửa, giả mạo khuôn mặt và giọng nói của một người thành người khác một cách cực kỳ chân thực.
    *   **Hệ lụy:** Gây ra nguy cơ lớn về đánh cắp danh tính, vượt qua các hệ thống xác thực khuôn mặt (Face Authentication), và tạo ra thông tin sai lệch (misinformation) trong xã hội.
    *   **Phòng chống (Deepfake Detection):** Các cuộc thi lớn như Deepfake Detection Challenge (DFDC) đã được tổ chức để thúc đẩy cộng đồng nghiên cứu xây dựng các thuật toán phát hiện và phân biệt ảnh/video bị giả mạo.
*   **Ảnh minh họa đề xuất:** Hình ảnh so sánh từ tập dữ liệu DFDC: Một bên là khuôn mặt thật (Real) và một bên là khuôn mặt đã bị hoán đổi bằng Deepfake (Fake) yêu cầu thuật toán phải nhận diện được.

---

### **Slide 15: Tổng kết toàn bộ Chuyên đề GenAI (Phần 1, 2, 3)**
*   **Tiêu đề:** Tổng kết: Từ "Ảo ảnh ngẫu nhiên" đến "Người kiến tạo vĩ đại"
*   **Nội dung văn bản:**
    *   **Hành trình GenAI trong Thị giác máy tính:**
        *   **Phần 1 (Nền tảng):** Chúng ta thay đổi tư duy, sử dụng hàm mục tiêu Minimax và cân bằng Nash để dạy máy tính tự học cách sáng tạo (VAE & Vanilla GAN).
        *   **Phần 2 (Phá vỡ giới hạn):** Vượt qua rào cản mờ nhòe và bất ổn định bằng Mạng tích chập (DCGAN), Toán học Wasserstein (WGAN) và giải mã cấu trúc khuôn mặt siêu thực (StyleGAN).
        *   **Phần 3 (Làm chủ AI):** Đưa trí tuệ tạo sinh vào ứng dụng thương mại bằng cách kết hợp Đa phương thức (văn bản, phác thảo, nhãn) để ép AI sinh ra chính xác những gì con người mong muốn (cGAN, CycleGAN, Text-to-Image).
    *   *GenAI không chỉ là tương lai, nó đã và đang tái định hình cách chúng ta tương tác với thế giới kỹ thuật số!*
