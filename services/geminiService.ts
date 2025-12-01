import { GoogleGenAI, Type } from '@google/genai';
import { MatrixTopic, TestPaper, Question, QuestionType, SpecificationTopic, CognitiveLevel } from '../types';
import { QUESTION_TYPES, COGNITIVE_LEVELS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const formatMatrixForPrompt = (matrix: MatrixTopic[]): string => {
  let table = '| Chủ đề | Nội dung/đön vị kiến thức | Loại câu hỏi | Biết (B) | Hiểu (H) | Vận dụng (VD) |\n';
  table += '|---|---|---|---|---|---|\n';

  matrix.forEach(topic => {
    topic.contentUnits.forEach((unit, unitIndex) => {
      let firstRowForUnit = true;
      QUESTION_TYPES.forEach((qType) => {
        const counts = unit.questionCounts[qType.key] || {};
        const bCount = counts['B'] || 0;
        const hCount = counts['H'] || 0;
        const vdCount = counts['VD'] || 0;

        if (bCount > 0 || hCount > 0 || vdCount > 0) {
           const rowTopic = unitIndex === 0 && firstRowForUnit ? topic.name : '';
           const rowUnit = firstRowForUnit ? unit.name : '';
           table += `| ${rowTopic} | ${rowUnit} | ${qType.name} | ${bCount} | ${hCount} | ${vdCount} |\n`;
           firstRowForUnit = false;
        }
      });
       if (firstRowForUnit) { // Handle case where a unit has no questions but should still be mentioned for context
           const rowTopic = unitIndex === 0 ? topic.name : '';
           table += `| ${rowTopic} | ${unit.name} | (Không có) | 0 | 0 | 0 |\n`;
       }
    });
  });

  return table;
};

const generateSpecificationPrompt = (matrix: MatrixTopic[], subjectName: string): string => {
  const matrixString = formatMatrixForPrompt(matrix);
  return `Là một chuyên gia giáo dục môn ${subjectName} của Việt Nam, hãy tạo ra một bản đặc tả chi tiết dựa vào ma trận đề thi dưới đây.

**Ma trận đề thi:**
${matrixString}

**Yêu cầu BẮT BUỘC:**
1.  **Tạo "Yêu cầu cần đạt":** Với mỗi "Nội dung/đơn vị kiến thức", hãy viết một "Yêu cầu cần đạt" ngắn gọn, rõ ràng cho **TẤT CẢ** các mức độ nhận thức (Biết, Hiểu, Vận dụng), bất kể có câu hỏi nào được phân bổ cho mức độ đó trong ma trận hay không.
2.  **Nội dung chính xác:** Yêu cầu cần đạt phải bám sát chương trình giáo dục phổ thông 2018 của Việt Nam cho môn ${subjectName}.
3.  **ĐỊNH DẠNG JSON:** Cung cấp kết quả dưới dạng một đối tượng JSON duy nhất, không có định dạng markdown (ví dụ: \`\`\`json ... \`\`\`json). Đối tượng JSON phải tuân thủ nghiêm ngặt schema đã được cung cấp.
4.  **Cấu trúc JSON:** Giữ nguyên tên và cấu trúc của các chủ đề và đơn vị kiến thức như trong ma trận.
`;
};


export const generateSpecification = async (matrix: MatrixTopic[], subjectName: string): Promise<SpecificationTopic[]> => {
    const prompt = generateSpecificationPrompt(matrix, subjectName);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING }, // Topic name
                        contentUnits: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING }, // Unit name
                                    objectives: {
                                        type: Type.OBJECT,
                                        properties: {
                                            B: { type: Type.STRING, description: "Yêu cầu cần đạt cho mức độ Biết" },
                                            H: { type: Type.STRING, description: "Yêu cầu cần đạt cho mức độ Hiểu" },
                                            VD: { type: Type.STRING, description: "Yêu cầu cần đạt cho mức độ Vận dụng" },
                                        }
                                    }
                                },
                                required: ['name', 'objectives']
                            }
                        }
                    },
                    required: ['name', 'contentUnits']
                }
            }
        }
    });
    
    const jsonText = response.text.trim();
    try {
        const generatedSpec: { name: string, contentUnits: { name: string, objectives: any }[] }[] = JSON.parse(jsonText);
        
        // Map generated data back to original matrix structure to preserve IDs
        return matrix.map(originalTopic => {
            const genTopic = generatedSpec.find(t => t.name === originalTopic.name);
            return {
                id: originalTopic.id,
                name: originalTopic.name,
                contentUnits: originalTopic.contentUnits.map(originalUnit => {
                    const genUnit = genTopic?.contentUnits.find(u => u.name === originalUnit.name);
                    return {
                        id: originalUnit.id,
                        name: originalUnit.name,
                        objectives: genUnit?.objectives || {}
                    };
                })
            };
        });
    } catch (e) {
        console.error("Failed to parse JSON response for specification from Gemini:", e);
        console.error("Received text:", jsonText);
        throw new Error("Không thể phân tích dữ liệu đặc tả từ AI. Vui lòng thử lại.");
    }
};

