import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('stardust_token'));
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem('stardust_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });

  const login = (token, user) => {
    localStorage.setItem('stardust_token', token);
    localStorage.setItem('stardust_user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('stardust_token');
    localStorage.removeItem('stardust_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
