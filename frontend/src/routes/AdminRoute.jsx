import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoute = () => {
  const { isAdmin, isLoggedIn } = useAuth();
  if (!isAdmin || !isLoggedIn) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PrivateRoute;
