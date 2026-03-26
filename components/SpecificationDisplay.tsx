import React, { useMemo } from 'react';
import { MatrixTopic, SpecificationTopic, QuestionType, Question } from '../types';
import { COGNITIVE_LEVELS } from '../constants';

interface SpecificationDisplayProps {
  specification: SpecificationTopic[];
  matrix: MatrixTopic[];
  onConfirm: () => void;
  onBack: () => void;
  isLoading: boolean;
  questions: Question[] | null;
}

const SpecificationDisplay: React.FC<SpecificationDisplayProps> = ({ specification, matrix, onConfirm, onBack, isLoading, questions }) => {

  const questionDetailsMap = useMemo(() => {
    const map = new Map<string, number[]>(); // Key: 'topicName|unitName|qType', Value: [1, 5]
    if (!questions) return map;

    for (const q of questions) {
        const key = `${q.topic}|${q.knowledgeUnit}|${q.type}`;
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(q.id);
    }

    // Sort the IDs numerically
    map.forEach((ids) => ids.sort((a, b) => a - b));

    return map;
  }, [questions]);

  const getUnitQuestionDetails = (topicName: string, unitName: string, qType: QuestionType): string => {
    const topic = matrix.find(t => t.name === topicName);
    const unit = topic?.contentUnits.find(u => u.name === unitName);
    
    let total = 0;
    if (unit) {
        const counts = unit.questionCounts[qType];
        if (counts) {
            total = (counts.B || 0) + (counts.H || 0) + (counts.VD || 0);
        }
    }

    if (total === 0) return '';

    const key = `${topicName}|${unitName}|${qType}`;
    const questionIds = questionDetailsMap.get(key);

    if (questionIds && questionIds.length > 0) {
        return `${total} (Câu ${questionIds.join(', ')})`;
    }

    return total.toString();
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
        <i className="fas fa-clipboard-check mr-3"></i>Bước 2: Xem và Xác nhận Đặc Tả
      </h2>
      
      <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm" id="specification-table">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-slate-100 text-slate-700 font-bold">
            <tr>
              <th rowSpan={2} className="py-3 px-2 border-b border-r border-slate-200 w-12 text-center">(1) TT</th>
              <th rowSpan={2} className="py-3 px-4 border-b border-r border-slate-200 w-1/5 text-left">(2) Chương/ chủ đề</th>
              <th rowSpan={2} className="py-3 px-4 border-b border-r border-slate-200 w-1/4 text-left">(3) Nội dung/đơn vị kiến thức</th>
              <th rowSpan={2} className="py-3 px-4 border-b border-r border-slate-200 w-1/3 text-left">(4) Yêu cầu cần đạt</th>
              <th colSpan={4} className="py-2 px-4 border-b border-slate-200 text-center">Số lượng câu hỏi ở các mức độ</th>
            </tr>
            <tr>
              <th className="py-2 px-2 border-b border-r border-slate-200 font-medium text-xs text-slate-600">(5) Nhiều lựa chọn</th>
              <th className="py-2 px-2 border-b border-r border-slate-200 font-medium text-xs text-slate-600">(6) Đúng-Sai</th>
              <th className="py-2 px-2 border-b border-r border-slate-200 font-medium text-xs text-slate-600">(7) Trả lời ngắn</th>
              <th className="py-2 px-2 border-b border-slate-200 font-medium text-xs text-slate-600">(8) Tự luận</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {specification.map((topic, topicIndex) => (
              <React.Fragment key={topic.id}>
                {topic.contentUnits.map((unit, unitIndex) => (
                  <tr key={unit.id} className="hover:bg-slate-50 transition-colors">
                    {unitIndex === 0 && (
                      <td rowSpan={topic.contentUnits.length} className="py-3 px-2 border-b border-r border-slate-200 text-center align-top font-semibold bg-white">
                        {topicIndex + 1}
                      </td>
                    )}
                    {unitIndex === 0 && (
                      <td rowSpan={topic.contentUnits.length} className="py-3 px-4 border-b border-r border-slate-200 align-top font-semibold bg-white text-indigo-900">
                        {topic.name}
                      </td>
                    )}
                    <td className="py-3 px-4 border-b border-r border-slate-200 align-top font-medium">{unit.name}</td>
                    <td className="py-3 px-4 border-b border-r border-slate-200 align-top text-sm">
                      {COGNITIVE_LEVELS.map(level => (
                        unit.objectives[level.key] && (
                           <div key={level.key} className="mb-3 last:mb-0">
                            <span className="font-bold text-indigo-700 text-xs uppercase block mb-1">- {level.name}:</span>
                            <p className="pl-2 text-slate-600 leading-relaxed">{unit.objectives[level.key]}</p>
                           </div>
                        )
                      ))}
                    </td>
                    <td className="py-3 px-2 border-b border-r border-slate-200 text-center align-middle font-medium">
                      {getUnitQuestionDetails(topic.name, unit.name, QuestionType.MCQ)}
                    </td>
                    <td className="py-3 px-2 border-b border-r border-slate-200 text-center align-middle font-medium">
                      {getUnitQuestionDetails(topic.name, unit.name, QuestionType.TRUE_FALSE)}
                    </td>
                    <td className="py-3 px-2 border-b border-r border-slate-200 text-center align-middle font-medium">
                      {getUnitQuestionDetails(topic.name, unit.name, QuestionType.SHORT_ANSWER)}
                    </td>
                    <td className="py-3 px-2 border-b border-slate-200 text-center align-middle font-medium">
                      {getUnitQuestionDetails(topic.name, unit.name, QuestionType.ESSAY)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
             {matrix.length === 0 && (
                <tr>
                    <td colSpan={8} className="text-center py-12 text-slate-400 italic">
                        Bản đặc tả sẽ được hiển thị ở đây sau khi bạn tạo ma trận.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-slate-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors flex items-center shadow-md"
        >
          <i className="fas fa-arrow-left mr-2"></i> Quay lại
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading || specification.length === 0}
          className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none flex items-center text-lg"
        >
          {isLoading ? 'Đang tạo đề...' : 'Xác nhận & Tạo Đề Thi'} <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default SpecificationDisplay;