import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPass } from '../../services/pass.service';
import { PASS_TYPES } from '../../utils/constants';
import ErrorMessage from '../../components/common/ErrorMessage';

/**
 * Create Pass Page
 * Allows students to create new gate passes
 */
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

  // Redirect to Out of Station form if selected
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Pass</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pass Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pass Type
            </label>
            <select
              name="passType"
              value={formData.passType}
              onChange={handlePassTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={PASS_TYPES.LOCAL}>Local</option>
              <option value={PASS_TYPES.OUT_OF_STATION}>Out of Station</option>
              <option value={PASS_TYPES.TEA_COFFEE}>Tea/Coffee</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reason for the pass"
              required
            />
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="datetime-local"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="datetime-local"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Pass'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/dashboard')}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePass;

