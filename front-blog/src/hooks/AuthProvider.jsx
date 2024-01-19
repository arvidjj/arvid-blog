import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authUserId, setAuthUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for an existing token in local storage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('userId');

    if (storedToken && storedUser) {
      setAuthUserId(storedUser);
      setIsAuthenticated(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const value = {
    authUserId,
    setAuthUserId,
    isAuthenticated,
    setIsAuthenticated,
  };

  const login = (user, token) => {
    setIsAuthenticated(true);
    setAuthUserId(user._id);

    // Store user identifier and token in local storage
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthUserId(null);

    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ value, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
