**Slide 1**
**Tiêu đề:** Chương 6. Mạng CNN (Tiếp theo)
**Tiêu đề phụ:** Tiết 2 - Pretrained Models và Transfer Learning
**Nội dung:**
*   6.3. Pretrained Models for Transfer Learning (Mô hình huấn luyện sẵn cho Học chuyển giao)
*   6.3.1. Khái niệm và Lợi ích
*   6.3.2. Cơ chế và Các chiến lược Transfer Learning

---

**Slide 2**
**Tiêu đề:** 6.3.1 Khái niệm Học chuyển giao (Transfer Learning)
**Nội dung:**
*   **Định nghĩa:** Việc chuyển giao kiến thức (tri thức) từ một bài toán/tác vụ này sang một bài toán/tác vụ khác được gọi là học chuyển giao (Transfer learning). 
*   **Cách tiếp cận:** Nói chung, không nên huấn luyện một mạng nơ-ron sâu (DNN) khổng lồ từ đầu. Thay vào đó, hãy tìm một mạng nơ-ron hiện có đã giải quyết một tác vụ tương tự và tái sử dụng lại nó.
*   **Đặc thù với CNN:** Kỹ thuật này hoạt động hiệu quả nhất với các mạng nơ-ron tích chập (CNN) sâu, vì chúng có xu hướng học được các bộ nhận diện đặc trưng mang tính tổng quát cao (đặc biệt là ở các lớp thấp).

---

**Slide 3**
**Tiêu đề:** Tại sao cần sử dụng Transfer Learning?
**Nội dung:**
*   **Tăng tốc độ hội tụ:** Bằng cách khởi tạo trọng số và độ lệch (bias) từ một mạng đã học thay vì khởi tạo ngẫu nhiên, mạng mới không phải học lại từ đầu các cấu trúc cấp thấp (như góc, cạnh), giúp rút ngắn đáng kể thời gian huấn luyện.
*   **Tiết kiệm dữ liệu gán nhãn:** Việc tái sử dụng mô hình giúp ta giải quyết được những bài toán phức tạp ngay cả khi có rất ít dữ liệu huấn luyện hoặc chi phí gán nhãn dữ liệu quá đắt đỏ.
*   **Cải thiện hiệu suất:** Kiến trúc phân cấp (tái sử dụng các lớp dưới) giúp cải thiện khả năng tổng quát hóa của mô hình trên các tập dữ liệu mới.

---

**Slide 4**
**Tiêu đề:** 6.3.2. Cơ chế tái sử dụng các lớp (Reusing Pretrained Layers)
**Nội dung:**
*   Mạng CNN tự động tận dụng cấu trúc phân cấp của dữ liệu: các lớp ẩn thấp nhất mô hình hóa các cấu trúc cấp thấp (đoạn thẳng, hướng), lớp trung gian kết hợp thành cấu trúc hình học, và lớp cao nhất mô hình hóa các cấu trúc phức tạp (như khuôn mặt).
*   Khi có một mạng thực hiện tác vụ tương tự (Ví dụ: đã được huấn luyện để phân loại 100 loại động vật, xe cộ, thực vật...), ta có thể tái sử dụng phần lớn các lớp của nó, ngoại trừ các lớp trên cùng.
*   Transfer learning sẽ đạt hiệu quả cao nhất khi đầu vào của tác vụ mới có các đặc trưng cấp thấp tương đồng với tác vụ ban đầu.

---

**Slide 5**
**Tiêu đề:** Chiến lược 1: Đóng băng các lớp (Freezing Layers / Feature Extraction)
**Nội dung:**
*   **Đóng băng trọng số:** Khi tái sử dụng các lớp, bước đầu tiên là đóng băng (freeze) chúng, tức là thiết lập để trọng số của các lớp này không thể huấn luyện, đảm bảo thuật toán hạ gradient (gradient descent) không làm thay đổi các trọng số đã được tinh chỉnh này.
*   **Huấn luyện lớp phân loại mới:** Chỉ tiến hành huấn luyện mô hình với các lớp mới được thêm vào (thường là lớp thay thế cho output layer).
*   **Nguyên tắc:** Hai tác vụ càng giống nhau, ta càng nên tái sử dụng nhiều lớp (bắt đầu từ các lớp thấp nhất). Đối với các tác vụ rất giống nhau, có thể giữ lại tất cả các lớp ẩn và chỉ thay thế duy nhất lớp đầu ra.

Dưới đây là nội dung chi tiết cho các slide tiếp theo của Tiết 2, tập trung vào các chiến lược Học chuyển giao (Transfer Learning) nâng cao và giới thiệu các mô hình phổ biến:

