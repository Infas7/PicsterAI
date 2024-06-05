import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthStatusChecker = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthStatusChecker;
