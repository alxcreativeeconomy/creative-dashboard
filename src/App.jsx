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
      { program: "AI for Creatives", enrolled: 393, graduated: 64, rate: "16.28%", dates: "May 5 - Jul 28 '25" },
      { program: "Content Creation", enrolled: 1310, graduated: 261, rate: "19.92%", dates: "May 5 - Jul 28 '25" },
      { program: "Graphic Design", enrolled: 1396, graduated: 376, rate: "26.93%", dates: "May 5 - Jul 28 '25" },
      { program: "Music & Audio", enrolled: 286, graduated: 86, rate: "30.07%", dates: "May 5 - Jul 28 '25" },
    ],
    ctlsName: 'Creative Tech Lite Specialization Cohort 1',
    ctlsData: [
      { program: "AI for Creatives", enrolled: 1492, graduated: 649, rate: "43.50%", dates: "Aug 18 - Dec 15 '25" },
      { program: "Content Creation", enrolled: 213, graduated: 113, rate: "53.05%", dates: "Aug 18 - Dec 15 '25" },
      { program: "Graphic Design", enrolled: 337, graduated: 190, rate: "56.38%", dates: "Aug 18 - Dec 15 '25" },
      { program: "Music & Audio", enrolled: 226, graduated: 110, rate: "48.67%", dates: "Aug 18 - Dec 15 '25" },
    ]
  },
  {
    id: 'group2',
    pfName: 'Professional Foundations Cohort 10',
    pfData: [
      { program: "AI for Creatives", enrolled: 400, graduated: 36, rate: "9.00%", dates: "Jun 30 - Sep 22 '25" },
      { program: "Content Creation", enrolled: 1346, graduated: 200, rate: "14.86%", dates: "Jun 30 - Sep 22 '25" },
      { program: "Graphic Design", enrolled: 1556, graduated: 249, rate: "16.00%", dates: "Jun 30 - Sep 22 '25" },
      { program: "Music & Audio", enrolled: 347, graduated: 61, rate: "17.58%", dates: "Jun 30 - Sep 22 '25" },
    ],
    ctlsName: 'Creative Tech Lite Specialization Cohort 2',
    ctlsData: [
      { program: "AI for Creatives", enrolled: 597, graduated: "Pending", rate: "N/A", dates: "Oct 13 '25 - Feb 23 '26" },
      { program: "Content Creation", enrolled: 213, graduated: "Pending", rate: "N/A", dates: "Oct 13 '25 - Feb 23 '26" },
      { program: "Graphic Design", enrolled: 65, graduated: "Pending", rate: "N/A", dates: "Oct 13 '25 - Feb 23 '26" },
      { program: "Music & Audio", enrolled: 217, graduated: "Pending", rate: "N/A", dates: "Oct 13 '25 - Feb 23 '26" },
    ]
  },
  {
    id: 'group3',
    pfName: 'Professional Foundations Cohort 11',
    pfData: [
      { program: "Content Creation", enrolled: 1214, graduated: 189, rate: "15.57%", dates: "Sep 22 - Dec 15 '25" },
      { program: "Graphic Design", enrolled: 1288, graduated: 240, rate: "18.63%", dates: "Sep 22 - Dec 15 '25" },
    ], 
    ctlsName: 'Creative Tech Lite Specialization Cohort 3',
    ctlsData: [
      { program: "Content creation", enrolled: 801, graduated: "Pending Graduation", rate: "N/A", dates: "Jan 12 - May 18 '26" },
      { program: "Graphic Design", enrolled: 852, graduated: "Pending Graduation", rate: "N/A", dates: "Jan 12 - May 18 '26" },
    ] 
  }
];

