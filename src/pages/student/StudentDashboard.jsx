import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Plus, 
  FileText, 
  Calendar,
  ArrowRight,
  User
} from 'lucide-react';
import GlobalHeader from '../../components/common/GlobalHeader';

const DynamicBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-black" />
    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
  </div>
);

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen font-sans text-slate-200 relative selection:bg-blue-500/30">
      <DynamicBackground />
      <GlobalHeader />

      <main className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                Student Portal
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Welcome, {user?.name || 'Student'}!
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl">
              Create and manage your gate passes for campus leave requests.
            </p>
          </div>
          
          <div className="hidden md:block text-right">
            <p className="text-3xl font-bold text-white">
              {new Date().toLocaleDateString('en-US', { day: 'numeric' })}
            </p>
            <p className="text-sm text-slate-400 uppercase tracking-widest">
              {new Date().toLocaleDateString('en-US', { month: 'long', weekday: 'long' })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/student/create-pass"
            className="group relative bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
            
            <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase">
                  <Plus size={12} /> New Request
                </div>
                <h3 className="text-2xl font-bold text-white">Create New Pass</h3>
                <p className="text-slate-300 leading-relaxed max-w-lg">
                  Request a new gate pass for local leave or outstation travel.
                </p>
              </div>

              <div className="whitespace-nowrap flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20 transform group-hover:scale-105 transition-all">
                Create <ArrowRight size={20} />
              </div>
            </div>
          </Link>

          <Link
            to="/student/my-passes"
            className="group relative bg-gradient-to-br from-emerald-900/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
            
            <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase">
                  <FileText size={12} /> View History
                </div>
                <h3 className="text-2xl font-bold text-white">My Passes</h3>
                <p className="text-slate-300 leading-relaxed max-w-lg">
                  View all your gate passes, check approval status, and access QR codes.
                </p>
              </div>

              <div className="whitespace-nowrap flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 transform group-hover:scale-105 transition-all">
                View <ArrowRight size={20} />
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
                <User size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{user?.rollNo || 'N/A'}</p>
                <p className="text-sm font-medium text-slate-400">Roll Number</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{user?.department || 'N/A'}</p>
                <p className="text-sm font-medium text-slate-400">Department</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{user?.year || 'N/A'}</p>
                <p className="text-sm font-medium text-slate-400">Year</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
