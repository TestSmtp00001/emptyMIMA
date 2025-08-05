import React, { useState } from 'react';
import { Filter, Eye, Calendar, Clock, User, Users, BarChart3, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, PieChart as PieChartIcon, BarChart2, X, AlertTriangle, Target, Activity, CalendarCheck, CalendarX, CalendarDays, UserCheck, CheckCircle, Mic } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Weekly');
  const [selectedTenant, setSelectedTenant] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [meetingsCurrentPage, setMeetingsCurrentPage] = useState(1);
  const [coachingCurrentPage, setCoachingCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fixed date display
  const currentDateTime = 'Sunday, March 31, 2024';

  const timeRanges = [
    { label: 'Current', value: 'Today', description: 'Today' },
    { label: 'Daily', value: 'Daily', description: 'Last 7 days' },
    { label: 'Weekly', value: 'Weekly', description: 'Last 4 weeks' },
    { label: 'Monthly', value: 'Monthly', description: 'Last 6 months' },
    { label: 'Quarterly', value: 'Quarterly', description: 'Last 4 quarters' }
  ];
  const tenants = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];
  const users = ['John Smith', 'Sarah Wilson', 'Michael Johnson', 'Lisa Chen'];

  // Bar chart data
  const appointmentsData = [
    { name: 'Week 1', value: 21 },
    { name: 'Week 2', value: 27 },
    { name: 'Week 3', value: 31 },
    { name: 'Week 4', value: 22 }
  ];

  const meetingsRecordedData = [
    { name: 'Week 1', value: 8 },
    { name: 'Week 2', value: 14 },
    { name: 'Week 3', value: 11 },
    { name: 'Week 4', value: 21 }
  ];

  const dealsWonData = [
    { name: 'Week 1', value: 7 },
    { name: 'Week 2', value: 9 },
    { name: 'Week 3', value: 6 },
    { name: 'Week 4', value: 10 }
  ];

  const dealsLostData = [
    { name: 'Week 1', value: 2 },
    { name: 'Week 2', value: 3 },
    { name: 'Week 3', value: 1 },
    { name: 'Week 4', value: 4 }
  ];

  // Pie chart data
  const meetingsStatusData = [
    { name: 'Won', value: 30, color: '#34D399' },
    { name: 'Lost', value: 25, color: '#F87171' },
    { name: 'Follow-up', value: 45, color: '#FBBF24' }
  ];

  const topWinLossReasons = [
  { name: "Pricing", value: 30, type: "win" },
  { name: "Quality", value: 25, type: "win" },
  { name: "Service", value: 12, type: "win" },
  { name: "Wife", value: 16, type: "loss" },
  { name: "Budget", value: 11, type: "loss" },
  { name: "Timing", value: 3, type: "loss" }
];

  const winReasons = topWinLossReasons.filter(item => item.type === "win");
  const lossReasons = topWinLossReasons.filter(item => item.type === "loss");

  const chartData = [
  ...winReasons.map(item => ({ name: item.name, win: item.value })),
  ...lossReasons.map(item => ({ name: item.name, loss: item.value })),
];

  // Table data
  const meetingsData = [
    { id: 1, name: 'John Smith', subject: 'Product Demo - Acme Corp', date: '2024-01-20', duration: '45 min' },
    { id: 2, name: 'Michael Johnson', subject: 'Discovery Call - TechStart', date: '2024-01-19', duration: '30 min' },
    { id: 3, name: 'Sarah Wilson', subject: 'Negotiation - Global Solutions', date: '2024-01-18', duration: '60 min' },
    { id: 4, name: 'John Smith', subject: 'Follow-up - Innovation Labs', date: '2024-01-17', duration: '25 min' },
    { id: 5, name: 'Lisa Chen', subject: 'Technical Review - StartupXYZ', date: '2024-01-16', duration: '40 min' },
    { id: 6, name: 'John Smith', subject: 'Contract Discussion - MegaCorp', date: '2024-01-15', duration: '55 min' },
    { id: 7, name: 'John Smith', subject: 'Demo Follow-up - TechCorp', date: '2024-01-14', duration: '35 min' }
  ];

  const coachingData = [
    { id: 1, name: 'John Smith', subject: 'Sales Technique Review', date: '2024-01-22', duration: '30 min' },
    { id: 2, name: 'Michael Johnson', subject: 'Objection Handling Training', date: '2024-01-23', duration: '45 min' },
    { id: 3, name: 'Sarah Wilson', subject: 'Closing Strategies Workshop', date: '2024-01-24', duration: '60 min' },
    { id: 4, name: 'John Smith', subject: 'Pipeline Review Session', date: '2024-01-25', duration: '40 min' },
    { id: 5, name: 'Lisa Chen', subject: 'Presentation Skills Training', date: '2024-01-26', duration: '50 min' },
    { id: 6, name: 'Lisa Chen', subject: 'Customer Relationship Management', date: '2024-01-27', duration: '45 min' },
    { id: 7, name: 'Sarah Wilson', subject: 'Negotiation Tactics Workshop', date: '2024-01-28', duration: '55 min' }
  ];

  // Pagination logic
  const getMeetingsPaginatedData = () => {
    const startIndex = (meetingsCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return meetingsData.slice(startIndex, endIndex);
  };

  const getCoachingPaginatedData = () => {
    const startIndex = (coachingCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return coachingData.slice(startIndex, endIndex);
  };

  const meetingsTotalPages = Math.ceil(meetingsData.length / itemsPerPage);
  const coachingTotalPages = Math.ceil(coachingData.length / itemsPerPage);


  const BarChartComponent = ({ data, color, title, percentage }: { data: any[], color: string, title: string, percentage: number }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 pb-2 flex-grow">
        {/* 标题和趋势 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {title === 'Deals Won' && <TrendingUp className="w-6 h-6" style={{ color: color }} />}
            {title === 'MeetingsMeetings Completed' && <CheckCircle className="w-6 h-6" style={{ color: color }} />}
            {title === 'Meetings Recorded' && <Mic className="w-6 h-6" style={{ color: color }} />}
            {title === 'Deals Lost' && <Target className="w-6 h-6" style={{ color: color }} />}
            <p className="text-lg font-semibold text-gray-900">{title}</p>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <p className="text-sm font-semibold text-green-600">+12%</p>
          </div>
        </div>
        
        {/* 描述 */}
        <div className="mb-3">
          {title === 'Deals Won' && (
            <p className="text-sm text-gray-500">Total deals won in last 4 weeks</p>
          )}
          {title === 'Meetings Completed' && (
            <p className="text-sm text-gray-500">Total meetings completed in last 4 weeks</p>
          )}
          {title === 'Meetings Recorded' && (
            <p className="text-sm text-gray-500">Total meetings recorded in last 4 weeks</p>
          )}
        </div>
        
        {/* 数字 */}
        <div className="mb-2">
          <h4 className="text-3xl font-semibold text-gray-900">{data.reduce((sum, item) => sum + item.value, 0)}</h4>
        </div>
        
        {/* 占比 */}
        <div>
          {title === 'Meetings Completed' && (
            <p className="text-base text-gray-500">{percentage}% of meetings booked</p>
          )}
          {title === 'Meetings Recorded' && (
            <p className="text-base text-gray-500">{percentage}% of meetings completed</p>
          )}
        </div>
      </div>
      <div className="px-4 pt-2 pb-1">
        <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data}>
          <Tooltip 
            formatter={(value, name) => [value, name]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#64748b' }}
          />
          <YAxis hide />
          <Bar 
            dataKey="value" 
            fill={color} 
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );

  const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (checked: boolean) => void }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-[#605BFF]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );

  const PaginationComponent = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    totalItems, 
    itemsPerPage 
  }: { 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
  }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {totalItems} in total
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded-md ${
                currentPage === page
                  ? 'text-[#605BFF] font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-50 w-full flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 pt-0 pb-2 flex-shrink-0">
        {/* Filter Dropdowns - Compact Design */}
        <div className="space-y-2">
          {/* Time Range Selector */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="w-full bg-white border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#605BFF] rounded-lg px-3 py-2"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label} - {range.description}
              </option>
            ))}
          </select>
          
          {/* Team and User Filters */}
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#605BFF] rounded-lg px-3 py-2"
            >
              <option value="">All Teams</option>
              {tenants.map(tenant => (
                <option key={tenant} value={tenant}>{tenant}</option>
              ))}
            </select>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#605BFF] rounded-lg px-3 py-2"
            >
              <option value="">All Users</option>
              {users.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Body - Scrollable Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Metrics Grid - Single Column Layout */}
          <div className="space-y-4">
            {/* Deals Won Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-500">Deals Won</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">+12%</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {dealsWonData.reduce((sum, item) => sum + item.value, 0)}
                </div>
                <div className="h-20 w-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dealsWonData}>
                        <Bar dataKey="value" fill="#34D399" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
              </div>
            </div>

            {/* Win Rate Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-500">Win Rate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">+8%</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-900">30%</div>
                <div className="h-20 w-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={meetingsStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={20}
                          outerRadius={40}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {meetingsStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
              </div>
            </div>

            {/* Meetings Completed Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-500">Meetings</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">+15%</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {appointmentsData.reduce((sum, item) => sum + item.value, 0)}
                </div>
                <div className="h-20 w-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={appointmentsData}>
                        <Bar dataKey="value" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
              </div>
            </div>

            {/* Meetings Recorded Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Mic className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-500">Recorded</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">+5%</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {meetingsRecordedData.reduce((sum, item) => sum + item.value, 0)}
                </div>
                <div className="h-20 w-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={meetingsRecordedData}>
                        <Bar dataKey="value" fill="#FBBF24" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <CalendarCheck className="w-4 h-4 text-green-500" />
                <TrendingUp className="w-3 h-3 text-green-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">136</div>
              <div className="text-xs text-gray-500">Booked</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <CalendarX className="w-4 h-4 text-red-500" />
                <TrendingUp className="w-3 h-3 text-red-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">18</div>
              <div className="text-xs text-gray-500">Cancelled</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <CalendarDays className="w-4 h-4 text-orange-500" />
                <TrendingDown className="w-3 h-3 text-orange-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">8</div>
              <div className="text-xs text-gray-500">No-Show</div>
            </div>
          </div>



          {/* Win/Loss Insights - Mobile Optimized */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Win/Loss Insights</h3>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs font-semibold text-green-600">+5%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-center mb-2">
                  <div className="text-sm font-medium text-green-600 mb-1">Won</div>
                </div>
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={winReasons}>
                    <Bar dataKey="value" fill="#34D399" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <div className="text-center mb-2">
                  <div className="text-sm font-medium text-red-600 mb-1">Lost</div>
                </div>
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={lossReasons}>
                    <Bar dataKey="value" fill="#F87171" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>



        {/* Third Row - Meeting No-Show */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Meetings Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full">
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-[#605BFF]" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Meetings</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-3 py-1 text-[#605BFF] rounded-lg hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Name & Subject</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Date & Duration</th>
                    <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 uppercase w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getMeetingsPaginatedData().map((meeting) => (
                    <tr key={meeting.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900 font-medium">{meeting.name}</div>
                        <div className="text-xs text-gray-500">{meeting.subject}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900">{meeting.date}</div>
                        <div className="text-xs text-gray-500">{meeting.duration}</div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button className="inline-flex items-center justify-center p-1 text-blue-600 bg-transparent rounded hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 pb-4">
              <PaginationComponent
                currentPage={meetingsCurrentPage}
                totalPages={meetingsTotalPages}
                onPageChange={setMeetingsCurrentPage}
                totalItems={meetingsData.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
            </div>
          </div>

          {/* Coaching Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full">
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center space-x-3">
                <UserCheck className="w-6 h-6 text-[#605BFF]" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">Coaching</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-3 py-1 text-[#605BFF] rounded-lg hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Name & Subject</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Date & Duration</th>
                    <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 uppercase w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getCoachingPaginatedData().map((coaching) => (
                    <tr key={coaching.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900 font-medium">{coaching.name}</div>
                        <div className="text-xs text-gray-500">{coaching.subject}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900">{coaching.date}</div>
                        <div className="text-xs text-gray-500">{coaching.duration}</div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button className="inline-flex items-center justify-center p-1 text-blue-600 bg-transparent rounded hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 pb-4">
              <PaginationComponent
                currentPage={coachingCurrentPage}
                totalPages={coachingTotalPages}
                onPageChange={setCoachingCurrentPage}
                totalItems={coachingData.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;