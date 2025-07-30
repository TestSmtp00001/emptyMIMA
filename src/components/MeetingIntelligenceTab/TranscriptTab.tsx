import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, Mic } from 'lucide-react';

const TranscriptTab: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (uploadedFile) {
      // Handle upload logic here
      console.log('Uploading file:', uploadedFile.name);
    }
  };

  return (
    <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col">
        {/* Record Button */}
        <button className="w-full max-w-md mx-auto mb-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center space-x-2">
          <Mic className="w-4 h-4" />
          <span>Record</span>
        </button>
        
        {/* Or Text */}
        <div className="text-center mb-4">
          <span className="text-gray-500 text-sm">or</span>
        </div>
        
        {/* Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center ${
            dragActive
              ? 'border-[#605BFF] bg-[#605BFF]/5'
              : 'border-gray-300 hover:border-[#605BFF] hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".txt,.doc,.docx,.pdf,.mp3,.mp4,.wav,.m4a"
            onChange={handleFileSelect}
          />
          
          <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-[#605BFF] mx-auto mb-2 sm:mb-3" />
          
          <p className="text-sm sm:text-base font-medium text-gray-900 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 mb-2 px-2">
            Supported: .txt, .vtt, .doc, .docx, .pdf, .mp3, .m4a, .wav, .aac, .avi, .mov, .mp4
          </p>
          
          <p className="text-xs text-gray-600 mb-3">
            Maximum file size: 1GB
          </p>
          
          {/* Quality Message Inside Drop Area */}
          <div className="p-2 sm:p-3 bg-blue-50 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <p className="text-xs text-blue-800">
              Quality affects summary, follow-up and coaching
            </p>
          </div>
        </div>

        {/* File Info */}
        {uploadedFile && (
          <div className="mt-3 p-2 bg-gray-50 rounded-lg flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#605BFF]" />
            <span className="text-sm font-medium text-gray-900 flex-1 truncate">
              {uploadedFile.name}
            </span>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!uploadedFile}
          className={`w-full max-w-md mx-auto mt-3 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
            uploadedFile
              ? 'bg-[#605BFF] text-white hover:bg-[#4B46CC]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default TranscriptTab;