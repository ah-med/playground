import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <h1>Todo App</h1>
                </div>

                {user && (
                    <div className="user-info">
                        <span className="welcome-text">
                            Welcome, {user.name}!
                        </span>
                        <button
                            onClick={handleLogout}
                            className="btn btn-secondary logout-btn"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 