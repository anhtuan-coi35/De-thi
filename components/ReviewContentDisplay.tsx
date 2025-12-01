import React from 'react';
import { Question, Answer, QuestionType, TextbookSeries, Subject } from '../types';
import { TEXTBOOK_SERIES, SUBJECTS } from '../constants';

interface ReviewContentDisplayProps {
  content: {
    questions: Question[];
    answers: Answer[];
  };
  selectedSubject: Subject;
  selectedGrade: '6' | '7' | '8' | '9';
  selectedSeries: TextbookSeries;
  onGoToSummary: () => void;
  showWrapper?: boolean;
}

const ReviewContentDisplay: React.FC<ReviewContentDisplayProps> = ({ content, selectedSubject, selectedGrade, selectedSeries, onGoToSummary, showWrapper = true }) => {
  const { questions, answers } = content;

  // --- Question Data ---
  const mcqChoiceQuestions = questions.filter(q => q.type === QuestionType.MCQ);
  const trueFalseQuestions = questions.filter(q => q.type === QuestionType.TRUE_FALSE);
  const shortAnswerQuestions = questions.filter(q => q.type === QuestionType.SHORT_ANSWER);
  const essayQuestions = questions.filter(q => q.type === QuestionType.ESSAY);
  
  // --- Answer Data ---
  const questionMap = new Map<number, Question>(questions.map(q => [q.id, q]));
  const sortedAnswers = [...answers].sort((a, b) => a.questionId - b.questionId);

  const mcqChoiceAnswers = sortedAnswers.filter(a => questionMap.get(a.questionId)?.type === QuestionType.MCQ);
  const trueFalseAnswers = sortedAnswers.filter(a => questionMap.get(a.questionId)?.type === QuestionType.TRUE_FALSE);
  const shortAnswerAnswers = sortedAnswers.filter(a => questionMap.get(a.questionId)?.type === QuestionType.SHORT_ANSWER);
  const essayAnswers = sortedAnswers.filter(a => questionMap.get(a.questionId)?.type === QuestionType.ESSAY);

  const seriesName = TEXTBOOK_SERIES.find(s => s.key === selectedSeries)?.name || '';
  const subjectName = SUBJECTS.find(s => s.key === selectedSubject)?.name || '';

  const contentToRender = (
    <div id="review-content" className="text-base" style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '14pt' }}>
      {/* ======================= PART 1: QUESTIONS ======================= */}
      <div className="text-center mb-8">
          <h3 className="text-xl font-bold uppercase mt-6">ĐỀ ÔN TẬP</h3>
          <p className="font-semibold mt-1">Môn: {subjectName} - Khối {selectedGrade} (Bộ sách: {seriesName})</p>
      </div>
      
      {(mcqChoiceQuestions.length > 0 || trueFalseQuestions.length > 0 || shortAnswerQuestions.length > 0) && (
          <section>
               <h4 className="font-bold text-lg mb-4">I. TRẮC NGHIỆM KHÁCH QUAN</h4>
               {mcqChoiceQuestions.length > 0 && (
                   <div className="mb-4">
                       <h5 className="font-semibold text-md mb-3">1. Trắc nghiệm khách quan nhiều lựa chọn</h5>
                       {mcqChoiceQuestions.map((q) => (
                          <div key={`q-${q.id}`} className="mb-6">
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
                       ))}
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
                              <div key={`q-${q.id}`} className="mb-6">
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
                       {shortAnswerQuestions.map((q) => (
                          <div key={`q-${q.id}`} className="mb-6">
                              <div className="flex items-start">
                                  <p className="font-bold mr-2">Câu {q.id}:</p>
                                  <p className="whitespace-pre-wrap">{q.question}</p>
                              </div>
                          </div>
                       ))}
                   </div>
               )}
          </section>
      )}
      {essayQuestions.length > 0 && (
        <section className="mt-8">
          <h4 className="font-bold text-lg mb-4">II. TỰ LUẬN</h4>
          {essayQuestions.map((q) => (
            <div key={`q-${q.id}`} className="mb-6">
               <div className="flex items-start">
                  <p className="font-bold mr-2">Câu {q.id}:</p>
                  <p className="whitespace-pre-wrap">{q.question}</p>
               </div>
            </div>
          ))}
        </section>
      )}
      <div className="text-center mt-8 pt-4 border-t">
        <p className="font-bold">----- HẾT PHẦN CÂU HỎI -----</p>
      </div>


      {/* ======================= SEPARATOR ======================= */}
      <div className="mt-12 pt-8 border-t-4 border-dashed border-gray-400 print:break-before-page"></div>

      {/* ======================= PART 2: ANSWERS ======================= */}
       <header className="text-center mt-8 mb-8 border-b pb-4">
          <h3 className="text-xl font-bold uppercase mt-6">ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM (ĐỀ ÔN TẬP)</h3>
      </header>
      {(mcqChoiceAnswers.length > 0 || trueFalseAnswers.length > 0 || shortAnswerAnswers.length > 0) && (
        <section>
          <h4 className="font-bold text-lg mb-4">I. TRẮC NGHIỆM KHÁCH QUAN</h4>
          {mcqChoiceAnswers.length > 0 && (
               <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                  {mcqChoiceAnswers.map((ans) => (
                      <div key={`a-${ans.questionId}`} className="flex border rounded p-2 items-center justify-center bg-gray-50">
                          <span className="font-semibold mr-2">{ans.questionId}.</span>
                          <span className="font-bold text-blue-600">{ans.correctAnswer}</span>
                      </div>
                  ))}
              </div>
          )}
          {trueFalseAnswers.length > 0 && (
              <div className="mt-6">
                  {trueFalseAnswers.map((ans) => (
                      <div key={`a-${ans.questionId}`} className="mb-4">
                        <p className="font-semibold mb-2">Câu {ans.questionId}:</p>
                        <div className="p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap">{ans.correctAnswer}</div>
                      </div>
                  ))}
              </div>
          )}
          {shortAnswerAnswers.length > 0 && (
              <div className="mt-6">
                  {shortAnswerAnswers.map((ans) => (
                      <div key={`a-${ans.questionId}`} className="mb-4">
                        <p className="font-semibold mb-2">Câu {ans.questionId}:</p>
                        <div className="p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap">{ans.correctAnswer}</div>
                      </div>
                  ))}
              </div>
          )}
        </section>
      )}
      {essayAnswers.length > 0 && (
        <section className="mt-8">
          <h4 className="font-bold text-lg mb-4">II. TỰ LUẬN</h4>
          {essayAnswers.map((ans) => (
            <div key={`a-${ans.questionId}`} className="mb-4">
              <p className="font-semibold mb-2">Câu {ans.questionId}:</p>
              <div className="p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap">{ans.correctAnswer}</div>
            </div>
          ))}
        </section>
      )}

    </div>
  );

  if (!showWrapper) {
    return contentToRender;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6 no-print">
        <h2 className="text-2xl font-bold text-gray-700">Bước 5: Nội Dung Ôn Tập</h2>
         <button
          onClick={onGoToSummary}
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          Tổng kết & Tải về <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
      {contentToRender}
    </div>
  );
};

export default ReviewContentDisplay;