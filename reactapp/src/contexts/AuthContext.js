import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing login state on component mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('user');
    
    console.log('AuthContext - Loading saved state:', { savedLoginState, savedUser });
    
    if (savedLoginState === 'true' && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
      console.log('AuthContext - Restored login state');
    }
  }, []);

  const login = (userData) => {
    console.log('AuthContext - Login called with:', userData);
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('AuthContext - Login state set to true');
  };

  const logout = () => {
    console.log('AuthContext - Logout called');
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout
  };

  console.log('AuthContext - Current state:', { isLoggedIn, user: user?.email });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
