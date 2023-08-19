import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PropertyService from "../../services/PropertyService";
import AddressFormField from "../SubComponents/FormFields/AddressFormField";
import CityFormField from "../SubComponents/FormFields/CityFormField";
import StateFormField from "../SubComponents/FormFields/StateFormField";
import ZipCodeFormField from "../SubComponents/FormFields/ZipCodeFormField";
import PropertyTypeFormField from "../SubComponents/FormFields/PropertyTypeFormField";

const EditPropertyForm = () => {
  const errRef = useRef();
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [usState, setUsState] = useState("");

  const [zipcode, setZipcode] = useState("");
  const [zipcodeValid, setZipcodeValid] = useState(true);
  const [zipcodeFocus, setZipcodeFocus] = useState(false);

  const navigate = useNavigate();

  const ZIP_CODE_REGEX = /[0-9].{4}/;

  const [propertyType, setPropertyType] = useState("");

  const { propertyId } = useParams();

  const getData = async () => {
    try {
      const response = await PropertyService.get(`property/${propertyId}`);
      console.log(response);
      const data = response.data;
      setAddress(data.address);
      setCity(data.city);
      setUsState(data.state);
      setZipcode(data.zip);
      setPropertyType(data.propertyType);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const request = {
        propertyId,
        address,
        city,
        usState,
        zipcode,
        propertyType,
      };
      const response = await PropertyService.put(
        "property/edit-property",
        request
      );
      console.log(response);
      navigate("/property-list");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = ZIP_CODE_REGEX.test(zipcode);
    setZipcodeValid(result);
  }, [zipcode]);

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={error ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {error}
        </p>
        <h1>Edit Property</h1>
        <form onSubmit={handleSubmit}>
          <AddressFormField address={address} setAddress={setAddress} />
          <CityFormField city={city} setCity={setCity} />
          <StateFormField state={usState} setState={setUsState} />
          <ZipCodeFormField
            zipcode={zipcode}
            setZipcode={setZipcode}
            zipcodeValid={zipcodeValid}
            setZipcodeValid={setZipcodeValid}
            zipcodeFocus={zipcodeFocus}
            setZipcodeFocus={setZipcodeFocus}
          />
          <PropertyTypeFormField
            propertyType={propertyType}
            setPropertyType={setPropertyType}
          />
          <button>Submit</button>
        </form>
      </section>
    </>
  );
};

export default EditPropertyForm;
