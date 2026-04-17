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

### Tài liệu module tương ứng trong repo (FE / BE)

Tham chiếu khi triển khai Phase 1. Đường dẫn tính từ thư mục gốc repo; trong Markdown có thể dùng link tương đối từ file này: `../frontend/FE/...`, `../backend/BE/...`.

#### Frontend — `frontend/FE/`

| Chủ đề | File |
|--------|------|
| Đăng nhập / đăng ký | [`frontend/FE/login.md`](../frontend/FE/login.md) |
| Thông tin người dùng / profile | [`frontend/FE/UserInformation.md`](../frontend/FE/UserInformation.md) |
| Cài đặt tùy chọn (preferences) | [`frontend/FE/preference settings.md`](../frontend/FE/preference%20settings.md) |
| Feed / danh sách sản phẩm | [`frontend/FE/Product Feeds.md`](../frontend/FE/Product%20Feeds.md) |
| Trang chi tiết sản phẩm | [`frontend/FE/Product Detail pages.md`](../frontend/FE/Product%20Detail%20pages.md) |
| Tìm kiếm & lọc | [`frontend/FE/Search & Filter.md`](../frontend/FE/Search%20%26%20Filter.md) |
| Giỏ hàng (UI) | [`frontend/FE/Cart management UI.md`](../frontend/FE/Cart%20management%20UI.md) |
| Checkout | [`frontend/FE/checkout screens.md`](../frontend/FE/checkout%20screens.md) |
| Form địa chỉ giao hàng | [`frontend/FE/shipping address forms.md`](../frontend/FE/shipping%20address%20forms.md) |
| VTON (giai đoạn sau; tham khảo) | [`frontend/FE/featureVTON.md`](../frontend/FE/featureVTON.md) |

#### Backend — `backend/BE/`

| Chủ đề | File |
|--------|------|
| Tổng quan API | [`backend/BE/APIs.md`](../backend/BE/APIs.md) |
| Lưu trữ tài khoản | [`backend/BE/account data storage.md`](../backend/BE/account%20data%20storage.md) |
| Phân quyền theo vai trò | [`backend/BE/role-based access control.md`](../backend/BE/role-based%20access%20control.md) |
| CRUD sản phẩm | [`backend/BE/Manages product CRUD operations.md`](../backend/BE/Manages%20product%20CRUD%20operations.md) |
| Phân loại danh mục | [`backend/BE/category classification.md`](../backend/BE/category%20classification.md) |
| Tìm kiếm tối ưu | [`backend/BE/optimized search queries.md`](../backend/BE/optimized%20search%20queries.md) |
| Trạng thái / lưu giỏ hàng | [`backend/BE/Cart state storage.md`](../backend/BE/Cart%20state%20storage.md) |
| Phí / tính toán chi phí | [`backend/BE/fee calculations.md`](../backend/BE/fee%20calculations.md) |
| Thanh toán (kể cả mock) | [`backend/BE/payment processing.md`](../backend/BE/payment%20processing.md) |
| Lịch sử đơn hàng | [`backend/BE/order history tracking.md`](../backend/BE/order%20history%20tracking.md) |
| Gợi ý (DSS — chủ yếu Phase 2; tham khảo) | [`backend/BE/recommendations.md`](../backend/BE/recommendations.md) |

#### Ánh xạ nhanh checklist Phase 1 → tài liệu

| Mục trong Phase 1 | FE | BE |
|-------------------|----|-----|
| Auth | `login.md` | `account data storage.md`, `role-based access control.md`, `APIs.md` |
| Catalog / feed | `Product Feeds.md`, `Search & Filter.md` | `Manages product CRUD operations.md`, `category classification.md`, `optimized search queries.md` |
| Product detail | `Product Detail pages.md` | `Manages product CRUD operations.md`, `APIs.md` |
| Cart | `Cart management UI.md` | `Cart state storage.md`, `APIs.md` |
| Checkout & địa chỉ | `checkout screens.md`, `shipping address forms.md` | `payment processing.md`, `fee calculations.md`, `APIs.md` |
| Profile / thông tin user | `UserInformation.md`, `preference settings.md` | `account data storage.md` |
| Order history | (UI có thể mô tả trong checkout hoặc bổ sung sau) | `order history tracking.md`, `APIs.md` |

---

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
- [x] **Chốt cách làm việc của team** → xem [`docs/team-conventions.md`](../docs/team-conventions.md)
  - [x] Quy ước branch, PR, review.
  - [x] Coding conventions và format/lint rules.
  - [x] Cách chia task giữa frontend, backend, database.
  - [x] Cách seed data dùng chung cho demo.
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