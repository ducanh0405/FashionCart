# Phase 1 – MVP e-commerce cơ bản (không ML)

> **Trạng thái:** Chưa bắt đầu
> **Yêu cầu trước:** Phase 0 hoàn thành
> **Thời gian ước tính:** 4–6 tuần

---

### Mục tiêu phase
- Xây được một **MVP e-commerce web app** chạy ổn định cho luồng cốt lõi của FashionCart.
- Hoàn thành phần nền tảng để team có thể tiếp tục sang DSS/VTON ở các phase sau mà không phải sửa kiến trúc lớn.
- Đảm bảo bản demo nội bộ có thể thực hiện trọn vẹn flow: **đăng nhập hoặc dùng tài khoản test → xem sản phẩm → xem chi tiết → thêm vào giỏ → checkout giả lập → xem lịch sử đơn hàng**.

### Phạm vi Phase 1
**In scope**
- Web app only.
- 1 vai trò chính: **buyer/user**.
- Có thể để `shop` và `admin` ở mức dữ liệu/backend chuẩn bị trước, chưa cần giao diện đầy đủ.
- E-commerce core: auth, catalog, product detail, cart, checkout giả lập, order history.



### Những gì team cần chốt trước khi bắt đầu
- [ ] **Chốt scope demo của Phase 1**
  - [ ] Demo chỉ cần buyer flow hay cần thêm shop/admin view.
  - [ ] Có cần search/filter trong MVP hay chỉ cần product listing cơ bản.
  - [ ] Có cần order history trong bản demo đầu tiên hay để sau.
- [ ] **Chốt tech stack thực tế**
  - [ ] Frontend: dùng `React + Vite` theo định hướng hiện tại.
  - [ ] Backend: chốt **Django** hay **FastAPI**.
  - [ ] Database: chốt **SQL Server** và cách chạy local cho team.
  - [ ] Có dùng state management library ngay từ đầu hay chỉ React state + context.
- [ ] **Chốt cách làm việc của team**
  - [ ] Quy ước branch, PR, review.
  - [ ] Coding conventions và format/lint rules.
  - [ ] Cách chia task giữa frontend, backend, database.
  - [ ] Cách seed data dùng chung cho demo.
- [ ] **Chốt dữ liệu demo**
  - [ ] Chọn category sản phẩm đầu tiên để làm demo (ví dụ: áo, quần, váy).
  - [ ] Chốt số lượng sản phẩm mẫu tối thiểu.
  - [ ] Chốt thông tin sản phẩm bắt buộc: tên, giá, ảnh, size, màu, mô tả, shop.

### Checklist triển khai chi tiết

#### 1. Product definition & user flow
- [ ] Viết ngắn gọn use case chính của buyer trong Phase 1.
- [ ] Xác định rõ dữ liệu nào là bắt buộc ở mỗi bước để tránh thiếu backend contract sau này.

#### 2. UI/UX & design
- [ ] Thiết kế wireframe low-fidelity cho các màn chính:
  - [ ] Home.
  - [ ] Product Listing / Catalog.
  - [ ] Product Detail.
  - [ ] Cart.
  - [ ] Checkout.
  - [ ] Login.
  - [ ] Register.
  - [ ] Profile / Order History.
- [ ] Chốt design system tối thiểu:
  - [ ] Màu chủ đạo.
  - [ ] Typography.
  - [ ] Button/input/card styles.
  - [ ] Layout grid / spacing.
- [ ] Xác định trạng thái UI cần có:
  - [ ] Empty state.
  - [ ] Loading state.
  - [ ] Error state.
  - [ ] Success message.
- [ ] Review với cả team để tránh frontend làm lại nhiều lần.

#### 3. Backend planning
- [ ] Chốt module backend của Phase 1:
  - [ ] `auth`
  - [ ] `users`
  - [ ] `products`
  - [ ] `cart`
  - [ ] `orders`
- [ ] Thiết kế entities/schema tối thiểu:
  - [ ] User.
  - [ ] Shop.
  - [ ] Product.
  - [ ] ProductVariant hoặc Size/Color strategy.
  - [ ] Cart.
  - [ ] CartItem.
  - [ ] Order.
  - [ ] OrderItem.
- [ ] Chốt authentication approach:
  - [ ] JWT hay session-based.
  - [ ] Refresh token strategy.
  - [ ] Password hashing và validation rules.
- [ ] Xác định validation rules cho input:
  - [ ] Register/login.
  - [ ] Add to cart.
  - [ ] Checkout.
- [ ] Viết API contract sơ bộ trước khi implement:
  - [ ] Auth APIs.
  - [ ] Product list/detail APIs.
  - [ ] Cart APIs.
  - [ ] Order APIs.

#### 4. Database & data preparation
- [ ] Thiết kế schema DB cho SQL Server phù hợp với MVP.
- [ ] Chốt naming convention cho bảng/cột/khóa ngoại.
- [ ] Chuẩn bị migration plan ban đầu.
- [ ] Chuẩn bị seed data:
  - [ ] Ít nhất 1 shop mẫu.
  - [ ] 10–20 sản phẩm mẫu.
  - [ ] 1–2 user test.
  - [ ] Dữ liệu size/màu cơ bản.
