import React from 'react';
import { Question, QuestionType, TextbookSeries, Subject } from '../types';
import { TEXTBOOK_SERIES, SUBJECTS } from '../constants';

interface TestPaperDisplayProps {
  questions: Question[];
  selectedSubject: Subject;
  selectedGrade: '6' | '7' | '8' | '9';
  selectedSeries: TextbookSeries;
  showWrapper?: boolean;
}

const getTestDuration = (subject: Subject): number => {
  switch (subject) {
    case 'giao_duc_cong_dan':
    case 'cong_nghe':
    case 'tin_hoc':
      return 45;
    case 'tieng_anh':
      return 60;
    case 'khoa_hoc_tu_nhien':
    case 'lich_su_dia_ly':
    case 'toan':
    case 'ngu_van':
    default:
      return 90;
  }
};


const TestPaperDisplay: React.FC<TestPaperDisplayProps> = ({ questions, selectedSubject, selectedGrade, selectedSeries, showWrapper = true }) => {
  const mcqChoiceQuestions = questions.filter(q => q.type === QuestionType.MCQ);
  const trueFalseQuestions = questions.filter(q => q.type === QuestionType.TRUE_FALSE);
  const shortAnswerQuestions = questions.filter(q => q.type === QuestionType.SHORT_ANSWER);
  const essayQuestions = questions.filter(q => q.type === QuestionType.ESSAY);
  
  const seriesName = TEXTBOOK_SERIES.find(s => s.key === selectedSeries)?.name || '';
  const subjectName = SUBJECTS.find(s => s.key === selectedSubject)?.name || '';
  const duration = getTestDuration(selectedSubject);

  const content = (
      <div id="test-paper-content" className="text-base" style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '14pt' }}>
        <div className="text-center mb-8">
            <p className="font-semibold uppercase">UỶ BAN NHÂN DÂN XÃ NHO QUAN</p>
            <p className="font-bold uppercase">TRƯỜNG TRUNG HỌC CƠ SỞ YÊN QUANG</p>
            
            <h3 className="text-xl font-bold uppercase mt-6">ĐỀ KIỂM TRA</h3>
            <p className="font-semibold mt-1">Môn: {subjectName} - Khối {selectedGrade} (Bộ sách: {seriesName})</p>
            <p className="mt-1">Thời gian làm bài: {duration} phút</p>
        </div>
    
        <div className="mb-8 border-b-2 border-dotted border-black pb-4">
            <p className="font-semibold">Họ và tên: ...................................................................... Lớp: ..........</p>
        </div>
        
        {(mcqChoiceQuestions.length > 0 || trueFalseQuestions.length > 0 || shortAnswerQuestions.length > 0) && (
            <section>
                 <h4 className="font-bold text-lg mb-4">I. TRẮC NGHIỆM KHÁCH QUAN</h4>

                 {mcqChoiceQuestions.length > 0 && (
                     <div className="mb-4">
                         <h5 className="font-semibold text-md mb-3">1. Trắc nghiệm khách quan nhiều lựa chọn</h5>
                         {mcqChoiceQuestions.map((q) => {
                             return (
                                <div key={q.id} className="mb-6">
                                    <div className="flex items-start">
                                    <p className="font-bold mr-2">Câu {q.id}:</p>
                                    <p>{q.question}</p>
                                    </div>
                                    {q.options && (
                                    <ul className="list-none pl-8 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                        <li><span className="font-bold">A.</span> {q.options.A}</li>
                                        <li><span className="font-bold">B.</span> {q.options.B}</li>
                                        <li><span className="font-bold">C.</span> {q.options.C}</li>
                                        <li><span className="font-bold">D.</span> {q.options.D}</li>
                                    </ul>
                                    )}
                                </div>
                             )
                         })}
                     </div>
                 )}

                {trueFalseQuestions.length > 0 && (
                     <div className="mb-4">
                         <h5 className="font-semibold text-md mb-3">2. Trắc nghiệm khách quan đúng - sai</h5>
                         {trueFalseQuestions.map((q) => {
                            const parts = q.question.split('\n').filter(p => p.trim() !== '');
                            const intro = parts.length > 0 ? parts[0] : '';
                            const statements = parts.length > 1 ? parts.slice(1) : [];
                            return (
                                <div key={q.id} className="mb-6">
                                    <div className="flex items-start">
                                        <p className="font-bold mr-2">Câu {q.id}:</p>
                                        <div className="flex-1">
                                            <p className="mb-2 whitespace-pre-wrap">{intro}</p>
                                            {statements.length > 0 ? (
                                                <table className="w-full mt-2 border-collapse" style={{ fontSize: '12pt' }}>
                                                    <thead>
                                                        <tr className="bg-gray-50">
                                                            <th className="py-2 px-4 border text-left font-semibold">Phát biểu</th>
                                                            <th className="py-2 px-2 border text-center font-semibold w-20">Đúng</th>
                                                            <th className="py-2 px-2 border text-center font-semibold w-20">Sai</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {statements.map((statement, index) => (
                                                            <tr key={index}>
                                                                <td className="py-2 px-4 border align-top">{statement}</td>
                                                                <td className="py-2 px-2 border text-center align-middle">
                                                                    <div className="w-6 h-6 border-2 border-gray-400 rounded-sm mx-auto"></div>
                                                                </td>
                                                                <td className="py-2 px-2 border text-center align-middle">
                                                                    <div className="w-6 h-6 border-2 border-gray-400 rounded-sm mx-auto"></div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p className="whitespace-pre-wrap">{q.question}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                         })}
                     </div>
                 )}

                 {shortAnswerQuestions.length > 0 && (
                     <div className="mb-4">
                         <h5 className="font-semibold text-md mb-3">3. Trắc nghiệm khách quan trả lời ngắn</h5>
                         {shortAnswerQuestions.map((q) => {
                            return (
                                <div key={q.id} className="mb-6">
                                    <div className="flex items-start">
                                        <p className="font-bold mr-2">Câu {q.id}:</p>
                                        <p className="whitespace-pre-wrap">{q.question}</p>
                                    </div>
                                </div>
                            )
                         })}
                     </div>
                 )}
            </section>
        )}


        {essayQuestions.length > 0 && (
          <section className="mt-8">
            <h4 className="font-bold text-lg mb-4">II. TỰ LUẬN</h4>
            {essayQuestions.map((q) => {
              return (
              <div key={q.id} className="mb-6">
                 <div className="flex items-start">
                    <p className="font-bold mr-2">Câu {q.id}:</p>
                    {/* Using whitespace-pre-wrap to respect newlines from model for essay questions with parts a, b */}
                    <p className="whitespace-pre-wrap">{q.question}</p>
                 </div>
              </div>
            )})}
          </section>
        )}
         {questions.length === 0 && (
            <p className="text-center text-gray-500 py-8">Đề thi sẽ được hiển thị ở đây sau khi được tạo.</p>
        )}

        <div className="text-center mt-8 pt-4 border-t">
          <p className="font-bold">----- HẾT -----</p>
        </div>
      </div>
  );

  if (!showWrapper) {
    return content;
  }
  
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6 no-print">
        <h2 className="text-2xl font-bold text-gray-700">Bước 3: Xem Đề Thi</h2>
      </div>
      {content}
    </div>
  );
};

export default TestPaperDisplay;