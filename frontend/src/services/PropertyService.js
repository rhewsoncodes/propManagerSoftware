import axios from "axios";

const PropertyService = axios.create({
  baseURL: process.env.REACT_APP_PROPERTY_SERVICE,
});
PropertyService.defaults.headers.post["Content-Type"] = "application/json";

export default PropertyService;
