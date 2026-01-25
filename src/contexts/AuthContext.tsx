import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'admin' | 'user';

interface User {
    role: UserRole;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (role: UserRole) => {
        const newUser: User = {
            role,
            name: role === 'admin' ? 'Administrator' : 'News Reader',
        };
        setUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        if (role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/user/dashboard');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
