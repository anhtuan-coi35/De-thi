import { StepDefinition, QuestionType, CognitiveLevel, TextbookSeries, Subject } from './types';

export const SUBJECTS: { key: Subject; name: string }[] = [
  { key: 'khoa_hoc_tu_nhien', name: 'Khoa học Tự nhiên' },
  { key: 'lich_su_dia_ly', name: 'Lịch sử & Địa lý' },
  { key: 'toan', name: 'Toán học' },
  { key: 'ngu_van', name: 'Ngữ văn' },
  { key: 'tieng_anh', name: 'Tiếng Anh' },
  { key: 'giao_duc_cong_dan', name: 'Giáo dục công dân' },
  { key: 'cong_nghe', name: 'Công nghệ' },
  { key: 'tin_hoc', name: 'Tin học' },
];

export const COGNITIVE_LEVELS: { key: CognitiveLevel; name: string }[] = [
  { key: 'B', name: 'Biết' },
  { key: 'H', name: 'Hiểu' },
  { key: 'VD', name: 'Vận dụng' },
];

export const QUESTION_TYPES: { key: QuestionType; name: string; levels: CognitiveLevel[] }[] = [
    { key: QuestionType.MCQ, name: 'TNKQ nhiều lựa chọn', levels: ['B', 'H', 'VD'] },
    { key: QuestionType.TRUE_FALSE, name: 'TNKQ đúng - sai', levels: ['B', 'H', 'VD'] },
    { key: QuestionType.SHORT_ANSWER, name: 'TNKQ trả lời ngắn', levels: ['B', 'H', 'VD'] },
    { key: QuestionType.ESSAY, name: 'Tự luận', levels: ['B', 'H', 'VD'] },
];


export const STEP_DEFINITIONS: StepDefinition[] = [
  { id: 1, title: 'Tạo Ma Trận', icon: 'fa-table' },
  { id: 2, title: 'Xem Đặc Tả', icon: 'fa-cogs' },
  { id: 3, title: 'Xem Đề Thi', icon: 'fa-file-alt' },
  { id: 4, title: 'Xem Đáp Án', icon: 'fa-key' },
  { id: 5, title: 'Nội dung ôn tập', icon: 'fa-book-reader' },
  { id: 6, title: 'Tổng kết & Tải về', icon: 'fa-download' },
];

export const TEXTBOOK_SERIES: { key: TextbookSeries; name: string }[] = [
  { key: 'canh_dieu', name: 'Cánh diều' },
  { key: 'chan_troi_sang_tao', name: 'Chân trời sáng tạo' },
  { key: 'ket_noi_tri_thuc', name: 'Kết nối tri thức' },
];