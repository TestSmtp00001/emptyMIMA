import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Brain, Menu, X, Home, MessageSquare, Info, AlertTriangle, PlusCircle, FileText, MoreVertical } from 'lucide-react';
import MeetingIntelligence from './components/MeetingIntelligence';
import Dashboard from './components/Dashboard/Dashboard';
import RecordingPage from './components/RecordingPage/RecordingPage';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'meeting-intelligence' | 'transcript' | 'recording'>('meeting-intelligence');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };

    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoreMenu]);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'meeting-intelligence':
        return <MeetingIntelligence />;
      case 'transcript':
        return <div className="p-4"><h2>Transcript View</h2></div>;
      case 'recording':
        return <RecordingPage onBack={() => setActiveView('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Dashboard';
      case 'meeting-intelligence':
        return 'Meeting Intelligence';
      case 'transcript':
        return 'Transcript';
      case 'recording':
        return 'Recording';
      default:
        return 'Dashboard';
    }
  };

  const handleMoreMenuClick = (item: string) => {
    console.log(`Clicked: ${item}`);
    setShowMoreMenu(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Mobile App Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-center shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
          {activeView === 'meeting-intelligence' && (
              <>
                <Info className="w-4 h-4 text-gray-400" />
                <AlertTriangle className="w-4 h-4 text-orange-400" />
              </>
            )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden" style={{height: 'calc(100vh - 140px)'}}>
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 safe-area-bottom z-50">
        {/* More Menu */}
        {showMoreMenu && (
          <div ref={moreMenuRef} className="absolute bottom-full right-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[150px]">
            <button
              onClick={() => handleMoreMenuClick('Meeting List')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Meeting List
            </button>
            <button
              onClick={() => handleMoreMenuClick('Meeting Preparation')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Meeting Preparation
            </button>
            <button
              onClick={() => handleMoreMenuClick('Tasks')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Tasks
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-5 gap-0 items-center">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex flex-col items-center py-1 px-1 rounded-lg transition-colors ${
              activeView === 'dashboard'
                ? 'text-[#605BFF]'
                : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveView('transcript')}
            className={`flex flex-col items-center py-1 px-1 rounded-lg transition-colors ${
              activeView === 'transcript'
                ? 'text-[#605BFF]'
                : 'text-gray-500'
            }`}
          >
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Transcript</span>
          </button>
          
          <button
            onClick={() => setActiveView('recording')}
            className="flex flex-col items-center py-1 px-1 rounded-lg transition-colors text-red-500"
          >
            <PlusCircle className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Record</span>
          </button>
          
          <button
            onClick={() => setActiveView('meeting-intelligence')}
            className={`flex flex-col items-center py-1 px-1 rounded-lg transition-colors ${
              activeView === 'meeting-intelligence'
                ? 'text-[#605BFF]'
                : 'text-gray-500'
            }`}
          >
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Meetings</span>
          </button>
          
          <button
             onClick={() => setShowMoreMenu(!showMoreMenu)}
             className="flex flex-col items-center py-1 px-1 rounded-lg transition-colors text-gray-500"
           >
             <MoreVertical className="w-5 h-5 mb-1" />
             <span className="text-xs font-medium">More</span>
           </button>
        </div>
      </div>
    </div>
  );
}

export default App;