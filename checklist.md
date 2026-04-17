# FashionCart — Lộ trình phát triển đến bản demo

> Tài liệu tổng quan tracking tiến độ các phase. Click vào từng phase để xem checklist chi tiết.

---

## Tổng quan các Phase

| Phase | Tên | Trạng thái | Thời gian ước tính |
|---|---|---|---|
| 0 | [Chuẩn bị & định hướng](Phase%20checklists/phase0.md) | ✅ Hoàn thành | 1–2 ngày |
| 1 | [MVP e-commerce cơ bản](Phase%20checklists/phase1.md) | ⬜ Chưa bắt đầu | 4–6 tuần |
| 2 | [Tích hợp Recommendation (DSS)](Phase%20checklists/phase2.md) | ⬜ Chưa bắt đầu | 2–3 tuần |
| 3 | [Tích hợp Virtual Try-On (VTON)](Phase%20checklists/phase3.md) | ⬜ Chưa bắt đầu | 3–4 tuần |
| 4 | [Tối ưu demo & hoàn thiện](Phase%20checklists/phase4.md) | ⬜ Chưa bắt đầu | 1–2 tuần |
| 5 | [Hậu kiểm sau demo](Phase%20checklists/phase5.md) | ⬜ Chưa bắt đầu | 3–5 ngày |

**Tổng thời gian ước tính:** ~12–16 tuần (3–4 tháng)

---

## Flow tổng quát

```
Phase 0 (Done)     Phase 1           Phase 2          Phase 3          Phase 4         Phase 5
┌──────────┐   ┌──────────────┐   ┌────────────┐   ┌────────────┐   ┌───────────┐   ┌──────────┐
│ Tech stack│──→│ MVP E-com    │──→│ DSS/Size   │──→│ VTON       │──→│ Polish &  │──→│ Review & │
│ Arch docs │   │ Auth+Catalog │   │ Recommend  │   │ Try-On     │   │ Demo prep │   │ Feedback │
│ Team setup│   │ Cart+Order   │   │ Fallback   │   │ Async jobs │   │ Docker    │   │ Roadmap  │
└──────────┘   └──────────────┘   └────────────┘   └────────────┘   └───────────┘   └──────────┘
```

---

## Cách sử dụng checklist

1. **Trước khi bắt đầu phase mới** → đọc kỹ section "Những gì team cần chốt trước khi bắt đầu".
2. **Trong quá trình làm** → tick `[x]` từng item khi hoàn thành.
3. **Khi gần xong** → kiểm tra "Điều kiện hoàn thành Phase" ở cuối mỗi file.
4. **Khi hoàn thành** → điền "Tổng kết / Kết quả" và chuyển sang phase kế tiếp.

---

## Tài liệu liên quan

| Tài liệu | Đường dẫn |
|---|---|
| Kiến trúc hệ thống | `docs/architecture.md` |
| Agent rules | `agentrules.md` |
| Backend module docs | `backend/BE/*.md` |
| Frontend module docs | `frontend/FE/*.md` |
| ML module docs | `ml-services/ML/*.md` |
| Database docs | `backend/database/readme.md` |
| Quy ước team | `docs/team-conventions.md` |
