import { useState, useEffect } from 'react';
import { getMyPasses } from '../../services/pass.service';
import QRDisplay from '../../components/qr/QRDisplay';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { formatDate, getStatusColor, getPassTypeLabel } from '../../utils/helpers';

/**
 * My Passes Page
 * Displays all passes for the current student
 */
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

  if (loading) {
    return <Loading message="Loading your passes..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Passes</h1>

      <ErrorMessage message={error} />

      {passes.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">You don't have any passes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Passes List */}
          <div className="space-y-4">
            {passes.map((pass) => (
              <div
                key={pass._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedPass(pass)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">
                    {getPassTypeLabel(pass.passType)}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(
                        pass.passType === 'OUT_OF_STATION'
                          ? pass.academicApproval?.status
                          : pass.hostelApproval?.status
                      )
                    }`}
                  >
                    {pass.passType === 'OUT_OF_STATION'
                      ? pass.academicApproval?.status || 'PENDING'
                      : pass.hostelApproval?.status || 'PENDING'}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{pass.reason}</p>
                <div className="text-sm text-gray-500">
                  <p>From: {formatDate(pass.fromDate)}</p>
                  <p>To: {formatDate(pass.toDate)}</p>
                </div>
                {pass.qrCode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPass(pass);
                    }}
                    className="mt-4 text-blue-600 hover:underline text-sm"
                  >
                    View QR Code
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* QR Code Display */}
          <div className="lg:sticky lg:top-4">
            {selectedPass ? (
              <div>
                <QRDisplay
                  qrCode={selectedPass.qrCode}
                  passId={selectedPass._id}
                />
                <button
                  onClick={() => setSelectedPass(null)}
                  className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500">
                Select a pass to view QR code
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPasses;

