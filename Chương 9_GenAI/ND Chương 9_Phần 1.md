
### **Slide 1: Trang tiêu đề**
*   **Tiêu đề chính:** TRÍ TUỆ NHÂN TẠO TẠO SINH (GenAI) TRONG THỊ GIÁC MÁY TÍNH
*   **Tiêu đề phụ:** Phần 1: Nền tảng Mô hình tạo sinh & Trò chơi đối nghịch (VAEs & Vanilla GAN)
*   **Nội dung văn bản:**
    *   Môn học: Thị giác máy tính
    *   Chủ đề: Chuyển đổi tư duy từ "Dạy máy tính nhận diện" sang "Dạy máy tính sáng tạo".
*   **Ảnh minh họa đề xuất:** Hình ảnh minh họa cuộc cạnh tranh đối nghịch giữa Mạng sinh (Generator) và Mạng phân biệt (Discriminator) hoặc một biểu đồ kiến trúc tiêu chuẩn của GAN gồm Generator và Discriminator.

---

### **Slide 2: Tại sao Mô hình Tạo sinh (Generative Models) lại cực kỳ quan trọng?**
*   **Tiêu đề:** Bước ngoặt tư duy: Từ "Nhận diện" đến "Sáng tạo"
*   **Nội dung văn bản:** 
    *   **Thay đổi hệ quy chiếu:** Khác với các hệ thống AI trước đây chỉ tập trung vào việc "phân loại" hoặc "nhận diện" thế giới có sẵn, GenAI cho phép máy tính **tự sáng tạo ra dữ liệu hình ảnh hoàn toàn mới** chưa từng tồn tại.
    *   **Đột phá về tự học (Self-learning):** Các mô hình GenAI có khả năng tự học cách đánh giá chất lượng ảnh mà không cần con người định nghĩa sẵn các quy tắc hay đặc trưng thủ công.
    *   **Nền tảng toán học vững chắc:** Nắm vững **hàm mục tiêu Minimax** và **sự cân bằng Nash** là cơ sở bắt buộc để hiểu cách các siêu mô hình AI hiện đại "cạnh tranh", cập nhật trọng số và hội tụ.

---

### **Slide 3: Mô hình Phân biệt (Discriminative) vs. Mô hình Sinh (Generative)**
*   **Tiêu đề:** Sự khác biệt cốt lõi của hai trường phái AI
*   **Nội dung văn bản:**
    *   **Mô hình Phân biệt (Discriminative models):** Dùng để phân loại. Nhiệm vụ chính là học một ranh giới quyết định (decision boundary) giữa các lớp dữ liệu. Chúng quan tâm đến sự khác biệt giữa các lớp mà không cần hiểu bản chất cấu tạo của lớp đó.
    *   **Mô hình Sinh (Generative models):** Dùng để tạo mới. Mục tiêu cốt lõi không phải là phân loại, mà là **học phân phối xác suất của dữ liệu huấn luyện**. Bằng cách hiểu cách dữ liệu được sinh ra thông qua các biến tiềm ẩn (hidden variables), mô hình có thể tạo ra các mẫu dữ liệu mới.
*   **Ảnh minh họa đề xuất:** **Hình 5.3** *(Sự khác biệt giữa mô hình mô tả/phân biệt và mô hình tạo sinh trong việc mô hình hóa các biến phụ thuộc ẩn của một vật thể)*.

---

### **Slide 4: Nền tảng tiền đề - Bộ tự mã hóa (Auto-encoder)**
*   **Tiêu đề:** Kiến trúc Auto-encoder - Cánh cửa bước vào không gian tiềm ẩn
*   **Nội dung văn bản:**
    *   Trước khi đến với VAE, ta cần hiểu Auto-encoder truyền thống. Nó gồm hai phần chính: **Mạng mã hóa (Encoder)** và **Mạng giải mã (Decoder)**.
    *   **Encoder** có nhiệm vụ nén dữ liệu ảnh thô thành một biểu diễn nhỏ gọn hơn gọi là **không gian tiềm ẩn (latent space / code)**.
    *   **Decoder** nhận không gian tiềm ẩn này và cố gắng giải mã để **tái tạo lại (reconstruct)** chính xác bức ảnh ban đầu.
    *   *Hạn chế:* Auto-encoder thông thường chỉ giỏi "ghi nhớ" và tái tạo, nhưng không thể "sáng tạo" do không gian tiềm ẩn không liên tục và không có mô hình xác suất rõ ràng.
*   **Ảnh minh họa đề xuất:** **Hình 5.4** *(Minh họa đơn giản của mô hình deep generative model "auto-encoder", mã hóa ảnh đầu vào thành latent code và giải mã để tái tạo)*.

---

