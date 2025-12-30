import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPass } from '../../services/pass.service';
import { PASS_TYPES } from '../../utils/constants';
import ErrorMessage from '../../components/common/ErrorMessage';
import GlobalHeader from '../../components/common/GlobalHeader';
import { ArrowLeft, FileText, Calendar, MapPin } from 'lucide-react';

const DynamicBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-black" />
    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
  </div>
);

const CreatePass = () => {
  const [formData, setFormData] = useState({
    passType: 'LOCAL',
    reason: '',
    fromDate: '',
    toDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handlePassTypeChange = (e) => {
    const passType = e.target.value;
    if (passType === PASS_TYPES.OUT_OF_STATION) {
      navigate('/student/create-pass/out-of-station');
    } else {
      setFormData({
        ...formData,
        passType,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createPass(formData);
      navigate('/student/my-passes');
    } catch (err) {
      setError(err.message || 'Failed to create pass. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-200 relative selection:bg-blue-500/30">
      <DynamicBackground />
      <GlobalHeader />

      <main className="container mx-auto px-4 py-24 md:py-32 relative z-10 max-w-2xl">
        
        <div className="mb-8">
          <Link to="/student/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-400 mb-4 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Create New Pass</h1>
          <p className="text-slate-400 mt-2">
            Fill in the details to request a new gate pass.
          </p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FileText size={16} /> Pass Type
              </label>
              <select
                name="passType"
                value={formData.passType}
                onChange={handlePassTypeChange}
                className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              >
                <option value={PASS_TYPES.LOCAL}>Local</option>
                <option value={PASS_TYPES.OUT_OF_STATION}>Out of Station</option>
                <option value={PASS_TYPES.TEA_COFFEE}>Tea/Coffee</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <MapPin size={16} /> Reason
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600 resize-none"
                placeholder="Enter reason for the pass"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Calendar size={16} /> From Date
                </label>
                <input
                  type="datetime-local"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Calendar size={16} /> To Date
                </label>
                <input
                  type="datetime-local"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Pass'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/student/dashboard')}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatePass;