// --- COMPONENTS & STYLES ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
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
      <div className={`px-6 py-4 border-y border-slate-200 flex items-center ${bgColor}`}>
        <h4 className="font-semibold text-slate-800 text-base">{title}</h4>
      </div>
      
      <div className="p-6 flex flex-col lg:flex-row gap-8 items-center bg-white">
        
        {/* Table View */}
        <div className="flex-1 overflow-x-auto rounded-xl border border-slate-100 w-full">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3 font-semibold">Program</th>
                <th className="px-6 py-3 font-semibold text-right">Enrolled</th>
                <th className="px-6 py-3 font-semibold text-right">Graduated</th>
                <th className="px-6 py-3 font-semibold text-right">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {/* Color Dot Legend */}
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PROGRAM_COLORS[row.program] || '#ccc' }}></div>
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{row.program}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{row.dates}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {typeof row.enrolled === 'number' 
                      ? <span className="font-medium text-slate-700">{row.enrolled.toLocaleString()}</span>
                      : <span className="text-slate-400 italic text-sm">{row.enrolled}</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-right">
                    {typeof row.graduated === 'number'
                      ? <span className="font-medium text-emerald-600">{row.graduated.toLocaleString()}</span>
                      : <span className="text-amber-500 italic text-sm">{row.graduated}</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${row.rate === 'N/A' ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-700'}`}>
                      {row.rate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inline Pie Charts Section */}
        <div className="w-full lg:w-[480px] xl:w-[540px] shrink-0 grid grid-cols-3 gap-3 self-center">
          
          {/* Enrolled Donut Chart */}
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl p-3 border border-slate-100">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">Enrolled Metric</h5>
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
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl p-3 border border-slate-100">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">Graduated Metric</h5>
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
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl p-3 border border-slate-100">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">Avg Rate</h5>
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900 text-white px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          {/* 2. Use the imported variable in the src attribute */}
          <img 
            src={logo} 
            alt="Company Logo" 
            className="w-10 h-10 object-contain rounded" 
          />
          <h1 className="text-xl font-bold tracking-tight">Creative Dashboard</h1>
        </div>
        <div className="flex items-center space-x-6">
          {/* Page Navigation */}
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage('2025')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === '2025'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              2025
            </button>
            <button
              onClick={() => setCurrentPage('2026')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === '2026'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              2026
            </button>
          </div>
          <a 
            href="https://docs.google.com/spreadsheets/d/1insq7NCsTtHLU2vSx1ejADznXk_jbjygMrtc1KuED3E/edit?gid=79275002#gid=79275002" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Data</span>
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 2025 Page Content */}
        {currentPage === '2025' && (
          <>
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900">2025 Key Metrics Overview</h2>
              <p className="text-slate-500 mt-1">Application, Enrollment, and Graduation tracking</p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              
              {/* KPI Row (Top Funnel Data) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {kpiData2025.map((kpi, idx) => (
                  <Card key={idx} className="p-5 flex flex-col justify-between hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-medium text-slate-600">{kpi.title}</span>
                      <div className={`p-2 rounded-lg ${kpi.bg}`}>
                        <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900">{kpi.value}</h4>
                      {kpi.target && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">Target: {kpi.target}</span>
                            <span className="font-medium text-slate-700">{kpi.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${kpi.progress >= 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
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
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-slate-500" />
                  Top Funnel Overview
                </h3>
                <div className="h-[350px]">
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
              <Card className="p-0 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
                  <h3 className="text-2xl font-bold text-slate-900">Cohort Performance Tracking</h3>
                  <p className="text-sm text-slate-500 mt-1">All learner progression from Professional Foundations directly into Creative Tech Lite Specializations.</p>
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
            <div>
              <h2 className="text-3xl font-bold text-slate-900">2026 Creative Tech Lite Specialization Cohorts</h2>
              <p className="text-slate-500 mt-1">CTLS Cohorts 2 & 3 due to graduate</p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              
              {/* Graduating CTLS Cohorts Section */}
              <Card className="p-0 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-slate-50">
                  <h3 className="text-2xl font-bold text-slate-900">Cohort Performance Tracking</h3>
                  <p className="text-sm text-slate-500 mt-1">Creative Tech Lite Specialization Cohorts 2 & 3 performance metrics.</p>
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