### **Slide 5: Variational Autoencoder (VAE) - Dạy máy tính sáng tạo có kiểm soát**
*   **Tiêu đề:** Variational Autoencoder (VAE) và Cơ chế lấy mẫu
*   **Nội dung văn bản:**
    *   **Giải quyết bài toán sáng tạo:** VAE khắc phục điểm yếu của Auto-encoder bằng cách **ép không gian tiềm ẩn tuân theo một phân phối xác suất** (thường là phân phối chuẩn Gaussian).
    *   **Cơ chế hoạt động:** Encoder của VAE không xuất ra một vector cố định, mà xuất ra **giá trị trung bình (Mean)** và **phương sai (Variance)** của phân phối Gaussian.
    *   **Sinh ảnh mới:** Bằng cách lấy mẫu (sampling) ngẫu nhiên một vector $z$ từ phân phối này và đưa qua Decoder, ta thu được một bức ảnh hoàn toàn mới nhưng vẫn mang các đặc tính của tập dữ liệu gốc.
    *   **Thủ thuật tái tham số hóa (Reparameterization Trick):** Kỹ thuật toán học sống còn giúp quá trình lấy mẫu ngẫu nhiên vẫn có thể tính được đạo hàm để huấn luyện mạng nơ-ron.
*   **Ảnh minh họa đề xuất:** **Hình 5.5** *(Thủ thuật Reparameterization trick được sử dụng trong VAE để xấp xỉ gradient ngẫu nhiên trong quá trình huấn luyện)* hoặc **Hình 3.2** *(Pipeline của VAE từ ảnh thô $x$ -> $z$ -> $\mu, \Sigma$ -> $\hat{z}$ -> giải mã ra $\hat{x}$)*. 


---

### **Slide 6: Giới thiệu Mạng Sinh đối nghịch (GANs) - Cuộc chơi của sự sáng tạo**
*   **Tiêu đề:** Mạng Sinh đối nghịch (Vanilla GAN)
*   **Nội dung văn bản:**
    *   **Sự ra đời:** Được Ian Goodfellow giới thiệu vào năm 2014, GAN là một bước đột phá trong nhóm mô hình sinh (generative models).
    *   **Mục tiêu cốt lõi:** Không phải để phân loại, mà là học phân phối xác suất của dữ liệu huấn luyện để sáng tạo ra các mẫu dữ liệu mới hoàn toàn chưa từng tồn tại nhưng trông giống hệt dữ liệu gốc.
    *   **Kiến trúc:** Cấu thành từ một cuộc "cạnh tranh" theo lý thuyết trò chơi (game theory) giữa hai mạng nơ-ron riêng biệt: **Mạng Sinh (Generator)** và **Mạng Phân biệt (Discriminator)**.
*   **Ảnh minh họa đề xuất:** **Hình 5.6** *(Minh họa quá trình huấn luyện đối nghịch: Mạng phân biệt cố gắng phân loại ảnh thật/giả, trong khi mạng sinh cố gắng tạo ảnh thực tế hơn để đánh lừa mạng phân biệt)*.

---

### **Slide 7: Phân tích Kiến trúc - Mạng Sinh (Generator - G)**
*   **Tiêu đề:** Mạng Sinh (Generator): "Kẻ làm giả" tài ba
*   **Nội dung văn bản:**
    *   **Nhiệm vụ:** Tạo ra dữ liệu giả (fake data) có đặc tính trông giống thật nhất có thể.
    *   **Đầu vào:** Nhận một **vector nhiễu ngẫu nhiên (z)**, thường được lấy mẫu từ một phân phối chuẩn Gaussian hoặc phân phối đều. Vector nhiễu này đóng vai trò như "hạt giống" cho quá trình sáng tạo.
    *   **Đầu ra:** Cố gắng biến đổi vector nhiễu này thành một mẫu hình ảnh hoàn chỉnh có cùng định dạng với dữ liệu thật.
*   **Ảnh minh họa đề xuất:** Một phần cắt từ **Hình 12.10: GAN**, tập trung vào khối Generator $G$ nhận nhiễu ngẫu nhiên $z \sim p(z)$ và sinh ra dữ liệu giả $\hat{x}$.

---

### **Slide 8: Phân tích Kiến trúc - Mạng Phân biệt (Discriminator - D)**
*   **Tiêu đề:** Mạng Phân biệt (Discriminator): "Cảnh sát" thẩm định
*   **Nội dung văn bản:**
    *   **Nhiệm vụ:** Đóng vai trò như một chuyên gia thẩm định hoặc "cảnh sát" (bản chất là một bộ phân loại nhị phân).
    *   **Đầu vào:** Nhận một mẫu dữ liệu duy nhất, có thể là **ảnh thật (x)** từ tập dữ liệu huấn luyện hoặc **ảnh giả** do Mạng Sinh tạo ra.
    *   **Đầu ra:** Tính toán và đưa ra một xác suất thể hiện mức độ tin tưởng rằng bức ảnh đầu vào là ảnh thật (giá trị $D(x)$).
