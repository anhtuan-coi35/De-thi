
import React, { useState, useMemo } from 'react';
import { MatrixTopic, SpecificationTopic, TestPaper, Subject, TextbookSeries, Question, QuestionType, CognitiveLevel, Answer } from '../types';
import { COGNITIVE_LEVELS, QUESTION_TYPES, SUBJECTS, TEXTBOOK_SERIES } from '../constants';
import TestPaperDisplay from './TestPaperDisplay';
import AnswerKeyDisplay from './AnswerKeyDisplay';
import ReviewContentDisplay from './ReviewContentDisplay';

interface SummaryDisplayProps {
  matrix: MatrixTopic[];
  specification: SpecificationTopic[];
  testPaper: TestPaper;
  reviewContent: TestPaper;
  selectedSubject: Subject;
  selectedGrade: '6' | '7' | '8' | '9';
  selectedSeries: TextbookSeries;
  onBack: () => void;
}

const TARGET_PERCENTAGES: { [key in CognitiveLevel]: number } = {
  B: 40,
  H: 30,
  VD: 30,
};

// Sub-components for rendering content to avoid clutter
const MatrixReadOnly: React.FC<{ matrix: MatrixTopic[], selectedSubject: Subject }> = ({ matrix, selectedSubject }) => {
   const pointValues = useMemo(() => {
      const values = {
          [QuestionType.MCQ]: 0.25,
          [QuestionType.TRUE_FALSE]: 1.0,
          [QuestionType.SHORT_ANSWER]: 0.5,
          [QuestionType.ESSAY]: 1.0,
      };
      if (['cong_nghe', 'tin_hoc', 'giao_duc_cong_dan'].includes(selectedSubject)) {
          values[QuestionType.SHORT_ANSWER] = 1.0;
      }
      return values;
   }, [selectedSubject]);

   const totals = useMemo(() => {
    const questionCountTotals: { [key in QuestionType]?: { [key in CognitiveLevel]?: number } } = {};
    const grandQuestionCountTotals = { byCognitiveLevel: { B: 0, H: 0, VD: 0 }, totalQuestions: 0 };
    const scoreTotals: { [key in QuestionType]?: { [key in CognitiveLevel]?: number } } = {};
    const grandScoreTotals = { byCognitiveLevel: { B: 0, H: 0, VD: 0 }, totalScore: 0 };
    for (const topic of matrix) { for (const unit of topic.contentUnits) { for (const qType of QUESTION_TYPES) { if (!questionCountTotals[qType.key]) questionCountTotals[qType.key] = { B: 0, H: 0, VD: 0 }; if (!scoreTotals[qType.key]) scoreTotals[qType.key] = { B: 0, H: 0, VD: 0 }; const counts = unit.questionCounts[qType.key]; if (counts) { for (const level of COGNITIVE_LEVELS) { const count = counts[level.key] || 0; const points = count * pointValues[qType.key]; (questionCountTotals[qType.key] as any)[level.key] += count; grandQuestionCountTotals.byCognitiveLevel[level.key] += count; grandQuestionCountTotals.totalQuestions += count; (scoreTotals[qType.key] as any)[level.key] += points; grandScoreTotals.byCognitiveLevel[level.key] += points; grandScoreTotals.totalScore += points; } } } } }
    return { questionCountTotals, grandQuestionCountTotals, scoreTotals, grandScoreTotals };
  }, [matrix, pointValues]);

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full bg-white border text-center text-sm">
        <thead className="bg-gray-100 font-semibold">
           <tr><th rowSpan={3} className="py-2 px-2 border align-middle">TT</th><th rowSpan={3} className="py-2 px-4 border align-middle">Chương/ chủ đề</th><th rowSpan={3} className="py-2 px-4 border align-middle">Nội dung/đơn vị kiến thức</th><th colSpan={12} className="py-2 px-4 border">Số lượng câu hỏi</th><th colSpan={3} className="py-2 px-4 border">Tổng số câu hỏi</th><th rowSpan={3} className="py-2 px-4 border align-middle">Tỉ lệ % điểm</th></tr>
           <tr>{QUESTION_TYPES.map(qType => (<th key={qType.key} colSpan={3} className="py-2 px-4 border font-medium">{qType.name}</th>))}{COGNITIVE_LEVELS.map(level => (<th key={level.key} rowSpan={2} className="py-2 px-2 border align-middle">{level.name}</th>))}</tr>
           <tr>{QUESTION_TYPES.map(qType => (<React.Fragment key={qType.key}>{COGNITIVE_LEVELS.map(level => (<th key={level.key} className="py-2 px-2 border font-medium">{level.key}</th>))}</React.Fragment>))}</tr>
        </thead>
        <tbody>
           {matrix.map((topic, topicIndex) => (<React.Fragment key={topic.id}>{topic.contentUnits.map((unit, unitIndex) => { const unitTotals = { questions: { B: 0, H: 0, VD: 0 }, score: 0 }; QUESTION_TYPES.forEach(qType => { COGNITIVE_LEVELS.forEach(level => { const count = unit.questionCounts[qType.key]?.[level.key] || 0; unitTotals.questions[level.key] += count; unitTotals.score += count * pointValues[qType.key]; }); }); return (<tr key={unit.id}>{unitIndex === 0 && (<><td rowSpan={topic.contentUnits.length || 1} className="py-2 px-2 border align-middle">{topicIndex + 1}</td><td rowSpan={topic.contentUnits.length || 1} className="py-2 px-2 border align-middle text-left font-semibold">{topic.name}</td></>)}<td className="py-2 px-2 border align-middle text-left">{unit.name}</td>{QUESTION_TYPES.map(qType => (<React.Fragment key={qType.key}>{COGNITIVE_LEVELS.map(level => (<td key={level.key} className="py-2 px-2 border">{unit.questionCounts[qType.key]?.[level.key] || 0}</td>))}</React.Fragment>))}<td className="py-2 px-2 border font-semibold bg-gray-50">{unitTotals.questions.B}</td><td className="py-2 px-2 border font-semibold bg-gray-50">{unitTotals.questions.H}</td><td className="py-2 px-2 border font-semibold bg-gray-50">{unitTotals.questions.VD}</td><td className="py-2 px-2 border font-semibold bg-gray-50">{totals.grandScoreTotals.totalScore > 0 ? ((unitTotals.score / totals.grandScoreTotals.totalScore) * 100).toFixed(1) : 0}%</td></tr>)})} </React.Fragment>))}
           <tr className="bg-gray-100 font-bold"><td colSpan={3} className="py-2 px-4 border">Tổng số câu</td>{QUESTION_TYPES.map(qType => (<React.Fragment key={qType.key}>{COGNITIVE_LEVELS.map(level => (<td key={level.key} className="py-2 px-2 border">{totals.questionCountTotals[qType.key]?.[level.key] || 0}</td>))}</React.Fragment>))}<td className="py-2 px-2 border">{totals.grandQuestionCountTotals.byCognitiveLevel.B}</td><td className="py-2 px-2 border">{totals.grandQuestionCountTotals.byCognitiveLevel.H}</td><td className="py-2 px-2 border">{totals.grandQuestionCountTotals.byCognitiveLevel.VD}</td><td className="py-2 px-2 border">{totals.grandQuestionCountTotals.totalQuestions}</td></tr>
           <tr className="bg-gray-100 font-bold"><td colSpan={3} className="py-2 px-4 border">Tổng số điểm</td>{QUESTION_TYPES.map(qType => { let typeTotalScore = 0; COGNITIVE_LEVELS.forEach(level => typeTotalScore += totals.scoreTotals[qType.key]?.[level.key] || 0); return <td key={qType.key} colSpan={3} className="py-2 px-2 border">{typeTotalScore.toFixed(2)}</td>})}<td className="py-2 px-2 border">{totals.grandScoreTotals.byCognitiveLevel.B.toFixed(2)}</td><td className="py-2 px-2 border">{totals.grandScoreTotals.byCognitiveLevel.H.toFixed(2)}</td><td className="py-2 px-2 border">{totals.grandScoreTotals.byCognitiveLevel.VD.toFixed(2)}</td><td className="py-2 px-2 border">{totals.grandScoreTotals.totalScore.toFixed(2)}</td></tr>
           <tr className="bg-gray-100 font-bold"><td colSpan={3} className="py-2 px-4 border">Tỉ lệ %</td>{QUESTION_TYPES.map(qType => { let typeTotalScore = 0; COGNITIVE_LEVELS.forEach(level => typeTotalScore += totals.scoreTotals[qType.key]?.[level.key] || 0); const percentage = totals.grandScoreTotals.totalScore > 0 ? (typeTotalScore / totals.grandScoreTotals.totalScore) * 100 : 0; return <td key={qType.key} colSpan={3} className="py-2 px-2 border">{percentage.toFixed(0)}%</td>})}{COGNITIVE_LEVELS.map(level => { const percentage = totals.grandScoreTotals.totalScore > 0 ? (totals.grandScoreTotals.byCognitiveLevel[level.key] / totals.grandScoreTotals.totalScore) * 100 : 0; const target = TARGET_PERCENTAGES[level.key]; const isOffTarget = totals.grandScoreTotals.totalScore > 0 && Math.round(percentage) !== target; return (<td key={level.key} className={`py-2 px-2 border ${isOffTarget ? 'text-red-600 font-black' : ''}`}>{percentage.toFixed(0)}%</td>)})}<td className="py-2 px-2 border">100%</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const SpecificationReadOnly: React.FC<{ specification: SpecificationTopic[], matrix: MatrixTopic[], questions: Question[] }> = ({ specification, matrix, questions }) => {
    // This logic is copied from SpecificationDisplay to show question numbers
    const questionDetailsMap = useMemo(() => {
        const map = new Map<string, number[]>();
        for (const q of questions) {
            const key = `${q.topic}|${q.knowledgeUnit}|${q.type}`;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(q.id);
        }
        map.forEach((ids) => ids.sort((a, b) => a - b));
        return map;
    }, [questions]);
    const getUnitQuestionDetails = (topicName: string, unitName: string, qType: QuestionType): string => {
        const topic = matrix.find(t => t.name === topicName);
        const unit = topic?.contentUnits.find(u => u.name === unitName);
        let total = 0;
        if (unit) {
            const counts = unit.questionCounts[qType];
            if (counts) total = (counts.B || 0) + (counts.H || 0) + (counts.VD || 0);
        }
        if (total === 0) return '';
        const key = `${topicName}|${unitName}|${qType}`;
        const questionIds = questionDetailsMap.get(key);
        if (questionIds && questionIds.length > 0) return `${total} (Câu ${questionIds.join(', ')})`;
        return total.toString();
    };

    return (
        <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full bg-white text-sm">
                <thead className="bg-gray-100 font-semibold text-center">
                    <tr><th rowSpan={2} className="py-2 px-2 border w-12">(1) TT</th><th rowSpan={2} className="py-2 px-4 border w-1/5">(2) Chương/ chủ đề</th><th rowSpan={2} className="py-2 px-4 border w-1/4">(3) Nội dung/đơn vị kiến thức</th><th rowSpan={2} className="py-2 px-4 border w-1/3">(4) Yêu cầu cần đạt</th><th colSpan={4} className="py-2 px-4 border">Số lượng câu hỏi ở các mức độ</th></tr>
                    <tr><th className="py-2 px-2 border font-medium">(5) Nhiều lựa chọn</th><th className="py-2 px-2 border font-medium">(6) Đúng-Sai</th><th className="py-2 px-2 border font-medium">(7) Trả lời ngắn</th><th className="py-2 px-2 border font-medium">(8) Tự luận</th></tr>
                </thead>
                <tbody>
                    {specification.map((topic, topicIndex) => (
                        <React.Fragment key={topic.id}>{topic.contentUnits.map((unit, unitIndex) => (
                            <tr key={unit.id} className="hover:bg-gray-50">
                                {unitIndex === 0 && (<td rowSpan={topic.contentUnits.length} className="py-2 px-2 border text-center align-top font-semibold">{topicIndex + 1}</td>)}
                                {unitIndex === 0 && (<td rowSpan={topic.contentUnits.length} className="py-2 px-4 border align-top font-semibold">{topic.name}</td>)}
                                <td className="py-2 px-4 border align-top">{unit.name}</td>
                                <td className="py-2 px-4 border align-top">{COGNITIVE_LEVELS.map(level => (unit.objectives[level.key] && (<div key={level.key} className="mb-2"><p className="font-semibold">- {level.name}:</p><p className="pl-4">{unit.objectives[level.key]}</p></div>)))}</td>
                                <td className="py-2 px-2 border text-center align-middle">{getUnitQuestionDetails(topic.name, unit.name, QuestionType.MCQ)}</td>
                                <td className="py-2 px-2 border text-center align-middle">{getUnitQuestionDetails(topic.name, unit.name, QuestionType.TRUE_FALSE)}</td>
                                <td className="py-2 px-2 border text-center align-middle">{getUnitQuestionDetails(topic.name, unit.name, QuestionType.SHORT_ANSWER)}</td>
                                <td className="py-2 px-2 border text-center align-middle">{getUnitQuestionDetails(topic.name, unit.name, QuestionType.ESSAY)}</td>
                            </tr>))}
                        </React.Fragment>))}
                </tbody>
            </table>
        </div>
    );
};


const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ matrix, specification, testPaper, reviewContent, selectedSubject, selectedGrade, selectedSeries, onBack }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    
    const subjectName = SUBJECTS.find(s => s.key === selectedSubject)?.name || '';
    const seriesName = TEXTBOOK_SERIES.find(s => s.key === selectedSeries)?.name || '';

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const contentHtml = document.getElementById('summary-content-for-export')?.innerHTML;
            if (!contentHtml) {
                console.error("Could not find content to export.");
                return;
            }
            const header = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>Export</title>
                <style>
                    body { font-family: 'Times New Roman', serif; font-size: 14pt; }
                    table { border-collapse: collapse; width: 100%; font-size: 12pt; }
                    th, td { border: 1px solid black; padding: 5px; text-align: left; vertical-align: top; }
                    h1, h3, h4, h5, p, li, div { font-family: 'Times New Roman', serif; }
                    h2 { page-break-before: always; font-family: 'Times New Roman', serif; text-align: left; font-size: 16pt; font-weight: bold; }
                    h2:first-child { page-break-before: auto; }
                    .page-break { page-break-after: always; }
                    .no-border { border: none; }
                    .font-bold { font-weight: bold; }
                    .font-semibold { font-weight: 600; }
                    .uppercase { text-transform: uppercase; }
                    .text-center { text-align: center; }
                    .mb-8 { margin-bottom: 2rem; }
                    .mt-6 { margin-top: 1.5rem; }
                    .no-print { display: none; }
                </style>
                </head><body>`;
            const footer = '</body></html>';
            const fullHtml = header + contentHtml + footer;

            const { asBlob } = (window as any).htmlDocx;
            const blob = await asBlob(fullHtml);
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `DeThi_${subjectName.replace(/\s/g, '_')}_Lop${selectedGrade}_${seriesName.replace(/\s/g, '_')}.docx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (e) {
            console.error("Error during download:", e);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
             <div className="flex justify-between items-center mb-6 no-print">
                <h2 className="text-2xl font-bold text-gray-700">Bước 6: Tổng kết & Tải về</h2>
                <button 
                    onClick={handleDownload} 
                    disabled={isDownloading}
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                    <i className={`fas ${isDownloading ? 'fa-spinner fa-spin' : 'fa-file-word'} mr-2`}></i>
                    {isDownloading ? 'Đang tạo file...' : 'Tải xuống Tất cả (.docx)'}
                </button>
            </div>

            <div className="space-y-4">
                {matrix.length > 0 && (
                     <details className="bg-gray-50 rounded-lg p-4" open>
                        <summary className="font-semibold text-lg cursor-pointer text-gray-800">Ma trận Đề thi</summary>
                        <div className="mt-4"><MatrixReadOnly matrix={matrix} selectedSubject={selectedSubject} /></div>
                    </details>
                )}
                {specification.length > 0 && (
                     <details className="bg-gray-50 rounded-lg p-4">
                        <summary className="font-semibold text-lg cursor-pointer text-gray-800">Bản Đặc tả</summary>
                        <div className="mt-4"><SpecificationReadOnly specification={specification} matrix={matrix} questions={testPaper.questions} /></div>
                    </details>
                )}
                {testPaper && (
                     <details className="bg-gray-50 rounded-lg p-4">
                        <summary className="font-semibold text-lg cursor-pointer text-gray-800">Đề thi</summary>
                        <div className="mt-4">
                          <TestPaperDisplay {...{...testPaper, selectedSubject, selectedGrade, selectedSeries, showWrapper: false}} />
                        </div>
                    </details>
                )}
                {testPaper && (
                     <details className="bg-gray-50 rounded-lg p-4">
                        <summary className="font-semibold text-lg cursor-pointer text-gray-800">Hướng dẫn chấm</summary>
                        <div className="mt-4">
                          <AnswerKeyDisplay {...{...testPaper, selectedSubject, selectedGrade, selectedSeries, onGenerateReview: ()=>{}, isLoading: false, showWrapper: false}} />
                          </div>
                    </details>
                )}
                {reviewContent && (
                     <details className="bg-gray-50 rounded-lg p-4">
                        <summary className="font-semibold text-lg cursor-pointer text-gray-800">Nội dung ôn tập</summary>
                        <div className="mt-4">
                          <ReviewContentDisplay content={reviewContent} {...{selectedSubject, selectedGrade, selectedSeries, onGoToSummary: ()=>{}, showWrapper: false}} />
                        </div>
                    </details>
                )}
            </div>

             {/* Hidden content for export */}
            <div id="summary-content-for-export" style={{ display: 'none' }}>
                {matrix.length > 0 && (
                    <div>
                        <h2>1. Ma trận đề thi</h2>
                        <MatrixReadOnly matrix={matrix} selectedSubject={selectedSubject} />
                    </div>
                )}
                 {specification.length > 0 && (
                    <div>
                        <h2>2. Bản đặc tả</h2>
                        <SpecificationReadOnly specification={specification} matrix={matrix} questions={testPaper.questions} />
                    </div>
                )}
                {testPaper && (
                    <div>
                        <h2>3. Đề thi</h2>
                        <TestPaperDisplay {...{...testPaper, selectedSubject, selectedGrade, selectedSeries, showWrapper: false}} />
                    </div>
                )}
                 {testPaper && (
                    <div>
                        <h2>4. Hướng dẫn chấm</h2>
                        <AnswerKeyDisplay {...{...testPaper, selectedSubject, selectedGrade, selectedSeries, onGenerateReview: ()=>{}, isLoading: false, showWrapper: false}} />
                    </div>
                )}
                {reviewContent && (
                    <div>
                        <h2>5. Nội dung ôn tập</h2>
                        <ReviewContentDisplay content={reviewContent} {...{selectedSubject, selectedGrade, selectedSeries, onGoToSummary: ()=>{}, showWrapper: false}} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SummaryDisplay;
