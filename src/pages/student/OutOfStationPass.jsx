import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createPass } from '../../services/pass.service';
import { PASS_TYPES } from '../../utils/constants';
import ErrorMessage from '../../components/common/ErrorMessage';
import Loading from '../../components/common/Loading';
import GlobalHeader from '../../components/common/GlobalHeader';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Home, 
  Plane,
  UserCircle
} from 'lucide-react';

const DynamicBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-black" />
    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
  </div>
);

const OutOfStationPass = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    passType: PASS_TYPES.OUT_OF_STATION,
    reasonForLeave: '',
    placeWhereGoing: '',
    fromDate: '',
    toDate: '',
    contactNumber: '',
    guardianContactNumber: '',
    addressDuringLeave: '',
    travelMode: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.department) {
      setError('Please update your profile with department information first.');
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validateForm = () => {
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      setError('Contact number must be exactly 10 digits');
      return false;
    }
    if (formData.guardianContactNumber && !/^\d{10}$/.test(formData.guardianContactNumber)) {
      setError('Guardian contact number must be exactly 10 digits');
      return false;
    }

    if (formData.fromDate && formData.toDate) {
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);
      if (from >= to) {
        setError('To Date must be after From Date');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    if (!user?.department) {
      setError('Department information is required. Please update your profile.');
      return;
    }

    setLoading(true);

    try {
      await createPass(formData);
      navigate('/student/my-passes', {
        state: { message: 'Out of Station pass created successfully!' }
      });
    } catch (err) {
      const errorMessage = err?.message || err?.data?.message || 'Failed to create pass. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Creating pass..." />;
  }

  return (
    <div className="min-h-screen font-sans text-slate-200 relative selection:bg-blue-500/30">
      <DynamicBackground />
      <GlobalHeader />

      <main className="container mx-auto px-4 py-24 md:py-32 relative z-10 max-w-4xl">
        
        <div className="mb-8">
          <Link to="/student/create-pass" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-400 mb-4 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to Create Pass
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Out of Station Pass</h1>
          <p className="text-slate-400 mt-2">
            Complete the form below to request an out of station gate pass.
          </p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <ErrorMessage message={error} />

          <div className="mb-8 p-6 bg-slate-950/50 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <UserCircle size={20} className="text-blue-400" /> Student Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
                <p className="text-sm font-medium text-white">{user?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Roll Number</label>
                <p className="text-sm font-medium text-white">{user?.rollNo || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Department</label>
                <p className="text-sm font-medium text-white">{user?.department || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Year</label>
                <p className="text-sm font-medium text-white">{user?.year ? `${user.year}st Year` : 'Not set'}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <MapPin size={16} /> Reason for Leave *
              </label>
              <textarea
                name="reasonForLeave"
                value={formData.reasonForLeave}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600 resize-none"
                placeholder="Enter reason for leaving the station"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <MapPin size={16} /> Place Where Going *
              </label>
              <input
                type="text"
                name="placeWhereGoing"
                value={formData.placeWhereGoing}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600"
                placeholder="Enter destination"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Calendar size={16} /> From Date & Time *
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
                  <Calendar size={16} /> To Date & Time *
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Phone size={16} /> Contact Number (10 digits) *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Phone size={16} /> Guardian Contact (10 digits) *
                </label>
                <input
                  type="tel"
                  name="guardianContactNumber"
                  value={formData.guardianContactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="Guardian's 10-digit number"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Home size={16} /> Address During Leave *
              </label>
              <textarea
                name="addressDuringLeave"
                value={formData.addressDuringLeave}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600 resize-none"
                placeholder="Enter complete address where you will be staying"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Plane size={16} /> Travel Mode
              </label>
              <select
                name="travelMode"
                value={formData.travelMode}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select Travel Mode (Optional)</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Personal">Personal Vehicle</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <User size={16} /> Emergency Contact Name
                </label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <User size={16} /> Emergency Contact Relation
                </label>
                <input
                  type="text"
                  name="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="e.g., Father, Mother (optional)"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || !user?.department}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Out of Station Pass'}
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

export default OutOfStationPass;
