
import React from 'react';

interface PrintButtonProps {
  contentId: string;
}

const PrintButton: React.FC<PrintButtonProps> = ({ contentId }) => {
  const handlePrint = () => {
    const printContents = document.getElementById(contentId)?.innerHTML;
    const originalContents = document.body.innerHTML;
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // To re-attach React event handlers
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center no-print"
    >
      <i className="fas fa-print mr-2"></i> In
    </button>
  );
};

export default PrintButton;
