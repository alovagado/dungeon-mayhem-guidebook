# Dungeon Mayhem – Hướng dẫn tại bàn

Web app tĩnh: máy chủ bàn hiện mã QR, người chơi quét để chọn nhân vật, xem ý nghĩa lá bài và luật chơi.

## Deploy lên Netlify qua GitHub

1. Tạo repo mới trên GitHub, đẩy toàn bộ thư mục này lên (nhánh `main`).
2. Vào app.netlify.com → **Add new site** → **Import an existing project** → chọn GitHub → chọn repo.
3. Netlify tự đọc `netlify.toml`: không có lệnh build, thư mục publish là `.`. Bấm **Deploy**.
4. Từ đó, mỗi lần `git push` là Netlify tự deploy lại.

## Dùng tại bàn

- Mở trang chủ trên laptop/TV/máy tính bảng → chọn số người → **Bắt đầu ván mới** → hiện QR.
- Người chơi quét QR → chọn nhân vật → xem lá bài → xem luật.
- Bàn 5–6 người tự hiện thêm luật chỉ đánh người ngồi cạnh.

## Sửa nội dung

Toàn bộ nhân vật, biểu tượng và luật nằm trong `data.js`. Sửa chữ, thêm nhân vật (copy một khối `{ id: ..., }`), rồi push.

## Chạy thử trên máy

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

Lưu ý: QR trên localhost chỉ mở được trên chính máy đó. Dùng link Netlify để điện thoại quét được.

Dự án fan-made, không liên kết với Wizards of the Coast. Không dùng hình ảnh hay chữ gốc của lá bài.
