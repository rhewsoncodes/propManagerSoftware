import React from "react";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";

const ManagerHome = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const { accessToken, role, loggedInUserId } = auth;

  console.log(accessToken);
  console.log(role);
  console.log(loggedInUserId);

  const signOut = async () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      Hello {role}
      <Link to="/create-client">Create Client</Link>
      <h> </h>
      <Link to="/list-owners">Owner List</Link>
      <h> </h>
      <Link to="/list-tenants">Tenant List</Link>
      <h> </h>
      <Link to="/add-property">Add Property</Link>
      <h> </h>
      <Link to="/property-list">Property List</Link>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default ManagerHome;
