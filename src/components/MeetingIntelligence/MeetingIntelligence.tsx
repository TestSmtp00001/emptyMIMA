import React, { useState, useEffect } from 'react';
import { 
  Info, 
  Edit, 
  Share2, 
  MessageCircle, 
  Copy, 
  Printer, 
  Mail,
  Plus,
  Link,
  FileText,
  Play,
  Volume2,
  MoreHorizontal,
  MoreVertical,
  Download,
  Gauge,
  FileText as TranscriptIcon,
  BookOpen,
  Send,
  BarChart3,
  GraduationCap,
  Bot,
  ChevronUp
} from 'lucide-react';
import TranscriptTab from '../MeetingIntelligenceTab/TranscriptTab';
import SummaryTab from '../MeetingIntelligenceTab/SummaryTab';
import FollowUpTab from '../MeetingIntelligenceTab/FollowUpTab';
import AnalyticsTab from '../MeetingIntelligenceTab/AnalyticsTab';
import CoachingTab from '../MeetingIntelligenceTab/CoachingTab';
import AskSamTab from '../MeetingIntelligenceTab/AskSamTab';
import RecordingPage from '../RecordingPage/RecordingPage';

const MeetingIntelligence: React.FC = () => {
  const [activeTab, setActiveTab] = useState('transcript');
  const [showRecordingPage, setShowRecordingPage] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const tabs = [
    { id: 'transcript', label: 'Transcript', icon: TranscriptIcon },
    { id: 'summary', label: 'Meeting Summary', icon: BookOpen },
    { id: 'followup', label: 'Follow-up Letter', icon: Send },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'coaching', label: 'Coaching', icon: GraduationCap },
    { id: 'asksam', label: 'Ask SAM', icon: Bot }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'transcript':
        return <TranscriptTab onRecordClick={() => setShowRecordingPage(true)} />;
      case 'summary':
        return <SummaryTab />;
      case 'followup':
        return <FollowUpTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'coaching':
        return <CoachingTab />;
      case 'asksam':
        return <AskSamTab />;
      default:
        return null;
    }
  };

  if (showRecordingPage) {
    return <RecordingPage onBack={() => setShowRecordingPage(false)} />;
  }

  return (
    <div className="min-h-screen h-full bg-white flex flex-col">
      {/* Tab Navigation - Icon Only */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="px-4 py-2">
          <div className="flex justify-between items-center">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? tab.id === 'asksam'
                        ? 'bg-[#fd7e14] text-white shadow-lg'
                        : 'bg-[#605BFF] text-white shadow-lg'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                  title={tab.label}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden h-full">
        <div className="h-full overflow-hidden">
          {renderTabContent()}
        </div>
      </div>
      
      {/* Back to Top Button */}
      {showBackToTop && (
         <button
           onClick={scrollToTop}
           className="fixed bottom-20 right-6 w-10 h-10 bg-black bg-opacity-20 text-[#605BFF] rounded-full shadow-lg hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center z-50"
           title="返回顶部"
         >
           <ChevronUp className="w-4 h-4" />
         </button>
       )}
    </div>
  );
};

export default MeetingIntelligence;