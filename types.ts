
export type AppStep = 1 | 2 | 3 | 4 | 5 | 6;

// Add Subject type
export type Subject = 'khoa_hoc_tu_nhien' | 'lich_su_dia_ly' | 'toan' | 'ngu_van' | 'tieng_anh' | 'giao_duc_cong_dan' | 'cong_nghe' | 'tin_hoc';

export interface StepDefinition {
  id: AppStep;
  title: string;
  icon: string;
}

// Mức độ nhận thức (sử dụng key ngắn gọn)
export type CognitiveLevel = 'B' | 'H' | 'VD';

// Loại bộ sách
export type TextbookSeries = 'canh_dieu' | 'chan_troi_sang_tao' | 'ket_noi_tri_thuc';

// Các loại câu hỏi
export enum QuestionType {
  MCQ = 'mcq',
  TRUE_FALSE = 'trueFalse',
  SHORT_ANSWER = 'shortAnswer',
  ESSAY = 'essay',
}

// Cấu trúc lưu số lượng câu hỏi cho mỗi mức độ nhận thức
export type QuestionCounts = {
  [key in CognitiveLevel]?: number;
};

// Cấu trúc cho một hàng "Nội dung/đơn vị kiến thức"
export interface MatrixContentUnit {
  id: string; // Dùng cho React key
  name: string;
  // Cấu trúc lưu số lượng câu hỏi, ví dụ: { mcq: { B: 1, H: 2 }, essay: { VD: 1 } }
  questionCounts: {
    [key in QuestionType]?: QuestionCounts;
  };
}

// Cấu trúc cho một "Chủ đề/Chương", nhóm các đơn vị kiến thức lại
export interface MatrixTopic {
  id: string; // Dùng cho React key
  name:string;
  contentUnits: MatrixContentUnit[];
}


// Cấu trúc câu hỏi đã được cập nhật
export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: { // Tùy chọn, chỉ dành cho câu hỏi trắc nghiệm
    A: string;
    B: string;
    C: string;
    D: string;
  };
  cognitiveLevel: string; // 'Biết', 'Hiểu', 'Vận dụng'
  topic: string;
  knowledgeUnit: string;
}

// Cấu trúc đáp án đã được cập nhật
export interface Answer {
  questionId: number;
  correctAnswer: string; // Linh hoạt cho đáp án dạng chữ hoặc văn bản
}

export interface TestPaper {
  questions: Question[];
  answers: Answer[];
}


// --- New types for structured specification ---
// FIX: Changed from interface to type to allow for a mapped type.
export type SpecificationObjective = {
  [key in CognitiveLevel]?: string; // { B: 'Description for Biết', H: 'Description for Hiểu' }
};

export interface SpecificationContentUnit {
  id: string; // Match the MatrixContentUnit id
  name: string;
  objectives: SpecificationObjective;
}

export interface SpecificationTopic {
  id: string; // Match the MatrixTopic id
  name: string;
  contentUnits: SpecificationContentUnit[];
}