## Phase 3 – Tích hợp Virtual Try-On (VTON) mức demo

### Checklist
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

### Tổng kết / Kết quả
- Ghi lại kiến trúc VTON (flow request/response, caching).
- Ghi lại các case demo chính và link ảnh kết quả.
- Ghi lại giới hạn hiện tại của VTON (thời gian xử lý, chất lượng ảnh, v.v.).
