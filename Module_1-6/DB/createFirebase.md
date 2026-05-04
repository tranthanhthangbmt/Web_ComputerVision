# Kế Hoạch Tích Hợp Firebase Firestore

Lựa chọn **Firebase Firestore** là một quyết định tuyệt vời về mặt bảo mật, tốc độ và độ ổn định (uptime 99.99% từ Google). Hệ thống của bạn sẽ dễ dàng chịu được hàng chục ngàn sinh viên truy cập cùng lúc mà không hề hấn gì.

## Quá Trình Chuyển Đổi Hệ Thống

Để hoàn thành việc chuyển đổi toàn bộ hệ thống từ Google Sheets sang Firebase Firestore, chúng ta sẽ thực hiện theo 2 giai đoạn:

### Giai Đoạn 1: Bạn Thiết Lập Firebase (Mất khoảng 3-5 phút)

Vì lý do bảo mật, bạn cần tự tay tạo cơ sở dữ liệu trên tài khoản Google của bạn. Hãy làm theo các bước cực kỳ đơn giản sau:

1. **Truy cập Firebase:** Vào trang [Firebase Console](https://console.firebase.google.com/) và đăng nhập bằng tài khoản Google của bạn.
2. **Tạo Dự Án:** Ấn vào nút **"Create a project"** (hoặc "Add project"). Điền tên dự án (ví dụ: `AIUD-Exam`). Có thể tắt Google Analytics nếu không cần thiết. Ấn "Create project".
3. **Kích hoạt Firestore:**
   - Trong menu bên trái, chọn **Build > Firestore Database**.
   - Ấn **"Create database"**.
   - **Quan trọng:** Chọn **"Start in test mode"** (Bắt đầu ở chế độ thử nghiệm) để cho phép sinh viên ghi điểm lên mà không cần tạo tài khoản mật khẩu. Ấn Next.
   - Chọn khu vực lưu trữ (VD: `asia-southeast1` - Singapore cho gần Việt Nam) rồi ấn Enable.
4. **Lấy Mã Tích Hợp (Config Key):**
   - Trở lại trang chủ dự án (biểu tượng ngôi nhà ở góc trên bên trái).
   - Ở giữa màn hình, ấn vào biểu tượng **Web (hình `</>`)** để thêm ứng dụng web.
   - Đặt tên app (VD: `Midterm-Web`) rồi ấn **Register app**.
   - Google sẽ hiển thị một đoạn code Javascript có dạng như sau:
     ```javascript
     const firebaseConfig = {
       apiKey: "AIzaSy...",
       authDomain: "aiud-exam.firebaseapp.com",
       projectId: "aiud-exam",
       storageBucket: "aiud-exam.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abcdef"
     };
     ```
   - **HÃY COPY ĐOẠN `firebaseConfig` NÀY VÀ GỬI CHO TÔI NHÉ!**

### Giai Đoạn 2: Tôi Tiến Hành Viết Code Tích Hợp

Ngay sau khi bạn cung cấp đoạn `firebaseConfig`, tôi sẽ tiến hành:
1. Nhúng thư viện Firebase SDK vào file `midterm.html`.
2. Lập trình lại hàm `saveResultsToServer` trong `midterm_core.js` để kết nối thẳng tới Firestore bằng API chuẩn của Google.
3. Thiết kế cấu trúc dữ liệu lưu trữ theo dạng **Collection - Document** (Mỗi lớp là 1 collection, mỗi lần nộp bài là 1 document).
4. Cập nhật thanh Badge trạng thái phía trên để luôn báo xanh lá cây (Vì Firebase không cần kiểm tra tạo file rườm rà như Google Sheets, nó tự động tạo nhánh dữ liệu theo tên Lớp).
5. Dọn dẹp hoàn toàn các mã lệnh cũ liên quan đến Python Proxy Server.

---

> [!IMPORTANT]
> **HÀNH ĐỘNG CỦA BẠN**
> Bạn hãy tiến hành **Giai Đoạn 1** theo hướng dẫn phía trên. Sau khi làm xong, hãy dán đoạn mã `firebaseConfig` vào khung chat để tôi bắt đầu Giai Đoạn 2 nhé!
