import React, { useState } from 'react';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import MatrixCreator from './components/MatrixCreator';
import SpecificationDisplay from './components/SpecificationDisplay';
import TestPaperDisplay from './components/TestPaperDisplay';
import AnswerKeyDisplay from './components/AnswerKeyDisplay';
import Loader from './components/Loader';
import ReviewContentDisplay from './components/ReviewContentDisplay';
import SummaryDisplay from './components/SummaryDisplay';
import { AppStep, MatrixTopic, TestPaper, SpecificationTopic, Question, QuestionType, TextbookSeries, Subject } from './types';
import { generateSpecification, generateTestPaper, generateReviewContent } from './services/geminiService';
import { SUBJECTS } from './constants';

const initialMatrix: MatrixTopic[] = [];

const processGeneratedPaper = (paper: TestPaper, matrix: MatrixTopic[]): TestPaper => {
    // Helper function to normalize strings for comparison
      const normalize = (str: string) => (str || '').toLowerCase().replace(/[\s\.\-,:]/g, '');

      // Create structured lookup for official names from the matrix (source of truth)
      const officialCurriculum = matrix.map(topic => ({
          officialName: topic.name,
          normalizedName: normalize(topic.name),
          units: topic.contentUnits.map(unit => ({
              officialName: unit.name,
              normalizedName: normalize(unit.name)
          }))
      }));

      // 1. Reconcile AI-generated names with official names from the matrix using a robust method.
      const reconciledQuestions = paper.questions.map((q): Question => {
          const normalizedAiTopic = normalize(q.topic);
          const normalizedAiUnit = normalize(q.knowledgeUnit);

          let finalTopic = q.topic;
          let finalUnit = q.knowledgeUnit;
          let bestMatchFound = false;

          // Find best topic match (exact first, then partial)
          let bestTopicMatch = officialCurriculum.find(t => t.normalizedName === normalizedAiTopic);
          if (!bestTopicMatch) {
              bestTopicMatch = officialCurriculum.find(t => t.normalizedName.includes(normalizedAiTopic) || normalizedAiTopic.includes(t.normalizedName));
          }
          
          if (bestTopicMatch) {
              finalTopic = bestTopicMatch.officialName;
              
              // With a matched topic, find best unit match within it (exact first, then partial)
              let bestUnitMatch = bestTopicMatch.units.find(u => u.normalizedName === normalizedAiUnit);
              if (!bestUnitMatch) {
                  bestUnitMatch = bestTopicMatch.units.find(u => u.normalizedName.includes(normalizedAiUnit) || normalizedAiUnit.includes(u.normalizedName));
              }

              if (bestUnitMatch) {
                  finalUnit = bestUnitMatch.officialName;
                  bestMatchFound = true;
              }
          }
          
          // If topic was not found, as a last resort, search all units across all topics
          if (!bestMatchFound) {
              for (const topic of officialCurriculum) {
                  const unitMatch = topic.units.find(u => u.normalizedName === normalizedAiUnit || u.normalizedName.includes(normalizedAiUnit) || normalizedAiUnit.includes(u.normalizedName));
                  if (unitMatch) {
                      finalTopic = topic.officialName;
                      finalUnit = unitMatch.officialName;
                      break; // Take the first one found
                  }
              }
          }
          
          return {
              ...q,
              topic: finalTopic,
              knowledgeUnit: finalUnit,
          };
      });


      // 2. Sort questions by the desired display order (MCQ -> True/False -> Short Answer -> Essay).
      const typeOrder: { [key in QuestionType]: number } = {
        [QuestionType.MCQ]: 0,
        [QuestionType.TRUE_FALSE]: 1,
        [QuestionType.SHORT_ANSWER]: 2,
        [QuestionType.ESSAY]: 3,
      };

      const sortedQuestions = [...reconciledQuestions].sort((a, b) => {
        const typeComparison = typeOrder[a.type] - typeOrder[b.type];
        if (typeComparison !== 0) {
            return typeComparison;
        }
        // Secondary sort by original ID to maintain a stable order within each type
        return a.id - b.id;
      });

      // 3. Create a mapping from old AI ID to new, sequential ID (1, 2, 3...).
      const idMap = new Map<number, number>();
      sortedQuestions.forEach((q, index) => {
        idMap.set(q.id, index + 1);
      });

      // 4. Re-map questions with new sequential IDs.
      const remappedQuestions = sortedQuestions.map((q, index) => ({
        ...q,
        id: index + 1,
      }));

      // 5. Re-map answers with new question IDs.
      const remappedAnswers = paper.answers.map(ans => ({
        ...ans,
        questionId: idMap.get(ans.questionId) || ans.questionId,
      }));

      return {
        questions: remappedQuestions,
        answers: remappedAnswers,
      };
}


