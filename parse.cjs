const fs = require('fs');

const text1 = `Câu 1. Chu trình làm việc của động cơ 4 kỳ diễn ra trong mấy vòng quay trục khuỷu?
A. 1 vòng quay.
B. 2 vòng quay.
C. 3 vòng quay.
D. 4 vòng quay.
Câu 2. Điểm chết trên (ĐCT) của piston được định nghĩa là vị trí:
A. Piston ở gần tâm trục khuỷu nhất.
B. Piston ở xa tâm trục khuỷu nhất.
C. Piston bắt đầu đi xuống nạp khí.
D. Piston dừng lại để đánh lửa.
Câu 3. Thứ tự đúng của các kỳ trong một chu trình làm việc của động cơ 4 kỳ là:
A. Nạp – Nổ – Nén – Xả.
B. Nén – Nạp – Nổ – Xả.
C. Nạp – Nén – Nổ – Xả.
D. Nạp – Nén – Xả – Nổ.
Câu 4. Trong kỳ nén của động cơ 4 kỳ, trạng thái của các xupap là:
A. Xupap nạp mở, xupap xả đóng.
B. Xupap nạp đóng, xupap xả mở.
C. Cả hai xupap đều mở để nén khí.
D. Cả hai xupap đều đóng kín.
Câu 5. Động cơ Diesel nạp loại chất gì vào xi lanh trong kỳ nạp?
A. Hòa khí (hỗn hợp xăng và không khí).
B. Hơi nhiên liệu Diesel.
C. Không khí sạch.
D. Hỗn hợp dầu Diesel và không khí.
Câu 6. Kỳ nào trong chu trình làm việc trực tiếp tạo ra lực đẩy piston làm quay trục 
khuỷu?
A. Kỳ nạp.
B. Kỳ nén.
C. Kỳ nổ (Sinh công).
D. Kỳ xả.
Câu 7. Ở động cơ xăng, bugi thực hiện đánh lửa vào thời điểm nào?
A. Đầu kỳ nén.
B. Giữa kỳ nén.
C. Cuối kỳ nén (trước khi piston lên đến ĐCT).
D. Khi piston đã xuống đến ĐCD ở kỳ nổ.
Câu 8. Hành trình của piston (S) là:
A. Khoảng cách giữa hai điểm chết ĐCT và ĐCD.
B. Quãng đường piston đi được trong 1 vòng quay trục khuỷu.
C. Đường kính của xi lanh động cơ.
D. Độ dài của thanh truyền.
Câu 9. Mối liên hệ giữa hành trình piston (S) và bán kính quay của trục khuỷu (R) là:
A. S = R.
B. S = 2R.
C. R = 2S.
D. S = 4R.
Câu 10. Thể tích công tác ($V_{ct}$) là thể tích xi lanh được giới hạn bởi:
A. ĐCT và nắp máy.
B. ĐCD và nắp máy.
C. Giữa hai điểm chết ĐCT và ĐCD.
D. Toàn bộ không gian bên trong xi lanh.
Câu 11. Tỷ số nén ($\\varepsilon$) của động cơ được tính bằng công thức:
A. $\\varepsilon = V_h / V_c$.
B. $\\varepsilon = V_c / V_a$.
C. $\\varepsilon = V_a / V_c$.
D. $\\varepsilon = V_a / V_h$.
Câu 12. Đặc điểm nổi bật khiến động cơ Diesel có hiệu suất nhiệt cao hơn động cơ 
xăng là:
A. Sử dụng bugi đánh lửa mạnh.
B. Có tỷ số nén cao hơn nhiều so với động cơ xăng.
C. Nhiên liệu Diesel rẻ tiền hơn.
D. Cấu tạo piston phức tạp hơn.
Câu 13. Trong kỳ xả của động cơ 4 kỳ, piston chuyển động theo chiều nào?
A. Từ ĐCT xuống ĐCD.
B. Từ ĐCD lên ĐCT.
C. Đứng yên tại ĐCD.
D. Quay quanh trục khuỷu.
Câu 14. Nhiên liệu trong động cơ Diesel tự bốc cháy là do:
A. Sức nóng của bugi sấy.
B. Á suất và nhiệt độ không khí ở cuối kỳ nén rất cao.
C. Nhiên liệu được đun nóng trước khi phun.
D. Tia lửa điện từ vòi phun.
Câu 15. Hòa khí của động cơ xăng dùng bộ chế hòa khí được hình thành ở đâu?
A. Bên trong buồng cháy của xi lanh.
B. Trên đường ống nạp (trước khi vào xi lanh).
C. Ngay tại vòi phun nhiên liệu.
D. Bên trong các-te máy.
Câu 16. Hòa khí của động cơ Diesel được hình thành ở vị trí nào?
A. Trong bầu lọc khí.
B. Trên đường ống nạp.
C. Trong xi lanh vào cuối kỳ nén.
D. Trong bơm cao áp.
Câu 17. Động cơ 2 kỳ hoàn thành một chu trình làm việc trong bao nhiêu vòng quay 
trục khuỷu?
A. 1 vòng.
B. 2 vòng.
C. 0,5 vòng.
D. 4 vòng.
Câu 18. Ưu điểm chính của động cơ 4 kỳ so với động cơ 2 kỳ là:
A. Cấu tạo đơn giản, không có xupap.
B. Tiết kiệm nhiên liệu và giảm ô nhiễm môi trường.
C. Công suất trên cùng một dung tích lớn hơn.
D. Trọng lượng máy nhẹ hơn.
Câu 19. Bộ phận nào giúp động cơ duy trì tốc độ quay ổn định và vượt qua các kỳ
phụ?
A. Piston.
B. Bánh đà.
C. Thanh truyền.
D. Trục cam.
Câu 20. Thân máy và nắp máy của động cơ ô tô hiện nay thường được làm bằng:
A. Nhựa tổng hợp chịu nhiệt.
B. Hợp kim nhôm hoặc gang xám.
C. Thép không gỉ (Inox).
D. Sắt nguyên chất.
Câu 21. Nhiệm vụ quan trọng nhất của hệ thống bôi trơn là:
A. Cung cấp nhiên liệu cho máy.
B. Giảm ma sát, làm mát, làm sạch và làm kín các bề mặt chi tiết.
C. Đốt cháy các cặn bẩn trong máy.
D. Tăng công suất cho động cơ.
Câu 22. Trong hệ thống bôi trơn cưỡng bức, dầu được vận chuyển đến các bề mặt 
ma sát nhờ:
A. Trọng lực tự nhiên.
B. Áp suất do bơm dầu tạo ra.
C. Sự vung té của trục khuỷu.
D. Áp suất khí nén trong xi lanh.
Câu 23. Bầu lọc dầu trong hệ thống bôi trơn có vai trò:
A. Làm hạ nhiệt độ của dầu.
B. Loại bỏ các tạp chất cơ học và mạt kim loại trong dầu.
C. Tăng độ nhớt cho dầu bôi trơn.
D. Ngăn không cho dầu chảy về các-te.
Câu 24. Tại sao một số động cơ cần có két làm mát dầu?
A. Để dầu không bị bay hơi.
B. Để giữ nhiệt độ dầu ổn định, tránh dầu bị loãng quá mức khi máy nóng.
C. Để lọc bụi mịn trong dầu.
D. Để chứa thêm dầu dự phòng.
Câu 25. Khi áp suất dầu trong hệ thống vượt quá mức cho phép, bộ phận nào sẽ hoạt 
động?
A. Van hằng nhiệt.
B. Van an toàn (Van điều áp).
C. Bơm cao áp.
D. Thước thăm dầu.
Câu 26. Hệ thống làm mát bằng nước tuần hoàn cưỡng bức bao gồm những loại 
nào?
A. Loại hở và loại kín.
B. Loại dùng quạt và loại không dùng quạt.
C. Cả A và B đều đúng.
D. Chỉ có loại bốc hơi.
Câu 27. Van hằng nhiệt có chức năng gì trong hệ thống làm mát?
A. Tăng tốc độ quay của quạt gió.
B. Làm nước mát lạnh đi nhanh chóng.
C. Điều hướng nước mát về bơm hoặc qua két tản nhiệt tùy theo nhiệt độ.
D. Đo nhiệt độ để báo lên bảng đồng hồ.
Câu 28. Khi động cơ vừa mới khởi động (nhiệt độ nước < 70°C), nước làm mát sẽ:
A. Chảy qua két tản nhiệt để làm lạnh.
B. Đi tắt theo đường ống phụ về thẳng bơm nước.
C. Ngừng tuần hoàn để máy nhanh nóng.
D. Được xả bỏ ra ngoài môi trường.
Câu 29. Cánh tản nhiệt đúc ngoài thân xi lanh là đặc điểm của hệ thống làm mát nào?
A. Làm mát bằng nước tuần hoàn.
B. Làm mát bằng không khí.
C. Làm mát bằng dầu cưỡng bức.
D. Làm mát bằng dung dịch hóa chất.
Câu 30. Hệ thống nhiên liệu động cơ xăng dùng bộ chế hòa khí sử dụng bộ phận nào 
để trộn xăng với không khí?
A. Vòi phun điện tử.
B. Bộ chế hòa khí (Bình xăng con).
C. Bơm cao áp Diesel.
Câu 31. Trong hệ thống phun xăng điện tử (EFI), xăng được phun vào vị trí nào?
A. Phía trước xupap nạp hoặc trực tiếp vào buồng cháy.
B. Vào các-te để bôi trơn piston.
C. Vào bầu lọc gió để trộn đều.
D. Vào két nước tản nhiệt.
Câu 32. Khối điều khiển điện tử (ECU) trong hệ thống EFI đóng vai trò:
A. Là nguồn cung cấp điện cho bugi.
B. Là máy bơm hút xăng từ bình.
C. Tiếp nhận tín hiệu từ các cảm biến để tính toán lượng xăng phun tối ưu.
D. Điều khiển việc đóng mở các xupap nạp xả.
Câu 33. Bộ phận nào trong hệ thống nhiên liệu Diesel tạo ra áp suất rất cao để phun 
tơi nhiên liệu?
A. Bơm chuyển (bơm thấp áp).
B. Bơm cao áp.
C. Vòi phun.
D. Bầu lọc tinh.
Câu 34. Thời điểm vòi phun Diesel phun nhiên liệu vào xi lanh là:
A. Đầu kỳ nạp.
B. Giữa kỳ nén.
C. Cuối kỳ nén (gần ĐCT).
D. Sau khi piston đã đi xuống kỳ nổ.
Câu 35. Hệ thống đánh lửa là bộ phận bắt buộc phải có trên:
A. Động cơ Diesel.
B. Động cơ xăng.
C. Động cơ phản lực.
D. Động cơ chạy bằng khí gas hóa lỏng.
Câu 36. Nhiệm vụ của biến áp đánh lửa (Bobin) là:
A. Biến dòng điện áp thấp (12V) thành dòng điện áp cao (hàng chục nghìn V).
B. Tích trữ điện năng để đề máy.
C. Điều chỉnh khe hở của bugi.
Câu 37. Ưu điểm lớn nhất của hệ thống đánh lửa điện tử (không tiếp điểm) là:
A. Đánh lửa mạnh, chính xác và không bị mòn má vít cơ khí.
B. Cấu tạo rất đơn giản, dễ sửa chữa bằng tay.
C. Không cần sử dụng nguồn điện từ ắc quy.
D. Giá thành sản xuất rẻ hơn hệ thống cũ.
Câu 38. Hệ thống khởi động bằng động cơ điện lấy năng lượng từ:
A. Máy phát điện trên xe.
B. Ắc quy.
C. Trực tiếp từ bugi.
D. Động cơ xăng phụ.
Câu 39. Khớp truyền động (Bendix) trong máy đề có tác dụng:
A. Chỉ truyền mô men một chiều từ motor điện sang vành răng bánh đà.
B. Làm mát cho motor đề khi quay lâu.
C. Đánh lửa giúp động cơ nổ nhanh hơn.
D. Ngắt điện ắc quy khi máy đã nổ.
Câu 40. Bộ xúc tác 3 thành phần (Catalytic Converter) dùng để khử loại khí độc nào?
A. CO, HC, NOx.
B. CO2, N2, O2.
C. SO2 và bụi mịn.
D. Hơi nước và chì.
Câu 41. Hệ thống xử lý khí thải SCR trên xe Diesel hiện đại sử dụng dung dịch gì?
A. Nước cất.
B. Dầu hỏa.
C. Dung dịch Urea (AdBlue).
D. Cồn công nghiệp.
Câu 42. Chức năng của hệ thống EGR là:
A. Tăng lượng oxy nạp vào để máy khỏe hơn.
B. Đưa một phần khí thải quay lại buồng cháy để giảm nồng độ khí độc NOx.
C. Lọc sạch bụi bẩn trong khí thải trước khi ra ngoài.
D. Tăng áp suất khí nén trong xi lanh.
Câu 43. Nếu bầu lọc dầu bị tắc hoàn toàn, dầu bôi trơn sẽ chuyển động như thế nào?
A. Ngừng chảy hoàn toàn, động cơ bị bó máy ngay lập tức.
B. Chảy qua van an toàn đến thẳng đường dầu chính (không qua lọc).
C. Chảy ngược lại bình chứa để chờ thay lọc mới.
D. Chảy ra ngoài môi trường qua lỗ thoát.
Câu 44. Hệ thống bôi trơn các-te rời (các-te khô) khác hệ thống các-te ướt ở chỗ:
A. Dầu được chứa ở một thùng riêng biệt bên ngoài động cơ.
B. Không cần sử dụng bơm dầu.
C. Không cần bầu lọc dầu.
D. Dầu được phun trực tiếp vào đỉnh piston.
Câu 45. Cảm biến Oxy (Lambda) gắn trên đường ống xả có nhiệm vụ:
A. Làm mát khí thải.
B. Đo lượng oxy dư để ECU điều chỉnh tỷ lệ hòa khí (xăng/khí) cho chuẩn.
C. Cung cấp thêm oxy cho bộ xúc tác.
D. Báo hiệu khi ống pô bị thủng.
Câu 46. Nhiệm vụ của bầu lọc gió là:
A. Làm sạch bụi bẩn trong không khí nạp vào.
B. Giảm tiếng ồn khi động cơ hút khí.
C. Làm mát luồng không khí nạp.
D. Cả A và B đều đúng.
Câu 47. Trong hệ thống làm mát bằng nước, bộ phận nào có tác dụng đẩy nước tuần 
hoàn?
A. Két nước.
B. Quạt gió.
C. Bơm nước.
D. Van hằng nhiệt.
Câu 48. Bugi được phân loại thành "Bugi nóng" và "Bugi lạnh" dựa vào:
A. Khả năng tản nhiệt của bugi.
B. Chiều dài của phần cách điện.
C. Cả A và B đều đúng.
D. Màu sắc của tia lửa điện.
Câu 49. Hiện tượng "bị e" (lọt không khí) trong hệ thống nhiên liệu Diesel sẽ dẫn đến:
A. Động cơ chạy nhanh hơn bình thường.
B. Động cơ không nổ được hoặc nổ rồi chết máy ngay.
C. Tiết kiệm nhiên liệu hơn.
D. Động cơ xả khói đen mù mịt.
Câu 50. Mục đích của việc thay dầu và lọc dầu định kỳ cho động cơ là:
A. Duy trì khả năng bôi trơn tối ưu.
B. Loại bỏ các cặn bẩn và axit hình thành trong quá trình cháy.
C. Bảo vệ các chi tiết máy khỏi mài mòn và rỉ sét.
D. Tất cả các ý trên đều đúng.`;

