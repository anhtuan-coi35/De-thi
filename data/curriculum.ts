
// data/curriculum.ts

import { TextbookSeries, Subject } from "../types";

export interface CurriculumLesson {
  name: string;
}

export interface CurriculumTopic {
  name: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumGrade {
  name: string;
  topics: CurriculumTopic[];
}

export const CURRICULUM_DATA: { [key in Subject]?: { [key in TextbookSeries]?: { [key: string]: CurriculumGrade } } } = {
  'khoa_hoc_tu_nhien': {
    'canh_dieu': {
      '6': {
          name: "Khoa học tự nhiên 6 - Cánh diều",
          topics: [
              { name: "Mở đầu", lessons: [{ name: "Giới thiệu về Khoa học tự nhiên" }] },
              { name: "Chủ đề 2: Chất", lessons: [
                  { name: "Sự đa dạng của chất" },
                  { name: "Các thể của chất và sự chuyển thể" },
                  { name: "Tách chất ra khỏi hỗn hợp" }
              ]},
              { name: "Chủ đề 3: Oxygen và không khí", lessons: [
                  { name: "Oxygen và không khí" }
              ]},
              { name: "Chủ đề 4: Một số vật liệu, nhiên liệu, lương thực, thực phẩm", lessons: [
                  { name: "Một số vật liệu" },
                  { name: "Một số nhiên liệu" },
                  { name: "Một số lương thực, thực phẩm" }
              ]},
              { name: "Chủ đề 5: Tế bào – Đơn vị cơ sở của sự sống", lessons: [
                  { name: "Tế bào – Đơn vị cơ sở của sự sống" },
                  { name: "Từ tế bào đến cơ thể" }
              ]},
              { name: "Chủ đề 6: Đa dạng thế giới sống", lessons: [
                  { name: "Phân loại thế giới sống" },
                  { name: "Vi khuẩn và virus" },
                  { name: "Nguyên sinh vật" },
                  { name: "Nấm" },
                  { name: "Thực vật" },
                  { name: "Động vật" },
                  { name: "Đa dạng sinh học và bảo vệ đa dạng sinh học" }
              ]},
              { name: "Chủ đề 7: Lực", lessons: [
                  { name: "Lực, tác dụng của lực" },
                  { name: "Lực tiếp xúc và lực không tiếp xúc" },
                  { name: "Lực hấp dẫn và trọng lượng" },
                  { name: "Lực ma sát" }
              ]},
              { name: "Chủ đề 8: Năng lượng", lessons: [
                  { name: "Năng lượng và các dạng năng lượng" },
                  { name: "Chuyển hóa năng lượng" }
              ]},
              { name: "Chủ đề 9: Trái Đất và bầu trời", lessons: [
                  { name: "Trái Đất trong hệ Mặt Trời" },
                  { name: "Chuyển động của Trái Đất và hệ quả" },
                  { name: "Chuyển động của Mặt Trăng" }
              ]}
          ]
      },
      '7': {
          name: "Khoa học tự nhiên 7 - Cánh diều",
          topics: [
              { name: "Chủ đề 1: Nguyên tử, nguyên tố hoá học, sơ lược về bảng tuần hoàn", lessons: [
                  { name: "Nguyên tử" },
                  { name: "Nguyên tố hóa học" },
                  { name: "Sơ lược về bảng tuần hoàn các nguyên tố hóa học" }
              ]},
              { name: "Chủ đề 2: Phân tử và liên kết hóa học", lessons: [
                  { name: "Phân tử, đơn chất, hợp chất" },
                  { name: "Hóa trị, công thức hóa học" }
              ]},
              { name: "Chủ đề 3: Tốc độ", lessons: [
                  { name: "Tốc độ chuyển động" },
                  { name: "Đồ thị quãng đường – thời gian" }
              ]},
              { name: "Chủ đề 4: Âm thanh", lessons: [
                  { name: "Sóng âm" },
                  { name: "Nguồn âm, độ cao, độ to của âm" },
                  { name: "Phản xạ âm và chống ô nhiễm tiếng ồn" }
              ]},
              { name: "Chủ đề 5: Ánh sáng", lessons: [
                  { name: "Ánh sáng, tia sáng, vùng tối" },
                  { name: "Sự phản xạ ánh sáng" },
                  { name: "Ảnh của vật tạo bởi gương phẳng" }
              ]},
              { name: "Chủ đề 6: Từ", lessons: [
                  { name: "Nam châm" },
                  { name: "Từ trường" },
                  { name: "Từ phổ, đường sức từ" },
                  { name: "Nam châm điện" }
              ]},
              { name: "Chủ đề 7: Trao đổi chất và chuyển hoá năng lượng ở sinh vật", lessons: [
                  { name: "Quang hợp ở thực vật" },
                  { name: "Hô hấp tế bào" },
                  { name: "Trao đổi khí ở sinh vật" },
                  { name: "Vai trò của nước và chất dinh dưỡng đối với sinh vật" },
                  { name: "Trao đổi nước và các chất dinh dưỡng ở thực vật" },
                  { name: "Trao đổi nước và các chất dinh dưỡng ở động vật" }
              ]},
              { name: "Chủ đề 8: Cảm ứng ở sinh vật", lessons: [
                  { name: "Cảm ứng ở sinh vật" },
                  { name: "Tập tính ở động vật" }
              ]},
              { name: "Chủ đề 9: Sinh trưởng và phát triển ở sinh vật", lessons: [
                  { name: "Sinh trưởng và phát triển ở sinh vật" },
                  { name: "Các yếu tố ảnh hưởng đến sinh trưởng và phát triển của sinh vật" }
              ]},
              { name: "Chủ đề 10: Sinh sản ở sinh vật", lessons: [
                  { name: "Sinh sản ở sinh vật" },
                  { name: "Sinh sản hữu tính ở sinh vật" },
                  { name: "Các yếu tố ảnh hưởng đến sinh sản ở sinh vật" }
              ]}
          ]
      },
      '8': {
          name: "Khoa học tự nhiên 8 - Cánh diều",
          topics: [
              { name: "Chủ đề 1: Phản ứng hóa học", lessons: [
                  { name: "Biến đổi vật lí và biến đổi hóa học" },
                  { name: "Phản ứng hóa học và năng lượng của phản ứng hóa học" },
                  { name: "Định luật bảo toàn khối lượng. Phương trình hóa học" },
                  { name: "Mol và tỉ khối của chất khí" },
                  { name: "Tính theo phương trình hóa học" },
                  { name: "Nồng độ dung dịch" },
                  { name: "Tốc độ phản ứng và chất xúc tác" },
              ]},
              { name: "Chủ đề 2: Acid – Base – pH – Oxide – Muối", lessons: [
                  { name: "Acid" },
                  { name: "Base" },
                  { name: "Thang pH" },
                  { name: "Oxide" },
                  { name: "Muối" },
                  { name: "Phân bón hóa học" },
              ]},
              { name: "Chủ đề 3: Khối lượng riêng và áp suất", lessons: [
                  { name: "Khối lượng riêng" },
                  { name: "Tác dụng của chất lỏng lên vật đặt trong nó" },
                  { name: "Áp suất" },
                  { name: "Áp suất chất lỏng và chất khí" },
              ]},
              { name: "Chủ đề 4: Tác dụng làm quay của lực", lessons: [
                  { name: "Lực có thể làm quay vật" },
                  { name: "Đòn bẩy" },
              ]},
              { name: "Chủ đề 5: Điện", lessons: [
                  { name: "Sự nhiễm điện" },
                  { name: "Mạch điện" },
                  { name: "Tác dụng của dòng điện" },
                  { name: "Cường độ dòng điện và hiệu điện thế" },
              ]},
              { name: "Chủ đề 6: Nhiệt", lessons: [
                  { name: "Năng lượng nhiệt" },
                  { name: "Truyền năng lượng nhiệt" },
                  { name: "Sự nở vì nhiệt" },
              ]},
              { name: "Chủ đề 7: Cơ thể người", lessons: [
                  { name: "Khái quát về cơ thể người" },
                  { name: "Hệ vận động ở người" },
                  { name: "Dinh dưỡng và tiêu hóa ở người" },
                  { name: "Máu và hệ tuần hoàn ở người" },
                  { name: "Hệ hô hấp ở người" },
                  { name: "Môi trường trong cơ thể và hệ bài tiết ở người" },
                  { name: "Hệ thần kinh và các giác quan ở người" },
                  { name: "Hệ nội tiết ở người" },
                  { name: "Da và điều hòa thân nhiệt ở người" },
                  { name: "Sinh sản ở người" },
              ]},
              { name: "Chủ đề 8: Sinh thái", lessons: [
                  { name: "Môi trường và các nhân tố sinh thái" },
                  { name: "Quần thể sinh vật" },
                  { name: "Quần xã sinh vật" },
                  { name: "Hệ sinh thái" },
                  { name: "Cân bằng tự nhiên và bảo vệ môi trường" },
                  { name: "Sinh quyển" },
              ]},
          ]
      },
      '9': {
        name: "Khoa học tự nhiên 9 - Cánh diều",
        topics: [
          { name: "Chủ đề 1: Năng lượng cơ học", lessons: [
              { name: "Công và công suất" },
              { name: "Cơ năng" }
          ]},
          { name: "Chủ đề 2: Ánh sáng", lessons: [
              { name: "Sự khúc xạ ánh sáng và phản xạ toàn phần" },
              { name: "Hiện tượng tán sắc ánh sáng. Màu sắc ánh sáng" },
              { name: "Sự khúc xạ ánh sáng qua thấu kính" },
              { name: "Sự tạo ảnh qua thấu kính. Kính lúp" }
          ]},
          { name: "Chủ đề 3: Điện", lessons: [
              { name: "Định luật Ohm. Điện trở" },
              { name: "Đoạn mạch nối tiếp và song song" },
              { name: "Năng lượng của dòng điện và công suất điện" }
          ]},
          { name: "Chủ đề 4: Điện từ", lessons: [
              { name: "Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều" },
              { name: "Tác dụng của dòng điện xoay chiều" }
          ]},
          { name: "Chủ đề 5: Năng lượng với cuộc sống", lessons: [
              { name: "Sử dụng năng lượng" },
              { name: "Năng lượng tái tạo" }
          ]},
          { name: "Chủ đề 6: Kim loại", lessons: [
              { name: "Tính chất chung của kim loại" },
              { name: "Dãy hoạt động hóa học" },
              { name: "Tách kim loại. Sử dụng hợp kim" },
              { name: "Sự khác nhau cơ bản giữa phi kim và kim loại" }
          ]},
          { name: "Chủ đề 7: Giới thiệu về chất hữu cơ, hydrocarbon và nguồn nhiên liệu", lessons: [
              { name: "Giới thiệu về chất hữu cơ" },
              { name: "Hydrocarbon, alkane và alkene" },
              { name: "Nguồn nhiên liệu" }
          ]},
          { name: "Chủ đề 8: Ethylic alcohol và acetic acid", lessons: [
              { name: "Ethylic alcohol" },
              { name: "Acetic acid" }
          ]},
          { name: "Chủ đề 9: Lipid – Carbohydrate – Protein – Polymer", lessons: [
              { name: "Lipid và chất béo" },
              { name: "Glucose và saccharose" },
              { name: "Tinh bột và cellulose" },
              { name: "Protein" },
              { name: "Polymer" }
          ]},
          { name: "Chủ đề 10: Khai thác tài nguyên từ vỏ Trái đất", lessons: [
              { name: "Sơ lược về hóa học vỏ Trái Đất và khai thác tài nguyên" },
              { name: "Ứng dụng một số tài nguyên trong vỏ Trái Đất" },
              { name: "Nguồn carbon và chu trình carbon" }
          ]},
          { name: "Chủ đề 11: Di truyền", lessons: [
              { name: "Gene và di truyền học" },
              { name: "Từ gene đến tính trạng" },
              { name: "Nhiễm sắc thể và bộ nhiễm sắc thể" },
              { name: "Nguyên phân và giảm phân" },
              { name: "Đột biến nhiễm sắc thể" },
              { name: "Quy luật di truyền của Mendel" },
              { name: "Di truyền liên kết và cơ chế xác định giới tính" },
              { name: "Di truyền học người và ứng dụng" }
          ]},
          { name: "Chủ đề 12: Tiến hóa", lessons: [
              { name: "Khái niệm tiến hóa, chọn lọc nhân tạo và chọn lọc tự nhiên" },
              { name: "Cơ chế tiến hóa" },
              { name: "Sự phát sinh và phát triển của sự sống trên Trái Đất" }
          ]}
        ]
      }
    },
    'chan_troi_sang_tao': {
      '6': {
        name: "Khoa học tự nhiên 6 - Chân trời sáng tạo",
        topics: [
          { name: "Mở đầu", lessons: [
            { name: "Giới thiệu về khoa học tự nhiên" },
            { name: "An toàn trong phòng thực hành" }
          ]},
          { name: "Chủ đề 1: Các phép đo", lessons: [
            { name: "Đo chiều dài, khối lượng và thời gian" },
            { name: "Đo nhiệt độ" }
          ]},
          { name: "Chủ đề 2: Các thể của chất", lessons: [
            { name: "Sự đa dạng và các thể cơ bản của chất" }
          ]},
          { name: "Chủ đề 3: Oxygen và không khí", lessons: [
            { name: "Oxygen và không khí" }
          ]},
          { name: "Chủ đề 4: Một số vật liệu, nhiên liệu, nguyên liệu", lessons: [
            { name: "Một số vật liệu, nhiên liệu, nguyên liệu thông dụng" },
            { name: "Một số lương thực – thực phẩm" }
          ]},
          { name: "Chủ đề 5: Chất tinh khiết – Hỗn hợp", lessons: [
            { name: "Chất tinh khiết – Hỗn hợp" },
            { name: "Tách chất ra khỏi hỗn hợp" }
          ]},
          { name: "Chủ đề 6: Tế bào – Đơn vị cơ sở của sự sống", lessons: [
            { name: "Tế bào - Đơn vị cơ sở của sự sống" }
          ]},
          { name: "Chủ đề 7: Từ tế bào đến cơ thể", lessons: [
            { name: "Cơ thể đơn bào và cơ thể đa bào" },
            { name: "Các cấp độ tổ chức trong cơ thể đa bào" }
          ]},
          { name: "Chủ đề 8: Đa dạng thế giới sống", lessons: [
            { name: "Phân loại thế giới sống" },
            { name: "Virus và vi khuẩn" },
            { name: "Nguyên sinh vật và Nấm" },
            { name: "Thực vật và Động vật" },
            { name: "Đa dạng sinh học" }
          ]},
          { name: "Chủ đề 9: Lực", lessons: [
            { name: "Lực và tác dụng của lực" },
            { name: "Lực hấp dẫn và lực ma sát" }
          ]},
          { name: "Chủ đề 10: Năng lượng", lessons: [
            { name: "Năng lượng và sự truyền năng lượng" },
            { name: "Bảo toàn năng lượng và sử dụng năng lượng" }
          ]},
          { name: "Chủ đề 11: Trái Đất và bầu trời", lessons: [
            { name: "Chuyển động nhìn thấy của Mặt Trời, Mặt Trăng" },
            { name: "Hệ Mặt Trời và Ngân Hà" }
          ]}
        ]
      },
      '7': {
        name: "Khoa học tự nhiên 7 - Chân trời sáng tạo",
        topics: [
            { name: "Chủ đề 1: Nguyên tử, nguyên tố hóa học, bảng tuần hoàn", lessons: [
                { name: "Nguyên tử" },
                { name: "Nguyên tố hóa học" },
                { name: "Sơ lược bảng tuần hoàn" }
            ]},
            { name: "Chủ đề 2: Phân tử", lessons: [
                { name: "Phân tử - Đơn chất - Hợp chất" },
                { name: "Hóa trị và công thức hóa học" }
            ]},
            { name: "Chủ đề 3: Tốc độ", lessons: [
                { name: "Tốc độ chuyển động" },
                { name: "Đồ thị quãng đường - thời gian" }
            ]},
            { name: "Chủ đề 4: Âm thanh", lessons: [
                { name: "Mô tả sóng âm" },
                { name: "Độ to và độ cao của âm" }
            ]},
            { name: "Chủ đề 5: Ánh sáng", lessons: [
                { name: "Ánh sáng, tia sáng" },
                { name: "Sự phản xạ ánh sáng" }
            ]},
            { name: "Chủ đề 6: Từ", lessons: [
                { name: "Nam châm" },
                { name: "Từ trường và la bàn" },
                { name: "Nam châm điện" }
            ]},
            { name: "Chủ đề 7: Trao đổi chất và năng lượng ở sinh vật", lessons: [
                { name: "Vai trò của trao đổi chất" },
                { name: "Quang hợp và hô hấp tế bào" },
                { name: "Trao đổi khí và dinh dưỡng ở sinh vật" }
            ]},
            { name: "Chủ đề 8: Cảm ứng và tập tính", lessons: [
                { name: "Cảm ứng ở sinh vật" },
                { name: "Tập tính ở động vật" }
            ]},
            { name: "Chủ đề 9: Sinh trưởng và phát triển", lessons: [
                { name: "Sinh trưởng và phát triển ở sinh vật" },
                { name: "Các nhân tố ảnh hưởng" }
            ]},
            { name: "Chủ đề 10: Sinh sản ở sinh vật", lessons: [
                { name: "Sinh sản ở sinh vật" },
                { name: "Các yếu tố ảnh hưởng đến sinh sản" }
            ]}
        ]
      },
      '8': {
        name: "Khoa học tự nhiên 8 - Chân trời sáng tạo",
        topics: [
          { name: "Chủ đề 1: Phản ứng hóa học", lessons: [
              { name: "Biến đổi vật lí và hóa học" },
              { name: "Mol và tỉ khối chất khí" },
              { name: "Định luật bảo toàn khối lượng và phương trình hóa học" },
              { name: "Nồng độ dung dịch" },
              { name: "Tốc độ phản ứng" }
          ]},
          { name: "Chủ đề 2: Acid - Base - Oxide - Muối", lessons: [
              { name: "Acid, Base và Thang pH" },
              { name: "Oxide và Muối" },
              { name: "Phân bón hóa học" }
          ]},
          { name: "Chủ đề 3: Khối lượng riêng và áp suất", lessons: [
              { name: "Khối lượng riêng" },
              { name: "Áp suất" },
              { name: "Lực đẩy Archimedes" }
          ]},
          { name: "Chủ đề 4: Tác dụng làm quay của lực", lessons: [
              { name: "Tác dụng làm quay của lực" },
              { name: "Đòn bẩy" }
          ]},
          { name: "Chủ đề 5: Điện", lessons: [
              { name: "Sự nhiễm điện" },
              { name: "Dòng điện – Nguồn điện" },
              { name: "Mạch điện và tác dụng của dòng điện" },
              { name: "Cường độ dòng điện và hiệu điện thế" }
          ]},
          { name: "Chủ đề 6: Nhiệt", lessons: [
              { name: "Năng lượng nhiệt. Nội năng" },
              { name: "Sự truyền nhiệt và sự nở vì nhiệt" }
          ]},
          { name: "Chủ đề 7: Cơ thể người", lessons: [
              { name: "Hệ vận động, dinh dưỡng, tuần hoàn, hô hấp" },
              { name: "Hệ hô hấp, bài tiết và da" },
              { name: "Hệ thần kinh, giác quan, nội tiết và sinh sản" }
          ]},
          { name: "Chủ đề 8: Môi trường", lessons: [
              { name: "Môi trường và các nhân tố sinh thái" },
              { name: "Quần thể, quần xã và hệ sinh thái" },
              { name: "Cân bằng tự nhiên và bảo vệ môi trường" }
          ]}
        ]
      },
      '9': {
        name: "Khoa học tự nhiên 9 - Chân trời sáng tạo",
        topics: [
          { name: "Mở đầu", lessons: [
              { name: "Bài 1: Giới thiệu một số dụng cụ và hoá chất. Thuyết trình một vấn đề khoa học" }
          ]},
          { name: "Chủ đề 1. Năng lượng cơ học", lessons: [
              { name: "Bài 2. Cơ năng" },
              { name: "Bài 3. Công và công suất" }
          ]},
          { name: "Chủ đề 2. Ánh sáng", lessons: [
              { name: "Bài 4. Khúc xạ ánh sáng" },
              { name: "Bài 5. Tán sắc ánh sáng qua lăng kính, màu sắc của vật" },
              { name: "Bài 6. Phản xạ toàn phần" },
              { name: "Bài 7. Thấu kính. Kính lúp" }
          ]},
          { name: "Chủ đề 3. Điện", lessons: [
              { name: "Bài 8. Điện trở. Định luật Ohm" },
              { name: "Bài 9. Đoạn mạch nối tiếp" },
              { name: "Bài 10. Đoạn mạch song song" },
              { name: "Bài 11. Năng lượng điện. Công suất điện" }
          ]},
          { name: "Chủ đề 4. Điện từ", lessons: [
              { name: "Bài 12. Cảm ứng điện từ" },
              { name: "Bài 13. Dòng điện xoay chiều" }
          ]},
          { name: "Chủ đề 5. Năng lượng với cuộc sống", lessons: [
              { name: "Bài 14. Năng lượng của Trái Đất. Năng lượng hóa thạch" },
              { name: "Bài 15. Năng lượng tái tạo" }
          ]},
          { name: "Chủ đề 6. Kim loại và sự khác nhau cơ bản giữa kim loại và phi kim", lessons: [
              { name: "Bài 16. Tính chất chung của kim loại" },
              { name: "Bài 17. Dãy hoạt động hóa học của kim loại. Một số phương pháp tách kim loại" },
              { name: "Bài 18. Giới thiệu về hợp kim" },
              { name: "Bài 19. Sự khác nhau cơ bản giữa phi kim và kim loại" }
          ]},
          { name: "Chủ đề 7. Hợp chất hữu cơ. Hydrocarbon và nguồn nhiên liệu", lessons: [
              { name: "Bài 20. Giới thiệu về hợp chất hữu cơ" },
              { name: "Bài 21. Alkane" },
              { name: "Bài 22. Alkene" },
              { name: "Bài 23. Nguồn nhiên liệu" }
          ]},
          { name: "Chủ đề 8. Ethylic alcohol. Acetic acid", lessons: [
              { name: "Bài 24. Ethylic alcohol" },
              { name: "Bài 25. Acetic acid" }
          ]},
          { name: "Chủ đề 9. Lipid - Carbohydrate - Protein. Polymer", lessons: [
              { name: "Bài 26. Lipid và chất béo" },
              { name: "Bài 27. Glucose và saccharose" },
              { name: "Bài 28. Tinh bột và cellulose" },
              { name: "Bài 29. Protein" },
              { name: "Bài 30. Polymer" }
          ]},
          { name: "Chủ đề 10. Khai thác tài nguyên từ vỏ Trái Đất", lessons: [
              { name: "Bài 31. Sơ lược về hoá học vỏ Trái Đất và khai thác tài nguyên từ vỏ Trái Đất" },
              { name: "Bài 32. Khai thác đá vôi. Công nghiệp silicate" },
              { name: "Bài 33. Khai thác nhiên liệu hóa thạch" },
              { name: "Bài 34. Nguồn carbon. Chu trình carbon và sự ấm lên toàn cầu" }
          ]},
          { name: "Chủ đề 11. Di truyền", lessons: [
              { name: "Bài 35. Khái quát về di truyền học" },
              { name: "Bài 36. Các quy luật di truyền của Menđel" },
              { name: "Bài 37. Nucleic acid và ứng dụng" },
              { name: "Bài 38. Đột biến gene" },
              { name: "Bài 39. Quá trình tái bản, phiên mã và dịch mã" },
              { name: "Bài 40. Từ gene đến tính trạng" },
              { name: "Bài 41. Cấu trúc nhiễm sắc thể và đột biến nhiễm sắc thể" },
              { name: "Bài 42. Thực hành: Quan sát tiêu bản nhiễm sắc thể" },
              { name: "Bài 43. Di truyền nhiễm sắc thể" },
              { name: "Bài 44. Di truyền học với con người" },
              { name: "Bài 45. Ứng dụng công nghệ di truyền vào đời sống" }
          ]},
          { name: "Chủ đề 12. Tiến hóa", lessons: [
              { name: "Bài 46. Khái niệm tiến hóa và các hình thức chọn lọc" },
              { name: "Bài 47. Cơ chế tiến hóa" },
              { name: "Bài 48. Sự phát sinh và phát triển của sự sống trên Trái Đất" }
          ]}
        ]
      }
    },
    'ket_noi_tri_thuc': {
      '6': {
        name: "Khoa học tự nhiên 6 - Kết nối tri thức",
        topics: [
          { name: "Mở đầu", lessons: [
            { name: "Giới thiệu về khoa học tự nhiên và an toàn phòng thực hành" }
          ]},
          { name: "Chủ đề 2: Các phép đo", lessons: [
            { name: "Đo chiều dài, khối lượng, thời gian, nhiệt độ" }
          ]},
          { name: "Chủ đề 3: Các thể của chất", lessons: [
            { name: "Sự đa dạng của chất và sự chuyển thể" }
          ]},
          { name: "Chủ đề 4: Oxygen và không khí", lessons: [
            { name: "Oxygen và không khí" }
          ]},
          { name: "Chủ đề 5: Vật liệu, nhiên liệu, nguyên liệu", lessons: [
            { name: "Một số vật liệu, nhiên liệu, nguyên liệu và lương thực, thực phẩm" }
          ]},
          { name: "Chủ đề 6: Hỗn hợp và tách chất", lessons: [
            { name: "Hỗn hợp, chất tinh khiết và phương pháp tách chất" }
          ]},
          { name: "Chủ đề 7: Tế bào – Đơn vị cơ sở của sự sống", lessons: [
            { name: "Tế bào, sự lớn lên và sinh sản của tế bào" },
            { name: "Cơ thể đơn bào và đa bào" }
          ]},
          { name: "Chủ đề 8: Đa dạng thế giới sống", lessons: [
            { name: "Phân loại sinh vật" },
            { name: "Vi khuẩn, Virus, Nguyên sinh vật, Nấm" },
            { name: "Thực vật và Động vật" }
          ]},
          { name: "Chủ đề 9: Lực", lessons: [
            { name: "Lực và tác dụng của lực" },
            { name: "Lực hấp dẫn và lực ma sát" }
          ]},
          { name: "Chủ đề 10: Năng lượng", lessons: [
            { name: "Năng lượng và sự truyền năng lượng" },
            { name: "Sự chuyển hóa năng lượng" }
          ]},
          { name: "Chủ đề 11: Trái Đất và bầu trời", lessons: [
            { name: "Hệ Mặt Trời và Ngân Hà" },
            { name: "Hiện tượng ngày, đêm và các mùa" }
          ]}
        ]
      },
      '7': {
        name: "Khoa học tự nhiên 7 - Kết nối tri thức",
        topics: [
          { name: "Chương I & II: Nguyên tử, Bảng tuần hoàn", lessons: [
              { name: "Nguyên tử và nguyên tố hoá học" },
              { name: "Sơ lược về bảng tuần hoàn" }
          ]},
          { name: "Chương III: Phân tử và liên kết hóa học", lessons: [
              { name: "Phân tử, đơn chất, hợp chất" },
              { name: "Hoá trị, công thức hoá học" }
          ]},
          { name: "Chương IV: Tốc độ", lessons: [
              { name: "Tốc độ chuyển động và đồ thị quãng đường - thời gian" }
          ]},
          { name: "Chương V & VI & VII: Âm thanh, Ánh sáng, Từ", lessons: [
              { name: "Sóng âm, độ to và độ cao của âm" },
              { name: "Ánh sáng, tia sáng, sự phản xạ ánh sáng" },
              { name: "Nam châm, từ trường, từ phổ" }
          ]},
          { name: "Chương VIII: Trao đổi chất và chuyển hóa năng lượng", lessons: [
              { name: "Quang hợp và hô hấp ở thực vật" },
              { name: "Trao đổi khí ở sinh vật" },
              { name: "Trao đổi nước và dinh dưỡng ở sinh vật" }
          ]},
          { name: "Chương IX, X, XI: Cảm ứng, Sinh trưởng, Sinh sản", lessons: [
              { name: "Cảm ứng ở sinh vật" },
              { name: "Sinh trưởng và phát triển ở sinh vật" },
              { name: "Sinh sản ở sinh vật" }
          ]}
        ]
      },
      '8': {
        name: "Khoa học tự nhiên 8 - Kết nối tri thức",
        topics: [
          { name: "Chương 1: Phản ứng hóa học", lessons: [
              { name: "Phản ứng hóa học" },
              { name: "Mol, dung dịch, nồng độ, định luật bảo toàn khối lượng" },
              { name: "Tốc độ phản ứng" }
          ]},
          { name: "Chương 2: Một số hợp chất thông dụng", lessons: [
              { name: "Acid, Base, Thang pH" },
              { name: "Oxide, Muối, Phân bón" }
          ]},
          { name: "Chương 3 & 4: Khối lượng riêng, áp suất, lực", lessons: [
              { name: "Khối lượng riêng, áp suất, lực đẩy Archimedes" },
              { name: "Tác dụng làm quay của lực, đòn bẩy" }
          ]},
          { name: "Chương 5 & 6: Điện và Nhiệt", lessons: [
              { name: "Nhiễm điện, dòng điện, mạch điện" },
              { name: "Năng lượng nhiệt, sự truyền nhiệt, sự nở vì nhiệt" }
          ]},
          { name: "Chương 7: Sinh học cơ thể người", lessons: [
              { name: "Hệ vận động, dinh dưỡng, tuần hoàn, hô hấp" },
              { name: "Hệ bài tiết, thần kinh, nội tiết, sinh sản" }
          ]},
          { name: "Chương 8: Sinh vật và môi trường", lessons: [
              { name: "Môi trường, quần thể, quần xã, hệ sinh thái" },
              { name: "Bảo vệ môi trường" }
          ]}
        ]
      },
      '9': {
        name: "Khoa học tự nhiên 9 - Kết nối tri thức",
        topics: [
          { name: "Chủ đề 1 & 2: Năng lượng cơ học và Ánh sáng", lessons: [
              { name: "Công, công suất, cơ năng" },
              { name: "Khúc xạ, phản xạ toàn phần, tán sắc, thấu kính" }
          ]},
          { name: "Chủ đề 3 & 4: Điện và Điện từ học", lessons: [
              { name: "Điện trở, định luật Ohm, đoạn mạch nối tiếp/song song" },
              { name: "Cảm ứng điện từ, dòng điện xoay chiều" }
          ]},
          { name: "Chủ đề 5 & 6: Năng lượng và Kim loại", lessons: [
              { name: "Năng lượng và sự chuyển hóa" },
              { name: "Tính chất kim loại, dãy hoạt động hóa học" }
          ]},
          { name: "Chủ đề 7 & 8: Hydrocarbon và Dẫn xuất", lessons: [
              { name: "Hợp chất hữu cơ, Alkane, Alkene" },
              { name: "Alcohol và Acetic acid" }
          ]},
          { name: "Chủ đề 9 & 10: Glucid, Protein, Polymer và Tài nguyên", lessons: [
              { name: "Glucid, Protein, Lipid, Polymer" },
              { name: "Khai thác tài nguyên từ vỏ Trái Đất" }
          ]},
          { name: "Chủ đề 11 & 12: Di truyền và Tiến hóa", lessons: [
              { name: "Quy luật di truyền Mendel, Nucleic acid (DNA, RNA)" },
              { name: "Nhiễm sắc thể, đột biến, di truyền người" },
              { name: "Tiến hóa và môi trường" }
          ]}
        ]
      }
    }
  },
  'lich_su_dia_ly': {
    'canh_dieu': {
      '6': {
        name: "Lịch sử & Địa lí 6 - Cánh diều",
        topics: [
          { name: "Phần Lịch sử - Chương I: Vì sao cần học Lịch sử", lessons: [{ name: "Lịch sử là gì?" }, { name: "Thời gian trong lịch sử" }] },
          { name: "Phần Lịch sử - Chương II: Thời nguyên thủy", lessons: [{ name: "Nguồn gốc loài người" }, { name: "Xã hội nguyên thủy" }, { name: "Sự chuyển biến và phân hóa của xã hội nguyên thủy" }] },
          { name: "Phần Lịch sử - Chương III: Xã hội cổ đại", lessons: [{ name: "Ai Cập và Lưỡng Hà cổ đại" }, { name: "Ấn Độ cổ đại" }, { name: "Trung Quốc cổ đại" }, { name: "Hy Lạp và La Mã cổ đại" }] },
          { name: "Phần Lịch sử - Chương IV: Đông Nam Á", lessons: [{ name: "Các vương quốc ở Đông Nam Á" }] },
          { name: "Phần Lịch sử - Chương V: Việt Nam từ thế kỉ VII TCN đến thế kỉ X", lessons: [ {name: "Nước Văn Lang, Âu Lạc"}, {name: "Thời kì Bắc thuộc và chống Bắc thuộc"} ]},
          { name: "Phần Địa lí - Chương I: Bản đồ và Trái Đất", lessons: [{ name: "Hệ thống kinh, vĩ tuyến. Tọa độ địa lí" }, { name: "Kí hiệu và chú giải trên bản đồ" }, { name: "Trái Đất trong hệ Mặt Trời" }] },
          { name: "Phần Địa lí - Chương II: Các thành phần tự nhiên của Trái Đất", lessons: [{ name: "Cấu tạo của Trái Đất. Động đất và núi lửa" }, { name: "Khí quyển, nhiệt độ và không khí" }, { name: "Thủy quyển (Nước trên Trái Đất)" }, { name: "Đất và sinh vật trên Trái Đất" }, { name: "Con người và thiên nhiên" }] },
        ]
      },
      '7': {
        name: "Lịch sử & Địa lí 7 - Cánh diều",
        topics: [
          { name: "Phần Lịch sử - Chương I: Tây Âu thời trung đại", lessons: [{ name: "Quá trình hình thành và phát triển chế độ phong kiến ở Tây Âu" }, { name: "Các cuộc phát kiến địa lí" }] },
          { name: "Phần Lịch sử - Chương II: Trung Quốc và Ấn Độ thời trung đại", lessons: [{ name: "Trung Quốc từ thế kỉ VII đến giữa thế kỉ XIX" }, { name: "Vương triều Gúp-ta và sự phát triển của Ấn Độ" }] },
          { name: "Phần Lịch sử - Chương III: Đông Nam Á từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI", lessons: [{ name: "Khái quát về Đông Nam Á" }, { name: "Vương quốc Campuchia và Lào" }] },
          { name: "Phần Lịch sử - Chương IV: Việt Nam từ đầu thế kỉ X đến đầu thế kỉ XVI", lessons: [{ name: "Thời Ngô - Đinh - Tiền Lê" }, { name: "Thời Lý, Trần, Hồ" }]},
          { name: "Phần Địa lí - Chương I: Châu Âu", lessons: [{ name: "Vị trí địa lí, phạm vi và đặc điểm tự nhiên châu Âu" }, { name: "Khai thác, sử dụng và bảo vệ thiên nhiên ở châu Âu" }] },
          { name: "Phần Địa lí - Chương II: Châu Á", lessons: [{ name: "Vị trí địa lí, phạm vi và đặc điểm tự nhiên châu Á" }, { name: "Khai thác, sử dụng và bảo vệ thiên nhiên ở châu Á" }] },
          { name: "Phần Địa lí - Chương III: Châu Phi", lessons: [{ name: "Thiên nhiên và dân cư, xã hội châu Phi" }, { name: "Khai thác, sử dụng và bảo vệ thiên nhiên ở châu Phi" }] },
          { name: "Phần Địa lí - Chương IV: Châu Mỹ", lessons: [{ name: "Khám phá châu Mỹ" }, { name: "Đặc điểm tự nhiên Trung và Nam Mỹ" }]},
          { name: "Phần Địa lí - Chương V: Châu Nam Cực và Châu Đại Dương", lessons: [{ name: "Châu Nam Cực" }, { name: "Châu Đại Dương" }]},
        ]
      },
      '8': {
        name: "Lịch sử & Địa lí 8 - Cánh diều",
        topics: [
          { name: "Phần Lịch sử - Chương I: Cách mạng tư sản và sự phát triển của chủ nghĩa tư bản", lessons: [{ name: "Cách mạng tư sản Anh và chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ" }, { name: "Cách mạng tư sản Pháp cuối thế kỉ XVIII" }, { name: "Chủ nghĩa tư bản được xác lập trên phạm vi thế giới"}] },
          { name: "Phần Lịch sử - Chương II: Đông Nam Á từ nửa sau TK XVI đến TK XIX", lessons: [{ name: "Quá trình xâm lược và cai trị của chủ nghĩa thực dân ở Đông Nam Á" }] },
          { name: "Phần Lịch sử - Chương III: Việt Nam từ đầu TK XIX đến năm 1858", lessons: [{ name: "Việt Nam nửa đầu thế kỉ XIX" }, { name: "Cuộc kháng chiến chống thực dân Pháp xâm lược"}] },
          { name: "Phần Địa lí - Chương I: Vị trí địa lí và phạm vi lãnh thổ Việt Nam", lessons: [{ name: "Vị trí địa lí và phạm vi lãnh thổ Việt Nam" }, { name: "Biển đảo Việt Nam" }] },
          { name: "Phần Địa lí - Chương II: Đặc điểm địa hình và khoáng sản Việt Nam", lessons: [{ name: "Đặc điểm địa hình" }, { name: "Đặc điểm khoáng sản Việt Nam" }] },
          { name: "Phần Địa lí - Chương III: Đặc điểm khí hậu và thủy văn Việt Nam", lessons: [{ name: "Đặc điểm khí hậu" }, { name: "Đặc điểm thủy văn" }] },
          { name: "Phần Địa lí - Chương IV: Đặc điểm thổ nhưỡng và sinh vật Việt Nam", lessons: [{ name: "Đặc điểm thổ nhưỡng" }, { name: "Đặc điểm sinh vật Việt Nam" }] },
        ]
      },
      '9': {
        name: "Lịch sử & Địa lý 9 - Cánh diều",
        topics: [
          { name: "Phần Lịch sử - Chương I: Việt Nam từ 1918 đến 1945", lessons: [{ name: "Phong trào dân tộc dân chủ 1918-1930" }, { name: "Cuộc vận động giải phóng dân tộc 1930-1945" }] },
          { name: "Phần Lịch sử - Chương II: Việt Nam từ 1945 đến 1954", lessons: [{ name: "Xây dựng và bảo vệ chính quyền (1945-1946)" }, { name: "Cuộc kháng chiến chống thực dân Pháp (1946-1954)" }] },
          { name: "Phần Lịch sử - Chương III: Việt Nam từ 1954 đến 1975", lessons: [{ name: "Xây dựng CNXH ở miền Bắc và đấu tranh ở miền Nam (1954-1964)" }, { name: "Kháng chiến chống Mỹ, cứu nước (1965-1975)" }] },
          { name: "Phần Lịch sử - Chương IV: Việt Nam từ 1975 đến nay", lessons: [{name: "Xây dựng và bảo vệ đất nước (1975-1986)"}, {name: "Công cuộc Đổi mới (1986-nay)"}]},
          { name: "Phần Địa lí - Chương I: Địa lí dân cư Việt Nam", lessons: [{ name: "Dân số và sự gia tăng dân số" }, { name: "Phân bố dân cư và các loại hình quần cư" }, { name: "Lao động và việc làm" }, {name: "Đô thị hoá"}] },
          { name: "Phần Địa lí - Chương II: Địa lí kinh tế Việt Nam", lessons: [{ name: "Phát triển và phân bố Nông nghiệp, Lâm nghiệp, Thủy sản" }, { name: "Phát triển và phân bố Công nghiệp" }, { name: "Phát triển và phân bố Dịch vụ" }] },
          { name: "Phần Địa lí - Chương III: Sự phân hoá lãnh thổ", lessons: [{ name: "Vùng Trung du và miền núi Bắc Bộ" }, { name: "Vùng Đồng bằng sông Hồng" }, {name: "Vùng Duyên hải miền Trung"}, {name: "Vùng Tây Nguyên"}, {name: "Vùng Đông Nam Bộ"}, {name: "Vùng Đồng bằng sông Cửu Long"} ] },
        ]
      }
    }
  },
  'toan': {
    'canh_dieu': {
      '6': {
        name: "Toán 6 - Cánh diều",
        topics: [
          { name: "Chương I: Số tự nhiên", lessons: [{ name: "Tập hợp các số tự nhiên" }, { name: "Các phép tính với số tự nhiên" }, { name: "Quan hệ chia hết trong tập hợp số tự nhiên" }] },
          { name: "Chương II: Số nguyên", lessons: [{ name: "Tập hợp các số nguyên và thứ tự" }, { name: "Phép cộng, trừ, nhân, chia số nguyên" }] },
          { name: "Chương III: Hình học trực quan", lessons: [{ name: "Hình tam giác đều, hình vuông, lục giác đều" }, { name: "Hình chữ nhật, hình thoi, hình bình hành, hình thang cân" }, { name: "Chu vi và diện tích một số hình trong thực tiễn" }] },
          { name: "Chương IV: Tính đối xứng của hình phẳng", lessons: [{ name: "Tính đối xứng của hình phẳng" }] },
          { name: "Chương V: Phân số và số thập phân", lessons: [{ name: "Phân số với tử và mẫu là số nguyên" }, { name: "So sánh phân số" }, { name: "Phép cộng, trừ, nhân, chia phân số" }, { name: "Số thập phân" }] },
          { name: "Chương VI: Thống kê và xác suất", lessons: [{ name: "Thu thập, tổ chức, biểu diễn, phân tích dữ liệu" }, { name: "Biểu đồ cột và biểu đồ cột kép" }, { name: "Tính xác suất thực nghiệm" }] }
        ]
      },
      '7': {
        name: "Toán 7 - Cánh diều",
        topics: [
          { name: "Chương I: Số hữu tỉ", lessons: [{ name: "Tập hợp các số hữu tỉ" }, { name: "Các phép tính với số hữu tỉ" }, { name: "Luỹ thừa với số mũ hữu tỉ" }] },
          { name: "Chương II: Số thực", lessons: [{ name: "Số vô tỉ, căn bậc hai số học" }, { name: "Tập hợp các số thực" }, { name: "Làm tròn số và ước lượng" }] },
          { name: "Chương III: Hình học trực quan", lessons: [{ name: "Hình hộp chữ nhật, hình lập phương" }, { name: "Hình lăng trụ đứng" }] },
          { name: "Chương IV: Góc và đường thẳng song song", lessons: [{ name: "Góc ở vị trí đặc biệt" }, { name: "Tia phân giác của một góc" }, { name: "Hai đường thẳng song song" }, { name: "Định lí" }] },
          { name: "Chương V: Tam giác", lessons: [{ name: "Tổng các góc của một tam giác" }, { name: "Quan hệ giữa các yếu tố trong tam giác" }, { name: "Các trường hợp bằng nhau của tam giác" }, { name: "Tam giác cân, tam giác đều" }] },
          { name: "Chương VI: Thống kê và xác suất", lessons: [{ name: "Thu thập, phân loại, biểu diễn dữ liệu" }, { name: "Phân tích và xử lí dữ liệu" }, { name: "Biểu đồ đoạn thẳng và hình quạt tròn" }] }
        ]
      },
      '8': {
        name: "Toán 8 - Cánh diều",
        topics: [
          { name: "Chương I: Đa thức nhiều biến", lessons: [{ name: "Đơn thức và đa thức nhiều biến" }, { name: "Các phép tính với đa thức nhiều biến" }, { name: "Hằng đẳng thức đáng nhớ" }] },
          { name: "Chương II: Phân thức đại số", lessons: [{ name: "Phân thức đại số và tính chất" }, { name: "Các phép toán với phân thức đại số" }] },
          { name: "Chương III: Hàm số và đồ thị", lessons: [{ name: "Hàm số và đồ thị" }, { name: "Hàm số bậc nhất và đồ thị" }] },
          { name: "Chương IV: Hình học phẳng", lessons: [{ name: "Hình chóp tam giác đều và hình chóp tứ giác đều" }, { name: "Tứ giác" }, { name: "Hình thang cân, hình bình hành, hình chữ nhật" }, { name: "Hình thoi và hình vuông" }] },
          { name: "Chương V: Định lí Thalès và tam giác đồng dạng", lessons: [{ name: "Định lí Thalès" }, { name: "Đường trung bình của tam giác" }, { name: "Tính chất đường phân giác" }, { name: "Tam giác đồng dạng" }] }
        ]
      },
      '9': {
        name: "Toán 9 - Cánh diều",
        topics: [
          { name: "Chương I: Căn bậc hai và căn bậc ba", lessons: [{ name: "Căn bậc hai và căn thức bậc hai" }, { name: "Các phép tính với căn bậc hai" }, { name: "Căn bậc ba" }] },
          { name: "Chương II: Hàm số và đồ thị", lessons: [{ name: "Hàm số bậc nhất" }, { name: "Hàm số bậc hai" }] },
          { name: "Chương III: Phương trình và hệ phương trình", lessons: [{ name: "Phương trình bậc nhất hai ẩn" }, { name: "Hệ hai phương trình bậc nhất hai ẩn" }, { name: "Phương trình bậc hai một ẩn" }] },
          { name: "Chương IV: Hệ thức lượng trong tam giác vuông", lessons: [{ name: "Hệ thức về cạnh và đường cao" }, { name: "Tỉ số lượng giác của góc nhọn" }] },
          { name: "Chương V: Đường tròn", lessons: [{ name: "Vị trí tương đối của đường thẳng và đường tròn" }, { name: "Góc với đường tròn" }, { name: "Tứ giác nội tiếp" }] }
        ]
      }
    }
  },
  'ngu_van': {
    'canh_dieu': {
      '6': {
        name: "Ngữ văn 6 - Cánh diều",
        topics: [
          { name: "Bài 1: Truyện", lessons: [{ name: "Truyền thuyết" }, { name: "Cổ tích" }, { name: "Kể lại một truyện truyền thuyết hoặc cổ tích" }] },
          { name: "Bài 2: Kí và du kí", lessons: [{ name: "Kí" }, { name: "Du kí" }, { name: "Thuyết minh thuật lại một sự kiện" }] },
          { name: "Bài 3: Thơ", lessons: [{ name: "Thơ có yếu tố tự sự, miêu tả" }, { name: "Viết đoạn văn ghi lại cảm xúc về một bài thơ" }] },
          { name: "Bài 4: Văn bản nghị luận", lessons: [{ name: "Nghị luận văn học" }, { name: "Nghị luận xã hội" }, { name: "Viết bài văn trình bày ý kiến về một hiện tượng đời sống" }] },
          { name: "Bài 5: Văn bản thông tin", lessons: [{ name: "Văn bản thuyết minh thuật lại một sự kiện" }, { name: "Tóm tắt văn bản thông tin" }] }
        ]
      },
      '7': {
        name: "Ngữ văn 7 - Cánh diều",
        topics: [
          { name: "Bài 1: Truyện ngụ ngôn và tục ngữ", lessons: [{ name: "Truyện ngụ ngôn" }, { name: "Tục ngữ" }] },
          { name: "Bài 2: Thơ bốn chữ, năm chữ", lessons: [{ name: "Thơ bốn chữ, năm chữ" }, { name: "Làm thơ bốn chữ, năm chữ" }] },
          { name: "Bài 3: Tuỳ bút và tản văn", lessons: [{ name: "Tuỳ bút" }, { name: "Tản văn" }, { name: "Viết bài văn biểu cảm về con người hoặc sự việc" }] },
          { name: "Bài 4: Văn bản nghị luận", lessons: [{ name: "Nghị luận xã hội" }, { name: "Nghị luận văn học" }, { name: "Phân tích đặc điểm nhân vật trong một tác phẩm văn học" }] },
          { name: "Bài 5: Văn bản thông tin", lessons: [{ name: "Văn bản giới thiệu một quy tắc hoặc luật lệ" }, { name: "Văn bản tường trình" }] }
        ]
      },
      '8': {
        name: "Ngữ văn 8 - Cánh diều",
        topics: [
          { name: "Bài 1: Truyện lịch sử và tiểu thuyết", lessons: [{ name: "Truyện lịch sử" }, { name: "Tiểu thuyết" }, { name: "Kể lại một chuyến đi hay một hoạt động xã hội" }] },
          { name: "Bài 2: Thơ Đường luật", lessons: [{ name: "Thơ thất ngôn bát cú và thơ tứ tuyệt" }, { name: "Viết đoạn văn ghi lại cảm nghĩ về một bài thơ Đường luật" }] },
          { name: "Bài 3: Văn bản nghị luận", lessons: [{ name: "Văn bản nghị luận xã hội (Chiếu, hịch)" }, { name: "Phân tích một tác phẩm văn học" }] },
          { name: "Bài 4: Hài kịch và truyện cười", lessons: [{ name: "Hài kịch" }, { name: "Truyện cười" }] },
          { name: "Bài 5: Văn bản thông tin", lessons: [{ name: "Văn bản thuyết minh giải thích một hiện tượng tự nhiên" }, { name: "Viết bài văn thuyết minh giới thiệu một cuốn sách" }] }
        ]
      },
      '9': {
        name: "Ngữ văn 9 - Cánh diều",
        topics: [
          { name: "Bài 1: Truyện ngắn", lessons: [{ name: "Truyện ngắn Việt Nam hiện đại" }, { name: "Phân tích một tác phẩm truyện" }] },
          { name: "Bài 2: Thơ hiện đại", lessons: [{ name: "Thơ Việt Nam hiện đại" }, { name: "Viết đoạn văn ghi lại cảm xúc về một bài thơ" }] },
          { name: "Bài 3: Kịch", lessons: [{ name: "Giới thiệu một tác phẩm kịch" }] },
          { name: "Bài 4: Nghị luận văn học", lessons: [{ name: "Nghị luận về một vấn đề đời sống" }, { name: "Nghị luận về một tác phẩm văn học" }] },
          { name: "Bài 5: Văn bản thông tin", lessons: [{ name: "Viết bài thuyết minh về một danh lam thắng cảnh" }, { name: "Viết một bài quảng cáo" }] }
        ]
      }
    }
  },
  'tieng_anh': {
    'canh_dieu': {
        '6': {
          name: "Tiếng Anh 6 - Cánh diều (Global Success)",
          topics: [
            { name: "Unit 1: My New School", lessons: [{ name: "School things and activities" }] },
            { name: "Unit 2: My House", lessons: [{ name: "Rooms and furniture" }] },
            { name: "Unit 3: My Friends", lessons: [{ name: "Describing personality" }] },
            { name: "Unit 4: My Neighbourhood", lessons: [{ name: "Places in a neighbourhood" }] },
            { name: "Unit 5: Natural Wonders of the World", lessons: [{ name: "Landmarks and natural features" }] },
            { name: "Unit 6: Our Tet Holiday", lessons: [{ name: "Tet activities and traditions" }] },
          ]
        },
        '7': {
          name: "Tiếng Anh 7 - Cánh diều (Global Success)",
          topics: [
            { name: "Unit 1: Hobbies", lessons: [{ name: "Talking about hobbies" }] },
            { name: "Unit 2: Health", lessons: [{ name: "Health problems and advice" }] },
            { name: "Unit 3: Community Service", lessons: [{ name: "Volunteer work" }] },
            { name: "Unit 4: Music and Arts", lessons: [{ name: "Types of music and art" }] },
            { name: "Unit 5: Food and Drink", lessons: [{ name: "Dishes and recipes" }] },
            { name: "Unit 6: The First University in Viet Nam", lessons: [{ name: "Historical places" }] },
          ]
        },
        '8': {
          name: "Tiếng Anh 8 - Cánh diều (Global Success)",
          topics: [
            { name: "Unit 1: Leisure Time", lessons: [{ name: "Activities in free time" }] },
            { name: "Unit 2: Life in the Countryside", lessons: [{ name: "Comparing country and city life" }] },
            { name: "Unit 3: Peoples of Viet Nam", lessons: [{ name: "Ethnic groups of Viet Nam" }] },
            { name: "Unit 4: Our Customs and Traditions", lessons: [{ name: "Customs and traditions" }] },
            { name: "Unit 5: Festivals in Viet Nam", lessons: [{ name: "Festivals and celebrations" }] },
            { name: "Unit 6: Folk Tales", lessons: [{ name: "Folk tales and stories" }] },
          ]
        },
        '9': {
            name: "Tiếng Anh 9 - Cánh diều (Global Success)",
            topics: [
                { name: "Unit 1: Local Environment", lessons: [{ name: "Traditional crafts and places of interest" }] },
                { name: "Unit 2: City Life", lessons: [{ name: "Features of city life" }] },
                { name: "Unit 3: Teen Stress and Pressure", lessons: [{ name: "Life skills for teens" }] },
                { name: "Unit 4: Life in the Past", lessons: [{ name: "Past habits and traditions" }] },
                { name: "Unit 5: Wonders of Viet Nam", lessons: [{ name: "Man-made and natural wonders" }] },
                { name: "Unit 6: Viet Nam: Then and Now", lessons: [{ name: "Changes in Viet Nam" }] },
            ]
        }
    }
  },
  'giao_duc_cong_dan': {
      'canh_dieu': {
          '6': {
            name: "Giáo dục công dân 6 - Cánh diều",
            topics: [
              { name: "Chủ đề 1: Tự hào về truyền thống gia đình, dòng họ", lessons: [{ name: "Bài 1: Tự hào về truyền thống gia đình, dòng họ" }] },
              { name: "Chủ đề 2: Yêu thương con người", lessons: [{ name: "Bài 2: Yêu thương con người" }] },
              { name: "Chủ đề 3: Siêng năng, kiên trì", lessons: [{ name: "Bài 3: Siêng năng, kiên trì" }] },
              { name: "Chủ đề 4: Tôn trọng sự thật", lessons: [{ name: "Bài 4: Tôn trọng sự thật" }] },
              { name: "Chủ đề 5: Tự lập", lessons: [{ name: "Bài 5: Tự lập" }] },
              { name: "Chủ đề 6: Tự nhận thức bản thân", lessons: [{ name: "Bài 6: Tự nhận thức bản thân" }] },
            ]
          },
          '7': {
            name: "Giáo dục công dân 7 - Cánh diều",
            topics: [
                { name: "Chủ đề: Tự hào về truyền thống quê hương", lessons: [{ name: "Bài 1: Tự hào về truyền thống quê hương" }] },
                { name: "Chủ đề: Bảo tồn di sản văn hóa", lessons: [{ name: "Bài 2: Bảo tồn di sản văn hóa" }] },
                { name: "Chủ đề: Quan tâm, cảm thông và chia sẻ", lessons: [{ name: "Bài 3: Quan tâm, cảm thông và chia sẻ" }] },
                { name: "Chủ đề: Học tập tự giác, tích cực", lessons: [{ name: "Bài 4: Học tập tự giác, tích cực" }] },
                { name: "Chủ đề: Giữ chữ tín", lessons: [{ name: "Bài 5: Giữ chữ tín" }] },
                { name: "Chủ đề: Quản lí tiền", lessons: [{ name: "Bài 6: Quản lí tiền" }] },
                { name: "Chủ đề: Ứng phó với tâm lí căng thẳng", lessons: [{ name: "Bài 7: Ứng phó với tâm lí căng thẳng" }] },
                { name: "Chủ đề: Bạo lực học đường", lessons: [
                    { name: "Bài 8: Bạo lực học đường" },
                    { name: "Bài 9: Ứng phó với bạo lực học đường" }
                ]},
                { name: "Chủ đề: Tệ nạn xã hội", lessons: [
                    { name: "Bài 10: Tệ nạn xã hội" },
                    { name: "Bài 11: Thực hiện phòng, chống tệ nạn xã hội" }
                ]},
                { name: "Chủ đề: Quyền và nghĩa vụ của công dân trong gia đình", lessons: [{ name: "Bài 12: Quyền và nghĩa vụ của công dân trong gia đình" }] },
            ]
          },
          '8': {
            name: "Giáo dục công dân 8 - Cánh diều",
            topics: [
              { name: "Chủ đề 1: Tự hào về truyền thống dân tộc Việt Nam", lessons: [{ name: "Bài 1: Tự hào về truyền thống dân tộc Việt Nam" }] },
              { name: "Chủ đề 2: Lao động cần cù, sáng tạo", lessons: [{ name: "Bài 2: Lao động cần cù, sáng tạo" }] },
              { name: "Chủ đề 3: Phòng, chống bạo lực gia đình", lessons: [{ name: "Bài 3: Phòng, chống bạo lực gia đình" }] },
              { name: "Chủ đề 4: Bảo vệ môi trường và tài nguyên thiên nhiên", lessons: [{ name: "Bài 4: Bảo vệ môi trường và tài nguyên thiên nhiên" }] },
              { name: "Chủ đề 5: Phòng ngừa tai nạn vũ khí, cháy, nổ và các chất độc hại", lessons: [{ name: "Bài 5: Phòng ngừa tai nạn vũ khí, cháy, nổ và các chất độc hại" }] },
              { name: "Chủ đề 6: Quyền và nghĩa vụ lao động của công dân", lessons: [{ name: "Bài 6: Quyền và nghĩa vụ lao động của công dân" }] },
            ]
          },
          '9': {
              name: "Giáo dục công dân 9 - Cánh diều",
              topics: [
                  { name: "Chủ đề 1: Sống có lí tưởng", lessons: [{ name: "Bài 1: Sống có lí tưởng" }] },
                  { name: "Chủ đề 2: Khoan dung", lessons: [{ name: "Bài 2: Khoan dung" }] },
                  { name: "Chủ đề 3: Bảo vệ hoà bình", lessons: [{ name: "Bài 3: Bảo vệ hoà bình" }] },
                  { name: "Chủ đề 4: Quản lí thời gian hiệu quả", lessons: [{ name: "Bài 4: Quản lí thời gian hiệu quả" }] },
                  { name: "Chủ đề 5: Vi phạm pháp luật và trách nhiệm pháp lí", lessons: [{ name: "Bài 5: Vi phạm pháp luật và trách nhiệm pháp lí" }] },
                  { name: "Chủ đề 6: Quyền và nghĩa vụ của công dân về kinh doanh và lao động", lessons: [{ name: "Bài 6: Quyền tự do kinh doanh và nghĩa vụ đóng thuế" }] },
              ]
          }
      }
  },
  'cong_nghe': {
      'canh_dieu': {
          '6': {
            name: "Công nghệ 6 - Cánh diều",
            topics: [
              { name: "Chương I: Nhà ở", lessons: [{ name: "Nhà ở đối với con người" }, { name: "Sử dụng năng lượng trong gia đình" }, { name: "Ngôi nhà thông minh" }] },
              { name: "Chương II: Bảo quản và chế biến thực phẩm", lessons: [{ name: "Bảo quản thực phẩm" }, { name: "Chế biến thực phẩm" }] },
              { name: "Chương III: Trang phục", lessons: [{ name: "Trang phục trong đời sống" }, { name: "Sử dụng và bảo quản trang phục" }] },
              { name: "Chương IV: Đồ dùng điện trong gia đình", lessons: [{ name: "Đồ dùng điện trong gia đình" }, { name: "Sử dụng đồ dùng điện an toàn" }] },
            ]
          },
          '7': {
            name: "Công nghệ 7 - Cánh diều",
            topics: [
              { name: "Phần 1: Trồng trọt", lessons: [{ name: "Giới thiệu về trồng trọt" }, { name: "Làm đất và bón phân" }, { name: "Trồng và chăm sóc cây trồng" }, { name: "Thu hoạch sản phẩm" }] },
              { name: "Phần 2: Lâm nghiệp", lessons: [{ name: "Giới thiệu về rừng" }, { name: "Trồng, chăm sóc và bảo vệ rừng" }] },
              { name: "Phần 3: Chăn nuôi", lessons: [{ name: "Giới thiệu về chăn nuôi" }, { name: "Nuôi dưỡng, chăm sóc và phòng, trị bệnh cho vật nuôi" }] },
              { name: "Phần 4: Thủy sản", lessons: [{ name: "Giới thiệu về thủy sản" }, { name: "Chăm sóc, quản lí và bảo vệ môi trường nuôi thủy sản" }] },
            ]
          },
          '8': {
            name: "Công nghệ 8 - Cánh diều",
            topics: [
              { name: "Chương I: Vẽ kĩ thuật", lessons: [{ name: "Bản vẽ kĩ thuật và vai trò" }, { name: "Hình chiếu vuông góc" }, { name: "Bản vẽ chi tiết và bản vẽ lắp" }] },
              { name: "Chương II: Cơ khí", lessons: [{ name: "Vật liệu cơ khí" }, { name: "Truyền và biến đổi chuyển động" }, { name: "Gia công cơ khí bằng tay" }] },
              { name: "Chương III: Kĩ thuật điện", lessons: [{ name: "An toàn điện" }, { name: "Mạch điện" }, { name: "Mạch điện điều khiển" }] },
              { name: "Chương IV: Thiết kế kĩ thuật", lessons: [{ name: "Đại cương về thiết kế kĩ thuật" }, { name: "Quy trình thiết kế kĩ thuật" }] },
            ]
          },
          '9': {
              name: "Công nghệ 9 - Cánh diều",
              topics: [
                  { name: "Mô đun: Lắp đặt mạch điện", lessons: [{ name: "Mạch điện trong gia đình" }, { name: "An toàn điện" }, { name: "Ngành nghề kĩ thuật điện" }] },
                  { name: "Mô đun: Trồng trọt", lessons: [{ name: "Giới thiệu chung về trồng trọt" }, { name: "Sâu, bệnh hại cây trồng" }] },
                  { name: "Mô đun: Chăn nuôi", lessons: [{ name: "Giới thiệu chung về chăn nuôi" }, { name: "Nuôi dưỡng và chăm sóc vật nuôi" }] },
                  { name: "Mô đun: Lâm nghiệp", lessons: [{ name: "Giới thiệu chung về rừng" }, { name: "Trồng, chăm sóc và bảo vệ rừng" }] },
              ]
          }
      }
  },
  'tin_hoc': {
    'canh_dieu': {
        '6': {
          name: "Tin học 6 - Cánh diều",
          topics: [
            { name: "Chủ đề A: Máy tính và cộng đồng", lessons: [{ name: "Thông tin, thu nhận và xử lí thông tin" }, { name: "Lưu trữ và trao đổi thông tin" }] },
            { name: "Chủ đề B: Mạng máy tính và Internet", lessons: [{ name: "Khái niệm và lợi ích của mạng máy tính" }, { name: "Mạng có dây và không dây" }] },
            { name: "Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: [{ name: "Thông tin trên web" }, { name: "Sử dụng trình duyệt web" }] },
            { name: "Chủ đề D: Đạo đức, pháp luật và văn hoá trong môi trường số", lessons: [{ name: "Sử dụng Internet an toàn" }] },
            { name: "Chủ đề E: Ứng dụng tin học", lessons: [{ name: "Giới thiệu phần mềm soạn thảo văn bản" }, { name: "Sơ đồ tư duy" }] },
            { name: "Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: [{ name: "Khái niệm thuật toán" }, { name: "Chương trình máy tính" }] },
          ]
        },
        '7': {
          name: "Tin học 7 - Cánh diều",
          topics: [
            { name: "Chủ đề A: Máy tính và cộng đồng", lessons: [{ name: "Phần mềm máy tính" }, { name: "Hệ điều hành và phần mềm ứng dụng" }] },
            { name: "Chủ đề B: Mạng máy tính và Internet", lessons: [{ name: "Mạng xã hội và một số kênh trao đổi thông tin" }] },
            { name: "Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: [{ name: "Sắp xếp để dễ tìm" }, { name: "Thực hành tìm kiếm thông tin trên Internet" }] },
            { name: "Chủ đề D: Đạo đức, pháp luật và văn hoá trong môi trường số", lessons: [{ name: "Ứng xử trên mạng" }] },
            { name: "Chủ đề E: Ứng dụng tin học", lessons: [{ name: "Làm quen với bảng tính điện tử" }, { name: "Làm quen với phần mềm trình chiếu" }] },
            { name: "Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: [{ name: "Làm quen với lập trình Scratch" }, { name: "Biến và câu lệnh lặp" }] },
          ]
        },
        '8': {
          name: "Tin học 8 - Cánh diều",
          topics: [
            { name: "Chủ đề A: Máy tính và cộng đồng", lessons: [{ name: "Lịch sử phát triển máy tính" }] },
            { name: "Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: [{ name: "Sử dụng công nghệ số để hợp tác" }] },
            { name: "Chủ đề D: Đạo đức, pháp luật và văn hoá trong môi trường số", lessons: [{ name: "Phòng tránh lừa đảo và ứng xử văn hoá trên mạng" }] },
            { name: "Chủ đề E: Ứng dụng tin học", lessons: [{ name: "Sử dụng bảng tính điện tử nâng cao" }, { name: "Sử dụng trình chiếu nâng cao" }] },
            { name: "Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: [{ name: "Làm quen với môi trường lập trình Python" }, { name: "Biến, kiểu dữ liệu và các phép toán" }, { name: "Câu lệnh điều kiện và câu lệnh lặp" }] },
            { name: "Chủ đề G: Hướng nghiệp với tin học", lessons: [{ name: "Giới thiệu các ngành nghề thuộc lĩnh vực tin học" }] },
          ]
        },
        '9': {
            name: "Tin học 9 - Cánh diều",
            topics: [
                { name: "Chủ đề A: Máy tính và xã hội tri thức", lessons: [{ name: "Vai trò của thiết bị thông minh và tin học" }] },
                { name: "Chủ đề B: Mạng máy tính và Internet", lessons: [{ name: "An toàn trên Internet" }] },
                { name: "Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: [{ name: "Tìm kiếm thông tin trên Internet" }] },
                { name: "Chủ đề D: Đạo đức, pháp luật và văn hoá trong môi trường số", lessons: [{ name: "Tác động của Internet và các vấn đề pháp lí" }] },
                { name: "Chủ đề E: Ứng dụng tin học", lessons: [{ name: "Phần mềm trình chiếu đa phương tiện" }, { name: "Phần mềm bảng tính nâng cao" }] },
                { name: "Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: [{ name: "Kiểu dữ liệu danh sách" }, { name: "Kiểu dữ liệu xâu kí tự" }, { name: "Chương trình con" }] },
            ]
        }
    },
    'ket_noi_tri_thuc': {
      '6': {
        name: "Tin học 6 - Kết nối tri thức",
        topics: [
          { name: "Chủ đề 1. Máy tính và cộng đồng", lessons: [
              { name: "Bài 1. Thông tin và dữ liệu" },
              { name: "Bài 2. Xử lí thông tin" },
              { name: "Bài 3. Thông tin trong máy tính" }
          ]},
          { name: "Chủ đề 2. Mạng máy tính và Internet", lessons: [
              { name: "Bài 4. Mạng máy tính" },
              { name: "Bài 5. Internet" }
          ]},
          { name: "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: [
              { name: "Bài 6. Mạng thông tin toàn cầu" },
              { name: "Bài 7. Tìm kiếm thông tin trên Internet" },
              { name: "Bài 8. Thư điện tử" }
          ]},
          { name: "Chủ đề 4. Đạo đức, pháp luật và văn hoá trong môi trường số", lessons: [
              { name: "Bài 9. An toàn thông tin trên Internet" }
          ]},
          { name: "Chủ đề 5. Ứng dụng tin học", lessons: [
              { name: "Bài 10. Sơ đồ tư duy" },
              { name: "Bài 11. Định dạng văn bản" },
              { name: "Bài 12. Trình bày thông tin ở dạng bảng" },
              { name: "Bài 13. Thực hành: Tìm kiếm và thay thế" },
              { name: "Bài 14. Thực hành tổng hợp: Hoàn thiện sổ lưu niệm" }
          ]},
          { name: "Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: [
              { name: "Bài 15. Thuật toán" },
              { name: "Bài 16. Các cấu trúc điều khiển" },
              { name: "Bài 17. Chương trình máy tính" }
          ]}
        ]
      },
      '7': {
        name: "Tin học 7 - Kết nối tri thức",
        topics: [
          { name: "Chủ đề 1. Máy tính và cộng đồng", lessons: [
              { name: "Bài 1. Thiết bị vào – ra" },
              { name: "Bài 2. Phần mềm máy tính" },
              { name: "Bài 3. Quản lí dữ liệu trong máy tính" }
          ]},
          { name: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: [
              { name: "Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet" }
          ]},
          { name: "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số", lessons: [
              { name: "Bài 5. Ứng xử trên mạng" }
          ]},
          { name: "Chủ đề 4. Ứng dụng tin học", lessons: [
              { name: "Bài 6. Làm quen với phần mềm bảng tính" },
              { name: "Bài 7. Tính toán tự động trên bảng tính" },
              { name: "Bài 8. Công cụ hỗ trợ tính toán" },
              { name: "Bài 9. Trình bày bảng tính" },
              { name: "Bài 10. Hoàn thiện bảng tính" },
              { name: "Bài 11. Tạo bài trình chiếu" },
              { name: "Bài 12. Định dạng đối tượng trên trang chiếu" },
              { name: "Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu" }
          ]},
          { name: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: [
              { name: "Bài 14. Thuật toán tìm kiếm tuần tự" },
              { name: "Bài 15. Thuật toán tìm kiếm nhị phân" },
              { name: "Bài 16. Thuật toán sắp xếp" }
          ]}
        ]
      },
      '8': {
        name: "Tin học 8 - Kết nối tri thức",
        topics: [
            { name: "Chủ đề 1. Máy tính và cộng đồng", lessons: [
                { name: "Bài 1. Lược sử công cụ tính toán" }
            ]},
            { name: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: [
                { name: "Bài 2. Thông tin trong môi trường số" },
                { name: "Bài 3. Thực hành: Khai thác thông tin số" }
            ]},
            { name: "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số", lessons: [
                { name: "Bài 4. Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số" }
            ]},
            { name: "Chủ đề 4. Ứng dụng tin học", lessons: [
                { name: "Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế" },
                { name: "Bài 6. Sắp xếp và lọc dữ liệu" },
                { name: "Bài 7. Trực quan hoá dữ liệu" },
                { name: "Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản" },
                { name: "Bài 9a. Tạo đầu trang, chân trang cho văn bản" },
                { name: "Bài 10a. Định dạng nâng cao cho trang chiếu" },
                { name: "Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu" },
                { name: "Bài 8b. Phần mềm chỉnh sửa ảnh" },
                { name: "Bài 9b. Thay đổi khung hình, kích thước ảnh" },
                { name: "Bài 10b. Thêm văn bản, tạo hiệu ứng cho ảnh" },
                { name: "Bài 11b. Thực hành tổng hợp" }
            ]},
            { name: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: [
                { name: "Bài 12. Từ thuật toán đến chương trình" },
                { name: "Bài 13. Biểu diễn dữ liệu" },
                { name: "Bài 14. Cấu trúc điều khiển" },
                { name: "Bài 15. Gỡ lỗi" }
            ]},
            { name: "Chủ đề 6. Hướng nghiệp với Tin học", lessons: [
                { name: "Bài 16. Tin học với nghề nghiệp" }
            ]}
        ]
      },
      '9': {
        name: "Tin học 9 - Kết nối tri thức",
        topics: [
          { name: "Chủ đề 1. Máy tính và cộng đồng", lessons: [
              { name: "Bài 1. Thế giới kĩ thuật số" }
          ]},
          { name: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", lessons: [
              { name: "Bài 2. Thông tin trong giải quyết vấn đề" },
              { name: "Bài 3. Thực hành: Đánh giá chất lượng thông tin" }
          ]},
          { name: "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số", lessons: [
              { name: "Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet" }
          ]},
          { name: "Chủ đề 4. Ứng dụng tin học", lessons: [
              { name: "Bài 5. Tìm hiểu phần mềm mô phỏng" },
              { name: "Bài 6. Thực hành: Khai thác phần mềm mô phỏng" },
              { name: "Bài 7. Trình bày thông tin trong trao đổi và hợp tác" },
              { name: "Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin" },
              { name: "Bài 9a. Sử dụng công cụ xác thực dữ liệu" },
              { name: "Bài 10a. Sử dụng hàm COUNTIF" },
              { name: "Bài 11a. Sử dụng hàm SUMIF" },
              { name: "Bài 12a. Sử dụng hàm IF" },
              { name: "Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình" },
              { name: "Bài 9b. Các chức năng chính của phần mềm làm video" },
              { name: "Bài 10b. Chuẩn bị dữ liệu và dựng video" },
              { name: "Bài 11b. Thực hành: Dựng video theo kịch bản" },
              { name: "Bài 12b. Hoàn thành việc dựng video" },
              { name: "Bài 13b. Biên tập và xuất video" }
          ]},
          { name: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính", lessons: [
              { name: "Bài 14. Giải quyết vấn đề" },
              { name: "Bài 15. Bài toán tin học" },
              { name: "Bài 16. Thực hành: Lập chương trình máy tính" }
          ]},
          { name: "Chủ đề 6. Hướng nghiệp với tin học", lessons: [
              { name: "Bài 17. Tin học và thế giới nghề nghiệp" }
          ]}
        ]
      }
    }
  }
};

// Auto-fill other textbook series by copying from 'canh_dieu' as a base
for (const subjectKey in CURRICULUM_DATA) {
  if (subjectKey === 'khoa_hoc_tu_nhien') continue; // Skip as requested
  
  const subject = CURRICULUM_DATA[subjectKey as Subject];
  if (subject && subject.canh_dieu) {
    if (!subject.chan_troi_sang_tao) {
      subject.chan_troi_sang_tao = JSON.parse(JSON.stringify(subject.canh_dieu));
      // Update names to reflect the correct series
      for(const grade in subject.chan_troi_sang_tao) {
        subject.chan_troi_sang_tao[grade].name = subject.chan_troi_sang_tao[grade].name.replace('Cánh diều', 'Chân trời sáng tạo');
      }
    }
    if (!subject.ket_noi_tri_thuc) {
      subject.ket_noi_tri_thuc = JSON.parse(JSON.stringify(subject.canh_dieu));
       // Update names to reflect the correct series
      for(const grade in subject.ket_noi_tri_thuc) {
        subject.ket_noi_tri_thuc[grade].name = subject.ket_noi_tri_thuc[grade].name.replace('Cánh diều', 'Kết nối tri thức');
      }
    } else { // if it exists, fill in missing grades
        for (const gradeKey of ['6', '7', '8', '9']) {
            if (!subject.ket_noi_tri_thuc[gradeKey] && subject.canh_dieu[gradeKey as '6'|'7'|'8'|'9']) {
                subject.ket_noi_tri_thuc[gradeKey] = JSON.parse(JSON.stringify(subject.canh_dieu[gradeKey as '6'|'7'|'8'|'9']));
                subject.ket_noi_tri_thuc[gradeKey].name = subject.ket_noi_tri_thuc[gradeKey].name.replace('Cánh diều', 'Kết nối tri thức');
            }
        }
    }
  }
}