const generateTestPaperPrompt = (specification: SpecificationTopic[], matrix: MatrixTopic[], subjectName: string): string => {
    const matrixString = formatMatrixForPrompt(matrix);
    // Stringify the detailed specification to include in the prompt
    const specString = JSON.stringify(specification, null, 2);

    return `Dựa vào **Bản đặc tả chi tiết (JSON)** và **Ma trận đề thi** dưới đây, hãy tạo ra một bộ đề thi hoàn chỉnh cho môn ${subjectName} bao gồm câu hỏi và đáp án.

**Bản đặc tả chi tiết (JSON):**
\`\`\`json
${specString}
\`\`\`

**Ma trận đề thi (để tham khảo số lượng và loại câu hỏi):**
${matrixString}

**Yêu cầu BẮT BUỘC:**
1.  **TUÂN THỦ TUYỆT ĐỐI MA TRẬN:** Số lượng câu hỏi, loại câu hỏi, và mức độ nhận thức cho mỗi đơn vị kiến thức PHẢI khớp chính xác với ma trận.
2.  **BÁM SÁT ĐẶC TẢ:** Nội dung của mỗi câu hỏi phải nhắm đúng vào "Yêu cầu cần đạt" đã được mô tả.
3.  **ĐỊNH DẠNG JSON:** Cung cấp kết quả dưới dạng một đối tượng JSON duy nhất, không có định dạng markdown (ví dụ: \`\`\`json ... \`\`\`). Đối tượng JSON phải tuân thủ nghiêm ngặt schema đã được cung cấp.

**QUY TẮC CỤ THỂ CHO TỪNG LOẠI CÂU HỎI:**
-   **Loại 'mcq' (Trắc nghiệm nhiều lựa chọn):**
    -   Phải có 4 lựa chọn (A, B, C, D).
    -   Chỉ có MỘT đáp án đúng.
    -   Không cần trường 'options' cho các loại câu hỏi khác.

-   **Loại 'trueFalse' (Đúng - Sai):**
    -   Mở đầu PHẢI là một đoạn văn hoặc một tình huống/bối cảnh chi tiết, cụ thể. Đoạn văn này phải cung cấp đủ thông tin để người đọc có thể dựa vào đó để đánh giá các phát biểu bên dưới. **PHẢI CÓ TRÍCH DẪN NGUỒN** (ví dụ: "Theo sách KHTN 7,...", "Dựa vào thông tin sau:", v.v.).
    -   Sau đoạn văn là 4 phát biểu (đánh dấu a, b, c, d).
    -   **MỖI PHÁT BIỂU a, b, c, d PHẢI NẰM TRÊN MỘT DÒNG RIÊNG BIỆT, sử dụng ký tự xuống dòng '\\n'.**
    -   Ví dụ cho trường "question": "Dựa vào thông tin sau đây về quá trình quang hợp: Ánh sáng mặt trời cung cấp năng lượng cho diệp lục ở lá cây để tổng hợp chất hữu cơ từ nước và khí carbon dioxide, đồng thời thải ra khí oxygen. (Nguồn: SGK Sinh học 7). Hãy xác định các phát biểu sau là Đúng hay Sai.\\na. Oxygen là nguyên liệu của quá trình quang hợp.\\nb. Quá trình này chỉ xảy ra vào ban đêm.\\nc. Diệp lục đóng vai trò hấp thụ năng lượng ánh sáng.\\nd. Sản phẩm của quang hợp là chất vô cơ."

-   **Loại 'shortAnswer' (Trả lời ngắn/Điền khuyết):**
    -   Câu hỏi phải là dạng điền vào chỗ trống.
    -   Phải chứa **CHÍNH XÁC HAI** chỗ trống, được đánh số rõ ràng là \`...(1)...\` và \`...(2)...\`.

-   **Loại 'essay' (Tự luận):**
    -   Câu hỏi phải có 2 ý hoặc 2 phần nhỏ (ví dụ: a, b).
    -   **MỖI Ý a, b PHẢI NẰM TRÊN MỘT DÒNG RIÊNG BIỆT, sử dụng ký tự xuống dòng '\\n'.**
    -   Ví dụ cho trường "question": "a. Trình bày về quá trình quang hợp.\\nb. Nêu vai trò của diệp lục trong quá trình đó."

**QUY TẮC CỤ THỂ CHO ĐÁP ÁN ('correctAnswer'):**
-   **Với câu hỏi 'mcq':** Đáp án là một trong các chữ cái 'A', 'B', 'C', 'D'.
-   **Với câu hỏi 'trueFalse':** Liệt kê đáp án cho từng ý, ví dụ: "a. Đúng\\nb. Sai\\nc. Đúng\\nd. Sai".
-   **Với câu hỏi 'shortAnswer':** Cung cấp đáp án cho hai chỗ trống, ví dụ: "(1) đáp án một; (2) đáp án hai".
-   **Với câu hỏi 'essay':** Cung cấp đáp án/gợi ý chi tiết cho từng phần.
`;
};

