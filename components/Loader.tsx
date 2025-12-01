
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  const messages = [
      "Đang tổng hợp kiến thức...",
      "AI đang tư duy...",
      "Sắp xếp các câu hỏi...",
      "Kiểm tra lại tính logic...",
      "Vui lòng chờ trong giây lát..."
  ];
  
  const [displayMessage, setDisplayMessage] = React.useState(message);
  
  React.useEffect(() => {
      let index = 0;
      const intervalId = setInterval(() => {
          index = (index + 1) % messages.length;
          setDisplayMessage(messages[index]);
      }, 3000);
      
      return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      <p className="text-white text-xl mt-4 font-semibold">{displayMessage}</p>
    </div>
  );
};

export default Loader;
