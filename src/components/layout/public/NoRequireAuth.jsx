import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../../hooks";

const NoRequireAuth = (props) => {
  const auth = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/wb";

  return !auth?.user ? <Outlet /> : <Navigate to={from} state={{ from: location }} replace />;
};

export default NoRequireAuth;