*   **Ảnh minh họa đề xuất:** Khối Discriminator $D$ từ **Hình 12-14** *(Kiến trúc GAN tiêu chuẩn)*, cho thấy quá trình nhận cả ảnh thật và ảnh giả rồi xuất ra dự đoán "Real / Fake".

---

### **Slide 9: Bản chất Toán học - Bài toán Minimax**
*   **Tiêu đề:** Trò chơi Tổng bằng không (Zero-sum Game)
*   **Nội dung văn bản:**
    *   **Sự cạnh tranh:** Tương tác giữa $G$ và $D$ là một "trò chơi tổng bằng không", nơi lợi ích của mạng này là thiệt hại của mạng kia.
    *   **Mục tiêu của D:** Tối đa hóa khả năng phân biệt chính xác. $D$ muốn gán xác suất cao cho ảnh thật ($\log D(x)$) và gán xác suất thấp cho ảnh giả ($\log(1 - D(G(z)))$).
    *   **Mục tiêu của G:** Tối đa hóa khả năng "đánh lừa" $D$. $G$ muốn $D$ gán xác suất cao cho ảnh giả do mình tạo ra. 
    *   **Hàm mục tiêu Minimax:**
        $$ \min_G \max_D V(G,D) = \mathbb{E}_{x \sim p_{data}(x)}[\log D(x)] + \mathbb{E}_{z \sim p_z(z)}[\log(1 - D(G(z)))] $$.
*   **Ảnh minh họa đề xuất:** Công thức toán học hàm mục tiêu Minimax phóng to, có chú thích giải nghĩa từng thành phần kỳ vọng $\mathbb{E}$ của dữ liệu thật và dữ liệu nhiễu.

---

### **Slide 10: Huấn luyện luân phiên & Điểm hội tụ**
*   **Tiêu đề:** Huấn luyện luân phiên & Trạng thái Cân bằng Nash
*   **Nội dung văn bản:**
    *   **Huấn luyện D:** Giữ cố định trọng số của $G$. Cung cấp cho $D$ một lô (batch) ảnh thật và ảnh giả. $D$ cập nhật trọng số để phân biệt tốt hơn hai loại ảnh này.
    *   **Huấn luyện G:** Giữ cố định trọng số của $D$. $G$ tạo ra lô ảnh giả mới, dùng phản hồi từ $D$ để cập nhật trọng số nhằm tạo ra ảnh trông thật hơn.
    *   **Đích đến (Trạng thái Cân bằng Nash):** Quá trình kết thúc khi $G$ tinh vi đến mức tạo ra mẫu giả cực kỳ thuyết phục. Lúc này $D$ bị nhầm lẫn hoàn toàn, chỉ có thể dự đoán ngẫu nhiên với xác suất 50%. Mạng $G$ lúc này đã "tốt nghiệp"!
*   **Ảnh minh họa đề xuất:** **Hình 8.3** *(Cập nhật của discriminator ở trên và generator ở dưới)* minh họa quá trình luân phiên tối ưu hóa hoặc sơ đồ khối thuật toán lặp lại hai bước.


---

### **Slide 11: Khó khăn thực tiễn - Huấn luyện GAN không hề dễ dàng**
*   **Tiêu đề:** Mặt tối của Vanilla GAN: Bất ổn định & Suy biến Gradient
*   **Nội dung văn bản:**
    *   **Nhạy cảm với siêu tham số (Hypersensitivity):** GAN gốc cực kỳ "khó tính" với việc chọn learning rate, batch size hay cấu trúc mạng.
    *   **Sự mất cân bằng (Unstable Training):** Quá trình huấn luyện là một trò chơi luân phiên. Nếu một trong hai mạng (G hoặc D) trở nên "quá giỏi" quá nhanh, mạng kia sẽ không theo kịp.
    *   **Suy biến Gradient (Vanishing Gradient):** Nếu Mạng Phân biệt (D) quá hoàn hảo ngay từ đầu, nó sẽ phân biệt đúng 100%. Lúc này gradient trả về cho Mạng Sinh (G) sẽ gần bằng 0, khiến G ngừng học tập hoàn toàn.
*   **Ảnh minh họa đề xuất:** Đồ thị hàm Loss dao động dữ dội không hội tụ, hoặc sơ đồ minh họa gradient bị triệt tiêu khi D quá áp đảo.

---

