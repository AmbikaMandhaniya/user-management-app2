import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import UserCard from './UserCard';
import UserForm from './UserForm';
import Notification from './Notification';
import { AlertCircle, UserCircle } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Home View Component
 * Displays the list of users and handles CRUD operations
 */
function HomeView({ navigateToDetail }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Fetch all users from the API
   */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/users`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users. Please try again later.');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new user
   * @param {Object} userData - New user data
   */
  const createUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user. Please try again.');
      }

      const newUser = await response.json();
      // Add the new user to the local state with a temporary ID
      setUsers([{ ...newUser, id: Date.now() }, ...users]);
      showNotification('success', 'User created successfully!');
      setShowCreateForm(false);
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  /**
   * Update an existing user
   * @param {number} userId - ID of the user to update
   * @param {Object} userData - Updated user data
   */
  const updateUser = async (userId, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user. Please try again.');
      }

      const updatedUser = await response.json();
      // Update the user in local state
      setUsers(users.map(user => user.id === userId ? { ...updatedUser, id: userId } : user));
      showNotification('success', 'User updated successfully!');
      setEditingUser(null);
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  /**
   * Delete a user
   * @param {number} userId - ID of the user to delete
   */
  const deleteUser = async (userId) => {
    // Confirm deletion
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user. Please try again.');
      }

      // Remove user from local state
      setUsers(users.filter(user => user.id !== userId));
      showNotification('success', 'User deleted successfully!');
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  /**
   * Show notification message
   * @param {string} type - 'success' or 'error'
   * @param {string} message - Notification message
   */
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">User Management</h1>
            <p className="text-gray-600">Manage your users efficiently with full CRUD operations</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Add New User
          </button>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

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
              <h3 className="font-semibold text-red-800">Error Loading Users</h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchUsers}
                className="mt-3 text-red-700 hover:text-red-800 font-semibold underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Form Modal */}
      {showCreateForm && (
        <UserForm
          onSubmit={createUser}
          onCancel={() => setShowCreateForm(false)}
          title="Create New User"
        />
      )}

      {/* Edit User Form Modal */}
      {editingUser && (
        <UserForm
          user={editingUser}
          onSubmit={(userData) => updateUser(editingUser.id, userData)}
          onCancel={() => setEditingUser(null)}
          title="Edit User"
        />
      )}

      {/* Users Grid */}
      {!loading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={() => setEditingUser(user)}
              onDelete={() => deleteUser(user.id)}
              onViewDetails={() => navigateToDetail(user.id)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && users.length === 0 && (
        <div className="text-center py-20">
          <UserCircle size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Users Found</h3>
          <p className="text-gray-500">Start by adding a new user to the system.</p>
        </div>
      )}
    </div>
  );
}

export default HomeView;