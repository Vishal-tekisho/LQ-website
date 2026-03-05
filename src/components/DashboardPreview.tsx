import { useState, type ElementType } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useInViewPause } from '@/lib/useInViewPause';
import {
  LayoutDashboard, Users, Calendar, Mail, Mic, Target, CreditCard,
  Bell, TrendingUp, ChevronDown, X, ArrowRight, Bot,
  Phone, Clock, CheckCircle, AlertCircle, Building2,
  BarChart3, Zap, Activity
} from 'lucide-react';

type SidebarView = 'Dashboard' | 'Contacts' | 'Meetings' | 'Emails' | 'Voice Agents' | 'Leads' | 'Credit Usage';

const navItems: { label: SidebarView; icon: ElementType }[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Contacts', icon: Users },
  { label: 'Meetings', icon: Calendar },
  { label: 'Emails', icon: Mail },
  { label: 'Voice Agents', icon: Mic },
  { label: 'Leads', icon: Target },
  { label: 'Credit Usage', icon: CreditCard },
];

/* ── Dummy data ─────────────────────────────────────────── */
const contacts = [
  { name: 'Priya Sharma', company: 'Infosys Ltd', email: 'priya.s@infosys.com', status: 'Hot', last: '2 hrs ago' },
  { name: 'Rohan Mehta', company: 'Wipro Tech', email: 'rohan.m@wipro.com', status: 'Warm', last: '5 hrs ago' },
  { name: 'Anita Joshi', company: 'TCS Digital', email: 'anita.j@tcs.com', status: 'Cold', last: '1 day ago' },
  { name: 'Siddharth Rao', company: 'HCL Systems', email: 's.rao@hcl.com', status: 'Hot', last: '3 hrs ago' },
  { name: 'Kavya Nair', company: 'Zomato Corp', email: 'k.nair@zomato.com', status: 'Warm', last: '2 days ago' },
];

const meetings = [
  { company: 'Infosys Ltd', time: 'Today, 3:00 PM', type: 'Product Demo', status: 'Confirmed' },
  { company: 'Wipro Tech', time: 'Today, 5:30 PM', type: 'Follow-up Call', status: 'Confirmed' },
  { company: 'Salesforce India', time: 'Mar 6, 10:00 AM', type: 'Discovery Call', status: 'Pending' },
  { company: 'Razorpay', time: 'Mar 6, 2:00 PM', type: 'Product Demo', status: 'Confirmed' },
  { company: "BYJU'S", time: 'Mar 7, 11:00 AM', type: 'Closing Call', status: 'Pending' },
];

const emails = [
  { recipient: 'Priya Sharma', subject: 'Follow-up: LeadQ.ai Demo', sent: '2 hrs ago', opened: true },
  { recipient: 'Rohan Mehta', subject: 'Your AI-powered pipeline is ready', sent: '4 hrs ago', opened: false },
  { recipient: 'Anita Joshi', subject: 'Quick question about your goals', sent: '6 hrs ago', opened: true },
  { recipient: 'Siddharth Rao', subject: 'Case study: 3x leads in 30 days', sent: 'Yesterday', opened: true },
  { recipient: 'Kavya Nair', subject: 'Personalised outreach — LeadQ.ai', sent: 'Yesterday', opened: false },
];

const voiceAgents = [
  { name: 'Outbound SDR Agent', status: 'Active', calls: 124, success: '31%', queue: 18 },
  { name: 'Follow-up Caller', status: 'Active', calls: 89, success: '44%', queue: 7 },
  { name: 'Re-engagement Bot', status: 'Idle', calls: 56, success: '28%', queue: 0 },
  { name: 'Appointment Setter', status: 'Active', calls: 203, success: '52%', queue: 22 },
];

const leads = [
  { name: 'Priya Sharma', company: 'Infosys Ltd', stage: 'Proposal', score: 92, agent: 'Lead Qualifier' },
  { name: 'Rohan Mehta', company: 'Wipro Tech', stage: 'Negotiation', score: 78, agent: 'Email Composer' },
  { name: 'Siddharth Rao', company: 'HCL Systems', stage: 'Discovery', score: 65, agent: 'Lead Qualifier' },
  { name: 'Meera Kapoor', company: 'Paytm', stage: 'Closed Won', score: 95, agent: 'Meeting Scheduler' },
  { name: 'Arjun Singh', company: 'Flipkart', stage: 'Outreach', score: 54, agent: 'Data Enricher' },
];

const creditBreakdown = [
  { label: 'Meetings', icon: Calendar, used: 1012, total: 2000, color: 'bg-blue-400' },
  { label: 'Card Scanner', icon: CreditCard, used: 266, total: 500, color: 'bg-purple-400' },
  { label: 'Research', icon: BarChart3, used: 100, total: 500, color: 'bg-cyan-400' },
  { label: 'Emails', icon: Mail, used: 54, total: 200, color: 'bg-green-400' },
  { label: 'Voice Calls', icon: Phone, used: 388, total: 800, color: 'bg-orange-400' },
  { label: 'AI Enrichment', icon: Zap, used: 278, total: 1000, color: 'bg-yellow-400' },
];

const perfData = [
  { label: "Q1'24", contacts: 20, emails: 15, meetings: 10 },
  { label: "Q2'24", contacts: 35, emails: 25, meetings: 18 },
  { label: "Q3'24", contacts: 28, emails: 20, meetings: 14 },
  { label: "Q4'24", contacts: 45, emails: 38, meetings: 22 },
  { label: "Q1'25", contacts: 38, emails: 30, meetings: 19 },
  { label: "Q2'25", contacts: 52, emails: 42, meetings: 28 },
  { label: "Q3'25", contacts: 48, emails: 36, meetings: 26 },
  { label: "Q4'25", contacts: 60, emails: 50, meetings: 35 },
  { label: "Q1'26", contacts: 100, emails: 75, meetings: 55 },
];
const maxPerf = 100;

const calDays = Array.from({ length: 31 }, (_, i) => i + 1);
const firstDay = 0;
const dotDays = [5, 12, 19, 26];

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    Hot: 'bg-red-500/20 text-red-400',
    Warm: 'bg-yellow-500/20 text-yellow-400',
    Cold: 'bg-blue-500/20 text-blue-300',
    Confirmed: 'bg-green-500/20 text-green-400',
    Pending: 'bg-yellow-500/20 text-yellow-400',
    Active: 'bg-green-500/20 text-green-400',
    Idle: 'bg-slate-500/20 text-slate-400',
    Proposal: 'bg-blue-500/20 text-blue-300',
    Negotiation: 'bg-purple-500/20 text-purple-300',
    Discovery: 'bg-cyan-500/20 text-cyan-300',
    'Closed Won': 'bg-green-500/20 text-green-400',
    Outreach: 'bg-orange-500/20 text-orange-300',
  };
  return map[s] ?? 'bg-white/10 text-white/60';
};

/* ── View components ────────────────────────────────────── */

function DashboardView({ setView }: { setView: (v: SidebarView) => void }) {
  const [dismissed, setDismissed] = useState<number[]>([]);

  const allPriorities = [
    { dot: 'bg-red-500', title: 'Follow up with 1 hot lead', sub: '1 contact marked as hot — high conversion potential', btn: 'View Leads', nav: 'Leads' as SidebarView },
    { dot: 'bg-yellow-400', title: '2 upcoming meetings', sub: 'You have 2 meetings scheduled', btn: 'View Meetings', nav: 'Meetings' as SidebarView },
    { dot: 'bg-yellow-400', title: '8 warm leads to nurture', sub: '8 contacts show interest — keep engaging', btn: 'View Leads', nav: 'Leads' as SidebarView },
  ];
  const priorities = allPriorities.filter((_, i) => !dismissed.includes(i));

  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <p className="text-sm text-slate-400 mt-0.5">Welcome back — here's what needs your attention.</p>
          </div>
          <button className="flex items-center gap-1.5 text-sm text-slate-300 border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/5 transition-colors">
            Overall <ChevronDown size={14} />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {[
            { icon: Users, label: 'Contacts', value: '41' },
            { icon: Calendar, label: 'Meetings', value: '38' },
            { icon: Mail, label: 'Emails', value: '33' },
            { icon: Mic, label: 'Voice Agent', value: '0' },
            { icon: TrendingUp, label: 'Conversion Rate', value: '22%' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1.5">
              <Icon size={15} className="text-slate-400" strokeWidth={1.8} />
              <div className="text-lg font-bold text-white leading-none">{value}</div>
              <div className="text-[11px] text-slate-400 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={15} className="text-cyan-400" strokeWidth={2} />
            <span className="text-sm font-semibold text-white">Priority Actions</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded-full font-medium">AI Ranked</span>
          </div>
          <div className="space-y-2">
            {priorities.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`} />
                  <div>
                    <div className="text-sm font-medium text-white">{p.title}</div>
                    <div className="text-[11px] text-slate-400">{p.sub}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <button
                    onClick={() => setView(p.nav)}
                    className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    {p.btn} <ArrowRight size={11} />
                  </button>
                  <button
                    onClick={() => setDismissed(d => [...d, allPriorities.indexOf(p)])}
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            {priorities.length === 0 && (
              <div className="text-center py-4 text-slate-500 text-sm">All actions resolved ✓</div>
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Performance</span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">Overall</span>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {perfData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full flex flex-col justify-end gap-px" style={{ height: 80 }}>
                  {[
                    { val: d.contacts, color: 'bg-blue-500' },
                    { val: d.emails, color: 'bg-green-500' },
                    { val: d.meetings, color: 'bg-purple-500' },
                  ].map((bar, bi) => (
                    <m.div
                      key={bi}
                      initial={{ height: 0 }}
                      animate={{ height: `${(bar.val / maxPerf) * 80}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 + bi * 0.02 }}
                      className={`w-full rounded-sm ${bar.color} opacity-90`}
                    />
                  ))}
                </div>
                <span className="text-[9px] text-slate-500 font-medium">{d.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2">
            {[{ color: 'bg-blue-500', label: 'Contacts' }, { color: 'bg-green-500', label: 'Emails' }, { color: 'bg-purple-500', label: 'Meetings' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-sm ${l.color}`} />
                <span className="text-[11px] text-slate-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-52 shrink-0 flex flex-col gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">March 2026</span>
            <div className="flex gap-1">
              <button className="text-slate-500 hover:text-white p-0.5 transition-colors">‹</button>
              <button className="text-slate-500 hover:text-white p-0.5 transition-colors">›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} className="text-center text-[10px] text-slate-500 font-medium py-0.5">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {calDays.map(day => (
              <div key={day} className="relative flex flex-col items-center">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-medium cursor-pointer transition-colors
                  ${day === 4 ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}>
                  {day}
                </div>
                {dotDays.includes(day) && (
                  <span className="w-1 h-1 rounded-full bg-blue-400 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Credit Usage</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">98 used</span>
            <span className="text-xs text-slate-400">7,994 remaining</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-3">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '1.2%' }} />
          </div>
          <div className="space-y-2">
            {[
              { icon: Calendar, label: 'Meetings', credits: '1012 credits' },
              { icon: CreditCard, label: 'Card Scanner', credits: '266 credits' },
              { icon: BarChart3, label: 'Research', credits: '100 credits' },
              { icon: Mail, label: 'Emails', credits: '54 credits' },
            ].map(({ icon: Icon, label, credits }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon size={12} className="text-slate-400" strokeWidth={1.8} />
                  <span className="text-xs text-slate-300">{label}</span>
                </div>
                <span className="text-xs text-slate-400">{credits}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactsView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Contacts</h2>
          <p className="text-sm text-slate-400 mt-0.5">41 total contacts in your pipeline.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
          Add Contact
        </button>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-5 gap-4 px-4 py-2 border-b border-white/10 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
          <span>Name</span><span>Company</span><span>Email</span><span>Status</span><span>Last Activity</span>
        </div>
        {contacts.map((c, i) => (
          <m.div
            key={c.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer text-sm"
          >
            <span className="text-white font-medium">{c.name}</span>
            <div className="flex items-center gap-1.5 text-slate-400"><Building2 size={12} />{c.company}</div>
            <span className="text-slate-400 truncate">{c.email}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${statusBadge(c.status)}`}>{c.status}</span>
            <div className="flex items-center gap-1 text-slate-500"><Clock size={11} />{c.last}</div>
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
          <h2 className="text-xl font-bold text-white">Meetings</h2>
          <p className="text-sm text-slate-400 mt-0.5">38 meetings this month. 2 scheduled today.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
          Schedule
        </button>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-white/10 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
          <span>Company</span><span>Time</span><span>Type</span><span>Status</span>
        </div>
        {meetings.map((m, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer text-sm"
          >
            <div className="flex items-center gap-1.5 text-white font-medium"><Building2 size={12} className="text-slate-400 shrink-0" />{m.company}</div>
            <div className="flex items-center gap-1 text-slate-400"><Clock size={11} className="shrink-0" />{m.time}</div>
            <span className="text-slate-400">{m.type}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${statusBadge(m.status)}`}>{m.status}</span>
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
          <h2 className="text-xl font-bold text-white">Emails</h2>
          <p className="text-sm text-slate-400 mt-0.5">33 sent this month. AI-drafted outreach.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
          Compose
        </button>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-white/10 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
          <span>Recipient</span><span>Subject</span><span>Sent</span><span>Opened</span>
        </div>
        {emails.map((e, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer text-sm"
          >
            <span className="text-white font-medium">{e.recipient}</span>
            <span className="text-slate-400 truncate">{e.subject}</span>
            <div className="flex items-center gap-1 text-slate-500"><Clock size={11} />{e.sent}</div>
            <div className="flex items-center gap-1.5">
              {e.opened
                ? <><CheckCircle size={13} className="text-green-400" /><span className="text-green-400 text-xs">Opened</span></>
                : <><AlertCircle size={13} className="text-slate-500" /><span className="text-slate-500 text-xs">Not opened</span></>}
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
          <h2 className="text-xl font-bold text-white">Voice Agents</h2>
          <p className="text-sm text-slate-400 mt-0.5">4 agents deployed. 3 currently active.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
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
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Phone size={14} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{a.name}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusBadge(a.status)}`}>{a.status}</span>
                </div>
              </div>
              {a.status === 'Active' && (
                <m.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}  // Note: inside VoiceAgentsView — paused by section-level lazy load
                  className="w-2 h-2 rounded-full bg-green-400 mt-1"
                />
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><div className="text-base font-bold text-white">{a.calls}</div><div className="text-[10px] text-slate-500">Calls</div></div>
              <div><div className="text-base font-bold text-green-400">{a.success}</div><div className="text-[10px] text-slate-500">Success</div></div>
              <div><div className="text-base font-bold text-yellow-400">{a.queue}</div><div className="text-[10px] text-slate-500">Queue</div></div>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
}

function LeadsView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Leads</h2>
          <p className="text-sm text-slate-400 mt-0.5">1 hot lead · 8 warm · 18 in active nurture.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
          Add Lead
        </button>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-5 gap-4 px-4 py-2 border-b border-white/10 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
          <span>Name</span><span>Company</span><span>Stage</span><span>Score</span><span>AI Agent</span>
        </div>
        {leads.map((l, i) => (
          <m.div
            key={l.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer text-sm"
          >
            <span className="text-white font-medium">{l.name}</span>
            <div className="flex items-center gap-1.5 text-slate-400"><Building2 size={12} />{l.company}</div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${statusBadge(l.stage)}`}>{l.stage}</span>
            <div className="flex items-center gap-1.5">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full max-w-16">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${l.score}%` }} />
              </div>
              <span className="text-xs text-slate-400">{l.score}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400"><Bot size={11} className="shrink-0" /><span className="truncate">{l.agent}</span></div>
          </m.div>
        ))}
      </div>
    </div>
  );
}

function CreditUsageView() {
  const total = creditBreakdown.reduce((a, c) => a + c.used, 0);
  const limit = 8092;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold text-white">Credit Usage</h2>
        <p className="text-sm text-slate-400 mt-0.5">{total} credits used of {limit.toLocaleString()} this billing cycle.</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-white">Total Usage</span>
          <span className="text-sm text-slate-400">{((total / limit) * 100).toFixed(1)}% used</span>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <m.div
            initial={{ width: 0 }}
            animate={{ width: `${(total / limit) * 100}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-500">{total} used</span>
          <span className="text-xs text-slate-500">{(limit - total).toLocaleString()} remaining</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {creditBreakdown.map((c, i) => {
          const Icon = c.icon;
          const pct = Math.round((c.used / c.total) * 100);
          return (
            <m.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-slate-400" />
                <span className="text-sm font-medium text-white">{c.label}</span>
              </div>
              <div className="text-xl font-bold text-white mb-1">{c.used.toLocaleString()}</div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mb-1">
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.07 }}
                  className={`h-full rounded-full ${c.color}`}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{pct}% of {c.total.toLocaleString()}</span>
                <span>{(c.total - c.used).toLocaleString()} left</span>
              </div>
            </m.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────── */
export default function DashboardPreview() {
  const [activeView, setActiveView] = useState<SidebarView>('Dashboard');
  const { ref, isInView } = useInViewPause();

  return (
    <section ref={ref} id="dashboard" className="relative z-10 py-20 px-4">
      {/* Section heading */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4"
        >
          A Living{' '}
          <span className="bg-gradient-to-r from-leadq-cyan to-leadq-royal-blue bg-clip-text text-transparent">
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
          Watch your pipeline fill up in real-time.
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
        {/* Responsive scaling wrapper � shrinks the fixed-layout mockup on small screens */}
        <div className="relative overflow-hidden h-[200px] sm:h-[420px] md:h-[510px] lg:h-auto">
        <div className="min-w-[900px] lg:min-w-0 origin-top-left scale-[0.32] sm:scale-[0.675] md:scale-[0.82] lg:scale-100 lg:origin-top">
        {/* Browser chrome */}
        <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
          {/* Title bar */}
          <div className="bg-[#1a1a2e] border-b border-white/10 px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white/5 border border-white/10 rounded-md px-10 py-0.5 text-[11px] text-slate-500 font-mono">
                app.leadq.ai/dashboard
              </div>
            </div>
            <Bell size={14} className="text-slate-500" />
          </div>

          {/* App shell */}
          <div className="flex bg-[#0f0f1a]" style={{ minHeight: 580 }}>
            {/* Sidebar */}
            <div className="w-44 shrink-0 bg-[#0d0d1f] border-r border-white/10 flex flex-col">
              {/* Logo */}
              <div className="px-4 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Activity size={14} className="text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-bold text-white">LeadQ.ai</span>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 px-2 py-3 space-y-0.5">
                {navItems.map(({ label, icon: Icon }) => {
                  const active = activeView === label;
                  return (
                    <button
                      key={label}
                      onClick={() => setActiveView(label)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                        active
                          ? 'bg-blue-600/20 text-white border border-blue-500/30'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                      {label}
                    </button>
                  );
                })}
              </nav>

              {/* User */}
              <div className="px-3 py-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                    AJ
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white truncate">Alex Johnson</div>
                    <div className="text-[10px] text-slate-500 truncate">alex@leadq.ai</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content pane */}
            <div className="flex-1 min-w-0 p-5 overflow-auto">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeView}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="h-full"
                >
                  {activeView === 'Dashboard' && <DashboardView setView={setActiveView} />}
                  {activeView === 'Contacts' && <ContactsView />}
                  {activeView === 'Meetings' && <MeetingsView />}
                  {activeView === 'Emails' && <EmailsView />}
                  {activeView === 'Voice Agents' && <VoiceAgentsView />}
                  {activeView === 'Leads' && <LeadsView />}
                  {activeView === 'Credit Usage' && <CreditUsageView />}
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>{/* end scale wrapper */}
        </div>{/* end overflow container */}
      </m.div>
    </section>
  );
}
