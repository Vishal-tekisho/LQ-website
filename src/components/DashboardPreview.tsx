import { useState, type ElementType } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useInViewPause } from '@/lib/useInViewPause';
import {
  LayoutDashboard, Users, Calendar, Mail,
  Bell, TrendingUp, ChevronDown, ArrowRight, Bot,
  Phone, Clock, CheckCircle, AlertCircle, Building2,
  Activity, Video
} from 'lucide-react';

type SidebarView = 'Dashboard' | 'Contacts' | 'Meetings' | 'Emails' | 'Voice' | 'Voice Agents' | 'Leads' | 'Credit Usage';

const navItems: { label: string; nav: SidebarView; icon: ElementType }[] = [
  { label: 'Dashboard', nav: 'Dashboard', icon: LayoutDashboard },
  { label: 'Email', nav: 'Emails', icon: Mail },
  { label: 'Meetings', nav: 'Meetings', icon: Video },
  { label: 'Voice', nav: 'Voice Agents', icon: Phone },
  { label: 'Contacts', nav: 'Contacts', icon: Users },
];

/* ── Dummy data ─────────────────────────────────────────── */
const contacts = [
  { name: 'Maya Voss', company: 'NovaSpark Inc', email: 'm.voss@novaspark.io', status: 'Hot', last: '2 hrs ago' },
  { name: 'Tyler Reeves', company: 'BlueOrbit Co', email: 't.reeves@blueorbit.co', status: 'Warm', last: '5 hrs ago' },
  { name: 'Sara Lindt', company: 'Quantex Labs', email: 's.lindt@quantexlabs.io', status: 'Cold', last: '1 day ago' },
  { name: 'Jordan Blake', company: 'Celeron AI', email: 'j.blake@celeronai.io', status: 'Hot', last: '3 hrs ago' },
  { name: 'Nia Weston', company: 'Orion Ventures', email: 'n.weston@orionvc.io', status: 'Warm', last: '2 days ago' },
];

const meetings = [
  { company: 'NovaSpark Inc', time: 'Today, 3:00 PM', type: 'Product Demo', status: 'Confirmed' },
  { company: 'BlueOrbit Co', time: 'Today, 5:30 PM', type: 'Follow-up Call', status: 'Confirmed' },
  { company: 'Quantex Labs', time: 'Mar 6, 10:00 AM', type: 'Discovery Call', status: 'Pending' },
  { company: 'Helion Corp', time: 'Mar 6, 2:00 PM', type: 'Product Demo', status: 'Confirmed' },
  { company: 'Archon Systems', time: 'Mar 7, 11:00 AM', type: 'Closing Call', status: 'Pending' },
];

const emails = [
  { recipient: 'Maya Voss', subject: 'Follow-up: LeadQ.ai Demo', sent: '2 hrs ago', opened: true },
  { recipient: 'Tyler Reeves', subject: 'Your AI-powered pipeline is ready', sent: '4 hrs ago', opened: false },
  { recipient: 'Sara Lindt', subject: 'Quick question about your goals', sent: '6 hrs ago', opened: true },
  { recipient: 'Jordan Blake', subject: 'Case study: 3x leads in 30 days', sent: 'Yesterday', opened: true },
  { recipient: 'Nia Weston', subject: 'Personalised outreach — LeadQ.ai', sent: 'Yesterday', opened: false },
];

const voiceAgents = [
  { name: 'Outbound SDR Agent', status: 'Active', calls: 124, success: '31%', queue: 18 },
  { name: 'Follow-up Caller', status: 'Active', calls: 89, success: '44%', queue: 7 },
  { name: 'Re-engagement Bot', status: 'Idle', calls: 56, success: '28%', queue: 0 },
  { name: 'Appointment Setter', status: 'Active', calls: 203, success: '52%', queue: 22 },
];


const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    Hot: 'bg-red-100 text-red-600',
    Warm: 'bg-yellow-100 text-yellow-700',
    Cold: 'bg-purple-100 text-purple-600',
    Confirmed: 'bg-green-100 text-green-600',
    Pending: 'bg-yellow-100 text-yellow-700',
    Active: 'bg-green-100 text-green-600',
    Idle: 'bg-gray-100 text-gray-500',
    Proposal: 'bg-purple-100 text-purple-600',
    Negotiation: 'bg-purple-100 text-purple-600',
    Discovery: 'bg-purple-100 text-purple-600',
    'Closed Won': 'bg-green-100 text-green-600',
    Outreach: 'bg-orange-100 text-orange-600',
  };
  return map[s] ?? 'bg-gray-100 text-gray-500';
};

