import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createPass } from '../../services/pass.service';
import { PASS_TYPES } from '../../utils/constants';
import ErrorMessage from '../../components/common/ErrorMessage';
import Loading from '../../components/common/Loading';

/**
 * Out of Station Pass Form
 * Dedicated form for creating Out of Station gate passes
 * Department and year are auto-filled from student profile
 */
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
    // Validate user has department
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
    // Validate contact numbers are 10 digits
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      setError('Contact number must be exactly 10 digits');
      return false;
    }
    if (formData.guardianContactNumber && !/^\d{10}$/.test(formData.guardianContactNumber)) {
      setError('Guardian contact number must be exactly 10 digits');
      return false;
    }

    // Validate dates
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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create Out of Station Pass</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <ErrorMessage message={error} />

        {/* Student Info (Read-only) */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Student Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <p className="text-gray-900 font-medium">{user?.name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Roll Number</label>
              <p className="text-gray-900 font-medium">{user?.rollNo || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Department</label>
              <p className="text-gray-900 font-medium">{user?.department || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Year</label>
              <p className="text-gray-900 font-medium">{user?.year ? `${user.year}st Year` : 'Not set'}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reason for Leave */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Leave *
            </label>
            <textarea
              name="reasonForLeave"
              value={formData.reasonForLeave}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reason for leaving the station"
              required
            />
          </div>

          {/* Place Where Going */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Place Where Going *
            </label>
            <input
              type="text"
              name="placeWhereGoing"
              value={formData.placeWhereGoing}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter destination"
              required
            />
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date & Time *
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
              To Date & Time *
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

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number (10 digits) *
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 10-digit contact number"
              maxLength={10}
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Guardian Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guardian Contact Number (10 digits) *
            </label>
            <input
              type="tel"
              name="guardianContactNumber"
              value={formData.guardianContactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter guardian's 10-digit contact number"
              maxLength={10}
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Address During Leave */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address During Leave *
            </label>
            <textarea
              name="addressDuringLeave"
              value={formData.addressDuringLeave}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter complete address where you will be staying"
              required
            />
          </div>

          {/* Travel Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Travel Mode
            </label>
            <select
              name="travelMode"
              value={formData.travelMode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Travel Mode (Optional)</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="Personal">Personal Vehicle</option>
            </select>
          </div>

          {/* Emergency Contact Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter emergency contact name (optional)"
            />
          </div>

          {/* Emergency Contact Relation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Relation
            </label>
            <input
              type="text"
              name="emergencyContactRelation"
              value={formData.emergencyContactRelation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Father, Mother, Friend (optional)"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || !user?.department}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Out of Station Pass'}
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

export default OutOfStationPass;