### **Slide 12: Hiện tượng kinh điển - Sụp đổ chế độ (Mode Collapse)**
*   **Tiêu đề:** Ác mộng của Mạng Sinh: Sụp đổ chế độ (Mode Collapse)
*   **Nội dung văn bản:**
    *   **Khái niệm:** Đây là lỗi phổ biến nhất khi huấn luyện GAN. Mạng Sinh (G) thay vì học toàn bộ sự đa dạng của dữ liệu gốc, lại chỉ tìm ra một vài "mẹo" để đánh lừa D.
    *   **Hệ quả:** G trở nên "lười biếng" và chỉ sinh ra một vài bức ảnh giống hệt nhau lặp đi lặp lại, bất kể đầu vào vector nhiễu $z$ là gì.
    *   **Ví dụ:** Khi huấn luyện sinh ảnh chữ số (MNIST), thay vì sinh ra đủ từ 0 đến 9, GAN bị lỗi này có thể chỉ sinh ra toàn số "1" vì nó phát hiện ra D rất dễ bị lừa bởi số "1".
*   **Ảnh minh họa đề xuất:** Một lưới ảnh kết quả của GAN bị Mode Collapse (ví dụ: 16 ô ảnh nhưng cả 16 ô đều hiển thị cùng một khuôn mặt hoặc cùng một chữ số giống hệt nhau).

---

### **Slide 13: Đánh giá mô hình - Làm sao biết AI "sáng tạo" tốt?**
*   **Tiêu đề:** Đánh giá chất lượng: Bài toán không có "Ground Truth"
*   **Nội dung văn bản:**
    *   **Thách thức:** Khác với bài toán phân loại có nhãn (Ground Truth) rõ ràng, đối với mô hình tạo sinh, không có đáp án chuẩn để biết một bức ảnh được sinh ra "đẹp" hay "xấu".
    *   **Đóng góp của GAN:** Sự ra đời của GAN giải quyết bài toán này bằng cách biến việc đánh giá chất lượng thành một **bài toán phân loại nhị phân** thông qua Mạng Phân biệt (D). D đóng vai trò như thước đo học được từ dữ liệu (data-driven metric).
    *   **Độ đo thực tế:** Trong thực nghiệm, ngoài việc xem xét hàm Loss, người ta phải dùng các chỉ số thống kê phức tạp hơn (như Inception Score hay FID) để đánh giá độ sắc nét và tính đa dạng của ảnh sinh ra.
*   **Ảnh minh họa đề xuất:** Sơ đồ so sánh giữa hàm Loss truyền thống (có nhãn) và hàm Loss đối nghịch của GAN (dùng D làm giám khảo).

---

### **Slide 14: Tổng kết Phần 1**
*   **Tiêu đề:** Wrap-up Phần 1: Nền tảng Mô hình Tạo sinh
*   **Nội dung văn bản:**
    *   **Sự dịch chuyển:** Từ mô hình phân biệt (tìm ranh giới) sang mô hình sinh (học phân phối xác suất).
    *   **VAE (Biến phân tự mã hóa):** Đặt nền móng cho việc tạo ảnh từ không gian tiềm ẩn tuân theo phân phối Gaussian, tối ưu bằng thủ thuật toán học (Reparameterization Trick).
    *   **Vanilla GAN:** Đột phá vĩ đại với **Trò chơi đối nghịch tổng bằng không (Zero-sum game)**. 
    *   **Mục tiêu tối thượng:** Đạt được **Trạng thái cân bằng Nash**, nơi Mạng Sinh (G) "ảo thuật" ra dữ liệu khiến Mạng Phân biệt (D) nhầm lẫn với tỷ lệ 50/50.

---

### **Slide 15: Hé mở Phần 2**
*   **Tiêu đề:** Hé mở Phần 2: Phá vỡ giới hạn & Các Siêu Mô hình
*   **Nội dung văn bản:**
    *   **Vấn đề còn tồn đọng:** Vanilla GAN dùng mạng perceptron đa lớp (MLP) thông thường nên ảnh sinh ra thường mờ, nhỏ và dễ bị Sụp đổ chế độ (Mode Collapse).
    *   **Hướng đi tiếp theo (Phần 2):** 
        *   Làm sao để sinh ảnh độ phân giải cao, rõ nét? $\rightarrow$ Tích hợp Mạng Tích chập (CNN) với kiến trúc **DCGAN**.
        *   Làm sao giải quyết triệt để tính bất ổn định toán học? $\rightarrow$ Sử dụng khoảng cách Wasserstein (**WGAN**).
        *   Làm sao kiểm soát được tuổi tác, màu tóc, góc mặt? $\rightarrow$ Kỷ nguyên Deepfake với **StyleGAN**.
*   **Ảnh minh họa đề xuất:** Hình ảnh minh họa sự tiến hóa của GAN: Từ ảnh nhiễu mờ của Vanilla GAN sang ảnh khuôn mặt siêu thực của StyleGAN.

---
