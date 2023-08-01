import axios from "axios";

const AccountService = axios.create({
  baseURL: process.env.REACT_APP_ACCOUNT_SERVICE,
});

AccountService.defaults.headers.post["Content-Type"] = "application/json";

export default AccountService;
