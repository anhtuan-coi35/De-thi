import React from 'react';
import { Answer, Question, QuestionType, TextbookSeries, Subject } from '../types';
import { TEXTBOOK_SERIES, SUBJECTS } from '../constants';

interface AnswerKeyDisplayProps {
  answers: Answer[];
  questions: Question[];
  selectedSubject: Subject;
  selectedGrade: '6' | '7' | '8' | '9';
  selectedSeries: TextbookSeries;
  onGenerateReview: () => void;
  isLoading: boolean;
  showWrapper?: boolean;
}

const AnswerKeyDisplay: React.FC<AnswerKeyDisplayProps> = ({ answers, questions, selectedSubject, selectedGrade, selectedSeries, onGenerateReview, isLoading, showWrapper = true }) => {
  const questionMap = new Map<number, Question>(questions.map(q => [q.id, q]));
  const sortedAnswers = [...answers].sort((a, b) => a.questionId - b.questionId);

  const mcqChoiceAnswers = sortedAnswers.filter(a => questionMap.get(a.questionId)?.type === QuestionType.MCQ);
  const trueFalseAnswers = sortedAnswers.filter(a => questionMap.get(a.questionId)?.type === QuestionType.TRUE_FALSE);
  const shortAnswerAnswers = sortedAnswers.filter(a => questionMap.get(a.questionId)?.type === QuestionType.SHORT_ANSWER);
  const essayAnswers = sortedAnswers.filter(a => questionMap.get(a.questionId)?.type === QuestionType.ESSAY);
  
  const seriesName = TEXTBOOK_SERIES.find(s => s.key === selectedSeries)?.name || '';
  const subjectName = SUBJECTS.find(s => s.key === selectedSubject)?.name || '';

  const content = (
      <div id="answer-key-content" style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '14pt' }}>
        <header className="text-center mb-8 border-b pb-4">
            <h3 className="text-xl font-bold uppercase mt-6">ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM</h3>
            <p className="font-semibold mt-1">Môn: {subjectName} - Khối {selectedGrade} (Bộ sách: {seriesName})</p>
        </header>

        {(mcqChoiceAnswers.length > 0 || trueFalseAnswers.length > 0 || shortAnswerAnswers.length > 0) && (
          <section>
            <h4 className="font-bold text-lg mb-4">I. TRẮC NGHIỆM KHÁCH QUAN</h4>
            
            {mcqChoiceAnswers.length > 0 && (
                 <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                    {mcqChoiceAnswers.map((ans) => {
                        return (
                        <div key={ans.questionId} className="flex border rounded p-2 items-center justify-center bg-gray-50">
                            <span className="font-semibold mr-2">{ans.questionId}.</span>
                            <span className="font-bold text-blue-600">{ans.correctAnswer}</span>
                        </div>
                        )
                    })}
                </div>
            )}
            
            {trueFalseAnswers.length > 0 && (
                <div className="mt-6">
                    {trueFalseAnswers.map((ans) => {
                    return (
                        <div key={ans.questionId} className="mb-4">
                        <p className="font-semibold mb-2">Câu {ans.questionId}:</p>
                        <div className="p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap">{ans.correctAnswer}</div>
                        </div>
                    )
                    })}
                </div>
            )}

            {shortAnswerAnswers.length > 0 && (
                <div className="mt-6">
                    {shortAnswerAnswers.map((ans) => {
                    return (
                        <div key={ans.questionId} className="mb-4">
                        <p className="font-semibold mb-2">Câu {ans.questionId}:</p>
                        <div className="p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap">{ans.correctAnswer}</div>
                        </div>
                    )
                    })}
                </div>
            )}
           
          </section>
        )}

        {essayAnswers.length > 0 && (
          <section className="mt-8">
            <h4 className="font-bold text-lg mb-4">II. TỰ LUẬN</h4>
            {essayAnswers.map((ans) => {
              return (
                <div key={ans.questionId} className="mb-4">
                  <p className="font-semibold mb-2">Câu {ans.questionId}:</p>
                  <div className="p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap">{ans.correctAnswer}</div>
                </div>
              )
            })}
          </section>
        )}

        {answers.length === 0 && (
             <p className="text-center text-gray-500 py-8">Đáp án sẽ được hiển thị ở đây.</p>
        )}
      </div>
  );

  if (!showWrapper) {
    return content;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
       <div className="flex justify-between items-center mb-6 no-print">
         <h2 className="text-2xl font-bold text-gray-700">Bước 4: Xem Đáp Án</h2>
      </div>
      
      {content}

      <div className="mt-8 flex justify-end items-center no-print">
        <button
          onClick={onGenerateReview}
          disabled={isLoading}
          className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center text-lg"
        >
          {isLoading ? 'Đang tạo...' : 'Tạo Nội Dung Ôn Tập'} <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default AnswerKeyDisplay;