const text2 = `Câu 1. Các bộ phận chính của một chiếc ô tô bao gồm:
A. Động cơ, hệ thống truyền lực, bánh xe.
B. Hệ thống lái, hệ thống phanh, khung vỏ.
C. Hệ thống điện và điện tử.
D. Tất cả các bộ phận trên.
Câu 2. Bộ phận nào tạo ra nguồn mô men chủ động để xe chuyển động?
A. Động cơ.
B. Hệ thống truyền lực.
C. Hệ thống lái.
D. Hộp số.
Câu 3. Hệ thống truyền lực trên ô tô bao gồm các bộ phận nào?
A. Li hợp, hộp số, trục các đăng, truyền lực chính và bộ vi sai.
B. Động cơ, bánh xe, hệ thống phanh.
C. Vô lăng, trục lái, cơ cấu lái.
D. Xilanh, piston, trục khuỷu.
Câu 4. Nhiệm vụ của hệ thống truyền lực là:
A. Tạo ra năng lượng nhiệt.
B. Truyền và biến đổi mô men từ động cơ đến các bánh xe.
C. Điều khiển hướng chuyển động của xe.
D. Giảm tốc độ và dừng xe.
Câu 5. Bộ phận nào dùng để ngắt hoặc nối truyền động từ động cơ đến hộp số?
A. Li hợp (Côn).
B. Hộp số.
C. Trục các đăng.
D. Bộ vi sai.
Câu 6. Hộp số trên ô tô có nhiệm vụ chính là:
A. Đốt cháy nhiên liệu sinh công.
B. Thay đổi mô men và tốc độ của xe, cho phép xe chạy lùi.
C. Điều khiển bánh xe dẫn hướng.
D. Nạp điện cho ắc quy.
Câu 7. Hệ thống nào giúp ô tô chuyển động êm dịu khi đi qua đường gồ ghề?
A. Hệ thống lái.
B. Hệ thống phanh.
C. Hệ thống treo.
D. Hệ thống truyền lực.
Câu 8. Hệ thống lái có nhiệm vụ gì?
A. Thay đổi hoặc duy trì hướng chuyển động của ô tô.
B. Dừng xe trong trường hợp khẩn cấp.
C. Truyền lực từ động cơ tới bánh xe.
D. Tăng công suất cho động cơ.
Câu 9. Để giảm tốc độ hoặc dừng hẳn ô tô, người lái sử dụng hệ thống nào?
A. Hệ thống treo.
B. Hệ thống truyền lực.
C. Hệ thống phanh.
D. Hệ thống lái.
Câu 10. Khung vỏ ô tô có vai trò gì?
A. Lắp đặt các hệ thống và bộ phận của ô tô.
B. Tạo không gian chứa người và hàng hóa.
C. Bảo vệ người ngồi trên xe và tạo hình dáng thẩm mỹ.
D. Tất cả các đáp án trên.
Câu 11. Hệ thống điện và điện tử trên ô tô bao gồm:
A. Nguồn điện (ắc quy, máy phát).
B. Hệ thống khởi động, đánh lửa, chiếu sáng, tín hiệu.
C. Các hệ thống điều khiển thông minh và an toàn.
D. Tất cả các thành phần trên.
Câu 12. Ý nào sau đây là tác động tiêu cực của ô tô đối với môi trường?
A. Giúp cơ giới hóa sản xuất.
B. Gây ô nhiễm không khí do khí thải và tiếng ồn.
C. Rút ngắn thời gian di chuyển.
D. Vận chuyển được khối lượng hàng hóa lớn.
Câu 13. Người lái xe cần làm gì trước khi khởi động xe để đảm bảo an toàn?
A. Kiểm tra áp suất lốp.
B. Điều chỉnh vị trí ghế và gương chiếu hậu.
C. Thắt dây an toàn.
D. Thực hiện tất cả các việc trên.
Câu 14. Khi lái xe trên đoạn đường trơn trượt, người lái nên:
A. Phanh gấp để dừng xe nhanh.
B. Quay vành lái đột ngột.
C. Đi chậm và tránh phanh gấp, tránh quay vành lái đột ngột.
D. Tăng ga thật mạnh để vượt qua.
Câu 15. Bộ phận nào cho phép các bánh xe quay với tốc độ khác nhau khi xe vào 
đường vòng?
A. Li hợp.
B. Hộp số.
C. Bộ vi sai.
D. Trục các đăng.
Câu 16. Hệ thống phanh hiện đại thường được trang bị thêm hệ thống nào để chống 
bó cứng bánh xe?
A. Hệ thống EFI.
B. Hệ thống ABS.
C. Hệ thống SCR.
D. Hệ thống EGR.
Câu 17. Để đảm bảo an toàn giao thông, người ngồi trên ô tô cần:
A. Mở cửa xe ngay khi xe vừa dừng lại.
B. Thắt dây an toàn và ngồi đúng tư thế.
C. Nhoài người ra ngoài cửa sổ để quan sát.
D. Sử dụng điện thoại khi đang lái xe.
Câu 18. Máy phát điện trên ô tô có nhiệm vụ:
A. Khởi động động cơ.
B. Cung cấp điện cho các thiết bị và nạp điện cho ắc quy khi máy đang nổ.
C. Tạo ra tia lửa điện để đốt cháy xăng.
D. Thay thế hoàn toàn ắc quy.
Câu 19. Hệ thống truyền lực có bộ phận "Trục các đăng" nhằm mục đích:
A. Thay đổi tốc độ xe.
B. Truyền mô men giữa các trục không thẳng hàng hoặc có sự thay đổi khoảng cách.
C. Ngắt truyền động khẩn cấp.
D. Bôi trơn các bánh răng.
Câu 20. Vai trò chính của ô tô trong đời sống và sản xuất là:
A. Là phương tiện giao thông vận tải đường bộ chính.
B. Giúp vận chuyển người và hàng hóa nhanh chóng, thuận tiện.
C. Thúc đẩy giao thương và phát triển kinh tế.
D. Tất cả các ý trên.
Câu 21. Hệ thống phanh trên ô tô thường được phân loại theo:
A. Theo kết cấu cơ cấu phanh (phanh đĩa, phanh tang trống).
B. Theo dẫn động phanh (phanh thủy lực, phanh khí nén).
C. Theo công dụng (phanh chính, phanh dừng).
D. Tất cả các cách phân loại trên.
Câu 22. Khi đi xe ô tô, việc điều chỉnh gương chiếu hậu giúp người lái:
A. Nhìn rõ phía trước xe.
B. Quan sát được phía sau và hai bên thân xe, hạn chế điểm mù.
C. Trang trí cho xe đẹp hơn.
D. Kiểm tra tình trạng hành khách phía sau.
Câu 23. Những yếu tố nào tiềm ẩn nguy cơ mất an toàn khi vận hành ô tô?
A. Tình trạng kĩ thuật của xe không đảm bảo.
B. Người lái sử dụng rượu bia hoặc chất kích thích.
C. Vi phạm luật giao thông đường bộ.
D. Tất cả các yếu tố trên.
Câu 24. Hệ thống treo bao gồm các thành phần chính nào?
A. Bộ phận đàn hồi, bộ phận dẫn hướng và bộ phận giảm chấn.
B. Bánh xe, lốp xe và vành xe.
C. Trục lái và vành tay lái.
D. Má phanh và đĩa phanh.
Câu 25. Tại sao phải thường xuyên kiểm tra tình trạng kĩ thuật của ô tô?
A. Để xe luôn bóng loáng.
B. Để kịp thời phát hiện hư hỏng, đảm bảo an toàn và tăng tuổi thọ cho xe.
C. Để tiết kiệm xăng tối đa.
D. Vì luật pháp bắt buộc phải rửa xe hàng ngày.
Câu 26. Trong hệ thống lái, bộ phận nào tiếp nhận lực điều khiển trực tiếp từ tay 
người lái?
A. Trục lái.
B. Vành lái (Vô lăng).
C. Cơ cấu lái.
D. Bánh xe dẫn hướng.
Câu 27. Phanh dừng (phanh tay) được sử dụng chủ yếu khi nào?
A. Khi đỗ xe hoặc dừng xe trong thời gian dài.
B. Khi xe đang chạy ở tốc độ cao.
C. Khi muốn vượt xe khác.
D. Khi xe vừa khởi động.
Câu 28. Hệ thống điện tử hỗ trợ đỗ xe giúp ích gì cho người lái?
A. Giúp xe chạy nhanh hơn.
B. Cảnh báo vật cản và hỗ trợ đưa xe vào vị trí đỗ an toàn.
C. Tự động thay dầu cho máy.
D. Giảm lượng khí thải độc hại.
Câu 29. Lốp xe ô tô quá mòn sẽ gây ra hậu quả gì?
A. Xe chạy êm hơn.
B. Giảm độ bám đường, dễ gây trượt bánh và nổ lốp, mất an toàn.
C. Giúp tiết kiệm nhiên liệu.
D. Không ảnh hưởng gì đến vận hành.
Câu 30. Một chiếc ô tô hiện đại thường sử dụng nguồn điện từ:
A. Pin năng lượng mặt trời.
B. Ắc quy và máy phát điện.
C. Động cơ đốt trong trực tiếp.
D. Điện lưới gia đình.
Câu 31. Việc thắt dây an toàn khi ngồi trên ô tô có tác dụng gì?
A. Đối phó với cảnh sát giao thông.
B. Giữ cơ thể cố định, giảm va đập khi xe dừng đột ngột hoặc xảy ra tai nạn.
C. Làm cho ghế ngồi êm hơn.
D. Giúp xe cân bằng hơn khi vào cua.
Câu 32. Tại sao ô tô cần phải được bảo dưỡng định kỳ theo khuyến cáo của nhà sản 
xuất?
A. Để nhà sản xuất có thêm lợi nhuận.
B. Đảm bảo xe hoạt động ổn định, an toàn và duy trì các điều kiện bảo hành.
C. Để xe có tiếng nổ to hơn.
D. Để thay đổi màu sơn của xe.
Câu 33. Hệ thống đèn chiếu sáng trên ô tô có tác dụng:
A. Giúp người lái quan sát đường vào ban đêm hoặc khi thiếu sáng.
B. Báo hiệu sự hiện diện của xe cho các phương tiện khác.
C. Trang trí thẩm mỹ cho xe.
D. Cả A và B đều đúng.
Câu 34. Cơ cấu phanh đĩa có ưu điểm gì so với phanh tang trống?
A. Giá thành rẻ hơn.
B. Thoát nhiệt tốt hơn, hiệu quả phanh cao và ổn định hơn.
C. Cấu tạo kín nên không bị bụi bẩn.
D. Không bao giờ bị mòn.
Câu 35. Khi mở cửa xe ô tô để bước xuống, người ngồi trên xe cần:
A. Mở tung cửa thật mạnh.
B. Quan sát kỹ phía trước và phía sau, chỉ mở cửa khi đảm bảo an toàn.
C. Mở cửa phía bên trái dù có xe đang lao tới.
D. Nhảy xuống xe khi xe chưa dừng hẳn.
Câu 36. Hệ thống âm thanh, điều hòa nhiệt độ trên ô tô thuộc hệ thống nào?
A. Hệ thống truyền lực.
B. Hệ thống treo.
C. Hệ thống điện và tiện nghi.
D. Khung vỏ.
Câu 37. Li hợp (côn) thường được điều khiển bằng:
A. Bàn đạp chân (xe số sàn) hoặc tự động (xe số tự động).
B. Cần số.
C. Vô lăng.
D. Công tắc trên táp lô.
Câu 38. Bánh xe dẫn hướng thường là bánh xe phía nào của ô tô?
A. Hai bánh phía trước.
B. Hai bánh phía sau.
C. Chỉ bánh bên trái.
D. Tất cả các bánh xe.
Câu 39. Tác dụng của bộ phận giảm chấn (thụt) trong hệ thống treo là:
A. Nâng đỡ trọng lượng xe.
B. Dập tắt nhanh các dao động của xe khi đi trên đường không bằng phẳng.
C. Giúp bánh xe quay nhanh hơn.
D. Thay đổi chiều cao của xe.
Câu 40. Xe ô tô đi bên phải theo chiều đi của mình là quy định của:
A. Nhà sản xuất ô tô.
B. Luật Giao thông đường bộ tại Việt Nam.
C. Hệ thống lái điện tử.
D. Người ngồi trên xe.
Câu 41. Hệ thống túi khí (Airbag) trên ô tô có nhiệm vụ:
A. Giúp xe nhẹ hơn khi lội nước.
B. Giảm chấn thương cho người trong xe khi xảy ra va chạm mạnh.
C. Làm mát khoang lái.
D. Thay thế dây an toàn.
Câu 42. Khi đèn báo áp suất lốp trên bảng đồng hồ phát sáng, bạn nên:
A. Tiếp tục chạy bình thường.
B. Dừng xe kiểm tra áp suất lốp vì có thể lốp bị non hơi hoặc thủng.
C. Tăng tốc để nhanh đến chỗ sửa xe.
D. Tắt đèn báo đi và chạy tiếp.
Câu 43. "Điểm mù" của ô tô là:
A. Vị trí đèn pha không chiếu tới.
B. Những khu vực xung quanh xe mà người lái không thể quan sát được qua gương 
hoặc trực tiếp.
C. Lúc người lái nhắm mắt khi buồn ngủ.
D. Phía dưới gầm xe.
Câu 44. Hệ thống truyền lực "Cầu sau" có nghĩa là:
A. Động cơ đặt ở phía sau.
B. Mô men từ động cơ được truyền đến các bánh xe phía sau để đẩy xe đi.
C. Xe chỉ có bánh xe ở phía sau.
D. Xe chỉ chạy lùi được.
Câu 45. Việc kiểm tra nồng độ cồn trước khi lái xe nhằm:
A. Tiết kiệm tiền mua rượu bia.
B. Đảm bảo sự tỉnh táo của người lái, giảm nguy cơ gây tai nạn.
C. Giúp động cơ nổ êm hơn.
D. Theo yêu cầu của người ngồi sau.
Câu 46. Bộ phận nào sau đây không thuộc hệ thống lái?
A. Vô lăng.
B. Thước lái.
C. Bàn đạp phanh.
D. Trục lái.
Câu 47. Hộp số tự động khác hộp số sàn ở chỗ:
A. Không có bánh răng.
B. Tự động thay đổi tỷ số truyền dựa trên tốc độ và tải trọng mà không cần người lái 
cắt côn.
C. Chạy tốn xăng hơn rất nhiều.
D. Không thể chạy lùi.
Câu 48. Ý thức, trách nhiệm của người sử dụng ô tô thể hiện ở việc:
A. Chấp hành đúng luật giao thông.
B. Bảo dưỡng xe định kỳ để giảm phát thải.
C. Không lái xe khi đã uống rượu bia.
D. Tất cả các ý trên.
Câu 49. Cấu tạo bánh xe ô tô gồm các phần chính:
A. Chỉ có lốp cao su.
B. Vành bánh xe (mâm) và lốp xe.
C. Trục xe và nan hoa.
D. Đĩa phanh và má phanh.
Câu 50. Mục đích chính của việc học về cấu tạo và hệ thống ô tô là:
A. Để trở thành tay đua xe chuyên nghiệp.
B. Hiểu nguyên lý, vận hành an toàn và biết cách bảo trì xe cơ bản.
C. Để tự chế tạo một chiếc ô tô tại nhà.
D. Để biết cách tháo rời xe ra bán linh kiện.`;