- [ ] Đảm bảo ảnh sản phẩm và dữ liệu mô tả đủ đẹp để demo.

#### 5. Frontend planning
- [ ] Chốt cấu trúc `frontend/src/` phù hợp với `docs/architecture.md`.
- [ ] Chốt routing strategy:
  - [ ] `/`
  - [ ] `/products`
  - [ ] `/products/:id`
  - [ ] `/cart`
  - [ ] `/checkout`
  - [ ] `/login`
  - [ ] `/register`
  - [ ] `/profile` hoặc `/orders`
- [ ] Chốt state structure tối thiểu:
  - [ ] Auth state.
  - [ ] Cart state.
  - [ ] Product data fetching state.
- [ ] Chốt API calling pattern:
  - [ ] Service layer riêng.
  - [ ] Error handling chung.
  - [ ] Loading handling chung.
- [ ] Chốt reusable component list:
  - [ ] Product card.
  - [ ] Product grid.
  - [ ] Navbar.
  - [ ] Cart item row.
  - [ ] Form inputs.
  - [ ] Buttons / modals / alerts.

#### 6. Implementation checklist
- [ ] **Auth**
  - [ ] Register flow chạy được.
  - [ ] Login flow chạy được.
  - [ ] Logout flow chạy được.
  - [ ] Route protection cơ bản cho trang yêu cầu đăng nhập.
- [ ] **Catalog**
  - [ ] Hiển thị danh sách sản phẩm.
  - [ ] Hiển thị ảnh, tên, giá, size/các thông tin chính.
  - [ ] Có thể vào trang chi tiết sản phẩm.
- [ ] **Product Detail**
  - [ ] Hiển thị đầy đủ thông tin chính.
  - [ ] Chọn size / variant nếu có.
  - [ ] Add to cart thành công.
- [ ] **Cart**
  - [ ] Xem được danh sách item trong cart.
  - [ ] Update quantity.
  - [ ] Remove item.
  - [ ] Tính subtotal cơ bản.
- [ ] **Checkout**
  - [ ] Nhập thông tin người nhận.
  - [ ] Xác nhận đơn hàng.
  - [ ] Tạo order thành công.
  - [ ] Clear cart sau checkout nếu flow yêu cầu.
- [ ] **Order history / profile**
  - [ ] Xem danh sách đơn hàng đã tạo.
  - [ ] Xem trạng thái order cơ bản.

#### 7. Quality control
- [ ] Viết test plan tối thiểu cho các flow chính.
- [ ] Test thủ công các case:
  - [ ] User đăng ký mới.
  - [ ] User đăng nhập sai mật khẩu.
  - [ ] Add to cart nhiều lần.
  - [ ] Checkout với cart rỗng.
  - [ ] Checkout thành công.
  - [ ] Reload trang mà cart/auth vẫn đúng theo thiết kế.
- [ ] Kiểm tra UI responsive ở mức cơ bản.
- [ ] Kiểm tra error handling khi backend lỗi hoặc trả về dữ liệu trống.

#### 8. Demo preparation
- [ ] Chuẩn bị script demo nội bộ 3–5 phút.
- [ ] Chỉ định tài khoản test dùng cho demo.
- [ ] Chuẩn bị dữ liệu sản phẩm đẹp, đồng bộ hình ảnh.
- [ ] Chạy thử full flow ít nhất 3 lần trước demo nội bộ.
- [ ] Ghi lại bug list và fix các bug blocker trước khi chốt phase.

### Điều kiện để được xem là hoàn thành Phase 1
- [ ] Frontend và backend chạy được ổn định ở local cho cả team.
- [ ] Có dữ liệu mẫu đủ để demo trông giống sản phẩm thật.
- [ ] Hoàn thành full buyer flow từ browse đến checkout giả lập.
- [ ] Có order history hoặc trang xác nhận đơn hàng ở mức đủ demo.
- [ ] Không còn bug blocker trong luồng demo chính.
- [ ] Tài liệu đủ để Phase 2 có thể tích hợp DSS mà không phải làm lại core flow.

### Tổng kết / Kết quả
- **Link tài liệu**
  - Link Figma / wireframe:
  - Link API docs:
  - Link DB schema:
- **Quyết định của team**
  - Backend framework đã chọn:
  - Auth strategy đã chọn:
  - Cấu trúc state/frontend đã chọn:
- **Phạm vi đã hoàn thành**
  - Những flow đã chạy được:
  - Những phần chưa làm:
- **Kết quả test**
  - Kết quả test E2E flow đặt hàng:
  - Các bug chính đã biết:
- **Bài học / lưu ý cho Phase 2**
  - Những điểm cần giữ nguyên:
  - Những điểm cần refactor trước khi tích hợp DSS/VTON:


**Out of scope**
- DSS recommendation.
- VTON.
- Chat realtime hoàn chỉnh.
- Thanh toán thật.
- Social feed / social interaction.
- Hệ thống admin đầy đủ.

---

### Tiếp theo → [Phase 2: Tích hợp Recommendation (DSS)](phase2.md)