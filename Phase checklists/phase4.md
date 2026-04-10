# Phase 4 – Tối ưu demo & hoàn thiện trải nghiệm

> **Trạng thái:** Chưa bắt đầu
> **Yêu cầu trước:** Phase 1–3 hoàn thành (e-commerce + DSS + VTON đã chạy)
> **Thời gian ước tính:** 1–2 tuần

---

### Mục tiêu phase
- **Ổn định** toàn bộ hệ thống: frontend + backend + ML services chạy mượt cùng lúc.
- **Polish UI/UX**: loading states, error messages, animations, responsive, typography.
- **Docker hoá** để team có thể run demo ở bất kỳ máy nào bằng 1 lệnh.
- **Chuẩn bị presentation**: slide + demo script + rehearsal.
- Mục tiêu: **demo 10–15 phút** chạy trọn vẹn, không lỗi, gây ấn tượng.

### Phạm vi Phase 4

**In scope**
- Containerization (Docker Compose).
- UI/UX polish & responsive.
- Performance optimization cơ bản.
- Slide & demo script.
- Bug fixing cho tất cả flows.

**Out of scope**
- Tính năng mới (không thêm feature).
- Production deployment (chỉ chạy local/staging).
- Unit test coverage mở rộng.

---

### Checklist triển khai chi tiết

#### 1. System Stabilization & DevOps
> **Người phụ trách:** Backend + DevOps

- [ ] **Docker Compose setup**
  - [ ] `docker-compose.dev.yml` với tất cả services:
    ```yaml
    services:
      frontend:      # React + Vite dev server
      backend:       # Django/FastAPI
      db:            # SQL Server
      redis:         # Cache + Celery broker
      celery-worker: # Background jobs (VTON)
      dss-service:   # DSS recommendation
      vton-service:  # VTON inference
    ```
  - [ ] Tất cả services khởi động bằng **1 lệnh**: `docker-compose up`.
  - [ ] Health check cho mỗi service.
  - [ ] Volume mounting cho development (hot reload frontend/backend).

- [ ] **Environment configuration**
  - [ ] Cập nhật `infrastructure/env-templates/.env.example` với tất cả biến cần thiết.
  - [ ] Viết `README` hướng dẫn setup cho team member mới.
  - [ ] Script `scripts/setup.sh` (hoặc `.bat` cho Windows):
    - Copy `.env.example` → `.env`
    - Install dependencies
    - Run migrations
    - Seed data

- [ ] **Database preparation cho demo**
  - [ ] Seed script chạy tự động khi khởi tạo: `scripts/seed_demo_data.py`.
  - [ ] Data bao gồm:
    - [ ] 2 shops mẫu với tên + logo đẹp.
    - [ ] 20–30 sản phẩm với ảnh thật, mô tả hấp dẫn, đa dạng category.
    - [ ] 3 user test (buyer) với body measurements khác nhau.
    - [ ] 1 user có order history sẵn.
  - [ ] Ảnh sản phẩm: download sẵn hoặc dùng URL công khai ổn định.

- [ ] **Logging cơ bản**
  - [ ] Backend: structured logging (JSON format) với `logging` module.
  - [ ] Log file output: `logs/backend.log`, `logs/celery.log`.
  - [ ] Frontend: error boundary catching + log lỗi critical.
  - [ ] Script xoá log cũ: `scripts/clean_logs.sh`.

#### 2. UI/UX Polish
> **Người phụ trách:** Frontend team

- [ ] **Design system consistency**
  - [ ] Chốt và áp dụng đồng nhất:
    - [ ] Color palette (primary, secondary, accent, error, success).
    - [ ] Typography scale (h1–h6, body, caption).
    - [ ] Spacing system (4px grid: 4, 8, 12, 16, 24, 32, 48).
    - [ ] Border radius, shadow.
    - [ ] Button styles (primary, secondary, outline, disabled).

- [ ] **Loading states cho tất cả trang**
  - [ ] Home: skeleton cards.
  - [ ] Product Listing: skeleton grid.
  - [ ] Product Detail: skeleton layout.
  - [ ] Cart: skeleton rows.
  - [ ] Checkout: skeleton form.
  - [ ] Profile/Orders: skeleton list.
  - [ ] VTON: progress bar + timer.

- [ ] **Error states cho tất cả trang**
  - [ ] API lỗi: thông báo rõ ràng + nút "Thử lại".
  - [ ] 404 page: illustration + link về Home.
  - [ ] Network offline: banner "Không có kết nối mạng".
  - [ ] Empty states: illustration + CTA phù hợp.

- [ ] **Success feedback**
  - [ ] Toast notifications cho: thêm vào giỏ, đặt hàng, cập nhật profile.
  - [ ] Animations nhẹ: thêm vào giỏ → icon cart nhảy, checkout → confetti.

- [ ] **Responsive design**
  - [ ] Mobile (320–768px): single column, hamburger menu, bottom nav.
  - [ ] Tablet (769–1024px): 2-column product grid.
  - [ ] Desktop (1025px+): full layout.
  - [ ] **Ưu tiên**: desktop phải hoàn hảo cho demo (mobile nice-to-have).

