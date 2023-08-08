import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAccountServicePrivate from "../hooks/useAccountServicePrivate";
import useRefreshToken from "../hooks/useRefreshToken";

const RequireAuth = ({ allowedRole }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  return auth?.role === allowedRole && accessToken ? (
    <Outlet />
  ) : auth?.loggedInUserId ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
