import React from 'react';
import { User, Mail, Phone, Edit2, Trash2 } from 'lucide-react';

/**
 * User Card Component
 * Displays user information in a card format with action buttons
 */
function UserCard({ user, onEdit, onDelete, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <User size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold truncate">{user.name}</h3>
            <p className="text-indigo-100 text-sm truncate">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail size={18} className="text-indigo-600 flex-shrink-0" />
          <span className="text-sm truncate">{user.email}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Phone size={18} className="text-indigo-600 flex-shrink-0" />
          <span className="text-sm truncate">{user.phone}</span>
        </div>

        {user.company && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">COMPANY</p>
            <p className="font-semibold text-gray-800 truncate">{user.company.name}</p>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 flex gap-2">
        <button
          onClick={onViewDetails}
          className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          View Details
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-lg transition-colors duration-200"
          title="Edit User"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={onDelete}
          className="bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded-lg transition-colors duration-200"
          title="Delete User"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default UserCard;