import React, { useState } from 'react';
import { ArrowLeft, Mic, MicOff, Square } from 'lucide-react';

interface RecordingPageProps {
  onBack: () => void;
}

const RecordingPage: React.FC<RecordingPageProps> = ({ onBack }) => {
  const [hasAgreed, setHasAgreed] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleAgreement = (agreed: boolean) => {
    setHasAgreed(agreed);
    if (agreed) {
      // Start recording logic would go here
      setIsRecording(true);
      // Start timer (in a real app, you'd use setInterval)
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors mr-3"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
          <h1 className="text-xs font-semibold text-gray-900">Back</h1>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Welcome Message */}
          <div className="text-center bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Get enterprise-grade client meetings summary, follow-up letter and coaching in one click!
            </p>
          </div>

          {/* Agreement Section */}
          {hasAgreed === null && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-medium text-gray-900 mb-4 text-center">
                Have the participants agreed to the recording?
              </h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleAgreement(true)}
                  className="flex-1 py-3 px-4 bg-[#605BFF] text-white rounded-lg font-medium transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAgreement(false)}
                  className="flex-1 py-3 px-4 bg-white border border-[#605BFF] text-[#605BFF] rounded-lg font-medium transition-colors"
                >
                  No
                </button>
              </div>
            </div>
          )}

          {/* Recording Denied */}
          {hasAgreed === false && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <h3 className="text-base font-medium text-red-800 mb-2">
                Recording Not Permitted
              </h3>
              <p className="text-sm text-red-600">
                Please ensure all participants agree to recording before proceeding.
              </p>
              <button
                onClick={() => setHasAgreed(null)}
                className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Recording Interface */}
          {hasAgreed === true && (
            <div className="space-y-6">
              {/* Recording Status */}
              <div className="text-center">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  isRecording ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-sm font-medium">
                    {isRecording ? 'Recording' : 'Ready to Record'}
                  </span>
                </div>
                
                {isRecording && (
                  <div className="mt-2">
                    <span className="text-2xl font-mono font-bold text-gray-900">
                      {formatTime(recordingTime)}
                    </span>
                  </div>
                )}
              </div>

              {/* Record Button */}
              <div className="flex justify-center">
                <button
                  onClick={toggleRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg'
                      : 'bg-[#605BFF] hover:bg-[#4B46CC] shadow-lg'
                  }`}
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
                </p>
              </div>
            </div>
          )}

          {/* Trial Information */}
          <div className="border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-700 mb-3">
              Your Free Trial subscription provides 5 hours of recording time. Upgrade to a paid subscription to unlock unlimited recordings and features.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-yellow-600">
                <span className="font-medium">4h 23m</span> remaining
              </div>
              <button className="px-3 py-1 bg-[#605BFF] text-yellow-800 rounded text-xs font-medium hover:bg-yellow-300 transition-colors">
                Upgrade
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingPage;