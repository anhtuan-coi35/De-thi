import React, { useRef } from 'react';
import { MatrixTopic, MatrixContentUnit, QuestionType, CognitiveLevel, TextbookSeries, Subject } from '../types';
import { QUESTION_TYPES, COGNITIVE_LEVELS, SUBJECTS, TEXTBOOK_SERIES } from '../constants';
import { CURRICULUM_DATA, CurriculumTopic } from '../data/curriculum';

interface ReconciliationResult {
    reconciledMatrix: MatrixTopic[];
    subject: Subject | null;
    grade: '6' | '7' | '8' | '9' | null;
    series: TextbookSeries | null;
    changes: { original: string; reconciled: string }[];
    unmatched: { type: 'topic' | 'unit'; name: string }[];
}

interface WordImportButtonProps {
  onMatrixImport: (data: ReconciliationResult) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const normalizeString = (str: string) => {
    return str.toLowerCase().replace(/[\s\.\-,:]/g, '');
};

const reconcileMatrixWithCurriculum = (matrix: MatrixTopic[]): ReconciliationResult => {
    let bestMatch = { subject: null as Subject | null, grade: null as '6' | '7' | '8' | '9' | null, series: null as TextbookSeries | null, score: -1 };
    const changes: { original: string; reconciled: string }[] = [];
    const unmatched: { type: 'topic' | 'unit'; name: string }[] = [];

    if (matrix.length === 0) {
        return { reconciledMatrix: [], subject: null, grade: null, series: null, changes, unmatched };
    }

    // Determine the best matching subject, grade and series
    for (const subjectKey of Object.keys(CURRICULUM_DATA) as Subject[]) {
      const subjectData = CURRICULUM_DATA[subjectKey];
      if (!subjectData) continue;
      
      for (const seriesKey of Object.keys(subjectData) as TextbookSeries[]) {
          const seriesData = subjectData[seriesKey];
          if (!seriesData) continue;
  
          for (const gradeKey of Object.keys(seriesData) as ('6' | '7' | '8' | '9')[]) {
              const gradeData = seriesData[gradeKey];
              const curriculumTopics = new Set(gradeData.topics.map(t => normalizeString(t.name)));
              let currentScore = 0;
  
              for (const topic of matrix) {
                  if (curriculumTopics.has(normalizeString(topic.name))) {
                      currentScore++;
                  }
              }
              
              if (currentScore > bestMatch.score) {
                  bestMatch = { subject: subjectKey, grade: gradeKey, series: seriesKey, score: currentScore };
              }
          }
      }
    }
    
    if (bestMatch.score <= 0) {
        return { reconciledMatrix: matrix, subject: null, grade: null, series: null, changes, unmatched };
    }
    
    const detectedSubject = bestMatch.subject!;
    const detectedGrade = bestMatch.grade!;
    const detectedSeries = bestMatch.series!;
    const gradeData = CURRICULUM_DATA[detectedSubject]?.[detectedSeries]?.[detectedGrade];

    if (!gradeData) { // Should not happen if score > 0, but as a safeguard
        return { reconciledMatrix: matrix, subject: null, grade: null, series: null, changes, unmatched };
    }

    // Reconcile names to match curriculum data exactly, with fallbacks
    const reconciledMatrix = matrix.map(topic => {
        const originalTopicName = topic.name;
        const normalizedTopicName = normalizeString(originalTopicName);
        let curriculumTopic: CurriculumTopic | undefined = gradeData.topics.find(t => normalizeString(t.name) === normalizedTopicName);

        // If no exact match, try partial match (more robust)
        if (!curriculumTopic) {
            for (const ct of gradeData.topics) {
                const normalizedCurriculumTopicName = normalizeString(ct.name);
                if (normalizedCurriculumTopicName.includes(normalizedTopicName) || normalizedTopicName.includes(normalizedCurriculumTopicName)) {
                    curriculumTopic = ct;
                    break;
                }
            }
        }

        const reconciledTopicName = curriculumTopic ? curriculumTopic.name : originalTopicName;
        if (curriculumTopic && originalTopicName !== reconciledTopicName) {
            changes.push({ original: originalTopicName, reconciled: reconciledTopicName });
        } else if (!curriculumTopic) {
            unmatched.push({ type: 'topic', name: originalTopicName });
        }

        const reconciledUnits = topic.contentUnits.map(unit => {
            const originalUnitName = unit.name;
            const normalizedUnitName = normalizeString(originalUnitName);
            let curriculumLesson;

            if (curriculumTopic) {
                curriculumLesson = curriculumTopic.lessons.find(l => normalizeString(l.name) === normalizedUnitName);
                 // If no exact match, try partial match
                if (!curriculumLesson) {
                    for (const cl of curriculumTopic.lessons) {
                        const normalizedCurriculumLessonName = normalizeString(cl.name);
                        if (normalizedCurriculumLessonName.includes(normalizedUnitName) || normalizedUnitName.includes(normalizedCurriculumLessonName)) {
                            curriculumLesson = cl;
                            break;
                        }
                    }
                }
            }
            
            const reconciledUnitName = curriculumLesson ? curriculumLesson.name : originalUnitName;
            if (curriculumLesson && originalUnitName !== reconciledUnitName) {
                changes.push({ original: originalUnitName, reconciled: reconciledUnitName });
            } else if (!curriculumLesson) {
                 unmatched.push({ type: 'unit', name: originalUnitName });
            }

            return { ...unit, name: reconciledUnitName };
        });

        return {
            ...topic,
            name: reconciledTopicName,
            contentUnits: reconciledUnits,
        };
    });
    
    return { reconciledMatrix, subject: detectedSubject, grade: detectedGrade, series: detectedSeries, changes, unmatched };
};


const WordImportButton: React.FC<WordImportButtonProps> = ({ onMatrixImport, setIsLoading, setError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const mammoth = (window as any).mammoth;
    if (!mammoth) {
        const errorMessage = "Lỗi: Thư viện đọc file Word (mammoth.js) chưa được tải. Vui lòng kiểm tra kết nối mạng và thử làm mới trang.";
        console.error(errorMessage);
        setError(errorMessage);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;
      const parsedMatrix = parseMatrixFromHtml(html);
      
      if (parsedMatrix.length === 0) {
        throw new Error("File không chứa dữ liệu ma trận hợp lệ.");
      }
      
      const reconciliationResult = reconcileMatrixWithCurriculum(parsedMatrix);

      if (!reconciliationResult.grade || !reconciliationResult.subject) {
          throw new Error("Không thể tự động xác định môn học và khối lớp từ file Word. Vui lòng đảm bảo tên các chủ đề khớp với chương trình học.");
      }
      
      onMatrixImport(reconciliationResult);
      
    } catch (error) {
      console.error("Error processing Word file:", error);
      setError(error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định khi xử lý file.");
    } finally {
      setIsLoading(false);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const parseMatrixFromHtml = (html: string): MatrixTopic[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');
    if (!table) {
        throw new Error("Không tìm thấy bảng ma trận trong file Word.");
    }

    const newMatrix: MatrixTopic[] = [];
    let currentTopic: MatrixTopic | null = null;
    let topicRowSpanRemaining = 0;
    
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    
    let dataRowStartIndex = 0;
    for (let i = 0; i < rows.length; i++) {
        const firstCellText = rows[i].querySelector('td, th')?.textContent?.trim();
        if (firstCellText && /^\d+$/.test(firstCellText)) {
            dataRowStartIndex = i;
            break;
        }
    }
    
    const dataRows = rows.slice(dataRowStartIndex);

    dataRows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        if (cells.length < 5) return; // Not a data row
        
        const firstCellText = cells[0]?.textContent?.trim() || '';
        if (firstCellText.toLowerCase().includes('tổng')) {
            return;
        }

        let currentCellIndex = 0;
        let unitName: string = '';
        const questionCounts: MatrixContentUnit['questionCounts'] = {};

        if (topicRowSpanRemaining <= 0) {
            const topicIndexCell = cells[currentCellIndex++];
            const topicNameCell = cells[currentCellIndex++];
            const topicName = topicNameCell?.textContent?.trim();

            if (!topicName) return; 

            currentTopic = {
                id: `topic-${Date.now()}-${Math.random()}`,
                name: topicName,
                contentUnits: [],
            };
            newMatrix.push(currentTopic);
            topicRowSpanRemaining = parseInt(topicIndexCell?.getAttribute('rowspan') || '1', 10);
        }
        
        unitName = cells[currentCellIndex++]?.textContent?.trim() || '';
        
        if (!unitName) return;

        QUESTION_TYPES.forEach(qType => {
            COGNITIVE_LEVELS.forEach(level => {
                const count = parseInt(cells[currentCellIndex++]?.textContent?.trim() || '0', 10);
                if (count > 0) {
                    if (!questionCounts[qType.key]) {
                        questionCounts[qType.key] = {};
                    }
                    (questionCounts[qType.key] as any)[level.key] = count;
                }
            });
        });
        
        if (currentTopic) {
            const newUnit: MatrixContentUnit = {
                id: `unit-${Date.now()}-${Math.random()}`,
                name: unitName,
                questionCounts: questionCounts,
            };
            currentTopic.contentUnits.push(newUnit);
        }
        
        topicRowSpanRemaining--;
    });

    if (newMatrix.length === 0 && html.includes('<table')) {
        // Don't throw if a table exists but parsing failed, could be a different format.
        // The calling function will check for empty matrix and handle it.
    }

    return newMatrix;
  };


  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center no-print"
      >
        <i className="fas fa-file-upload mr-2"></i> Tải Ma Trận
      </button>
    </>
  );
};

export default WordImportButton;