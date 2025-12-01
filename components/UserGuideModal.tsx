import React from 'react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserGuideModal: React.FC<UserGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <i className="fas fa-book-open text-blue-600 mr-3"></i>
            Hướng Dẫn Sử Dụng
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
        
        <div className="text-gray-700 space-y-6">
          <p className="text-lg">
            Chào mừng Thầy/Cô đến với Trình Tạo Đề Thi KHTN! Công cụ này sẽ giúp Thầy/Cô tạo đề thi một cách nhanh chóng qua 4 bước đơn giản.
          </p>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Bước 1: Tạo Ma Trận</h3>
            <p className="mb-3">Đây là bước quan trọng nhất để định hình cấu trúc đề thi.</p>
            <ul className="list-decimal list-inside space-y-2 pl-4">
              <li><strong>Chọn Khối Lớp:</strong> Bắt đầu bằng việc chọn khối lớp (6, 7, 8, hoặc 9).</li>
              <li><strong>Thêm Chủ Đề &amp; Nội Dung:</strong>
                <ul className="list-disc list-inside pl-6 mt-1">
                  <li>Nhấn nút <span className="font-mono bg-gray-200 px-2 py-1 rounded-md text-sm">+ Thêm chủ đề</span> để chọn các chương/chủ đề.</li>
                  <li>Với mỗi chủ đề, nhấn <span className="font-mono bg-gray-200 px-2 py-1 rounded-md text-sm">+ Thêm nội dung</span> để thêm các bài học.</li>
                </ul>
              </li>
              <li><strong>Nhập Số Lượng Câu Hỏi:</strong> Điền số lượng câu hỏi vào các ô tương ứng với từng loại câu hỏi và mức độ nhận thức.</li>
              <li><strong>Tải Lên Ma Trận (Tính năng tiện lợi):</strong>
                <ul className="list-disc list-inside pl-6 mt-1">
                    <li>Thay vì nhập tay, Thầy/Cô có thể nhấn nút <span className="font-mono bg-gray-200 px-2 py-1 rounded-md text-sm">Tải Ma Trận</span> để tải lên một file Word (.docx) có sẵn cấu trúc ma trận.</li>
                    <li>Hệ thống sẽ tự động đọc file, nhận diện khối lớp và điền số liệu vào bảng.</li>
                </ul>
              </li>
              <li><strong>Hoàn Tất:</strong> Sau khi hoàn thiện ma trận, nhấn nút <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">Tạo Đặc Tả</span> để chuyển sang bước tiếp theo.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Bước 2: Xem Đặc Tả</h3>
            <ul className="list-decimal list-inside space-y-2 pl-4">
              <li>AI sẽ tạo ra các "Yêu cầu cần đạt" (mục tiêu học tập) chi tiết dựa trên ma trận.</li>
              <li>Hãy rà soát lại để đảm bảo các yêu cầu này phù hợp với mục tiêu giảng dạy.</li>
              <li>Nhấn <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">Xác nhận &amp; Tạo Đề Thi</span> để tiếp tục.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Bước 3 &amp; 4: Xem Đề Thi và Đáp Án</h3>
            <ul className="list-decimal list-inside space-y-2 pl-4">
                <li>Các màn hình này hiển thị đề thi hoàn chỉnh và đáp án chi tiết.</li>
            </ul>
          </div>

          <p className="text-center font-semibold pt-4 border-t mt-6">
            Chúc Thầy/Cô có những trải nghiệm hiệu quả với công cụ này!
          </p>
        </div>

        <div className="mt-6 text-right">
          <button 
            onClick={onClose} 
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGuideModal;