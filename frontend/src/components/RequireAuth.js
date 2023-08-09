import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useRef } from "react";

const RequireAuth = ({ allowedRole }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  return auth?.role === allowedRole ? (
    <Outlet />
  ) : auth?.loggedInUserId ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