// The correct answers are the ones that are bolded in the PDF.
// Since I don't have the bold formatting in the plain text, I need to provide the correct answers manually or infer them.
// Wait, I have the bold information from my manual inspection of the PDF.
// Let's write a script to parse the text and I will manually supply the correct answers.
// Actually, I can just ask the LLM to parse it, but I am the LLM.
// Let's look at the correct answers from the PDF screenshots.
// PDF 1:
// 1B, 2B, 3C, 4D, 5C, 6C, 7C, 8A, 9B, 10C, 11C, 12B, 13B, 14B, 15B, 16C, 17A, 18B, 19B, 20B
// 21B, 22B, 23B, 24B, 25B, 26C, 27C, 28B, 29B, 30B, 31A, 32C, 33B, 34C, 35B, 36A, 37A, 38B, 39A, 40A
// 41C, 42B, 43B, 44A, 45B, 46A, 47C, 48A, 49B, 50D

// PDF 2:
// 1D, 2A, 3A, 4B, 5A, 6B, 7C, 8A, 9C, 10D, 11D, 12B, 13D, 14C, 15C, 16B, 17B, 18B, 19B, 20D
// 21D, 22B, 23D, 24A, 25B, 26B, 27A, 28B, 29B, 30B, 31B, 32B, 33D, 34B, 35B, 36C, 37A, 38A, 39B, 40B
// 41B, 42B, 43B, 44B, 45B, 46C, 47B, 48D, 49B, 50B

