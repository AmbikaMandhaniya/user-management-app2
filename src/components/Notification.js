import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

/**
 * Notification Component
 * Displays success or error messages
 */
function Notification({ type, message, onClose }) {
  const isSuccess = type === 'success';

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg max-w-md animate-slide-in ${
        isSuccess ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
      }`}
    >
      {isSuccess ? (
        <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
      ) : (
        <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
      )}
      <p className={`font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
        {message}
      </p>
      <button
        onClick={onClose}
        className={`ml-auto ${isSuccess ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'}`}
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default Notification;