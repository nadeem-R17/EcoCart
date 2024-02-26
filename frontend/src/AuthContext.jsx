import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const persistedState = localStorage.getItem("isLoggedIn");
    return persistedState && persistedState !== "undefined"
      ? JSON.parse(persistedState)
      : false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const persistedState = localStorage.getItem("isAdmin");
    return persistedState && persistedState !== "undefined"
      ? JSON.parse(persistedState)
      : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isLoggedIn, isAdmin]);

  const { setCount } = useContext(CartContext);

  const navigate = useNavigate();
  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCount(0);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/");
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    logout,
    isAdmin,
    setIsAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
