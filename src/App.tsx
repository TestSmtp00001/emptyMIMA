import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Brain, Menu, X, Home, MessageSquare, Info, AlertTriangle, PlusCircle, FileText, MoreVertical, Target, Phone, Share2, BarChart3, CheckSquare, Puzzle, User, CreditCard, Lightbulb } from 'lucide-react';
import MeetingIntelligence from './components/MeetingIntelligence';
import Dashboard from './components/Dashboard/Dashboard';
import RecordingPage from './components/RecordingPage/RecordingPage';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'meeting-intelligence' | 'transcript' | 'recording'>('meeting-intelligence');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setDragCurrentY(e.clientY);
      }
    };

    const handleMouseUp = () => {
       if (isDragging) {
         const dragDistance = dragCurrentY - dragStartY;
         if (dragDistance > 80) {
           setShowMoreMenu(false);
         }
         setIsDragging(false);
         setDragStartY(0);
         setDragCurrentY(0);
       }
     };

    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [showMoreMenu, isDragging, dragCurrentY, dragStartY]);

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
      <div className="flex-1 overflow-hidden relative" style={{height: 'calc(100vh - 140px)'}}>
        {renderContent()}
        
        {/* More Menu Overlay */}
         {showMoreMenu && (
           <div 
             className="fixed inset-0 bg-black/40 z-40 flex items-end justify-center"
             onClick={() => setShowMoreMenu(false)}
             style={{ bottom: '70px' }}
           >
            <div 
               ref={moreMenuRef} 
               className="bg-white rounded-t-3xl shadow-2xl p-6 w-full max-h-[calc(100vh-140px)] overflow-y-auto transition-transform duration-200"
               style={{
                 transform: isDragging ? `translateY(${Math.max(0, Math.min(dragCurrentY - dragStartY, 150))}px)` : 'translateY(0px)'
               }}
               onClick={(e) => e.stopPropagation()}
             >
              <div 
                className="w-12 h-0.5 bg-gray-300 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing"
                onTouchStart={(e) => {
                  setIsDragging(true);
                  setDragStartY(e.touches[0].clientY);
                  setDragCurrentY(e.touches[0].clientY);
                }}
                onTouchMove={(e) => {
                  if (isDragging) {
                    setDragCurrentY(e.touches[0].clientY);
                  }
                }}
                onTouchEnd={() => {
                   if (isDragging) {
                     const dragDistance = dragCurrentY - dragStartY;
                     if (dragDistance > 80) {
                       setShowMoreMenu(false);
                     }
                     setIsDragging(false);
                     setDragStartY(0);
                     setDragCurrentY(0);
                   }
                 }}
                onMouseDown={(e) => {
                  setIsDragging(true);
                  setDragStartY(e.clientY);
                  setDragCurrentY(e.clientY);
                }}

              ></div>
              <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => handleMoreMenuClick('Income Goals')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <Target className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">Income Goals</span>
              </button>
              <button
                onClick={() => handleMoreMenuClick('Meeting List')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <LayoutDashboard className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">Meeting List</span>
              </button>
              <button
                onClick={() => handleMoreMenuClick('Hubspot Calls')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <Phone className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">Hubspot Calls</span>
              </button>
              <button
                onClick={() => handleMoreMenuClick('Hubspot Shared')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <Share2 className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">Hubspot Shared</span>
              </button>
              <button
                onClick={() => handleMoreMenuClick('Hubspot Report')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <BarChart3 className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">Hubspot Report</span>
              </button>
              <button
                onClick={() => handleMoreMenuClick('Tasks')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <CheckSquare className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">Tasks</span>
              </button>
              <button
                onClick={() => handleMoreMenuClick('Integrations')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <Puzzle className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">Integrations</span>
              </button>
              <button
                onClick={() => handleMoreMenuClick('User')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <User className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">User</span>
              </button>
              <button
                onClick={() => handleMoreMenuClick('Billing')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <CreditCard className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">Billing</span>
              </button>
              <button
                onClick={() => handleMoreMenuClick('Solution')}
                className="flex flex-col items-center py-3 px-2 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <Lightbulb className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium text-center">Solution</span>
               </button>
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-3 py-2 safe-area-bottom z-50 shadow-lg"
        onTouchStart={(e) => {
          if (!showMoreMenu) {
            setIsDragging(true);
            setDragStartY(e.touches[0].clientY);
            setDragCurrentY(e.touches[0].clientY);
          }
        }}
        onTouchMove={(e) => {
          if (isDragging && !showMoreMenu) {
            setDragCurrentY(e.touches[0].clientY);
          }
        }}
        onTouchEnd={() => {
          if (isDragging && !showMoreMenu) {
            const dragDistance = dragStartY - dragCurrentY;
            if (dragDistance > 50) {
              setShowMoreMenu(true);
            }
            setIsDragging(false);
            setDragStartY(0);
            setDragCurrentY(0);
          }
        }}
      >
        <div className="grid grid-cols-5 gap-1 items-center">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 ${
              activeView === 'dashboard'
                ? 'text-[#605BFF] bg-[#605BFF]/10'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveView('transcript')}
            className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 ${
              activeView === 'transcript'
                ? 'text-[#605BFF] bg-[#605BFF]/10'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Transcript</span>
          </button>
          
          <button
            onClick={() => setActiveView('recording')}
            className="flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <PlusCircle className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Record</span>
          </button>
          
          <button
            onClick={() => setActiveView('meeting-intelligence')}
            className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 ${
              activeView === 'meeting-intelligence'
                ? 'text-[#605BFF] bg-[#605BFF]/10'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Meetings</span>
          </button>
          
          <button
             onClick={() => setShowMoreMenu(!showMoreMenu)}
             className="flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
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