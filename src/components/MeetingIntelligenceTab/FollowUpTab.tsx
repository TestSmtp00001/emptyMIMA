import React from 'react';
import { FileText, Upload } from 'lucide-react';

interface FollowUpTabProps {
  onUploadClick: () => void;
}

const FollowUpTab: React.FC<FollowUpTabProps> = ({ onUploadClick }) => {
  return (
    <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 h-full flex flex-col items-center justify-start overflow-hidden">
      <div className="text-center max-w-md px-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
        </div>
        
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
          No Transcript Available
        </h3>
        
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          You must first upload a transcript before you can view the follow-up letter
        </p>
        
        <button 
          onClick={onUploadClick}
          className="inline-flex items-center space-x-2 px-4 py-2 sm:py-3 bg-[#605BFF] text-white rounded-lg hover:bg-[#4B46CC] transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Transcript</span>
        </button>
      </div>
    </div>
  );
};

export default FollowUpTab;