## Checklist lộ trình đến bản demo FashionCart

### Phase 0 – Chuẩn bị & định hướng
- [ ] **Xác định scope demo**
  - [ ] Chốt rõ tính năng sẽ có trong demo (web only, không mobile).
  - [ ] Xác định user chính: người mua, shop, admin (nếu có trong demo).
- [ ] **Chọn tech stack**
  - [ ] Frontend (ví dụ: React + Vite/NextJS).
  - [ ] Backend (ví dụ: Node.js/NestJS/Express hoặc Django/FastAPI).
  - [ ] DB (ví dụ: PostgreSQL/MySQL).
- [ ] **Chuẩn hóa kiến trúc**
  - [ ] Review `docs/architecture.md` và chỉnh sửa cho phù hợp với thực tế.
  - [ ] Tạo tài liệu API sơ bộ (có thể trong `docs/backend.md`).

---

### Phase 1 – MVP e-commerce cơ bản (không ML)
- [ ] **Thiết kế UI/UX**
  - [ ] Vẽ user flow chính: browse → view product → add to cart → checkout.
  - [ ] Thiết kế wireframe các trang chính: Home, Product Detail, Cart, Checkout, Login/Register, Profile.
- [ ] **Backend MVP**
  - [ ] Thiết kế schema DB cho: User, Product, Shop, Cart, Order.
  - [ ] Implement API auth cơ bản: đăng ký, đăng nhập, refresh token.
  - [ ] API sản phẩm: list/search, chi tiết sản phẩm.
  - [ ] API giỏ hàng: thêm/xóa/sửa item, lấy giỏ hàng hiện tại.
  - [ ] API đặt hàng: tạo order từ cart, xem lịch sử order.
- [ ] **Frontend MVP**
  - [ ] Thiết lập project frontend, cấu hình routing, state management.
  - [ ] Trang Home: hiển thị list sản phẩm.
  - [ ] Trang Product Detail: xem chi tiết + nút add to cart.
  - [ ] Trang Cart: xem, update số lượng, xóa item.
  - [ ] Trang Checkout: form thông tin nhận hàng + confirm order (giả lập thanh toán).
  - [ ] Trang Auth: Login/Register.
- [ ] **Chuẩn bị cho demo nội bộ**
  - [ ] Seed data mẫu cho sản phẩm, shop, user test.
  - [ ] Test end-to-end flow hoàn chỉnh 1 đơn hàng.

---

### Phase 2 – Tích hợp Recommendation (DSS) cơ bản
- [ ] **Xác định use case recommendation**
  - [ ] Size khuyến nghị cho user dựa trên chiều cao/cân nặng/ số đo.
  - [ ] Sản phẩm gợi ý dựa trên hành vi đơn giản (ví dụ: cùng category, cùng shop).
- [ ] **ML/DSS chuẩn bị**
  - [ ] Thu thập/gia lập dataset nhỏ cho size & style.
  - [ ] Xây pipeline đơn giản (notebook) để ra được output recommendation mẫu.
  - [ ] Chốt định dạng input/output API recommendation.
- [ ] **Backend integration**
  - [ ] Tạo endpoint backend gọi sang service DSS (hoặc mock trước).
  - [ ] Xử lý fallback khi service ML không hoạt động.
- [ ] **Frontend integration**
  - [ ] Hiển thị size gợi ý trên trang Product Detail.
  - [ ] Thêm section “Gợi ý cho bạn” ở Home/Product Detail.
- [ ] **Kiểm thử cho demo**
  - [ ] Chuẩn bị vài user test với thông tin cơ thể khác nhau.
  - [ ] Kiểm tra recommendation hiển thị hợp lý, không lỗi.

---

### Phase 3 – Tích hợp Virtual Try-On (VTON) mức demo
- [ ] **Xác định flow VTON trong demo**
  - [ ] Chọn 1–2 category sản phẩm (ví dụ: áo thun) để demo VTON.
  - [ ] Quyết định cách user upload ảnh (upload sẵn hoặc chọn từ sample).
- [ ] **Chuẩn bị VTON**
  - [ ] Thiết lập notebook/ service VTON chạy được trên sample data.
  - [ ] Chuẩn bị tập ảnh người mẫu + áo cần demo.
  - [ ] Định nghĩa API: nhận ảnh + id sản phẩm → trả về ảnh try-on.
- [ ] **Backend integration**
  - [ ] Endpoint backend trung gian cho request VTON.
  - [ ] Caching/ lưu kết quả VTON để tránh chạy lại nhiều lần trong demo.
- [ ] **Frontend integration**
  - [ ] Giao diện nút “Thử đồ” trên trang Product Detail.
  - [ ] Modal/ trang hiển thị ảnh kết quả VTON.
- [ ] **Chuẩn bị kịch bản demo VTON**
  - [ ] Chuẩn bị trước 2–3 case thành công đẹp.
  - [ ] Test UI/UX khi request lâu hoặc lỗi.

---

### Phase 4 – Tối ưu demo & hoàn thiện trải nghiệm
- [ ] **Ổn định hệ thống cho demo**
  - [ ] Docker hoá (hoặc script run đơn giản) cho frontend + backend + ML.
  - [ ] Cấu hình environment cho demo (local hoặc server).
  - [ ] Log cơ bản để debug khi demo.
- [ ] **Trải nghiệm người dùng**
  - [ ] Thêm loading state, error state, thông báo rõ ràng.
  - [ ] Tối ưu UI: màu sắc, typography, responsive cơ bản.
- [ ] **Chuẩn bị slide & kịch bản demo**
  - [ ] Slide giới thiệu vấn đề, giải pháp, kiến trúc, demo flow, hướng phát triển.
  - [ ] Viết script demo: ai nói gì, thao tác gì, thứ tự feature.

---

### Phase 5 – Hậu kiểm sau demo (optional nhưng nên có)
- [ ] Thu thập feedback từ giảng viên / người xem demo.
- [ ] Ghi lại pain point kỹ thuật & UX để cải thiện sau này.
- [ ] Cập nhật `docs/roadmap.md` với bước tiếp theo (prod, scale, social feature, kết nối brand thật, v.v.).
