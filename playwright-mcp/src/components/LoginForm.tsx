import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormProps {
    onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const { login, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');

        if (!email || !password) {
            setFormError('Please fill in all fields');
            return;
        }

        try {
            await login(email, password);
        } catch (error) {
            setFormError(error instanceof Error ? error.message : 'Login failed');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="login-email">Email</label>
                    <input
                        type="email"
                        id="login-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {formError && <div className="error-message">{formError}</div>}

                <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div className="auth-switch">
                <p>
                    Don't have an account?{' '}
                    <button type="button" onClick={onSwitchToSignup} className="link-button">
                        Sign up
                    </button>
                </p>
            </div>

            <div className="demo-credentials">
                <p><strong>Demo Credentials:</strong></p>
                <p>Email: john@example.com</p>
                <p>Password: password</p>
            </div>
        </div>
    );
};

export default LoginForm; 