export const generateTestPaper = async (specification: SpecificationTopic[], matrix: MatrixTopic[], subjectName: string): Promise<TestPaper> => {
    const prompt = generateTestPaperPrompt(specification, matrix, subjectName);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    questions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.NUMBER },
                                question: { type: Type.STRING },
                                type: { type: Type.STRING, enum: Object.values(QuestionType) },
                                options: {
                                    type: Type.OBJECT,
                                    properties: {
                                        A: { type: Type.STRING }, B: { type: Type.STRING },
                                        C: { type: Type.STRING }, D: { type: Type.STRING },
                                    },
                                },
                                cognitiveLevel: { type: Type.STRING },
                                topic: { type: Type.STRING },
                                knowledgeUnit: { type: Type.STRING },
                            },
                            required: ['id', 'question', 'type', 'cognitiveLevel', 'topic', 'knowledgeUnit'],
                        },
                    },
                    answers: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                questionId: { type: Type.NUMBER },
                                correctAnswer: { type: Type.STRING },
                            },
                            required: ['questionId', 'correctAnswer'],
                        },
                    },
                },
                required: ['questions', 'answers'],
            },
        },
    });

    const jsonText = response.text.trim();
    try {
        const testPaper: TestPaper = JSON.parse(jsonText);
        // Ensure correctAnswer is uppercase for MCQs for consistency
        testPaper.answers.forEach(ans => {
            const question = testPaper.questions.find(q => q.id === ans.questionId);
            if (question && question.type === QuestionType.MCQ) {
                ans.correctAnswer = ans.correctAnswer.toUpperCase();
            }
        });
        return testPaper;
    } catch (e) {
        console.error("Failed to parse JSON response from Gemini:", e);
        console.error("Received text:", jsonText);
        throw new Error("Không thể phân tích dữ liệu đề thi từ AI. Vui lòng thử lại.");
    }
};

const formatOriginalTestForPrompt = (questions: Question[]): string => {
    let contextString = "";
    const questionTypes = [
        { type: QuestionType.MCQ, title: "Trắc nghiệm nhiều lựa chọn" },
        { type: QuestionType.TRUE_FALSE, title: "Trắc nghiệm đúng - sai" },
        { type: QuestionType.SHORT_ANSWER, title: "Trắc nghiệm trả lời ngắn" },
        { type: QuestionType.ESSAY, title: "Tự luận" },
    ];

    let hasQuestions = false;

    questionTypes.forEach(qTypeInfo => {
        const filteredQuestions = questions.filter(q => q.type === qTypeInfo.type);
        if (filteredQuestions.length > 0) {
            if (!hasQuestions) {
                contextString += "**Các câu hỏi trong đề thi gốc (để tham khảo nội dung và loại câu hỏi):**\n\n";
                hasQuestions = true;
            }
            contextString += `**Phần ${qTypeInfo.title}:**\n`;
            filteredQuestions.forEach(q => {
                // Show first line only to save space, but enough to give context
                contextString += `- **Câu ${q.id} (${q.cognitiveLevel} - ${q.knowledgeUnit}):** ${q.question.split('\n')[0]}...\n`;
            });
            contextString += "\n";
        }
    });

    return contextString;
};

