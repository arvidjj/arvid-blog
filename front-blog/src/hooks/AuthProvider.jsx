import React, { createContext, useState, useEffect, useContext } from 'react';
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authUserId, setAuthUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(["jwauth"]);

  useEffect(() => {
    // Check for an existing token in local storage
    const storedUser = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');

    if (storedUser) {
      setAuthUserId(storedUser);
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  const value = {
    authUserId,
    setAuthUserId,
    isAuthenticated,
    setIsAuthenticated,
    userRole,
    setUserRole,
  };

  const login = (user, token) => {
    setIsAuthenticated(true);
    setAuthUserId(user._id);
    setUserRole(user.role);

    setCookie("jwauth", token, { path: "/" });
    // Store user identifier, roles and token in local storage
    localStorage.setItem('userId', user._id);
    localStorage.setItem('role', user.role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthUserId(null);
    setUserRole('');

    // Clear local storage
    removeCookie("jwauth", {path:'/'});
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ value, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};