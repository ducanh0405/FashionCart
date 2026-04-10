# Phase 0 – Chuẩn bị & định hướng ✅

> **Trạng thái:** Hoàn thành
> **Thời gian ước tính:** 1–2 ngày

---

### Mục tiêu phase
- Chốt toàn bộ quyết định nền tảng trước khi bắt tay vào code.
- Đảm bảo cả team cùng hiểu scope, tech stack, và kiến trúc hệ thống.
- Tạo đủ tài liệu để mọi người có thể làm việc độc lập từ Phase 1.

---

### Checklist

#### 1. Xác định scope demo
- [x] Chốt rõ tính năng sẽ có trong demo (web only, không mobile).
- [x] Xác định user chính: **Người mua (Buyer)**, Shop, Admin.
- [x] Xác định tính năng AI: Virtual Try-On (VTON) + Decision Support System (DSS).

#### 2. Chọn tech stack
- [x] Frontend: **React + Vite**.
- [x] Backend: **Django** (hoặc FastAPI — chốt cụ thể ở Phase 1).
- [x] Database: **SQL Server** (required).
- [x] ML Services: **Python** (PyTorch/TensorFlow, tách riêng service).

#### 3. Chuẩn hóa kiến trúc
- [x] Review và hoàn thiện `docs/architecture.md`.
- [x] Tạo tài liệu API sơ bộ → xem `backend/BE/APIs.md`.
- [x] Thiết lập cấu trúc thư mục chuẩn cho repo.

---

### Tổng kết / Kết quả

| Hạng mục | Quyết định |
|---|---|
| **Scope demo** | Web only. User chính: Buyer. Có thêm Admin & Shop ở mức backend |
| **Frontend** | React + Vite |
| **Backend** | Django (chốt cụ thể ở Phase 1) |
| **Database** | SQL Server (required) |
| **ML Services** | Python-based, tách riêng thành microservices |
| **Kiến trúc** | Xem `docs/architecture.md` |
| **Module docs** | `backend/BE/`, `frontend/FE/`, `ml-services/ML/` |

---

### Tiếp theo → [Phase 1: MVP e-commerce cơ bản](phase1.md)
