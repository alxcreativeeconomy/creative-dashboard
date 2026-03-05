import React from 'react';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, CreditCard, UserCheck, GraduationCap, ShieldCheck, 
  TrendingUp, ExternalLink
} from 'lucide-react';
import logo from './assets/logo.png';

// --- DATA SOURCED STRICTLY FROM CSVs ---

const kpiData2025 = [
  { title: "Total Enrolled (Top Funnel)", value: "35,569", target: null, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Paid Learners", value: "8,910", target: 18000, progress: 49.50, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-100" },
  { title: "Activated Paid", value: "3,907", target: 9000, progress: 43.41, icon: UserCheck, color: "text-violet-600", bg: "bg-violet-100" },
  { title: "Graduation Rate", value: "1062", target: 5000, progress: 21.24, icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-100" },
  { title: "Retention Rate", value: "80.00%", target: "80.00%", progress: 100, icon: ShieldCheck, color: "text-rose-600", bg: "bg-rose-100" }
];

const funnelData = [
  { name: 'AI for Creatives', enrolled: 2819, paid: 805, rate: 93.68 },
  { name: 'Content Creation', enrolled: 12900, paid: 3514, rate: 91.53 },
  { name: 'Graphic Design', enrolled: 10100, paid: 2820, rate: 90.17 },
  { name: 'Music & Audio', enrolled: 4800, paid: 1227, rate: 94.11 },
];

const cohortGroups = [
  {
    id: 'group1',
    pfName: 'Professional Foundations Cohort 9',
    pfData: [
      { program: "AI for Creatives", enrolled: 393, graduated: 64, rate: "16.28%", dates: "May 5 - Jul 28 '2025" },
      { program: "Content Creation", enrolled: 1310, graduated: 261, rate: "19.92%", dates: "May 5 - Jul 28 '2025" },
      { program: "Graphic Design", enrolled: 1396, graduated: 376, rate: "26.93%", dates: "May 5 - Jul 28 '2025" },
      { program: "Music & Audio", enrolled: 286, graduated: 86, rate: "30.07%", dates: "May 5 - Jul 28 '2025" },
    ],
    ctlsName: 'Creative Tech Lite Specialization Cohort 1',
    ctlsData: [
      { program: "AI for Creatives", enrolled: 383, graduated: 173, rate: "45.17%", dates: "Aug 18 - Dec 15 '2025" },
      { program: "Content Creation", enrolled: 709, graduated: 348, rate: "49.08%", dates: "Aug 18 - Dec 15 '2025" },
      { program: "Graphic Design", enrolled: 929, graduated: 420, rate: "45.21%", dates: "Aug 18 - Dec 15 '2025" },
      { program: "Music & Audio", enrolled: 247, graduated: 121, rate: "48.99%", dates: "Aug 18 - Dec 15 '2025" },
    ]
  },
  {
    id: 'group2',
    pfName: 'Professional Foundations Cohort 10',
    pfData: [
      { program: "AI for Creatives", enrolled: 400, graduated: 36, rate: "9.00%", dates: "Jun 30 - Sep 22 '2025" },
      { program: "Content Creation", enrolled: 1346, graduated: 200, rate: "14.86%", dates: "Jun 30 - Sep 22 '2025" },
      { program: "Graphic Design", enrolled: 1556, graduated: 249, rate: "16.00%", dates: "Jun 30 - Sep 22 '2025" },
      { program: "Music & Audio", enrolled: 347, graduated: 61, rate: "17.58%", dates: "Jun 30 - Sep 22 '2025" },
    ],
    ctlsName: 'Creative Tech Lite Specialization Cohort 2',
    ctlsData: [
      { program: "AI for Creatives", enrolled: 291, graduated: "Pending", rate: "N/A", dates: "Oct 13 - Feb 23 '2026" },
      { program: "Content Creation", enrolled: 551, graduated: "Pending", rate: "N/A", dates: "Oct 13 - Feb 23 '2026" },
      { program: "Graphic Design", enrolled: 619, graduated: "Pending", rate: "N/A", dates: "Oct 13 - Feb 23 '2026" },
      { program: "Music & Audio", enrolled: 167, graduated: "Pending", rate: "N/A", dates: "Oct 13 - Feb 23 '2026" },
    ]
  },
  {
    id: 'group3',
    pfName: 'Professional Foundations Cohort 11',
    pfData: [
      { program: "Content Creation", enrolled: 1214, graduated: 189, rate: "15.57%", dates: "Sep 22 - Dec 15 '2025" },
      { program: "Graphic Design", enrolled: 1288, graduated: 240, rate: "18.63%", dates: "Sep 22 - Dec 15 '2025" },
    ], 
    ctlsName: 'Creative Tech Lite Specialization Cohort 3',
    ctlsData: [
      { program: "Content Creation", enrolled: 801, graduated: "Pending Graduation", rate: "N/A", dates: "Jan 12 - May 18 '2026" },
      { program: "Graphic Design", enrolled: 852, graduated: "Pending Graduation", rate: "N/A", dates: "Jan 12 - May 18 '2026" },
    ] 
  }
];

// --- COMPONENTS & STYLES ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-slate-200 ${className}`}>
    {children}
  </div>
);