**Slide 6**
**Tiêu đề:** 6.3.2. Chiến lược 2: Tinh chỉnh (Fine-Tuning)
**Nội dung:**
*   **Khái niệm:** Tinh chỉnh (Fine-tuning) là quá trình "mở băng" (unfreeze) một số lớp ẩn ở tầng trên cùng của mô hình đã được huấn luyện sẵn và tiếp tục huấn luyện chúng cùng với lớp phân loại mới.
*   **Mục đích:** Giúp các trọng số của các lớp đặc trưng cấp cao có thể tự điều chỉnh và thích ứng sâu hơn với các đặc thù của tập dữ liệu mới.
*   **Quy trình chuẩn:** 
    1. Đầu tiên, đóng băng tất cả các lớp cũ và huấn luyện lớp phân loại mới trong vài epoch để lớp này học được các trọng số cơ bản.
    2. Sau đó, mở băng một vài lớp trên cùng và tiếp tục huấn luyện toàn bộ.

---

**Slide 7**
**Tiêu đề:** Lưu ý quan trọng khi Tinh chỉnh (Fine-Tuning)
**Nội dung:**
*   **Tốc độ học (Learning Rate):** Bắt buộc phải giảm tốc độ học (thường nhỏ hơn 10 lần hoặc hơn) khi bắt đầu mở băng các lớp tái sử dụng. Việc dùng tốc độ học lớn sẽ làm hỏng các trọng số tinh tế đã được huấn luyện từ trước.
*   **Kích thước dữ liệu quyết định số lớp mở băng:**
    *   *Ít dữ liệu huấn luyện:* Chỉ nên tinh chỉnh lớp phân loại cuối hoặc một lớp ẩn trên cùng, đóng băng phần còn lại để tránh quá khớp (overfitting).
    *   *Nhiều dữ liệu huấn luyện:* Có thể mở băng nhiều lớp ẩn hơn để mô hình học các đặc trưng mới sát với bài toán hiện tại.

---

**Slide 8**
**Tiêu đề:** Chiến lược 3: Tiền huấn luyện không giám sát (Unsupervised Pretraining)
**Nội dung:**
*   **Vấn đề:** Phải làm sao khi bạn có một bài toán phức tạp, rất ít dữ liệu gán nhãn và không tìm được mô hình nào đã huấn luyện trên tác vụ tương tự?.
*   **Giải pháp:** Thu thập thật nhiều dữ liệu **không gán nhãn** (thường rẻ và dễ kiếm hơn).
*   **Cách làm:** Dùng dữ liệu này để huấn luyện một mô hình không giám sát (như Autoencoder hoặc mạng GAN). Sau đó, tái sử dụng các lớp thấp của mô hình này, thêm một lớp đầu ra và tiến hành tinh chỉnh (Fine-tune) bằng lượng nhỏ dữ liệu có gán nhãn.

---

**Slide 9**
**Tiêu đề:** Chiến lược 4: Tiền huấn luyện trên Tác vụ phụ (Auxiliary Task)
**Nội dung:**
*   **Khái niệm:** Huấn luyện một mạng nơ-ron đầu tiên trên một *tác vụ phụ* mà bạn có thể dễ dàng thu thập hoặc tự động tạo ra lượng lớn dữ liệu gán nhãn. Sau đó, tái sử dụng các lớp thấp cho tác vụ thực sự của bạn.
*   **Ví dụ (Nhận diện khuôn mặt):** 
    *   *Tác vụ thực tế:* Nhận diện nhân viên công ty (rất ít ảnh mỗi người).
    *   *Tác vụ phụ:* Thu thập hàng triệu ảnh ngẫu nhiên trên web, huấn luyện mạng để phân biệt "hai ảnh này có phải cùng một người không?".
    *   *Kết quả:* Mạng đã học được bộ trích xuất đặc trưng khuôn mặt cực tốt để tái sử dụng.

---

**Slide 10**
**Tiêu đề:** Giới thiệu sơ lược các Pretrained Models phổ biến
**Nội dung:**
*   Các thư viện như Keras (TensorFlow) hay TorchVision (PyTorch) cung cấp sẵn hàng chục mô hình đã được huấn luyện trên các tập dữ liệu khổng lồ (như ImageNet với 1000 phân lớp).
*   **Một số kiến trúc tiêu biểu (Sẽ học kỹ ở Chương 7):**
    *   **VGG (VGG16, VGG19):** Kiến trúc đơn giản, dễ hiểu nhưng khá nặng.
    *   **ResNet (Residual Networks):** Sử dụng kết nối tắt (skip connections/residual learning) giúp huấn luyện được các mạng cực sâu (50, 100+ lớp) mà không bị triệt tiêu đạo hàm.
    *   **Inception:** Mở rộng chiều ngang với các khối tính toán song song đa tỷ lệ.
    *   **MobileNet / EfficientNet:** Tối ưu hóa dung lượng và tốc độ tính toán, phù hợp chạy trên thiết bị di động hay web.

