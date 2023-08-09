import React from "react";
import useAccountServicePrivate from "../../hooks/useAccountServicePrivate";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const ClientList = ({ type }) => {
  const [data, setData] = useState([]);

  const { auth } = useAuth();

  const accountServicePrivate = useAccountServicePrivate();

  const managerId = auth.loggedInUserId;

  const getClientsRequest = { managerId };

  const grabData = async () => {
    const response = await accountServicePrivate.get(
      `client/get-${type}/${managerId}`,
      getClientsRequest
    );
    console.log(response);
    console.log(response?.data?.accounts);
    setData(response.data.accounts);
  };

  useEffect(() => {
    grabData();
  }, []);

  return (
    <>
      <ul>
        {data.map((account) => (
          <li>
            {account.firstName} {account.lastName} {console.log(account)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ClientList;