const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(1);
  const [maxStep, setMaxStep] = useState<AppStep>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [matrix, setMatrix] = useState<MatrixTopic[]>(initialMatrix);
  const [specification, setSpecification] = useState<SpecificationTopic[]>([]);
  const [testPaper, setTestPaper] = useState<TestPaper | null>(null);
  const [reviewContent, setReviewContent] = useState<TestPaper | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('khoa_hoc_tu_nhien');
  const [selectedGrade, setSelectedGrade] = useState<'6' | '7' | '8' | '9'>('9');
  const [selectedSeries, setSelectedSeries] = useState<TextbookSeries>('canh_dieu');

  const handleStepClick = (step: AppStep) => {
    if (step <= maxStep) {
      setCurrentStep(step);
    }
  };

  const handleGenerateSpecification = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const subjectName = SUBJECTS.find(s => s.key === selectedSubject)?.name || '';
      const spec = await generateSpecification(matrix, subjectName);
      setSpecification(spec);
      setCurrentStep(2);
      setMaxStep(2);
    } catch (err) {
      setError('Đã có lỗi xảy ra khi tạo đặc tả. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTestPaper = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const subjectName = SUBJECTS.find(s => s.key === selectedSubject)?.name || '';
      const paper = await generateTestPaper(specification, matrix, subjectName);
      const processedPaper = processGeneratedPaper(paper, matrix);
      setTestPaper(processedPaper);
      setCurrentStep(3);
      setMaxStep(4);
    } catch (err) {
      setError('Đã có lỗi xảy ra khi tạo đề thi. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerateReviewContent = async () => {
    if (!specification.length || !matrix.length) {
        setError("Không có đủ dữ liệu để tạo nội dung ôn tập.");
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
        const subjectName = SUBJECTS.find(s => s.key === selectedSubject)?.name || '';
        const paper = await generateReviewContent(specification, matrix, subjectName, testPaper);
        const processedPaper = processGeneratedPaper(paper, matrix);
        setReviewContent(processedPaper);
        setCurrentStep(5);
        setMaxStep(5);
    } catch (err) {
        setError('Đã có lỗi xảy ra khi tạo nội dung ôn tập. Vui lòng thử lại.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleGoToSummary = () => {
    setCurrentStep(6);
    setMaxStep(6);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <MatrixCreator 
          matrix={matrix} 
          setMatrix={setMatrix} 
          onSubmit={handleGenerateSpecification} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
          setError={setError}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedSeries={selectedSeries}
          setSelectedSeries={setSelectedSeries}
        />;
      case 2:
        return <SpecificationDisplay 
          specification={specification} 
          matrix={matrix}
          onConfirm={handleGenerateTestPaper} 
          onBack={() => setCurrentStep(1)}
          isLoading={isLoading}
          questions={testPaper?.questions || null}
        />;
      case 3:
        return testPaper ? <TestPaperDisplay questions={testPaper.questions} selectedSubject={selectedSubject} selectedGrade={selectedGrade} selectedSeries={selectedSeries} /> : null;
      case 4:
        return testPaper ? <AnswerKeyDisplay answers={testPaper.answers} questions={testPaper.questions} selectedSubject={selectedSubject} selectedGrade={selectedGrade} selectedSeries={selectedSeries} onGenerateReview={handleGenerateReviewContent} isLoading={isLoading} /> : null;
      case 5:
        return reviewContent ? <ReviewContentDisplay content={reviewContent} selectedSubject={selectedSubject} selectedGrade={selectedGrade} selectedSeries={selectedSeries} onGoToSummary={handleGoToSummary} /> : null;
      case 6:
        return testPaper && reviewContent ? (
          <SummaryDisplay
            matrix={matrix}
            specification={specification}
            testPaper={testPaper}
            reviewContent={reviewContent}
            selectedSubject={selectedSubject}
            selectedGrade={selectedGrade}
            selectedSeries={selectedSeries}
            onBack={() => setCurrentStep(5)}
          />
        ) : null;
      default:
        return <MatrixCreator 
          matrix={matrix} 
          setMatrix={setMatrix} 
          onSubmit={handleGenerateSpecification} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
          setError={setError}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedSeries={selectedSeries}
          setSelectedSeries={setSelectedSeries}
        />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {isLoading && <Loader message="AI đang xử lý yêu cầu..." />}
      <Header />
      <main className="container mx-auto p-4">
        <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} maxStep={maxStep} />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Lỗi!</strong>
            <span className="block sm:inline"> {error}</span>
            <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </main>
    </div>
  );
};

export default App;