**Slide 11**
**Tiêu đề:** Thực hành Transfer Learning: Tải mô hình cơ sở
**Nội dung:**
*   Trong các thư viện học sâu như Keras/TensorFlow, việc tải một mô hình huấn luyện sẵn (Pretrained Model) rất đơn giản.
*   **Ví dụ:** Tải mô hình kiến trúc Xception đã được huấn luyện trên tập dữ liệu ImageNet.
*   *Mã giả lệnh minh họa:* `base_model = tf.keras.applications.xception.Xception(weights="imagenet", include_top=False)`.
*   **Tham số quan trọng:** `include_top=False` mang ý nghĩa loại bỏ lớp phân loại (Fully Connected Layer) ở trên cùng của mạng gốc, chỉ giữ lại phần trích xuất đặc trưng (Feature Extractor) để tái sử dụng cho bài toán mới.

---

**Slide 12**
**Tiêu đề:** Thực hành Transfer Learning: Thêm các lớp tùy chỉnh
**Nội dung:**
*   Sau khi có phần trích xuất đặc trưng (`base_model`), ta cần thiết kế lại phần đầu ra (Output) để phù hợp với số lượng phân lớp của bài toán mới.
*   **Lớp gộp toàn cục (Global Average Pooling):** Thường được đặt ngay trên đỉnh của mô hình cơ sở để tính trung bình các bản đồ đặc trưng, giúp giảm mạnh số lượng tham số: `avg = tf.keras.layers.GlobalAveragePooling2D()(base_model.output)`.
*   **Lớp phân loại mới:** Thêm một lớp Dense mới với số lượng nơ-ron bằng số lớp của bài toán hiện tại (`n_classes`) và dùng hàm kích hoạt `softmax`: `class_output = tf.keras.layers.Dense(n_classes, activation="softmax")(avg)`.

---

**Slide 13**
**Tiêu đề:** Mở rộng Transfer Learning: Học đa tác vụ (Multi-task)
**Nội dung:**
*   Từ một mô hình cơ sở (Pretrained Model), ta có thể rẽ nhánh để giải quyết nhiều tác vụ đồng thời (Ví dụ: Vừa phân loại hoa, vừa dự đoán vị trí bông hoa).
*   **Thêm nhánh định vị (Localization Head):** Gắn thêm một lớp Dense thứ hai gồm 4 nơ-ron (dự đoán tọa độ trung tâm, chiều rộng, chiều cao của hộp giới hạn) song song với nhánh phân loại: `loc_output = tf.keras.layers.Dense(4)(avg)`.
*   **Biên dịch mô hình đa đầu ra:** Sử dụng nhiều hàm mất mát khác nhau cho từng đầu ra, ví dụ `sparse_categorical_crossentropy` cho nhánh phân loại và `mse` (sai số toàn phương trung bình) cho nhánh định vị.

---

**Slide 14**
**Tiêu đề:** Các kho mô hình huấn luyện sẵn (Model Zoos)
**Nội dung:**
*   Người học không cần tự xây dựng kiến trúc phức tạp từ đầu hay tự huấn luyện trên các máy siêu tính toán. Rất nhiều mô hình thị giác máy tính đã được tối ưu hóa và cung cấp miễn phí.
*   **TensorFlow Hub / Keras Applications:** Cung cấp sẵn các mô hình chuyên phân loại (như VGG, ResNet, Xception, EfficientNet) và các mô hình chuyên phát hiện đối tượng (như YOLOv5, SSD, Faster R-CNN, EfficientDet) đã mang sẵn trọng số chuẩn.
*   **TorchVision (trong PyTorch):** Cung cấp hệ sinh thái tương đương với các kiến trúc được cập nhật liên tục phục vụ cho cả tác vụ phân loại, nhận diện và phân đoạn ảnh.

---

**Slide 15**
**Tiêu đề:** Tổng kết Tiết 2
**Nội dung:**
*   **Học chuyển giao (Transfer Learning):** Là chìa khóa giải quyết vấn đề thiếu hụt dữ liệu gán nhãn và tiết kiệm chi phí huấn luyện trong Deep Learning.
*   **Hai chiến lược cốt lõi:**
    *   *Trích xuất đặc trưng:* Đóng băng (freeze) các lớp mượn và chỉ huấn luyện lớp phân loại trên cùng.
    *   *Tinh chỉnh (Fine-tuning):* Mở băng (unfreeze) từ từ các lớp trên cùng và huấn luyện với tốc độ học (learning rate) rất nhỏ.
*   **Công cụ:** Keras, PyTorch hỗ trợ việc gọi các mô hình *Pretrained* (ResNet, Xception...) cực kỳ nhanh chóng qua vài dòng mã,.
*   **Định hướng:** Các kiến thức trích xuất đặc trưng này là nền tảng bắt buộc để bước vào bài toán phát hiện đối tượng (Object Detection) ở Tiết 3.