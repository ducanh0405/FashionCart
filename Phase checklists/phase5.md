# Phase 5 – Hậu kiểm sau demo

> **Trạng thái:** Chưa bắt đầu
> **Yêu cầu trước:** Phase 4 hoàn thành + Demo đã thực hiện
> **Thời gian ước tính:** 3–5 ngày

---

### Mục tiêu phase
- Thu thập và phân tích **feedback** từ giảng viên / khán giả / team.
- Ghi nhận **bài học kỹ thuật** và **pain points UX** để cải thiện.
- Lập **roadmap tiếp theo** nếu project tiếp tục phát triển (beyond course).
- Quyết định: tiếp tục phát triển hay dừng ở mức demo?

---

### Checklist triển khai chi tiết

#### 1. Thu thập feedback
> **Người phụ trách:** Team lead / PM

- [ ] **Feedback từ giảng viên**
  - [ ] Ghi lại nhận xét về kiến trúc hệ thống.
  - [ ] Ghi lại nhận xét về chất lượng code / demo.
  - [ ] Ghi lại câu hỏi + câu trả lời trong buổi demo.
  - [ ] Điểm số / đánh giá (nếu có).

- [ ] **Feedback từ người xem demo**
  - [ ] Tính năng nào gây ấn tượng nhất?
  - [ ] Tính năng nào cần cải thiện?
  - [ ] UI/UX có dễ dùng không? Có gì confusing?
  - [ ] VTON quality có chấp nhận được không?
  - [ ] Có muốn sử dụng sản phẩm thật không?

- [ ] **Self-review của team**
  - [ ] Mỗi thành viên đánh giá: cái gì làm tốt, cái gì cần cải thiện.
  - [ ] Review code quality: technical debt đang ở đâu?
  - [ ] Review architecture: có gì cần refactor cho production?

#### 2. Phân tích kỹ thuật (Technical Retrospective)
> **Người phụ trách:** Full team

- [ ] **Frontend review**
  - [ ] Component nào cần refactor (quá lớn, quá phức tạp)?
  - [ ] State management có đủ tốt hay cần upgrade (Redux, Zustand)?
  - [ ] Performance issues: trang nào load chậm?
  - [ ] Accessibility (a11y): đã đủ chưa?

- [ ] **Backend review**
  - [ ] API nào response chậm? Có N+1 query không?
  - [ ] Auth system có đủ secure? Cần thêm gì?
  - [ ] Error handling đã cover đủ cases chưa?
  - [ ] Database schema có cần normalize/denormalize?

- [ ] **ML Services review**
  - [ ] DSS accuracy có đủ tốt? Cần thêm data hay đổi model?
  - [ ] VTON quality: categories nào hoạt động tốt, categories nào cần cải thiện?
  - [ ] Processing time: có thể optimize được không?
  - [ ] Infrastructure: cần GPU cloud hay có thể chạy CPU?

- [ ] **DevOps review**
  - [ ] Docker setup có ổn định? Có service nào hay crash?
  - [ ] CI/CD pipeline: đã có chưa? Cần thiết lập?
  - [ ] Monitoring/alerting: cần gì cho production?

#### 3. Tài liệu hóa (Documentation Wrap-up)
> **Người phụ trách:** Full team

- [ ] **Cập nhật tài liệu kỹ thuật**
  - [ ] `docs/architecture.md` — phản ánh thực tế implementation.
  - [ ] `backend/BE/*.md` — cập nhật theo code thực tế.
  - [ ] `frontend/FE/*.md` — cập nhật theo UI thực tế.
  - [ ] `ml-services/ML/*.md` — model, data, performance metrics.

- [ ] **Tạo tài liệu mới (nếu chưa có)**
  - [ ] `docs/deployment.md` — hướng dẫn deploy.
  - [ ] `docs/api-reference.md` — API documentation đầy đủ.
  - [ ] `docs/lessons-learned.md` — bài học kinh nghiệm.

- [ ] **Code cleanup**
  - [ ] Xoá TODO comments không còn cần.
  - [ ] Xoá dead code / unused files.
  - [ ] Format tất cả code (lint + prettier).
  - [ ] Commit message cleanup (squash nếu cần).

#### 4. Roadmap cho tương lai
> **Người phụ trách:** Team lead

- [ ] **Đánh giá khả năng tiếp tục**
  - [ ] Team có muốn tiếp tục phát triển không?
  - [ ] Có potential để trở thành sản phẩm thật không?
  - [ ] Cần survey/validate market không?

- [ ] **Cập nhật `docs/roadmap.md`**
  - [ ] **Short-term (1–2 tháng):**
    - [ ] Thêm Chat real-time giữa buyer và shop.
    - [ ] Thêm Rating/Review sản phẩm.
    - [ ] Cải thiện VTON quality cho nhiều category hơn.
    - [ ] Admin dashboard.
  - [ ] **Mid-term (3–6 tháng):**
    - [ ] Social feed / share outfit.
    - [ ] Thanh toán thật (VNPay/MoMo).
    - [ ] App mobile (React Native).
    - [ ] Multi-vendor marketplace hoàn chỉnh.
  - [ ] **Long-term (6–12 tháng):**
    - [ ] Kết nối brand thật ở HCM.
    - [ ] Personalized feed dựa trên ML.
    - [ ] AR try-on trên mobile.
    - [ ] Scale infrastructure.

- [ ] **Quyết định tiếp theo**
  - [ ] Có tuyển thêm team member không?
  - [ ] Có cần mentor kỹ thuật không?
  - [ ] Funding / resources cần gì?

---

### Điều kiện để được xem là hoàn thành Phase 5
- [ ] Feedback đã thu thập và document.
- [ ] Technical retrospective đã thực hiện.
- [ ] Tài liệu kỹ thuật cập nhật theo thực tế.
- [ ] Roadmap đã update với bước tiếp theo rõ ràng.
- [ ] Team đã thống nhất có tiếp tục hay không.

---

### Tổng kết / Kết quả

- **Feedback tổng hợp**
  - Điểm mạnh của project:
  - Điểm cần cải thiện:
  - Tính năng được yêu thích nhất:
  - Tính năng cần bỏ / thay đổi:

- **Technical debt**
  - Frontend:
  - Backend:
  - ML:
  - Infrastructure:

- **Quyết định cuối cùng**
  - Tiếp tục phát triển: ☐ Có / ☐ Không
  - Nếu có — ưu tiên tiếp theo:
  - Timeline dự kiến:

---

### 🏁 Kết thúc lộ trình demo FashionCart