const generateReviewContentPrompt = (specification: SpecificationTopic[], subjectName: string, testPaper: TestPaper | null): string => {
    const specString = JSON.stringify(specification, null, 2);
    const originalTestContextString = testPaper ? formatOriginalTestForPrompt(testPaper.questions) : "";

    return `Là một chuyên gia giáo dục môn ${subjectName} của Việt Nam, hãy tạo ra một bộ **NỘI DUNG ÔN TẬP** toàn diện dựa trên **Bản đặc tả chi tiết** và **Các câu hỏi trong đề thi gốc** dưới đây.

**Bản đặc tả chi tiết (JSON):**
\`\`\`json
${specString}
\`\`\`

${originalTestContextString}

**YÊU CẦU BẮT BUỘC TUYỆT ĐỐI:**
1.  **BAO QUÁT TOÀN DIỆN:** Nội dung ôn tập phải bao quát **TOÀN BỘ** các "Yêu cầu cần đạt" trong bản đặc tả VÀ **CẢ NỘI DUNG** của các câu hỏi đã cho.
2.  **ĐA DẠNG HÓA LOẠI CÂU HỎI:** Tạo ra một bộ câu hỏi ôn tập bao gồm câu hỏi **Tự luận ('essay')**, **Trắc nghiệm nhiều lựa chọn ('mcq')**, và **Trắc nghiệm Đúng - Sai ('trueFalse')**.
3.  **QUY TẮC TẠO CÂU HỎI:**
    -   **Tự luận ('essay'):** Với mỗi "Nội dung/đơn vị kiến thức", tạo ra **CHÍNH XÁC MỘT** câu hỏi tự luận tổng hợp, sâu sắc. Mỗi câu tự luận phải có 2 ý (a, b), mỗi ý trên một dòng riêng biệt (dùng '\\n').
    -   **Trắc nghiệm nhiều lựa chọn ('mcq'):** Với mỗi "Nội dung/đơn vị kiến thức" mà **CÓ CÂU HỎI TRẮC NGHIỆM trong đề thi gốc**, hãy tạo thêm **CHÍNH XÁC MỘT** câu hỏi trắc nghiệm **MỚI** để ôn tập củng cố. Câu hỏi mới này phải khác câu hỏi gốc nhưng vẫn kiểm tra cùng một yêu cầu cần đạt. Mỗi câu trắc nghiệm phải có 4 lựa chọn (A, B, C, D) và 1 đáp án đúng.
    -   **Trắc nghiệm Đúng - Sai ('trueFalse'):** Với mỗi "Nội dung/đơn vị kiến thức" mà **CÓ CÂU HỎI ĐÚNG-SAI trong đề thi gốc**, hãy tạo thêm **CHÍNH XÁC MỘT** câu hỏi Đúng-Sai **MỚI**. Câu hỏi mới phải có một đoạn văn giới thiệu và 4 phát biểu (a, b, c, d), mỗi phát biểu trên một dòng riêng biệt ('\\n').
4.  **ĐỊNH DẠNG JSON:** Cung cấp kết quả dưới dạng một đối tượng JSON duy nhất, không có định dạng markdown. Đối tượng JSON phải tuân thủ nghiêm ngặt schema đã được cung cấp.
5.  **THÔNG TIN JSON:** Đối với mỗi câu hỏi, hãy điền đầy đủ các trường \`cognitiveLevel\`, \`topic\`, và \`knowledgeUnit\` dựa trên bản đặc tả. Với \`cognitiveLevel\` của câu hỏi tự luận, hãy ghi là "Tổng hợp".
6.  **QUY TẮC ĐÁP ÁN:**
    -   **'mcq':** Đáp án là một chữ cái 'A', 'B', 'C', hoặc 'D'.
    -   **'trueFalse':** Liệt kê đáp án cho từng ý, ví dụ: "a. Đúng\\nb. Sai\\nc. Đúng\\nd. Sai".
    -   **'essay':** Cung cấp đáp án/gợi ý chi tiết, rõ ràng cho từng phần.
`;
};

export const generateReviewContent = async (specification: SpecificationTopic[], matrix: MatrixTopic[], subjectName: string, testPaper: TestPaper | null): Promise<TestPaper> => {
    // The matrix is not needed for this prompt, but we keep it in the function signature for compatibility with App.tsx
    const prompt = generateReviewContentPrompt(specification, subjectName, testPaper);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    questions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.NUMBER },
                                question: { type: Type.STRING },
                                type: { type: Type.STRING, enum: Object.values(QuestionType) },
                                options: {
                                    type: Type.OBJECT,
                                    properties: {
                                        A: { type: Type.STRING }, B: { type: Type.STRING },
                                        C: { type: Type.STRING }, D: { type: Type.STRING },
                                    },
                                },
                                cognitiveLevel: { type: Type.STRING },
                                topic: { type: Type.STRING },
                                knowledgeUnit: { type: Type.STRING },
                            },
                            required: ['id', 'question', 'type', 'cognitiveLevel', 'topic', 'knowledgeUnit'],
                        },
                    },
                    answers: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                questionId: { type: Type.NUMBER },
                                correctAnswer: { type: Type.STRING },
                            },
                            required: ['questionId', 'correctAnswer'],
                        },
                    },
                },
                required: ['questions', 'answers'],
            },
        },
    });

    const jsonText = response.text.trim();
    try {
        const testPaper: TestPaper = JSON.parse(jsonText);
        testPaper.answers.forEach(ans => {
            const question = testPaper.questions.find(q => q.id === ans.questionId);
            if (question && question.type === QuestionType.MCQ) {
                ans.correctAnswer = ans.correctAnswer.toUpperCase();
            }
        });
        return testPaper;
    } catch (e) {
        console.error("Failed to parse JSON response from Gemini for review content:", e);
        console.error("Received text:", jsonText);
        throw new Error("Không thể phân tích dữ liệu ôn tập từ AI. Vui lòng thử lại.");
    }
};