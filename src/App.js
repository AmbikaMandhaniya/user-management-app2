import React, { useState } from 'react';
import HomeView from './components/HomeView';
import UserDetailView from './components/UserDetailView';
import './App.css';

/**
 * Main App Component with Router Logic
 * Manages routing between Home and User Detail views
 */
function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'detail'
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Navigate to user detail view
  const navigateToDetail = (userId) => {
    setSelectedUserId(userId);
    setCurrentView('detail');
  };

  // Navigate back to home view
  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedUserId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {currentView === 'home' ? (
        <HomeView navigateToDetail={navigateToDetail} />
      ) : (
        <UserDetailView userId={selectedUserId} navigateToHome={navigateToHome} />
      )}
    </div>
  );
}

export default App;