import React from "react";
import ClientSearchAndSelect from "../SubComponents/FormFields/ClientSearchAndSelect";
import { useState, useEffect } from "react";
import useAccountServicePrivate from "../../hooks/useAccountServicePrivate";
import useAuth from "../../hooks/useAuth";
import AddressFormField from "../SubComponents/FormFields/AddressFormField";
import ZipCodeFormField from "../SubComponents/FormFields/ZipCodeFormField";

const AddProperty = ({ type }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();

  const accountServicePrivate = useAccountServicePrivate();

  const { accessToken, role, loggedInUserId } = auth;

  const managerId = loggedInUserId;

  const ZIP_CODE_REGEX = /[0-9].{4}/;

  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");

  const [zipcode, setZipcode] = useState("");
  const [zipcodeValid, setZipcodeValid] = useState(true);
  const [zipcodeFocus, setZipcodeFocus] = useState(false);

  const grabData = async () => {
    const response = await accountServicePrivate.get(
      `client/get-${type}/${managerId}`
    );
    setData(response.data.accounts);
    setIsLoading(false);
    console.log(response.data.accounts);
  };

  useEffect(() => {
    grabData();
  }, []);

  useEffect(() => {
    const result = ZIP_CODE_REGEX.test(zipcode);
    setZipcodeValid(result);
  }, [zipcode]);

  return isLoading ? (
    <h1>Loading . . .</h1>
  ) : (
    <section>
      <form>
        <AddressFormField address={address} setAddress={setAddress} />
        <ZipCodeFormField
          zipcode={zipcode}
          setZipcode={setZipcode}
          zipcodeValid={zipcodeValid}
          setZipcodeValid={setZipcodeValid}
          zipcodeFocus={zipcodeFocus}
          setZipcodeFocus={setZipcodeFocus}
        />
        <ClientSearchAndSelect
          clients={data}
          type="owner"
          client={client}
          setClient={setClient}
        />
      </form>
    </section>
  );
};

export default AddProperty;
