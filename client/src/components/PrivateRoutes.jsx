import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Nav from "./Nav";

const PrivateRoutes = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/signin" replace={true} />;
  }
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
