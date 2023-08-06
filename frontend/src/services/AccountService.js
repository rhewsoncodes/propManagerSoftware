import axios from "axios";

const AccountService = axios.create({
  baseURL: process.env.REACT_APP_ACCOUNT_SERVICE,
});

AccountService.defaults.headers.post["Content-Type"] = "application/json";

export const AccountServicePrivate = axios.create({
  baseURL: process.env.REACT_APP_ACCOUNT_SERVICE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default AccountService;
