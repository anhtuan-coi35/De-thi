import React, { useState } from 'react';
import UserGuideModal from './UserGuideModal'; // Import the new component

const Header: React.FC = () => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-indigo-600 p-2 rounded-lg mr-3 shadow-sm">
                <i className="fas fa-graduation-cap text-2xl text-white"></i>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Trình Tạo Đề Thi
            </h1>
          </div>
          <button
            onClick={() => setIsGuideOpen(true)}
            className="bg-white text-indigo-600 border border-indigo-200 font-bold py-2 px-4 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center shadow-sm"
            aria-label="Mở hướng dẫn sử dụng"
          >
            <i className="fas fa-question-circle mr-2 text-lg"></i>
            <span>Hướng dẫn</span>
          </button>
        </div>
      </header>
      <UserGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </>
  );
};

export default Header;