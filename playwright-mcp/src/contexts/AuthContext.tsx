import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

// Mock user database for demo purposes
const mockUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for existing user session on app load
    useEffect(() => {
        const savedUser = localStorage.getItem('todoAppUser');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (err) {
                localStorage.removeItem('todoAppUser');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock authentication - in real app, this would be an API call
            const foundUser = mockUsers.find(u => u.email === email);

            if (!foundUser) {
                throw new Error('Invalid email or password');
            }

            // In a real app, you'd verify the password here
            if (password !== 'password') {
                throw new Error('Invalid email or password');
            }

            setUser(foundUser);
            localStorage.setItem('todoAppUser', JSON.stringify(foundUser));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name: string, email: string, password: string): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if user already exists
            const existingUser = mockUsers.find(u => u.email === email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            // Create new user
            const newUser: User = {
                id: Date.now().toString(),
                name,
                email,
            };

            // In a real app, you'd save this to a database
            mockUsers.push(newUser);

            setUser(newUser);
            localStorage.setItem('todoAppUser', JSON.stringify(newUser));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = (): void => {
        setUser(null);
        localStorage.removeItem('todoAppUser');
    };

    const value: AuthContextType = {
        user,
        login,
        signup,
        logout,
        loading,
        error,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 