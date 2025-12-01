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
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Bước 2: Xem và Xác nhận Đặc Tả</h2>
      
      <div className="overflow-x-auto border rounded-lg" id="specification-table">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 font-semibold text-center">
            <tr>
              <th rowSpan={2} className="py-2 px-2 border w-12">(1) TT</th>
              <th rowSpan={2} className="py-2 px-4 border w-1/5">(2) Chương/ chủ đề</th>
              <th rowSpan={2} className="py-2 px-4 border w-1/4">(3) Nội dung/đơn vị kiến thức</th>
              <th rowSpan={2} className="py-2 px-4 border w-1/3">(4) Yêu cầu cần đạt</th>
              <th colSpan={4} className="py-2 px-4 border">Số lượng câu hỏi ở các mức độ</th>
            </tr>
            <tr>
              <th className="py-2 px-2 border font-medium">(5) Nhiều lựa chọn</th>
              <th className="py-2 px-2 border font-medium">(6) Đúng-Sai</th>
              <th className="py-2 px-2 border font-medium">(7) Trả lời ngắn</th>
              <th className="py-2 px-2 border font-medium">(8) Tự luận</th>
            </tr>
          </thead>
          <tbody>
            {specification.map((topic, topicIndex) => (
              <React.Fragment key={topic.id}>
                {topic.contentUnits.map((unit, unitIndex) => (
                  <tr key={unit.id} className="hover:bg-gray-50">
                    {unitIndex === 0 && (
                      <td rowSpan={topic.contentUnits.length} className="py-2 px-2 border text-center align-top font-semibold">
                        {topicIndex + 1}
                      </td>
                    )}
                    {unitIndex === 0 && (
                      <td rowSpan={topic.contentUnits.length} className="py-2 px-4 border align-top font-semibold">
                        {topic.name}
                      </td>
                    )}
                    <td className="py-2 px-4 border align-top">{unit.name}</td>
                    <td className="py-2 px-4 border align-top">
                      {COGNITIVE_LEVELS.map(level => (
                        unit.objectives[level.key] && (
                           <div key={level.key} className="mb-2">
                            <p className="font-semibold">- {level.name}:</p>
                            <p className="pl-4">{unit.objectives[level.key]}</p>
                           </div>
                        )
                      ))}
                    </td>
                    <td className="py-2 px-2 border text-center align-middle">
                      {getUnitQuestionDetails(topic.name, unit.name, QuestionType.MCQ)}
                    </td>
                    <td className="py-2 px-2 border text-center align-middle">
                      {getUnitQuestionDetails(topic.name, unit.name, QuestionType.TRUE_FALSE)}
                    </td>
                    <td className="py-2 px-2 border text-center align-middle">
                      {getUnitQuestionDetails(topic.name, unit.name, QuestionType.SHORT_ANSWER)}
                    </td>
                    <td className="py-2 px-2 border text-center align-middle">
                      {getUnitQuestionDetails(topic.name, unit.name, QuestionType.ESSAY)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
             {matrix.length === 0 && (
                <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                        Bản đặc tả sẽ được hiển thị ở đây sau khi bạn tạo ma trận.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
        >
          <i className="fas fa-arrow-left mr-2"></i> Quay lại
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading || specification.length === 0}
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center text-lg"
        >
          {isLoading ? 'Đang tạo đề...' : 'Xác nhận & Tạo Đề Thi'} <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default SpecificationDisplay;