- [ ] **Micro-interactions & polish**
  - [ ] Hover effects trên product cards.
  - [ ] Smooth page transitions.
  - [ ] Image lazy loading.
  - [ ] Scroll-to-top button.
  - [ ] Navbar sticky + blur background.

#### 3. Performance Optimization
> **Người phụ trách:** Full team

- [ ] **Frontend**
  - [ ] Lazy load routes (React.lazy + Suspense).
  - [ ] Image optimization: WebP format, srcset cho multiple sizes.
  - [ ] Bundle size check: `npm run build` → kiểm tra chunk sizes.
  - [ ] Memoization cho expensive renders (React.memo, useMemo).

- [ ] **Backend**
  - [ ] Database query optimization: kiểm tra N+1 queries.
  - [ ] Pagination đúng cho tất cả list endpoints.
  - [ ] Response time target: < 200ms cho list APIs, < 100ms cho detail APIs.

- [ ] **ML Services**
  - [ ] Pre-warm VTON model khi service start (tránh cold start lúc demo).
  - [ ] Pre-cache kết quả cho demo scenarios.

#### 4. Bug Fixing Sprint
> **Người phụ trách:** Full team

- [ ] **Tổng hợp bug list từ Phase 1–3**
  - [ ] Phân loại: blocker / major / minor.
  - [ ] Fix tất cả blockers trước demo.
  - [ ] Fix majors nếu kịp.

- [ ] **Regression testing**
  - [ ] Chạy lại toàn bộ buyer flow: register → login → browse → add to cart → checkout → order history.
  - [ ] Chạy lại DSS flow: nhập measurements → xem size recommendation.
  - [ ] Chạy lại VTON flow: upload/chọn ảnh → thử đồ → xem kết quả.
  - [ ] Test trên Chrome + Firefox (ít nhất 2 browsers).

#### 5. Presentation Preparation
> **Người phụ trách:** Full team

- [ ] **Slide deck (10–12 slides)**
  - [ ] Slide 1: Title — FashionCart.
  - [ ] Slide 2: Vấn đề — Tại sao cần VTON + DSS trong e-commerce thời trang?
  - [ ] Slide 3: Giải pháp — FashionCart overview.
  - [ ] Slide 4: Kiến trúc hệ thống (diagram từ architecture.md).
  - [ ] Slide 5: Tech stack & team.
  - [ ] Slide 6: Demo flow (screenshots).
  - [ ] Slide 7–9: Live demo.
  - [ ] Slide 10: Kết quả & metrics.
  - [ ] Slide 11: Hạn chế & hướng phát triển.
  - [ ] Slide 12: Q&A.

- [ ] **Demo script (10–15 phút)**
  ```
  Phần 1 — E-commerce core (3 phút):
    1. Mở trang Home → giới thiệu UI
    2. Browse sản phẩm → click vào 1 sản phẩm
    3. Xem chi tiết → chọn size/màu → thêm vào giỏ
    4. Vào Cart → xem tổng → checkout
    5. Đặt hàng thành công → xem order history

  Phần 2 — DSS Recommendation (3 phút):
    6. Vào Profile → nhập body measurements
    7. Quay lại Product Detail → thấy "Gợi ý size cho bạn: M"
    8. Đổi sang user khác (cao hơn) → gợi ý thay đổi: L
    9. Xem section "Sản phẩm tương tự"

  Phần 3 — VTON (4 phút):
    10. Vào Product Detail → click "Thử đồ ảo"
    11. Chọn ảnh mẫu → bắt đầu thử
    12. Chờ ~20 giây → xem kết quả before/after
    13. Thử với áo khác
    14. Click "Thêm vào giỏ" từ kết quả VTON

  Phần 4 — Graceful Degradation (2 phút):
    15. Tắt DSS service → sản phẩm vẫn browse được, gợi ý hiện fallback
    16. Tắt VTON service → nút thử đồ hiện "đang bảo trì"
    17. E-commerce flow vẫn hoạt động bình thường
  ```

- [ ] **Rehearsal**
  - [ ] Chạy thử full demo ít nhất **3 lần** trước ngày demo thật.
  - [ ] Mỗi thành viên biết phần mình trình bày.
  - [ ] Backup plan nếu live demo gặp lỗi (dùng screenshots/video recording).
  - [ ] Chuẩn bị video recording demo (phòng trường hợp không demo live được).

---

### Điều kiện để được xem là hoàn thành Phase 4
- [ ] `docker-compose up` chạy được tất cả services trên máy mới.
- [ ] Demo script chạy full flow 3 lần liên tiếp không lỗi.
- [ ] UI polish: không còn broken layout, thiếu loading/error state.
- [ ] Slide deck hoàn chỉnh, team đã rehearsal.
- [ ] Không còn bug blocker.

---

### Tổng kết / Kết quả

- **DevOps**
  - Docker Compose status:
  - Setup time cho máy mới:
  - Seed data script:

- **UI/UX**
  - Cải tiến đã làm:
  - Responsive status:
  - Performance metrics (load time):

- **Demo**
  - Link slide:
  - Link video recording:
  - Demo script final version:
  - Rehearsal results:

---

### Tiếp theo → [Phase 5: Hậu kiểm sau demo](phase5.md)
