import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PropertyService from "../../services/PropertyService";
import PropertyTypeFormField from "../SubComponents/FormFields/PropertyTypeFormField";

const PropertyList = () => {
  const [data, setData] = useState([]);

  const { auth } = useAuth();

  const [buttonClicked, setButtonClicked] = useState(false);

  const managerId = auth.loggedInUserId;

  const grabData = async () => {
    const response = await PropertyService.get(
      `property/properties/${managerId}`
    );
    console.log(response);
    console.log(response?.data);
    setData(response.data);
  };

  useEffect(() => {
    grabData();
  }, []);

  useEffect(() => {
    grabData();
  }, [buttonClicked]);

  return (
    <div>
      <Link to="/add-property">Add Property</Link>
      <h></h>
      <Link to="/">Home page</Link>
      <br />
      <br />
      <br />
      <ul>
        {data.map((property) => {
          return (
            <li>
              {property.address}{" "}
              <Link to={`/edit-property/${property.uuid}`}>Edit</Link>{" "}
              <button
                class="delete-button"
                onClick={async () => {
                  await PropertyService.delete(`property/${property.uuid}`);
                  setButtonClicked(!buttonClicked);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PropertyList;
