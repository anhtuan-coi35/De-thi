import fs from 'fs';
const lines = fs.readFileSync('data/curriculum.ts', 'utf8').split('\n');
lines[227] = '              { name: "Sự phát sinh và phát triển của sự sống trên Trái Đất" }\n          ]\n      }\n    },\n    \'Chân trời sáng tạo\': {\n      \'6\': {\n        name: "Khoa học tự nhiên 6 - Chân trời sáng tạo",\n        topics: [\n          { name: "CHỦ ĐỀ 5: CHẤT TINH KHIẾT - HỖN HỢP. PHƯƠNG PHÁP TÁCH CÁC CHẤT", lessons: [';
fs.writeFileSync('data/curriculum.ts', lines.join('\n'));
