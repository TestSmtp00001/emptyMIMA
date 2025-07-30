import React, { useState } from 'react';
import { ArrowLeft, Mic, MicOff, Square, Pause, Play } from 'lucide-react';

interface RecordingPageProps {
  onBack: () => void;
}

const RecordingPage: React.FC<RecordingPageProps> = ({ onBack }) => {
  const [hasAgreed, setHasAgreed] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleAgreement = (agreed: boolean) => {
    setHasAgreed(agreed);
    if (agreed) {
      // Start recording logic would go here
      setIsRecording(true);
      setIsPaused(false);
      // Start timer (in a real app, you'd use setInterval)
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    onBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-1 flex items-center">
        <button
          onClick={onBack}
          className="flex items-center px-3 py-2 rounded-full hover:bg-gray-100 transition-colors mr-3 gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
          <h1 className="text-xs font-semibold text-gray-900">Back</h1>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-md mx-auto space-y-16">
          {/* Welcome Message */}
          <div className="text-center bg-blue-50 rounded-lg p-4">
            <p className="text-xs text-gray-600">
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
            <div className="bg-withe border border-gray-200 rounded-lg p-4 text-center">
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Recording Not Permitted
              </h3>
              <p className="text-sm text-gray-900">
                Please ensure all participants agree to recording before proceeding.
              </p>
              <button
                onClick={() => setHasAgreed(null)}
                className="mt-3 px-4 py-2 bg-white border border-[#605BFF] text-[#605BFF] rounded-lg text-sm font-medium"
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
                  isRecording && !isPaused ? 'bg-red-100 text-red-700' : 
                  isPaused ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isRecording && !isPaused ? 'bg-red-500 animate-pulse' : 
                    isPaused ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-sm font-medium">
                    {isRecording && !isPaused ? 'Recording' : 
                     isPaused ? 'Paused' : 'Ready to Record'}
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

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handlePause}
                  className={`w-32 px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
                    isPaused
                      ? 'bg-[#605BFF] hover:bg-[#4B46CC] text-white'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  }`}
                >
                  {isPaused ? (
                    <Play className="w-5 h-5" />
                  ) : (
                    <Pause className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {isPaused ? 'Resume' : 'Pause'}
                  </span>
                </button>
                
                <button
                  onClick={handleStop}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center space-x-2 transition-all duration-200"
                >
                  <Square className="w-5 h-5" />
                  <span className="font-medium">Stop</span>
                </button>
              </div>


            </div>
          )}

          {/* Trial Information */}
          <div className="border border-[#605BFF] rounded-lg p-4">
            <p className="text-xs text-[#605BFF] mb-2">
              Your Free Trial subscription provides 5 hours of recording time. Upgrade to a paid subscription to unlock unlimited recordings and features.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-[#605BFF]">
                <span className="font-medium">4h 23m</span> remaining
              </div>
              <button className="px-3 py-1 bg-[#605BFF] text-white rounded text-xs font-medium hover:bg-yellow-300 transition-colors">
                Upgrade
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#605BFF] h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingPage;