import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyPasses } from '../../services/pass.service';
import QRDisplay from '../../components/qr/QRDisplay';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import GlobalHeader from '../../components/common/GlobalHeader';
import { formatDate, getStatusColor, getPassTypeLabel } from '../../utils/helpers';
import { 
  FileText, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ArrowLeft,
  QrCode
} from 'lucide-react';

const DynamicBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-black" />
    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
  </div>
);

const MyPasses = () => {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPass, setSelectedPass] = useState(null);

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      setLoading(true);
      const response = await getMyPasses();
      setPasses(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load passes.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'APPROVED') return <CheckCircle2 size={16} className="text-emerald-400" />;
    if (status === 'REJECTED') return <XCircle size={16} className="text-rose-400" />;
    return <Clock size={16} className="text-amber-400" />;
  };

  if (loading) {
    return <Loading message="Loading your passes..." />;
  }

  return (
    <div className="min-h-screen font-sans text-slate-200 relative selection:bg-blue-500/30">
      <DynamicBackground />
      <GlobalHeader />

      <main className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <Link to="/student/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-400 mb-2 transition-colors">
              <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">My Passes</h1>
            <p className="text-slate-400 mt-1">
              View and manage all your gate pass requests.
            </p>
          </div>
        </div>

        <ErrorMessage message={error} />

        {passes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-slate-900/20 border border-white/5 rounded-2xl border-dashed">
            <div className="p-4 bg-slate-900 rounded-full mb-4 text-slate-600">
              <FileText size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">No Passes Yet</h3>
            <p className="text-slate-500 mt-2 text-center max-w-sm">
              You haven't created any gate passes yet. Create your first pass to get started.
            </p>
            <Link
              to="/student/create-pass"
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
            >
              Create New Pass
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-4">
              {passes.map((pass) => {
                const status = pass.passType === 'OUT_OF_STATION'
                  ? pass.academicApproval?.status || pass.departmentApproval?.status || 'PENDING'
                  : pass.hostelApproval?.status || 'PENDING';
                
                return (
                  <div
                    key={pass._id}
                    className={`group bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer ${
                      selectedPass?._id === pass._id ? 'border-blue-500/50' : ''
                    }`}
                    onClick={() => setSelectedPass(pass)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <FileText size={20} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {getPassTypeLabel(pass.passType)}
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Created {formatDate(pass.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                          status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          status === 'REJECTED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {getStatusIcon(status)}
                          {status}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Calendar size={16} className="text-blue-400" />
                          <span>
                            {formatDate(pass.fromDate)} <span className="mx-1">→</span> {formatDate(pass.toDate)}
                          </span>
                        </div>

                        {pass.reason || pass.reasonForLeave ? (
                          <div className="flex items-start gap-2 text-sm text-slate-300">
                            <MapPin size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                            <p className="line-clamp-2">
                              {pass.reason || pass.reasonForLeave}
                            </p>
                          </div>
                        ) : null}

                        {pass.qrCode && (
                          <div className="flex items-center gap-2 text-sm text-blue-400">
                            <QrCode size={16} />
                            <span>QR Code Available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1 lg:sticky lg:top-24">
              {selectedPass ? (
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">QR Code</h3>
                    <button
                      onClick={() => setSelectedPass(null)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  <QRDisplay
                    qrCode={selectedPass.qrCode}
                    passId={selectedPass._id}
                  />
                  <div className="mt-4 p-3 bg-slate-950/50 rounded-lg border border-white/5">
                    <p className="text-xs text-slate-500 mb-1">Pass Type</p>
                    <p className="text-sm font-medium text-white">{getPassTypeLabel(selectedPass.passType)}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/20 border border-white/5 rounded-2xl p-8 text-center">
                  <div className="p-4 bg-slate-900 rounded-full mb-4 inline-flex text-slate-600">
                    <QrCode size={32} />
                  </div>
                  <p className="text-slate-400 text-sm">
                    Select a pass to view QR code
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyPasses;
