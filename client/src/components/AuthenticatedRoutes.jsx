import React from "react";
import { Outlet, useNavigate,  } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AuthenticatedRoutes = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate()

  console.log("inside authenticatror", user);

  if (!user) {
    return navigate("/signin", replace=true);
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthenticatedRoutes;
