## Phase 2 – Tích hợp Recommendation (DSS) cơ bản

### Checklist
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

### Tổng kết / Kết quả
- Ghi lại dataset sử dụng và nơi lưu trữ.
- Ghi lại chất lượng recommendation (metrics, feedback).
- Ghi lại link API docs cho DSS và trạng thái tích hợp frontend/backend.