const PROGRAM_COLORS = {
  "AI for Creatives": "#3b82f6", // blue-500
  "Content Creation": "#8b5cf6", // violet-500
  "Graphic Design": "#f43f5e",   // rose-500
  "Music & Audio": "#10b981",    // emerald-500
};

const TooltipStyle = {
  borderRadius: '8px', 
  border: 'none', 
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  fontSize: '12px',
  padding: '8px 12px'
};

const CohortSection = ({ title, data, bgColor }) => {
  // Extract strictly numeric data for the pie charts
  const pieData = data
    .filter(d => typeof d.enrolled === 'number')
    .map(d => ({ name: d.program, value: d.enrolled }));
  
  const gradData = data
    .filter(d => typeof d.graduated === 'number')
    .map(d => ({ name: d.program, value: d.graduated }));

  // Extract percentage rates for the third chart
  const rateData = data
    .filter(d => d.rate !== 'N/A')
    .map(d => ({ name: d.program, value: parseFloat(d.rate.replace('%', '')) }));

  // Calculate totals for the center of the pie charts
  const totalEnrolled = pieData.reduce((acc, curr) => acc + curr.value, 0);
  const totalGraduated = gradData.reduce((acc, curr) => acc + curr.value, 0);
  
  // Calculate average rate
  const averageRate = totalEnrolled > 0 
    ? ((totalGraduated / totalEnrolled) * 100).toFixed(2) + '%' 
    : 'N/A';

  return (
    <div className="flex flex-col border-b border-slate-100 last:border-0">
      <div className={`px-8 py-6 border-y border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${bgColor}`}>
        <div className="flex items-start gap-4">
          <div className="flex flex-col justify-center">
            <div className="w-1.5 h-12 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 rounded-full"></div>
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="font-bold text-slate-900 text-lg leading-tight">{title}</h4>
            <div className="mt-1.5 text-xs font-medium text-slate-500 uppercase tracking-wide">
              {data.length > 0 && data[0].dates ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Started: {data[0].dates.split(' - ')[0]}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-right">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</span>
            <span className="text-2xl font-bold text-slate-900">{pieData.reduce((a, c) => a + c.value, 0).toLocaleString()}</span>
          </div>
          <div className="w-px h-12 bg-slate-200"></div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Graduated</span>
            <span className="text-2xl font-bold text-emerald-600">{gradData.reduce((a, c) => a + c.value, 0).toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col lg:flex-row gap-8 items-center bg-white">
        
        {/* Table View */}
        <div className="flex-1 overflow-x-auto rounded-2xl border border-slate-100 w-full shadow-md">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-100">
                <th className="px-6 py-4 font-semibold">Program</th>
                <th className="px-6 py-4 font-semibold text-right">Enrolled</th>
                <th className="px-6 py-4 font-semibold text-right">Graduated</th>
                <th className="px-6 py-4 font-semibold text-right">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {/* Color Dot Legend */}
                      <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: PROGRAM_COLORS[row.program] || '#ccc' }}></div>
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{row.program}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{row.dates}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {typeof row.enrolled === 'number' 
                      ? <span className="font-semibold text-slate-800">{row.enrolled.toLocaleString()}</span>
                      : <span className="text-slate-400 italic text-sm">{row.enrolled}</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-right">
                    {typeof row.graduated === 'number'
                      ? <span className="font-semibold text-emerald-600">{row.graduated.toLocaleString()}</span>
                      : <span className="text-amber-500 italic text-sm">{row.graduated}</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${row.rate === 'N/A' ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'}`}>
                      {row.rate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inline Pie Charts Section */}
        <div className="w-full lg:w-[480px] xl:w-[540px] shrink-0 grid grid-cols-1 sm:grid-cols-3 gap-4 self-center">
          
          {/* Enrolled Donut Chart */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-100 shadow-md hover:shadow-lg transition-shadow">
            <h5 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3 text-center">Enrolled Metric</h5>
            <div className="w-full relative h-[130px]">
              {pieData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                        {pieData.map(entry => <Cell key={entry.name} fill={PROGRAM_COLORS[entry.name]} />)}
                      </Pie>
                      <Tooltip contentStyle={TooltipStyle} itemStyle={{color: '#334155'}} />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Total Centered Label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-sm font-bold text-slate-700">{totalEnrolled.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-slate-400 italic">Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* Graduated Donut Chart */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border border-slate-100 shadow-md hover:shadow-lg transition-shadow">
            <h5 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3 text-center">Graduated Metric</h5>
            <div className="w-full relative h-[130px]">
              {gradData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={gradData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                        {gradData.map(entry => <Cell key={entry.name} fill={PROGRAM_COLORS[entry.name]} />)}
                      </Pie>
                      <Tooltip contentStyle={TooltipStyle} itemStyle={{color: '#334155'}} />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Total Centered Label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-sm font-bold text-slate-700">{totalGraduated.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-slate-400 italic">Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* Rate Donut Chart */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-slate-100 shadow-md hover:shadow-lg transition-shadow">
            <h5 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3 text-center">Avg Rate</h5>
            <div className="w-full relative h-[130px]">
              {rateData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={rateData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                        {rateData.map(entry => <Cell key={entry.name} fill={PROGRAM_COLORS[entry.name]} />)}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} contentStyle={TooltipStyle} itemStyle={{color: '#334155'}} />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Total Centered Label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-sm font-bold text-slate-700">{averageRate}</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-slate-400 italic">Pending</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('2025');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 font-sans text-slate-900">
      
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white sticky top-0 z-50 border-b border-slate-800/50 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-between items-center gap-6">
          
          {/* Brand Section */}
          <div className="flex items-center gap-4 min-w-fit">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition"></div>
              <img 
                src={logo} 
                alt="Company Logo" 
                className="relative w-12 h-12 object-contain rounded-xl shadow-xl brightness-0 invert" 
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight leading-tight"><span className="text-white font-bold"></span><span className="text-slate-300"> Creative Dashboard</span></h1>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Performance Analytics</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1 hidden lg:block"></div>

          {/* Center Navigation - Year Selector */}
          <div className="flex items-center gap-2 bg-slate-800/30 backdrop-blur-sm p-1.5 rounded-xl border border-slate-700/50 hover:border-slate-600 transition">
            <button
              onClick={() => setCurrentPage('2025')}
              className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                currentPage === '2025'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              2025
            </button>
            <div className="w-px h-6 bg-slate-600/30"></div>
            <button
              onClick={() => setCurrentPage('2026')}
              className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                currentPage === '2026'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              2026
            </button>
          </div>

          {/* Right Action Button */}
          <a 
            href="https://docs.google.com/spreadsheets/d/1insq7NCsTtHLU2vSx1ejADznXk_jbjygMrtc1KuED3E/edit?gid=79275002#gid=79275002" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span>View Data</span>
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        
        {/* 2025 Page Content */}
        {currentPage === '2025' && (
          <>
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-slate-900">2025 Key Metrics Overview</h2>
              <p className="text-slate-500 mt-2 text-base">Application, Enrollment, and Graduation tracking</p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              
              {/* KPI Row (Top Funnel Data) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {kpiData2025.map((kpi, idx) => (
                  <Card key={idx} className="p-6 flex flex-col justify-between hover:shadow-xl transition-all border-l-4 border-l-transparent bg-gradient-to-br from-slate-50/50 to-white group">
                    <style>{`
                      .group:nth-child(1) { --tw-border-color: rgb(59, 130, 246); background: linear-gradient(135deg, rgba(219, 234, 254, 0.3) 0%, rgba(255, 255, 255, 1) 100%); }
                      .group:nth-child(2) { --tw-border-color: rgb(16, 185, 129); background: linear-gradient(135deg, rgba(209, 250, 229, 0.3) 0%, rgba(255, 255, 255, 1) 100%); }
                      .group:nth-child(3) { --tw-border-color: rgb(139, 92, 246); background: linear-gradient(135deg, rgba(233, 213, 255, 0.3) 0%, rgba(255, 255, 255, 1) 100%); }
                      .group:nth-child(4) { --tw-border-color: rgb(245, 158, 11); background: linear-gradient(135deg, rgba(254, 243, 199, 0.3) 0%, rgba(255, 255, 255, 1) 100%); }
                      .group:nth-child(5) { --tw-border-color: rgb(244, 63, 94); background: linear-gradient(135deg, rgba(254, 226, 226, 0.3) 0%, rgba(255, 255, 255, 1) 100%); }
                    `}</style>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{kpi.title}</span>
                      <div className={`p-3 rounded-xl ${kpi.bg} shadow-md`}>
                        <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-slate-900">{kpi.value}</h4>
                      {kpi.target && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-slate-500">Target: {kpi.target}</span>
                            <span className="font-bold text-slate-700 px-2 py-1 bg-slate-100/80 rounded">{kpi.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200/50 rounded-full h-2.5 overflow-hidden shadow-inner">
                            <div 
                              className={`h-2.5 rounded-full transition-all duration-500 ${kpi.progress >= 100 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-blue-400 to-blue-500'}`} 
                              style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Application Funnel Chart */}
              <Card className="p-8">
                <h3 className="text-lg font-bold mb-2 flex items-center text-slate-900">
                  <TrendingUp className="w-5 h-5 mr-3 text-blue-600" />
                  Application Funnel Overview
                </h3>
                <p className="text-sm text-slate-500 mb-6">Track enrollment progression across all programs</p>
                <div className="h-[200px] sm:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={funnelData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} tickFormatter={(val) => `${val}%`} />
                      <Tooltip 
                        contentStyle={TooltipStyle}
                        cursor={{fill: '#f8fafc'}}
                        formatter={(value, name) => name === 'Enrollment Rate' ? `${value}%` : value}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
                      <Bar yAxisId="left" dataKey="enrolled" name="Enrolled" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="left" dataKey="paid" name="Made First Payment" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="rate" name="Enrollment Rate" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 6 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* All Cohorts Section */}
              <Card className="p-0 overflow-hidden flex flex-col shadow-xl">
                <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-blue-50 via-slate-50 to-white">
                  <div className="flex items-center mb-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4"></div>
                    <h3 className="text-2xl font-bold text-slate-900">Cohort Performance Tracking</h3>
                  </div>
                  <p className="text-sm text-slate-500 mt-2 ml-5">All learner progression from Professional Foundations directly into Creative Tech Lite Specializations.</p>
                </div>
                
                <div className="bg-white">
                  {cohortGroups.map((group) => (
                    <div key={group.id} className="pb-6 border-b-8 border-slate-100 last:border-0 last:pb-0">
                      <CohortSection title={group.pfName} data={group.pfData} bgColor="bg-slate-50" />
                      <CohortSection title={group.ctlsName} data={group.ctlsData} bgColor="bg-blue-50/50" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}

        {/* 2026 Page Content */}
        {currentPage === '2026' && (
          <>
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-slate-900">2026 Creative Tech Lite Specialization Cohorts</h2>
              <p className="text-slate-500 mt-2 text-base">CTLS Cohorts 2 & 3 due to graduate</p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              
              {/* Graduating CTLS Cohorts Section */}
              <Card className="p-0 overflow-hidden flex flex-col shadow-xl">
                <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-slate-50 to-white">
                  <div className="flex items-center mb-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full mr-4"></div>
                    <h3 className="text-2xl font-bold text-slate-900">Cohort Performance Tracking</h3>
                  </div>
                  <p className="text-sm text-slate-500 mt-2 ml-5">Creative Tech Lite Specialization Cohorts 2 & 3 performance metrics.</p>
                </div>
                
                <div className="bg-white">
                  {cohortGroups.slice(1).map((group) => (
                    <div key={group.id} className="pb-6 border-b-8 border-slate-100 last:border-0 last:pb-0">
                      <CohortSection title={group.ctlsName} data={group.ctlsData} bgColor="bg-emerald-50/50" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}