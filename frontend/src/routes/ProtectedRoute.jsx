import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PrivateRoute;
