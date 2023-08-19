import React from "react";
import "./addproperty.css";
import ClientSearchAndSelect from "../SubComponents/FormFields/ClientSearchAndSelect";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAccountServicePrivate from "../../hooks/useAccountServicePrivate";
import useAuth from "../../hooks/useAuth";
import AddressFormField from "../SubComponents/FormFields/AddressFormField";
import ZipCodeFormField from "../SubComponents/FormFields/ZipCodeFormField";
import StateFormField from "../SubComponents/FormFields/StateFormField";
import PropertyTypeFormField from "../SubComponents/FormFields/PropertyTypeFormField";
import PropertyService from "../../services/PropertyService";
import CityFormField from "../SubComponents/FormFields/CityFormField";

const AddProperty = ({ type }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();

  const accountServicePrivate = useAccountServicePrivate();

  const { accessToken, role, loggedInUserId } = auth;

  const navigate = useNavigate();

  const managerId = loggedInUserId;

  const ZIP_CODE_REGEX = /[0-9].{4}/;

  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [zipcode, setZipcode] = useState("");
  const [zipcodeValid, setZipcodeValid] = useState(true);
  const [zipcodeFocus, setZipcodeFocus] = useState(false);

  const [state, setState] = useState("");

  const [propertyType, setPropertyType] = useState("");

  const [error, setError] = useState(null);
  const errRef = useRef();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = {
        client,
        managerId,
        address,
        city,
        zipcode,
        state,
        propertyType,
      };
      console.log(request);
      const response = await PropertyService.post(
        "property/addProperty",
        request
      );
      console.log(response);
      navigate("/property-list");
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
        console.log(err);
      } else {
        setError("Property addition failed");
        console.log(err);
      }

      errRef.current.focus();
    }
  };
  return isLoading ? (
    <h1>Loading . . .</h1>
  ) : (
    <section>
      <p
        ref={errRef}
        className={error ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {error}
      </p>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <PropertyTypeFormField
          propertyType={propertyType}
          setPropertyType={setPropertyType}
        />
        <AddressFormField address={address} setAddress={setAddress} />
        <CityFormField city={city} setCity={setCity} />
        <StateFormField state={state} setState={setState} />
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
        <button>Submit</button>
      </form>
    </section>
  );
};

export default AddProperty;
