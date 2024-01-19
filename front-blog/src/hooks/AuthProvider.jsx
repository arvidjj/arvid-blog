import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    authUser,
    setAuthUser,
    isAuthenticated,
    setIsAuthenticated,
  };

  const login = (user, token) => {
    setIsAuthenticated(true);
    setAuthUser(user);

    // Only store user identifier in local storage
    localStorage.setItem('token', token);
    localStorage.setItem('user', user._id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthUser(null);

    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ value, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