/* ─────────── LINE CHART (SVG) ─────────── */
const perfPoints = [
  { month: 'Jan25', val: 15 },
  { month: 'Feb25', val: 10 },
  { month: 'Mar25', val: 18 },
  { month: 'Apr25', val: 12 },
  { month: 'May25', val: 22 },
  { month: 'Jun25', val: 45 },
  { month: 'Jul25', val: 52 },
  { month: 'Aug25', val: 58 },
  { month: 'Sep25', val: 55 },
  { month: 'Oct25', val: 65 },
  { month: 'Nov25', val: 62 },
  { month: 'Dec25', val: 82 },
];

function LineChart() {
  const W = 360, H = 120, pad = { top: 16, right: 10, bottom: 24, left: 32 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxVal = 100;
  const stepX = chartW / (perfPoints.length - 1);

  const pts = perfPoints.map((p, i) => ({
    x: pad.left + i * stepX,
    y: pad.top + chartH - (p.val / maxVal) * chartH,
    label: p.month,
  }));

  const polyline = pts.map(p => `${p.x},${p.y}`).join(' ');
  const areaPath = `M${pts[0].x},${pad.top + chartH} ` +
    pts.map(p => `L${p.x},${p.y}`).join(' ') +
    ` L${pts[pts.length - 1].x},${pad.top + chartH} Z`;

  const yTicks = [0, 20, 40, 60, 80, 100];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B6FD4" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#7B6FD4" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {/* Y grid lines */}
      {yTicks.map(t => {
        const y = pad.top + chartH - (t / maxVal) * chartH;
        return (
          <g key={t}>
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="#e5e7eb" strokeWidth="0.8" />
            <text x={pad.left - 4} y={y + 3.5} textAnchor="end" fontSize="7" fill="#9ca3af">{t}</text>
          </g>
        );
      })}
      {/* Area fill */}
      <path d={areaPath} fill="url(#areaGrad)" />
      {/* Line */}
      <polyline points={polyline} fill="none" stroke="#7B6FD4" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      {/* Dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#7B6FD4" />
      ))}
      {/* X labels — every other */}
      {pts.filter((_, i) => i % 2 === 0).map((p, i) => (
        <text key={i} x={p.x} y={H - 2} textAnchor="middle" fontSize="6.5" fill="#9ca3af">{p.label}</text>
      ))}
      {/* Axis labels */}
      <text x={7} y={pad.top + chartH / 2} textAnchor="middle" fontSize="6.5" fill="#9ca3af"
        transform={`rotate(-90, 7, ${pad.top + chartH / 2})`}>Performance</text>
      <text x={W / 2} y={H} textAnchor="middle" fontSize="6.5" fill="#9ca3af">Month</text>
    </svg>
  );
}

