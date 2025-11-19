import React, { useState, useEffect } from 'react';
import { Home, UserCircle, Mail, Phone, User, AlertCircle } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * User Detail View Component
 * Displays detailed information about a single user
 */
function UserDetailView({ userId, navigateToHome }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  /**
   * Fetch detailed user information
   */
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user details.');
      }
      
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <button
        onClick={navigateToHome}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-6 transition-colors"
      >
        <Home size={20} />
        Back to Home
      </button>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-500" size={24} />
            <div>
              <h3 className="font-semibold text-red-800">Error Loading User Details</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* User Details */}
      {!loading && !error && user && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full">
                <UserCircle size={48} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-indigo-100">@{user.username}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              
              <div className="flex items-start gap-3">
                <Mail className="text-indigo-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-800">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-indigo-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-800">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="text-indigo-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <p className="font-medium text-gray-800">{user.website}</p>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Company</h2>
              
              <div>
                <p className="text-sm text-gray-600">Company Name</p>
                <p className="font-medium text-gray-800">{user.company?.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Catch Phrase</p>
                <p className="font-medium text-gray-800 italic">{user.company?.catchPhrase}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Business</p>
                <p className="font-medium text-gray-800">{user.company?.bs}</p>
              </div>
            </div>

            {/* Address Information */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Address</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800">
                  {user.address?.street}, {user.address?.suite}
                </p>
                <p className="text-gray-600">
                  {user.address?.city}, {user.address?.zipcode}
                </p>
                {user.address?.geo && (
                  <p className="text-sm text-gray-500 mt-2">
                    Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetailView;