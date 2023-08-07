import React from "react";
import useAccountServicePrivate from "../../hooks/useAccountServicePrivate";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const ClientList = () => {
  const [data, setData] = useState(null);

  const { auth } = useAuth();

  const accountServicePrivate = useAccountServicePrivate();

  const managerId = auth.loggedInUserId;

  const getClientsRequest = { managerId };

  useEffect(() => {
    const response = accountServicePrivate.post(
      "client/get-clients",
      getClientsRequest
    );
    console.log(response);
    console.log(response?.clients);
    setData(response.clients);
  }, []);

  return <h2>{data}</h2>;
};

export default ClientList;
