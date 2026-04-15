import React from 'react';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  Users, CreditCard, UserCheck, GraduationCap, ShieldCheck,
  TrendingUp, ExternalLink, ChevronDown
} from 'lucide-react';
import logo from './assets/logo.png';

// --- DATA SOURCED STRICTLY FROM CSVs ---

const kpiData2025 = [
  { title: "Total Enrolled (Top Funnel)", value: "27,817", target: null, icon: Users, color: "text-blue-600", bg: "bg-blue-100", borderColor: "rgb(59, 130, 246)", cardBg: "linear-gradient(135deg, rgba(219, 234, 254, 0.3) 0%, rgba(255, 255, 255, 1) 100%)" },
  { title: "Paid Learners", value: "7,660", target: 18000, progress: 49.50, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-100", borderColor: "rgb(16, 185, 129)", cardBg: "linear-gradient(135deg, rgba(209, 250, 229, 0.3) 0%, rgba(255, 255, 255, 1) 100%)" },
  { title: "Activated Paid", value: "4,701", target: 9000, progress: 43.41, icon: UserCheck, color: "text-violet-600", bg: "bg-violet-100", borderColor: "rgb(139, 92, 246)", cardBg: "linear-gradient(135deg, rgba(233, 213, 255, 0.3) 0%, rgba(255, 255, 255, 1) 100%)" },
  { title: "Graduated Learners", value: "1,601", target: 5000, progress: 21.24, icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-100", borderColor: "rgb(245, 158, 11)", cardBg: "linear-gradient(135deg, rgba(254, 243, 199, 0.3) 0%, rgba(255, 255, 255, 1) 100%)" },
];

const kpiData2026 = [
  { title: "Total Enrolled (2026 C3)", value: "7,752", target: null, icon: Users, color: "text-blue-600", bg: "bg-blue-100", borderColor: "rgb(59, 130, 246)", cardBg: "linear-gradient(135deg, rgba(219, 234, 254, 0.3) 0%, rgba(255, 255, 255, 1) 100%)" },
  { title: "Paid Learners", value: "1,250", target: null, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-100", borderColor: "rgb(16, 185, 129)", cardBg: "linear-gradient(135deg, rgba(209, 250, 229, 0.3) 0%, rgba(255, 255, 255, 1) 100%)" },
  { title: "Activated Paid", value: "2,433", target: null, icon: UserCheck, color: "text-violet-600", bg: "bg-violet-100", borderColor: "rgb(139, 92, 246)", cardBg: "linear-gradient(135deg, rgba(233, 213, 255, 0.3) 0%, rgba(255, 255, 255, 1) 100%)" },
  { title: "Graduated Learners", value: "539", target: null, icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-100", borderColor: "rgb(245, 158, 11)", cardBg: "linear-gradient(135deg, rgba(254, 243, 199, 0.3) 0%, rgba(255, 255, 255, 1) 100%)" },
];

const weeklyMetricsData = [
  { metric: "Revenue", target: "$800k", current: "$673k", previous: "$673k", wow: "84%", progress: 84, comments: "Afriemibank: + $664k\nMutiny: + $9K" },
  { metric: "Team trained", target: "100%", current: "0%", previous: "0%", wow: "0%", progress: 0, comments: "Waiting for central training to kick off" },
  { metric: "Clients secured + Fundraising proposal submitted", target: "10", current: "2", previous: "2", wow: "0%", progress: 20, comments: "Client reference above" },
  { metric: "Ecosystem partners secured", target: "5", current: "0", previous: "0", wow: "0%", progress: 0, comments: "Afrosonic + Tafaria Castle MOUs briefed into LECoR. Bank of Kigali proposal due 15 Apr. Trace TV terms under review." },
  { metric: "Champions trained", target: "50", current: "0", previous: "0", wow: "0%", progress: 0, comments: "Champions rollout June. Naming alignment (Champions vs Ambassadors) still pending. City teams on hold" },
  { metric: "% of creative learners on platform", target: "60%", current: "0%", previous: "0%", wow: "0%", progress: 0, comments: "Experiment doc aligned with Javan 13 Apr. MVP pilot proceeding — eHub SSO + ALX subdomain pending. Submissions paused pending re-platform." },
  { metric: "Impression from UGC led campaigns", target: "250", current: "0", previous: "0", wow: "0%", progress: 0, comments: "Create with ALX campaign launching 8th April. Submissions open 9th Apr. Target: 250K impressions." }
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
      { program: "AI for Creatives", activated: 393, graduated: 64, rate: "16.28%", dates: "May 5 - Jul 28 '2025" },
      { program: "Content Creation", activated: 1310, graduated: 261, rate: "19.92%", dates: "May 5 - Jul 28 '2025" },
      { program: "Graphic Design", activated: 1396, graduated: 376, rate: "26.93%", dates: "May 5 - Jul 28 '2025" },
      { program: "Music & Audio", activated: 286, graduated: 86, rate: "30.07%", dates: "May 5 - Jul 28 '2025" },
    ],
    ctlsName: 'Creative Tech Lite Specialization Cohort 1',
    ctlsData: [
      { program: "AI for Creatives", activated: 383, graduated: 173, rate: "45.17%", dates: "Aug 18 - Dec 15 '2025" },
      { program: "Content Creation", activated: 709, graduated: 348, rate: "49.08%", dates: "Aug 18 - Dec 15 '2025" },
      { program: "Graphic Design", activated: 929, graduated: 420, rate: "45.21%", dates: "Aug 18 - Dec 15 '2025" },
      { program: "Music & Audio", activated: 247, graduated: 121, rate: "48.99%", dates: "Aug 18 - Dec 15 '2025" },
    ]
  },
  {
    id: 'group2',
    pfName: 'Professional Foundations Cohort 10',
    pfData: [
      { program: "AI for Creatives", activated: 400, graduated: 36, rate: "9.00%", dates: "Jun 30 - Sep 22 '2025" },
      { program: "Content Creation", activated: 1346, graduated: 200, rate: "14.86%", dates: "Jun 30 - Sep 22 '2025" },
      { program: "Graphic Design", activated: 1556, graduated: 249, rate: "16.00%", dates: "Jun 30 - Sep 22 '2025" },
      { program: "Music & Audio", activated: 347, graduated: 61, rate: "17.58%", dates: "Jun 30 - Sep 22 '2025" },
    ],
    ctlsName: 'Creative Tech Lite Specialization Cohort 2',
    ctlsData: [
      { program: "AI for Creatives", activated: 291, graduated: 75, rate: "25.77%", dates: "Oct 13 - Feb 23 '2026" },
      { program: "Content Creation", activated: 551, graduated: 192, rate: "34.85%", dates: "Oct 13 - Feb 23 '2026" },
      { program: "Graphic Design", activated: 619, graduated: 204, rate: "32.96%", dates: "Oct 13 - Feb 23 '2026" },
      { program: "Music & Audio", activated: 167, graduated: 68, rate: "40.72%", dates: "Oct 13 - Feb 23 '2026" },
    ]
  },
  {
    id: 'group3',
    pfName: 'Professional Foundations Cohort 11',
    pfData: [
      { program: "Content Creation", activated: 1214, graduated: 189, rate: "15.57%", dates: "Sep 22 - Dec 15 '2025" },
      { program: "Graphic Design", activated: 1288, graduated: 240, rate: "18.63%", dates: "Sep 22 - Dec 15 '2025" },
    ],
    pfShow2025: true,
    ctlsName: 'Creative Tech Lite Specialization Cohort 3',
    ctlsData: [
      { program: "Content Creation", activated: 476, graduated: "Pending Graduation", rate: "N/A", dates: "Jan 12 - May 18 '2026" },
      { program: "Graphic Design", activated: 373, graduated: "Pending Graduation", rate: "N/A", dates: "Jan 12 - May 18 '2026" },
    ],
    ctlsShow2025: false,  // started Jan 2026 — 2026 tab only
  },
  {
    id: 'group4',
    pfName: 'Professional Foundations Cohort 12 – New Short-Course Structure',
    pfData: [
      { program: "Content Creation", activated: 432, graduated: 0, rate: "0.00%", dates: "Feb 23 - May 11 '2026" },
      { program: "Graphic Design", activated: 544, graduated: 0, rate: "0.00%", dates: "Feb 23 - May 11 '2026" },
    ],
    pfShow2025: false,    // started Feb 2026 — 2026 tab only
    ctlsName: null,
    ctlsData: [],
    ctlsShow2025: false,
  }
];

// --- COMPONENTS & STYLES ---

const Card = ({ children, className = "", style = {} }) => (
  <div 
    className={`bg-white rounded-2xl shadow-lg border border-slate-100/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-slate-200 ${className}`}
    style={style}
  >
    {children}
  </div>
);

const PROGRAM_COLORS = {
  "AI for Creatives": "#3b82f6", 
  "Content Creation": "#8b5cf6", 
  "Graphic Design": "#f43f5e",   
  "Music & Audio": "#10b981",    
};

const TooltipStyle = {
  borderRadius: '8px', 
  border: 'none', 
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  fontSize: '12px',
  padding: '8px 12px'
};

const CohortSection = ({ title, data, bgColor }) => {
  const [expanded, setExpanded] = React.useState(false);

  const pieData = data
    .filter(d => typeof d.activated === 'number')
    .map(d => ({ name: d.program, value: d.activated }));

  const gradData = data
    .filter(d => typeof d.graduated === 'number')
    .map(d => ({ name: d.program, value: d.graduated }));

  const rateData = data
    .filter(d => d.rate !== 'N/A')
    .map(d => ({ name: d.program, value: parseFloat(d.rate.replace('%', '')) }));

  const totalActivated = pieData.reduce((acc, curr) => acc + curr.value, 0);
  const totalGraduated = gradData.reduce((acc, curr) => acc + curr.value, 0);

  const averageRate = (totalActivated > 0 && gradData.length > 0)
    ? ((totalGraduated / totalActivated) * 100).toFixed(2) + '%'
    : 'N/A';

  const startDate = data.length > 0 && data[0].dates ? data[0].dates.split(' - ')[0] : null;
  const endDate   = data.length > 0 && data[0].dates ? data[0].dates.split(' - ')[1] : null;

  const allPending = data.length > 0 && data.every(d => d.graduated === 'Pending Graduation');
  const allZeroGrad = data.length > 0 && data.every(d => typeof d.graduated === 'number' && d.graduated === 0);
  const status = allPending ? 'In Progress' : allZeroGrad ? 'Just Started' : 'Completed';
  const statusStyle = status === 'Completed'
    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    : status === 'In Progress'
    ? 'bg-amber-100 text-amber-700 border border-amber-200'
    : 'bg-blue-100 text-blue-700 border border-blue-200';

  return (
    <div className="flex flex-col border-b border-slate-100 last:border-0">
      <div className={`px-8 py-6 border-y border-slate-200 ${bgColor}`}>

        {/* ── Main header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex flex-col justify-center">
              <div className="w-1.5 h-12 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 rounded-full"></div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-slate-900 text-lg leading-tight">{title}</h4>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusStyle}`}>
                  {status}
                </span>
              </div>
              {startDate && (
                <div className="mt-1.5 text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  {startDate}
                  {endDate && <><span className="text-slate-300 mx-0.5">→</span><span>{endDate}</span></>}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-right">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Activated</span>
                <span className="text-2xl font-bold text-slate-900">{totalActivated.toLocaleString()}</span>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Graduated</span>
                <span className="text-2xl font-bold text-emerald-600">{totalGraduated.toLocaleString()}</span>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg. Rate</span>
                <span className="text-2xl font-bold text-blue-600">{averageRate}</span>
              </div>
            </div>

            {/* Expand / collapse insight toggle */}
            <button
              onClick={() => setExpanded(v => !v)}
              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 hover:bg-white border border-slate-200 text-slate-500 hover:text-slate-700 text-xs font-semibold transition-all shadow-sm"
              title="Show per-program insights"
            >
              <span className="hidden sm:inline">{expanded ? 'Hide' : 'Details'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Per-program insight panel (toggles open/close) ── */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: expanded ? '400px' : '0px' }}
        >
          <div className="pt-4 mt-4 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.map((row) => {
              const isPending = row.graduated === 'Pending Graduation';
              const isNumGrad = typeof row.graduated === 'number';
              const rowStatus = isPending ? 'In Progress' : isNumGrad && row.graduated > 0 ? 'Completed' : 'Just Started';
              const rowStatusColor = rowStatus === 'Completed' ? 'text-emerald-600' : rowStatus === 'In Progress' ? 'text-amber-500' : 'text-blue-500';
              return (
                <div key={row.program} className="bg-white/80 rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: PROGRAM_COLORS[row.program] || '#ccc' }}></div>
                    <span className="text-sm font-bold text-slate-800 leading-tight">{row.program}</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {row.dates && (
                      <div className="flex justify-between items-start">
                        <span className="text-slate-400 font-medium">Period</span>
                        <span className="text-slate-600 font-semibold text-right ml-2 leading-tight">{row.dates}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Activated</span>
                      <span className="text-slate-700 font-semibold">
                        {typeof row.activated === 'number' ? row.activated.toLocaleString() : row.activated}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Graduated</span>
                      <span className={`font-semibold ${rowStatusColor}`}>
                        {isPending ? 'In Progress' : isNumGrad ? row.graduated.toLocaleString() : row.graduated}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Rate</span>
                      <span className={`font-bold ${row.rate === 'N/A' ? 'text-slate-400' : 'text-blue-600'}`}>{row.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Status</span>
                      <span className={`font-semibold ${rowStatusColor}`}>{rowStatus}</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
                {/* Changed column header to Activated */}
                <th className="px-6 py-4 font-semibold text-right">Activated</th>
                <th className="px-6 py-4 font-semibold text-right">Graduated</th>
                <th className="px-6 py-4 font-semibold text-right">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: PROGRAM_COLORS[row.program] || '#ccc' }}></div>
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{row.program}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{row.dates}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {typeof row.activated === 'number' 
                      ? <span className="font-semibold text-slate-800">{row.activated.toLocaleString()}</span>
                      : <span className="text-slate-400 italic text-sm">{row.activated}</span>
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
          
          {/* Activated Donut Chart */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-100 shadow-md hover:shadow-lg transition-shadow">
            <h5 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-3 text-center">Activated Metric</h5>
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
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-sm font-bold text-slate-700">{totalActivated.toLocaleString()}</span>
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
          <div className="flex items-center gap-4 min-w-fit">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition"></div>
              <img 
                src={logo} 
                alt="Company Logo" 
                className="relative w-12 h-12 object-contain rounded-xl shadow-xl brightness-0 invert" 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/48?text=Logo" }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight leading-tight"><span className="text-white font-bold"></span><span className="text-slate-300"> Creative Dashboard</span></h1>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Performance Analytics</span>
            </div>
          </div>

          <div className="flex-1 hidden lg:block"></div>

          {/* Last updated badge — auto-set at build time */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/30 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="uppercase tracking-wider font-medium">Data as of</span>
            <span className="text-slate-200 font-semibold">{__BUILD_DATE__}</span>
          </div>

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

          <a
            href={import.meta.env.VITE_SHEETS_URL}
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

        {currentPage === '2025' && (
          <>
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-slate-900">2025 Key Metrics Overview</h2>
              <p className="text-slate-500 mt-2 text-base">Operational KPIs and Weekly Performance Tracking</p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData2025.map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <Card 
                      key={idx} 
                      className="p-6 flex flex-col justify-between hover:shadow-xl transition-all border-l-4 group"
                      style={{ borderLeftColor: kpi.borderColor, background: kpi.cardBg }} 
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{kpi.title}</span>
                        <div className={`p-3 rounded-xl ${kpi.bg} shadow-md`}>
                          <Icon className={`w-5 h-5 ${kpi.color}`} />
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
                  );
                })}
              </div>

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

              <Card className="p-0 overflow-hidden flex flex-col shadow-xl">
                <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-blue-50 via-slate-50 to-white flex flex-col items-center text-center">
  <div className="flex items-center justify-center mb-2">
    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
    <h3 className="text-2xl font-bold text-slate-900">Cohort Performance Tracking</h3>
  </div>
  <p className="text-sm text-slate-500 mt-2 max-w-2xl">All learner progression from Professional Foundations directly into Creative Tech Lite Specializations.</p>
</div>
                
                <div className="bg-white">
                  {cohortGroups.map((group) => {
                    const showPF   = group.pfShow2025   !== false && group.pfData   && group.pfData.length   > 0;
                    const showCTLS = group.ctlsShow2025 !== false && group.ctlsData && group.ctlsData.length > 0;
                    if (!showPF && !showCTLS) return null;
                    return (
                      <div key={group.id} className="pb-6 border-b-8 border-slate-100 last:border-0 last:pb-0">
                        {showPF   && <CohortSection title={group.pfName}   data={group.pfData}   bgColor="bg-slate-50" />}
                        {showCTLS && <CohortSection title={group.ctlsName} data={group.ctlsData} bgColor="bg-blue-50/50" />}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </>
        )}

        {currentPage === '2026' && (
          <>
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-slate-900">2026 Key Metrics Overview</h2>
              <p className="text-slate-500 mt-2 text-base">Operational KPIs and Weekly Performance Tracking</p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData2026.map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <Card 
                      key={idx} 
                      className="p-6 flex flex-col justify-between hover:shadow-xl transition-all border-l-4 group"
                      style={{ borderLeftColor: kpi.borderColor, background: kpi.cardBg }} 
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{kpi.title}</span>
                        <div className={`p-3 rounded-xl ${kpi.bg} shadow-md`}>
                          <Icon className={`w-5 h-5 ${kpi.color}`} />
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
                  );
                })}
              </div>

              <Card className="p-0 overflow-hidden flex flex-col shadow-xl">
                <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-violet-50 via-slate-50 to-white flex flex-col items-center text-center">
  <div className="flex items-center justify-center mb-2">
    <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-violet-600 rounded-full mr-3"></div>
    <h3 className="text-2xl font-bold text-slate-900">Weekly Performance Tracking</h3>
  </div>
  <p className="text-sm text-slate-500 mt-2 max-w-2xl">Weekly breakdown of progress against key operational targets.</p>
</div>
                
                <div className="bg-white overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse min-w-[950px]">
                    <thead>
                      <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 font-semibold">Metric</th>
                        <th className="px-6 py-4 font-semibold">Target</th>
                        <th className="px-6 py-4 font-semibold">Current (This Week)</th>
                        <th className="px-6 py-4 font-semibold">Previous (Last Week)</th>
                        <th className="px-6 py-4 font-semibold">% WoW Change</th>
                        <th className="px-6 py-4 font-semibold w-48">% Progress</th>
                        <th className="px-6 py-4 font-semibold w-64">Comments</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {weeklyMetricsData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors duration-150">
                          <td className="px-6 py-4 font-medium text-slate-900 text-sm">
                            {row.metric}
                          </td>
                          <td className="px-6 py-4 text-slate-600 text-sm font-medium">
                            {row.target}
                          </td>
                          <td className="px-6 py-4 text-slate-800 font-semibold text-sm">
                            {row.current}
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm">
                            {row.previous}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${row.wow === '0%' || row.wow === '0' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-700'}`}>
                              {row.wow}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-slate-700 w-10">{row.progress}%</span>
                              <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${row.progress > 0 ? 'bg-violet-500' : 'bg-transparent'}`} 
                                  style={{ width: `${Math.min(row.progress, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-xs leading-relaxed">
                            {row.comments.split('\n').map((line, i) => (
                              <div key={i} className="mb-0.5 last:mb-0">{line}</div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              
              <Card className="p-0 overflow-hidden flex flex-col shadow-xl">
                <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-blue-50 via-slate-50 to-white flex flex-col items-center text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
                    <h3 className="text-2xl font-bold text-slate-900">Cohort Performance Tracking</h3>
                  </div>
                  <p className="text-sm text-slate-500 mt-2 max-w-2xl">Learner progression across CTLS Cohorts 2 & 3 and Professional Foundations Cohort 12.</p>
                </div>
                
                <div className="bg-white">
                  {cohortGroups.slice(1).map((group) => {
                    const hasCtls = group.ctlsData && group.ctlsData.length > 0;
                    return (
                      <div key={group.id} className="pb-6 border-b-8 border-slate-100 last:border-0 last:pb-0">
                        {hasCtls
                          ? <CohortSection title={group.ctlsName} data={group.ctlsData} bgColor="bg-emerald-50/50" />
                          : <CohortSection title={group.pfName} data={group.pfData} bgColor="bg-amber-50/50" />
                        }
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}