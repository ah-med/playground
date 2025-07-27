import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { TodoProvider } from './contexts/TodoContext';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import AuthContainer from './components/AuthContainer';
import Dashboard from './components/Dashboard';
import './App.css';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {user ? (
          <TodoProvider>
            <Dashboard />
          </TodoProvider>
        ) : (
          <AuthContainer />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