/* ─────────── CALENDAR (January 2026) ─────────── */
function MiniCalendar() {
  const [month, setMonth] = useState(0); // 0 = Jan 2026
  const monthNames = ['JANUARY 2026', 'FEBRUARY 2026', 'MARCH 2026'];
  const daysInMonth = [31, 28, 31];
  const firstDays = [4, 0, 0]; // Jan 2026 starts Thursday (4), Feb starts Sunday (0), Mar starts Sunday (0)

  const days = Array.from({ length: daysInMonth[month] }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDays[month] });

  const today = 1; // Highlight day 1 in Jan
  const redDay = 13;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-gray-700 tracking-wide">{monthNames[month]}</span>
        <div className="flex gap-1">
          <button
            onClick={() => setMonth(m => Math.max(0, m - 1))}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-sm"
          >‹</button>
          <button
            onClick={() => setMonth(m => Math.min(2, m + 1))}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-sm"
          >›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-x-0.5 gap-y-0.5 mb-0.5">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
          <div key={d} className="text-center text-[6.5px] font-semibold text-gray-400 py-0.5">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-x-0.5 gap-y-0.5">
        {blanks.map((_, i) => <div key={`b${i}`} />)}
        {days.map(day => {
          const isToday = month === 0 && day === today;
          const isRed = month === 0 && day === redDay;
          const col = (firstDays[month] + day - 1) % 7;
          const isWeekend = col === 0 || col === 6;
          return (
            <div
              key={day}
              className={`w-full aspect-square flex items-center justify-center rounded-full text-[8px] font-medium cursor-pointer transition-all
                ${isToday ? 'bg-[#7B6FD4] text-white' : isRed ? 'text-red-500' : isWeekend ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────── MAIN DASHBOARD VIEW ─────────── */
function DashboardView() {
  const [dismissed] = useState<number[]>([]);

  const priorities = [
    {
      dot: 'bg-red-500',
      bg: 'bg-red-50',
      title: '2 upcoming meetings',
      sub: 'You have 2 meetings scheduled',
      btnColor: 'text-[#7B6FD4] font-semibold underline underline-offset-2',
    },
    {
      dot: 'bg-green-500',
      bg: 'bg-green-50',
      title: '2 upcoming meetings',
      sub: 'You have 2 meetings scheduled',
      btnColor: 'text-purple-600 font-semibold underline underline-offset-2',
    },
    {
      dot: 'bg-orange-400',
      bg: 'bg-orange-50',
      title: '2 upcoming meetings',
      sub: 'You have 2 meetings scheduled',
      btnColor: 'text-purple-600 font-semibold underline underline-offset-2',
    },
  ].filter((_, i) => !dismissed.includes(i));

  const statCards = [
    {
      icon: (
        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
          <Users size={15} className="text-[#7B6FD4]" />
        </div>
      ),
      label: 'Contacts',
      value: '10',
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
          <Video size={15} className="text-green-600" />
        </div>
      ),
      label: 'Meetings Completed',
      value: '28',
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
          <Mail size={15} className="text-pink-600" />
        </div>
      ),
      label: 'Emails Sent',
      value: '2',
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
          <Calendar size={15} className="text-orange-500" />
        </div>
      ),
      label: 'Upcoming Meetings',
      value: '2',
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
          <TrendingUp size={15} className="text-[#7B6FD4]" />
        </div>
      ),
      label: 'Conversion Rate',
      value: '40%',
    },
  ];

  return (
    <div className="flex gap-4 h-full">
      {/* Left column */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        {/* Stat cards */}
        <div className="grid grid-cols-5 gap-2">
          {statCards.map(({ icon, label, value }) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              {icon}
              <div>
                <div className="text-[10px] text-gray-500 leading-tight mb-0.5">{label}</div>
                <div className="text-lg font-bold text-gray-900 leading-none">{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Priority Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-gray-800">Priority Actions</span>
          </div>
          <div className="flex flex-col gap-2">
            {priorities.map((p, i) => (
              <div key={i} className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${p.bg} border border-transparent`}>
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${p.dot} shrink-0`} />
                  <div>
                    <div className="text-xs font-semibold text-gray-800">{p.title}</div>
                    <div className="text-[10px] text-gray-500">{p.sub}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`text-xs ${p.btnColor} whitespace-nowrap`}>
                    View Contacts
                  </button>
                </div>
              </div>
            ))}
            {priorities.length === 0 && (
              <div className="text-center py-3 text-gray-400 text-xs">All actions resolved ✓</div>
            )}
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-800">Monthly Performance</span>
          </div>
          <LineChart />
        </div>
      </div>

      {/* Right column */}
      <div className="w-56 shrink-0 flex flex-col gap-3">
        {/* Calendar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <MiniCalendar />
        </div>

        {/* Credit Usage */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-800">Credit Usage</span>
            <button className="text-[10px] text-[#7B6FD4] font-semibold hover:underline">Upgrade →</button>
          </div>
          {/* Bar */}
          <div className="mb-1.5">
            <div className="text-[10px] text-gray-500 mb-1">2,340 used</div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <m.div
                initial={{ width: 0 }}
                animate={{ width: '46.8%' }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
              />
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5 text-right">of 5,000</div>
          </div>
          {/* Breakdown grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3 border-t border-gray-100 pt-3">
            {[
              { label: 'Research', val: '890' },
              { label: 'Email', val: '450' },
              { label: 'Voice', val: '780' },
              { label: 'Meetings', val: '220' },
            ].map(({ label, val }) => (
              <div key={label}>
                <div className="text-[9px] text-gray-400 font-medium">{label}:</div>
                <div className="text-[11px] font-bold text-gray-700">{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── OTHER VIEWS ─────────── */
function ContactsView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contacts</h2>
          <p className="text-sm text-gray-500 mt-0.5">41 total contacts in your pipeline.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm bg-[#7B6FD4] hover:bg-[#A89FE0] text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
          Add Contact
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-5 gap-4 px-4 py-2 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
          <span>Name</span><span>Company</span><span>Email</span><span>Status</span><span>Last Activity</span>
        </div>
        {contacts.map((c, i) => (
          <m.div
            key={c.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer text-sm"
          >
            <span className="text-gray-900 font-medium">{c.name}</span>
            <div className="flex items-center gap-1.5 text-gray-500"><Building2 size={12} />{c.company}</div>
            <span className="text-gray-500 truncate">{c.email}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${statusBadge(c.status)}`}>{c.status}</span>
            <div className="flex items-center gap-1 text-gray-400"><Clock size={11} />{c.last}</div>
          </m.div>
        ))}
      </div>
    </div>
  );
}

