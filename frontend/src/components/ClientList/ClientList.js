import React from "react";
import useAccountServicePrivate from "../../hooks/useAccountServicePrivate";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./clientlist.css";

const ClientList = ({ type }) => {
  const [data, setData] = useState([]);

  const { auth } = useAuth();

  const accountServicePrivate = useAccountServicePrivate();

  const managerId = auth.loggedInUserId;

  const [buttonClicked, setButtonClicked] = useState(false);

  const grabData = async () => {
    const response = await accountServicePrivate.get(
      `client/get-${type}/${managerId}`
    );
    console.log(response);
    console.log(response?.data?.accounts);
    console.log(`client/get-${type}/${managerId}`);
    setData(response.data.accounts);
  };

  useEffect(() => {
    grabData();
  }, []);

  useEffect(() => {
    grabData();
  }, [buttonClicked]);

  return (
    <>
      <ul>
        {data.map((account) => (
          <li>
            {account.firstName} {account.lastName}{" "}
            <Link to={`/edit-client/${account.uuid}`}>Edit</Link>{" "}
            <button
              class="delete-button"
              onClick={async () => {
                await accountServicePrivate.delete(
                  `client/delete-client/${account.uuid}`
                );
                setButtonClicked(!buttonClicked);
              }}
            >
              X
            </button>
            {console.log(account)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ClientList;
