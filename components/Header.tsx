import React, { useState } from 'react';
import UserGuideModal from './UserGuideModal'; // Import the new component

const Header: React.FC = () => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-graduation-cap text-3xl text-blue-600 mr-3"></i>
            <h1 className="text-2xl font-bold text-gray-800">
              Trình Tạo Đề Thi Thông Minh
            </h1>
          </div>
          <button
            onClick={() => setIsGuideOpen(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            aria-label="Mở hướng dẫn sử dụng"
          >
            <i className="fas fa-question-circle mr-2"></i>
            <span>Hướng dẫn</span>
          </button>
        </div>
      </header>
      <UserGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </>
  );
};

export default Header;