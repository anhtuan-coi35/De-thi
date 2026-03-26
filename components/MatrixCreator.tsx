import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MatrixTopic, MatrixContentUnit, QuestionType, CognitiveLevel, TextbookSeries, Subject } from '../types';
import { COGNITIVE_LEVELS, QUESTION_TYPES, TEXTBOOK_SERIES, SUBJECTS } from '../constants';
import { CURRICULUM_DATA } from '../data/curriculum';
import WordImportButton from './WordImportButton';

interface MatrixCreatorProps {
  matrix: MatrixTopic[];
  setMatrix: React.Dispatch<React.SetStateAction<MatrixTopic[]>>;
  onSubmit: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  selectedSubject: Subject;
  setSelectedSubject: React.Dispatch<React.SetStateAction<Subject>>;
  selectedGrade: '6' | '7' | '8' | '9';
  setSelectedGrade: React.Dispatch<React.SetStateAction<'6' | '7' | '8' | '9'>>;
  selectedSeries: TextbookSeries;
  setSelectedSeries: React.Dispatch<React.SetStateAction<TextbookSeries>>;
}

const TARGET_PERCENTAGES: { [key in CognitiveLevel]: number } = {
  B: 40,
  H: 30,
  VD: 30,
};

const GRADE_DEFAULT_SERIES: { [key in '6' | '7' | '8' | '9']: TextbookSeries } = {
  '6': 'chan_troi_sang_tao',
  '7': 'chan_troi_sang_tao',
  '8': 'ket_noi_tri_thuc',
  '9': 'chan_troi_sang_tao',
};

const MatrixCreator: React.FC<MatrixCreatorProps> = ({ matrix, setMatrix, onSubmit, isLoading, setIsLoading, setError, selectedSubject, setSelectedSubject, selectedGrade, setSelectedGrade, selectedSeries, setSelectedSeries }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const clearMatrixWithConfirmation = (action: () => void) => {
      if (matrix.length > 0 && !window.confirm('Thay đổi lựa chọn sẽ xoá ma trận hiện tại. Bạn có chắc chắn không?')) {
        return;
      }
      action();
      setMatrix([]);
      setOpenDropdown(null);
  }

  const handleSubjectChange = (subject: Subject) => {
    if (subject !== selectedSubject) {
      clearMatrixWithConfirmation(() => {
        setSelectedSubject(subject);
        // Reset the series to a valid one for the new subject/grade combo.
        const firstValidSeries = TEXTBOOK_SERIES.find(s => CURRICULUM_DATA[subject]?.[s.key]?.[selectedGrade]);
        if (firstValidSeries) {
            setSelectedSeries(firstValidSeries.key);
        }
      });
    }
  };
  
  const handleGradeChange = (grade: '6' | '7' | '8' | '9') => {
    if (grade !== selectedGrade) {
      clearMatrixWithConfirmation(() => {
          setSelectedGrade(grade);
          // When grade changes, ensure the selected series is still valid. If not, pick a default.
          const currentSeriesIsValid = CURRICULUM_DATA[selectedSubject]?.[selectedSeries]?.[grade];
          if (!currentSeriesIsValid) {
              const defaultSeriesForGrade = GRADE_DEFAULT_SERIES[grade];
              const isDefaultSeriesValidForSubject = CURRICULUM_DATA[selectedSubject]?.[defaultSeriesForGrade]?.[grade];
              if(isDefaultSeriesValidForSubject){
                setSelectedSeries(defaultSeriesForGrade);
              } else {
                 const firstValidSeries = TEXTBOOK_SERIES.find(s => CURRICULUM_DATA[selectedSubject]?.[s.key]?.[grade]);
                 if(firstValidSeries) setSelectedSeries(firstValidSeries.key);
              }
          }
      });
    }
  };

  const handleSeriesChange = (series: TextbookSeries) => {
    if (series !== selectedSeries) {
      clearMatrixWithConfirmation(() => {
        setSelectedSeries(series);
      });
    }
  }

  const handleMatrixImport = ({ reconciledMatrix: newMatrix, subject: detectedSubject, grade: detectedGrade, series: detectedSeries, changes, unmatched }: { 
    reconciledMatrix: MatrixTopic[]; 
    subject: Subject | null;
    grade: '6' | '7' | '8' | '9' | null;
    series: TextbookSeries | null;
    changes: { original: string; reconciled: string }[];
    unmatched: { type: 'topic' | 'unit'; name: string }[];
  }) => {
    if (detectedSubject && detectedGrade && detectedSeries) {
        setSelectedSubject(detectedSubject);
        setSelectedGrade(detectedGrade);
        setSelectedSeries(detectedSeries);
        setMatrix(newMatrix);
        
        const subjectName = SUBJECTS.find(s => s.key === detectedSubject)?.name || detectedSubject;
        const seriesName = TEXTBOOK_SERIES.find(s => s.key === detectedSeries)?.name || detectedSeries;
        let message = `Đã tải lên ma trận thành công và tự động chuyển sang Môn ${subjectName} - Khối ${detectedGrade} - Bộ sách ${seriesName}.`;
        
        if (changes.length > 0) {
            message += "\n\nMột số tên đã được chuẩn hóa:\n";
            message += changes.slice(0, 3).map(c => `- "${c.original}" -> "${c.reconciled}"`).join("\n");
            if (changes.length > 3) {
                message += `\n... và ${changes.length - 3} thay đổi khác.`;
            }
        }
        
        if (unmatched.length > 0) {
            message += "\n\nCảnh báo: Không tìm thấy các nội dung sau trong chương trình học:\n";
            message += unmatched.slice(0, 3).map(u => `- ${u.name}`).join("\n");
             if (unmatched.length > 3) {
                message += `\n... và ${unmatched.length - 3} nội dung khác.`;
            }
            message += "\n\nĐiều này có thể ảnh hưởng đến việc tạo đặc tả và đề thi.";
        }

        alert(message);
    } else {
        setError("Không thể xác định môn học, khối lớp và bộ sách từ file Word. Vui lòng đảm bảo file chứa tên chủ đề hợp lệ hoặc chọn đúng các mục trước khi tải lên.");
    }
  };


  const handleAddTopic = (topic: { name: string }) => {
    const newTopic: MatrixTopic = {
      id: Date.now().toString(),
      name: topic.name,
      contentUnits: [],
    };
    setMatrix([...matrix, newTopic]);
    setOpenDropdown(null);
  };

  const handleRemoveTopic = (topicId: string) => {
    setMatrix(matrix.filter(t => t.id !== topicId));
  };

  const handleAddContentUnit = (topicId: string, lesson: { name: string }) => {
    const newMatrix = matrix.map(topic => {
      if (topic.id === topicId) {
        const newUnit: MatrixContentUnit = {
          id: Date.now().toString(),
          name: lesson.name,
          questionCounts: {},
        };
        return { ...topic, contentUnits: [...topic.contentUnits, newUnit] };
      }
      return topic;
    });
    setMatrix(newMatrix);
    setOpenDropdown(null);
  };

  const handleRemoveContentUnit = (topicId: string, unitId: string) => {
    const newMatrix = matrix.map(topic => {
      if (topic.id === topicId) {
        return { ...topic, contentUnits: topic.contentUnits.filter(u => u.id !== unitId) };
      }
      return topic;
    });
    setMatrix(newMatrix.filter(topic => topic.contentUnits.length > 0 || matrix.length > 1));
  };
  
  const handleCountChange = (topicId: string, unitId: string, qType: QuestionType, level: CognitiveLevel, value: number) => {
    const newMatrix = matrix.map(topic => {
      if (topic.id === topicId) {
        const newUnits = topic.contentUnits.map(unit => {
          if (unit.id === unitId) {
            const newCounts = { ...unit.questionCounts };
            if (!newCounts[qType]) newCounts[qType] = {};
            (newCounts[qType] as any)[level] = Math.max(0, value || 0);
            return { ...unit, questionCounts: newCounts };
          }
          return unit;
        });
        return { ...topic, contentUnits: newUnits };
      }
      return topic;
    });
    setMatrix(newMatrix);
  };
  
  const currentCurriculum = useMemo(() => {
    return CURRICULUM_DATA[selectedSubject]?.[selectedSeries]?.[selectedGrade];
  }, [selectedSubject, selectedGrade, selectedSeries]);

  const availableTopics = useMemo(() => {
    if (!currentCurriculum) return [];
    const selectedTopicNames = new Set(matrix.map(t => t.name));
    return currentCurriculum.topics.filter(t => !selectedTopicNames.has(t.name));
  }, [matrix, currentCurriculum]);
  
  const getAvailableLessons = (topic: MatrixTopic) => {
    const curriculumTopic = currentCurriculum?.topics.find(t => t.name === topic.name);
    if (!curriculumTopic) return [];
    const selectedLessonNames = new Set(topic.contentUnits.map(u => u.name));
    return curriculumTopic.lessons.filter(l => !selectedLessonNames.has(l.name));
  };

  const totals = useMemo(() => {
    const questionCountTotals: { [key in QuestionType]?: { [key in CognitiveLevel]?: number } } = {};
    const grandQuestionCountTotals = {
        byCognitiveLevel: { B: 0, H: 0, VD: 0 },
        totalQuestions: 0
    };

    const scoreTotals: { [key in QuestionType]?: { [key in CognitiveLevel]?: number } } = {};
    const grandScoreTotals = {
        byCognitiveLevel: { B: 0, H: 0, VD: 0 },
        totalScore: 0
    };

    for (const topic of matrix) {
        for (const unit of topic.contentUnits) {
            for (const qType of QUESTION_TYPES) {
                if (!questionCountTotals[qType.key]) questionCountTotals[qType.key] = { B: 0, H: 0, VD: 0 };
                if (!scoreTotals[qType.key]) scoreTotals[qType.key] = { B: 0, H: 0, VD: 0 };
                const counts = unit.questionCounts[qType.key];
                if (counts) {
                    for (const level of COGNITIVE_LEVELS) {
                        const count = counts[level.key] || 0;
                        const points = count * pointValues[qType.key];

                        (questionCountTotals[qType.key] as any)[level.key] += count;
                        grandQuestionCountTotals.byCognitiveLevel[level.key] += count;
                        grandQuestionCountTotals.totalQuestions += count;

                        (scoreTotals[qType.key] as any)[level.key] += points;
                        grandScoreTotals.byCognitiveLevel[level.key] += points;
                        grandScoreTotals.totalScore += points;
                    }
                }
            }
        }
    }
    return { questionCountTotals, grandQuestionCountTotals, scoreTotals, grandScoreTotals };
  }, [matrix, pointValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
        <i className="fas fa-edit mr-3"></i>Bước 1: Tạo Ma Trận Đề Thi
      </h2>
      
      <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Chọn môn học</h3>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(subject => (
                <button
                  key={subject.key}
                  type="button"
                  onClick={() => handleSubjectChange(subject.key)}
                  className={`px-3 py-2 rounded-md font-medium transition-all text-sm border shadow-sm ${
                    selectedSubject === subject.key
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:text-indigo-600'
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>
         </div>
         <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Chọn khối lớp</h3>
            <div className="flex flex-wrap gap-2">
              {(['6', '7', '8', '9'] as const).map(grade => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => handleGradeChange(grade)}
                  className={`px-4 py-2 rounded-md font-medium transition-all text-sm border shadow-sm ${
                    selectedGrade === grade
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:text-indigo-600'
                  }`}
                >
                  Lớp {grade}
                </button>
              ))}
            </div>
         </div>
         <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Chọn bộ sách</h3>
            <div className="flex flex-wrap gap-2">
                {TEXTBOOK_SERIES.map(series => (
                     <button
                        key={series.key}
                        type="button"
                        onClick={() => handleSeriesChange(series.key)}
                        disabled={!CURRICULUM_DATA[selectedSubject]?.[series.key]?.[selectedGrade]}
                        className={`px-3 py-2 rounded-md font-medium transition-all text-sm border shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:border-slate-200 ${
                            selectedSeries === series.key
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:text-indigo-600'
                        }`}
                        title={!CURRICULUM_DATA[selectedSubject]?.[series.key]?.[selectedGrade] ? `Bộ sách này chưa có dữ liệu cho môn học và khối lớp đã chọn` : ''}
                        >
                        {series.name}
                    </button>
                ))}
            </div>
         </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto rounded-lg border border-slate-200" id="matrix-table-container">
            <table className="min-w-full bg-white text-center text-sm" id="matrix-table">
            <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                    <th rowSpan={3} className="py-3 px-2 border-b border-r border-slate-200 align-middle">TT</th>
                    <th rowSpan={3} className="py-3 px-4 border-b border-r border-slate-200 align-middle w-48">Chương/ chủ đề</th>
                    <th rowSpan={3} className="py-3 px-4 border-b border-r border-slate-200 align-middle w-64">Nội dung/đơn vị kiến thức</th>
                    <th colSpan={12} className="py-2 px-4 border-b border-r border-slate-200 bg-slate-50">Số lượng câu hỏi</th>
                    <th colSpan={3} className="py-2 px-4 border-b border-r border-slate-200 bg-slate-100">Tổng số câu hỏi</th>
                    <th rowSpan={3} className="py-3 px-4 border-b border-slate-200 align-middle w-24">Tỉ lệ % điểm</th>
                </tr>
                <tr>
                    {QUESTION_TYPES.map(qType => (
                        <th key={qType.key} colSpan={3} className="py-1 px-2 border-b border-r border-slate-200 font-semibold text-xs uppercase text-slate-500 bg-white">{qType.name}</th>
                    ))}
                    {COGNITIVE_LEVELS.map(level => (
                       <th key={level.key} rowSpan={2} className="py-2 px-2 border-b border-r border-slate-200 align-middle bg-slate-100">{level.name}</th>
                    ))}
                </tr>
                <tr>
                    {QUESTION_TYPES.map(qType => (
                        <React.Fragment key={qType.key}>
                            {COGNITIVE_LEVELS.map(level => (
                                <th key={level.key} className="py-1 px-2 border-b border-r border-slate-200 font-medium text-xs text-slate-600">{level.key}</th>
                            ))}
                        </React.Fragment>
                    ))}
                </tr>
            </thead>
            <tbody className="text-slate-700">
                {matrix.map((topic, topicIndex) => (
                    <React.Fragment key={topic.id}>
                        {topic.contentUnits.map((unit, unitIndex) => {
                            const unitTotals = {
                                questions: { B: 0, H: 0, VD: 0 },
                                score: 0
                            };
                             QUESTION_TYPES.forEach(qType => {
                                COGNITIVE_LEVELS.forEach(level => {
                                    const count = unit.questionCounts[qType.key]?.[level.key] || 0;
                                    unitTotals.questions[level.key] += count;
                                    unitTotals.score += count * pointValues[qType.key];
                                });
                            });

                            return (
                                <tr key={unit.id} className="hover:bg-slate-50 transition-colors">
                                    {unitIndex === 0 && (
                                        <>
                                            <td rowSpan={topic.contentUnits.length || 1} className="py-2 px-2 border-b border-r border-slate-200 align-middle bg-white">{topicIndex + 1}</td>
                                            <td rowSpan={topic.contentUnits.length || 1} className="py-2 px-2 border-b border-r border-slate-200 align-middle text-left font-semibold bg-white text-indigo-900">
                                                {topic.name}
                                            </td>
                                        </>
                                    )}
                                    <td className="py-2 px-2 border-b border-r border-slate-200 align-middle text-left group">
                                        <div className="flex items-center justify-between">
                                          <span>{unit.name}</span>
                                          <button type="button" onClick={() => handleRemoveContentUnit(topic.id, unit.id)} className="text-slate-300 hover:text-red-500 transition-colors ml-2 p-1 flex-shrink-0 opacity-0 group-hover:opacity-100">
                                            <i className="fas fa-trash-alt"></i>
                                          </button>
                                        </div>
                                    </td>
                                    {QUESTION_TYPES.map(qType => (
                                        <React.Fragment key={qType.key}>
                                            {COGNITIVE_LEVELS.map(level => (
                                                <td key={level.key} className="py-2 px-2 border-b border-r border-slate-200 p-0">
                                                    <input type="number" min="0" value={unit.questionCounts[qType.key]?.[level.key] || ''} onChange={e => handleCountChange(topic.id, unit.id, qType.key, level.key, parseInt(e.target.value, 10))} className="w-full h-full p-2 text-center focus:outline-none focus:bg-indigo-50 text-indigo-700 font-medium" placeholder="-" />
                                                </td>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                    <td className="py-2 px-2 border-b border-r border-slate-200 font-semibold bg-slate-50 text-slate-600">{unitTotals.questions.B}</td>
                                    <td className="py-2 px-2 border-b border-r border-slate-200 font-semibold bg-slate-50 text-slate-600">{unitTotals.questions.H}</td>
                                    <td className="py-2 px-2 border-b border-r border-slate-200 font-semibold bg-slate-50 text-slate-600">{unitTotals.questions.VD}</td>
                                    <td className="py-2 px-2 border-b border-slate-200 font-bold bg-slate-100 text-indigo-700">
                                       {totals.grandScoreTotals.totalScore > 0 ? ((unitTotals.score / totals.grandScoreTotals.totalScore) * 100).toFixed(1) : 0}%
                                    </td>
                                </tr>
                            )
                        })}
                         <tr className="no-export bg-slate-50">
                            <td colSpan={19} className="py-3 px-4 border-b border-slate-200 text-left">
                                <div ref={openDropdown === topic.id ? dropdownRef : null} className="relative inline-block text-left">
                                    <button type="button" onClick={() => setOpenDropdown(openDropdown === topic.id ? null : topic.id)} className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center bg-white px-3 py-1 rounded border border-indigo-200 shadow-sm hover:shadow">
                                        <i className="fas fa-plus-circle mr-2"></i> Thêm nội dung
                                    </button>
                                    {openDropdown === topic.id && (
                                        <div className="origin-top-left absolute left-0 mt-2 w-96 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-20 max-h-60 overflow-y-auto">
                                            <div className="py-1" role="menu" aria-orientation="vertical">
                                                {getAvailableLessons(topic).length > 0 ? getAvailableLessons(topic).map(lesson => (
                                                    <a href="#" key={lesson.name} onClick={(e) => { e.preventDefault(); handleAddContentUnit(topic.id, lesson); }} className="block px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border-b border-slate-100 last:border-0" role="menuitem">{lesson.name}</a>
                                                )) : <span className="block px-4 py-3 text-sm text-slate-400 italic">Không còn bài học để thêm</span>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button type="button" onClick={() => handleRemoveTopic(topic.id)} className="text-red-500 hover:text-red-700 text-sm ml-6 font-medium">
                                    <i className="fas fa-trash mr-1"></i> Xóa chủ đề
                                </button>
                            </td>
                         </tr>
                    </React.Fragment>
                ))}
                 <tr className="bg-slate-100 font-bold text-slate-800 border-t-2 border-slate-300">
                    <td colSpan={3} className="py-3 px-4 border-b border-r border-slate-300 text-right">Tổng số câu</td>
                    {QUESTION_TYPES.map(qType => (
                         <React.Fragment key={qType.key}>
                            {COGNITIVE_LEVELS.map(level => (
                                <td key={level.key} className="py-3 px-2 border-b border-r border-slate-300 bg-white">{totals.questionCountTotals[qType.key]?.[level.key] || 0}</td>
                            ))}
                        </React.Fragment>
                    ))}
                    <td className="py-3 px-2 border-b border-r border-slate-300 bg-slate-200">{totals.grandQuestionCountTotals.byCognitiveLevel.B}</td>
                    <td className="py-3 px-2 border-b border-r border-slate-300 bg-slate-200">{totals.grandQuestionCountTotals.byCognitiveLevel.H}</td>
                    <td className="py-3 px-2 border-b border-r border-slate-300 bg-slate-200">{totals.grandQuestionCountTotals.byCognitiveLevel.VD}</td>
                    <td className="py-3 px-2 border-b border-slate-300 bg-indigo-100 text-indigo-800">{totals.grandQuestionCountTotals.totalQuestions}</td>
                 </tr>
                  <tr className="bg-slate-100 font-bold text-slate-800">
                    <td colSpan={3} className="py-3 px-4 border-b border-r border-slate-300 text-right">Tổng số điểm</td>
                    {QUESTION_TYPES.map(qType => {
                        let typeTotalScore = 0;
                        COGNITIVE_LEVELS.forEach(level => typeTotalScore += totals.scoreTotals[qType.key]?.[level.key] || 0);
                        return <td key={qType.key} colSpan={3} className="py-3 px-2 border-b border-r border-slate-300 text-center bg-white">{typeTotalScore.toFixed(2)}</td>
                    })}
                     <td className="py-3 px-2 border-b border-r border-slate-300 bg-slate-200">{totals.grandScoreTotals.byCognitiveLevel.B.toFixed(2)}</td>
                    <td className="py-3 px-2 border-b border-r border-slate-300 bg-slate-200">{totals.grandScoreTotals.byCognitiveLevel.H.toFixed(2)}</td>
                    <td className="py-3 px-2 border-b border-r border-slate-300 bg-slate-200">{totals.grandScoreTotals.byCognitiveLevel.VD.toFixed(2)}</td>
                    <td className="py-3 px-2 border-b border-slate-300 bg-indigo-100 text-indigo-800">{totals.grandScoreTotals.totalScore.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-slate-800 text-white font-bold">
                    <td colSpan={3} className="py-3 px-4 border-r border-slate-600 text-right">Tỉ lệ %</td>
                     {QUESTION_TYPES.map(qType => {
                        let typeTotalScore = 0;
                        COGNITIVE_LEVELS.forEach(level => typeTotalScore += totals.scoreTotals[qType.key]?.[level.key] || 0);
                        const percentage = totals.grandScoreTotals.totalScore > 0 ? (typeTotalScore / totals.grandScoreTotals.totalScore) * 100 : 0;
                        return <td key={qType.key} colSpan={3} className="py-3 px-2 border-r border-slate-600 text-center">{percentage.toFixed(0)}%</td>
                    })}
                    {COGNITIVE_LEVELS.map(level => {
                        const percentage = totals.grandScoreTotals.totalScore > 0 ? (totals.grandScoreTotals.byCognitiveLevel[level.key] / totals.grandScoreTotals.totalScore) * 100 : 0;
                        const target = TARGET_PERCENTAGES[level.key];
                        const isOffTarget = totals.grandScoreTotals.totalScore > 0 && Math.round(percentage) !== target;
                        return (
                             <td key={level.key} className={`py-3 px-2 border-r border-slate-600 ${isOffTarget ? 'text-yellow-400' : ''}`}>
                                {percentage.toFixed(0)}%
                             </td>
                        )
                    })}
                    <td className="py-3 px-2">100%</td>
                  </tr>
            </tbody>
            </table>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div ref={openDropdown === 'add-topic' ? dropdownRef : null} className="relative inline-block text-left">
                <button type="button" onClick={() => setOpenDropdown(openDropdown === 'add-topic' ? null : 'add-topic')} className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors flex items-center shadow-md">
                    <i className="fas fa-layer-group mr-2"></i> Thêm chủ đề
                </button>
                {openDropdown === 'add-topic' && (
                    <div className="origin-top-left absolute left-0 mt-2 w-96 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-20 max-h-60 overflow-y-auto">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                            {availableTopics.length > 0 ? availableTopics.map(topic => (
                                <a href="#" key={topic.name} onClick={(e) => { e.preventDefault(); handleAddTopic(topic); }} className="block px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border-b border-slate-100 last:border-0" role="menuitem">{topic.name}</a>
                            )) : <span className="block px-4 py-3 text-sm text-slate-400 italic">Không còn chủ đề để thêm</span>}
                        </div>
                    </div>
                )}
            </div>
             <WordImportButton onMatrixImport={handleMatrixImport} setIsLoading={setIsLoading} setError={setError} />
          </div>
          
            <button
              type="submit"
              disabled={isLoading || matrix.length === 0 || totals.grandQuestionCountTotals.totalQuestions === 0 || !currentCurriculum}
              className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none flex items-center text-lg"
              title={!currentCurriculum ? 'Vui lòng chọn môn học, khối lớp và bộ sách hợp lệ' : ''}
            >
              {isLoading ? 'Đang xử lý...' : 'Tạo Đặc Tả'} <i className="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
      </form>
    </div>
  );
};

export default MatrixCreator;