const answers1 = "BBCDCCACBC CBBBB CABBB BBBBB CCBBB ACBCA ABAAC CBAAB DCABD".replace(/\s/g, '').split('');
const answers2 = "DAABABCACD DDBDC CBBBD DDBAB BBBBB BDBBC AABBB BBBBB CBDBB".replace(/\s/g, '').split('');

function parseQuestions(text, answers) {
  const lines = text.split('\n');
  const questions = [];
  let currentQ = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    if (line.startsWith('Câu')) {
      if (currentQ) questions.push(currentQ);
      currentQ = {
        type: "multiple-choice",
        question: line.replace(/^Câu \d+\.\s*/, ''),
        options: [],
        correctAnswer: answers[questions.length].charCodeAt(0) - 65,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      };
    } else if (/^[A-D]\./.test(line)) {
      currentQ.options.push(line.replace(/^[A-D]\.\s*/, ''));
    } else if (currentQ && currentQ.options.length === 0) {
      currentQ.question += ' ' + line;
    } else if (currentQ && currentQ.options.length > 0) {
      currentQ.options[currentQ.options.length - 1] += ' ' + line;
    }
  }
  if (currentQ) questions.push(currentQ);
  return questions;
}

const q1 = parseQuestions(text1, answers1);
const q2 = parseQuestions(text2, answers2);

fs.writeFileSync('q1.json', JSON.stringify(q1, null, 2));
fs.writeFileSync('q2.json', JSON.stringify(q2, null, 2));
