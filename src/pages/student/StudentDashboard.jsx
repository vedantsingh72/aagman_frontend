import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Student Dashboard
 * Main dashboard for students to create and view passes
 */
const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Pass Card */}
        <Link
          to="/student/create-pass"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Create New Pass</h2>
              <p className="text-gray-600">Request a new gate pass</p>
            </div>
          </div>
        </Link>

        {/* My Passes Card */}
        <Link
          to="/student/my-passes"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">My Passes</h2>
              <p className="text-gray-600">View all your passes</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Welcome Message */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          Welcome, {user?.name || 'Student'}!
        </h2>
        <p className="text-gray-700">
          Use the options above to create a new gate pass or view your existing passes.
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;