function MeetingsView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Meetings</h2>
          <p className="text-sm text-gray-500 mt-0.5">38 meetings this month. 2 scheduled today.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm bg-[#7B6FD4] hover:bg-[#A89FE0] text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
          Schedule
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
          <span>Company</span><span>Time</span><span>Type</span><span>Status</span>
        </div>
        {meetings.map((meeting, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer text-sm"
          >
            <div className="flex items-center gap-1.5 text-gray-900 font-medium"><Building2 size={12} className="text-gray-400 shrink-0" />{meeting.company}</div>
            <div className="flex items-center gap-1 text-gray-500"><Clock size={11} className="shrink-0" />{meeting.time}</div>
            <span className="text-gray-500">{meeting.type}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${statusBadge(meeting.status)}`}>{meeting.status}</span>
          </m.div>
        ))}
      </div>
    </div>
  );
}

function EmailsView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Emails</h2>
          <p className="text-sm text-gray-500 mt-0.5">33 sent this month. AI-drafted outreach.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm bg-[#7B6FD4] hover:bg-[#A89FE0] text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
          Compose
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
          <span>Recipient</span><span>Subject</span><span>Sent</span><span>Opened</span>
        </div>
        {emails.map((e, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer text-sm"
          >
            <span className="text-gray-900 font-medium">{e.recipient}</span>
            <span className="text-gray-500 truncate">{e.subject}</span>
            <div className="flex items-center gap-1 text-gray-400"><Clock size={11} />{e.sent}</div>
            <div className="flex items-center gap-1.5">
              {e.opened
                ? <><CheckCircle size={13} className="text-green-500" /><span className="text-green-600 text-xs">Opened</span></>
                : <><AlertCircle size={13} className="text-gray-400" /><span className="text-gray-400 text-xs">Not opened</span></>}
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
}

function VoiceAgentsView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Voice Agents</h2>
          <p className="text-sm text-gray-500 mt-0.5">4 agents deployed. 3 currently active.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm bg-[#7B6FD4] hover:bg-[#A89FE0] text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
          <Bot size={14} /> New Agent
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {voiceAgents.map((a, i) => (
          <m.div
            key={a.name}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Phone size={14} className="text-[#7B6FD4]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{a.name}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusBadge(a.status)}`}>{a.status}</span>
                </div>
              </div>
              {a.status === 'Active' && (
                <m.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400 mt-1"
                />
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><div className="text-base font-bold text-gray-900">{a.calls}</div><div className="text-[10px] text-gray-400">Calls</div></div>
              <div><div className="text-base font-bold text-green-600">{a.success}</div><div className="text-[10px] text-gray-400">Success</div></div>
              <div><div className="text-base font-bold text-yellow-600">{a.queue}</div><div className="text-[10px] text-gray-400">Queue</div></div>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────── */
export default function DashboardPreview() {
  const [activeNav, setActiveNav] = useState<SidebarView>('Dashboard');
  const { ref } = useInViewPause();

  return (
    <section ref={ref} id="dashboard" className="relative z-10 pt-16 pb-16 px-4">
      {/* Section heading */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4"
        >
          A Living{' '}
          <span className="text-[#A89FE0]">
            Dashboard
          </span>
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-leadq-silver"
        >
          Your AI command center for pipeline health, team activity, and next-best actions in one view.
        </m.p>
      </div>

      {/* Dashboard panel */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        {/* Responsive scaling wrapper */}
        <div className="relative overflow-hidden h-[220px] sm:h-[370px] md:h-[460px] lg:h-[460px] xl:h-[490px] 2xl:h-[560px] flex justify-center">
          <div className="min-w-[960px] lg:min-w-0 origin-top scale-[0.35] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.75] xl:scale-[0.8] 2xl:scale-[0.9] lg:origin-top flex justify-center" style={{ width: 1100 }}>

            {/* Browser chrome */}
            <div className="rounded-2xl overflow-hidden border border-gray-300 shadow-2xl flex flex-col bg-white" style={{ height: 600, width: 1100 }}>

              {/* Title bar – dark */}
              <div className="bg-[#1a1d3a] shrink-0 border-b border-white/10 px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/5 border border-white/10 rounded-md px-10 py-0.5 text-[11px] text-slate-400 font-mono">
                    app.leadq.ai/dashboard
                  </div>
                </div>
                <Bell size={14} className="text-slate-500" />
              </div>

              {/* App shell */}
              <div className="flex flex-1 min-h-0 w-full relative">

                {/* ── Sidebar (dark navy, icon+label stack) ── */}
                <div className="w-[72px] shrink-0 bg-[#1a1d3a] flex flex-col items-center py-4 gap-1">
                  {/* Logo */}
                  <div className="mb-4 flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B6FD4] to-[#A89FE0] flex items-center justify-center">
                      <Activity size={15} className="text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-[8px] font-bold text-white">LeadQ.ai</span>
                  </div>

                  {navItems.map(({ label, nav, icon: Icon }) => {
                    const active = activeNav === nav;
                    return (
                      <button
                        key={nav}
                        onClick={() => setActiveNav(nav)}
                        className={`w-full flex flex-col items-center gap-0.5 py-2.5 px-1 transition-all
                          ${active
                            ? 'text-white bg-white/10 rounded-lg mx-1'
                            : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                        <span className="text-[8px] font-medium">{label}</span>
                      </button>
                    );
                  })}

                  {/* Bottom logout icon */}
                  <div className="mt-auto">
                    <button className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-300 py-2 px-1 transition-colors">
                      <ArrowRight size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>

                {/* ── Main area (light background) ── */}
                <div className="flex-1 min-w-0 bg-[#f4f6fb] flex flex-col min-h-0">

                  {/* Top header bar */}
                  <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between shrink-0">
                    <h1 className="text-base font-bold text-gray-900">Dashboard</h1>
                    <div className="flex items-center gap-2.5">
                      <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition-colors font-medium">
                        This Month <ChevronDown size={11} />
                      </button>
                      <button className="text-xs bg-[#7B6FD4] hover:bg-[#A89FE0] text-white px-3 py-1.5 rounded-lg transition-colors font-semibold">
                        Sample Button
                      </button>
                      <div className="flex items-center gap-1.5 ml-1">
                        <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                          <Bell size={13} className="text-gray-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-1">
                        <div className="text-right">
                          <div className="text-[11px] font-semibold text-gray-900">Alex Johnson</div>
                          <div className="text-[9px] text-gray-400">alex@leadq.ai</div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A89FE0] to-[#7B6FD4] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                          AJ
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content pane */}
                  <div className="flex-1 min-w-0 min-h-0 p-5 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                      <m.div
                        key={activeNav}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                        className="h-full"
                      >
                        {activeNav === 'Dashboard' && <DashboardView />}
                        {activeNav === 'Contacts' && <ContactsView />}
                        {activeNav === 'Meetings' && <MeetingsView />}
                        {activeNav === 'Emails' && <EmailsView />}
                        {activeNav === 'Voice Agents' && <VoiceAgentsView />}
                      </m.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* end scale wrapper */}
        </div>{/* end overflow container */}
      </m.div>
    </section>
  );
}
