import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ManagerHome = () => {
  const { auth } = useAuth();
  return (
    <div>
      Hello {auth.username}
      <Link to="/create-client">Create Client</Link>
      <Link to="/list-clients">Client List</Link>
    </div>
  );
};

export default ManagerHome;
