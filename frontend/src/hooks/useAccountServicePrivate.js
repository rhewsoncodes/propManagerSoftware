import { AccountServicePrivate } from "../services/AccountService";
import { useEffect, useRef } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAccountServicePrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  // In the event that access token fails it gets another one
  useEffect(() => {
    const requestIntercept = AccountServicePrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseIntercept = AccountServicePrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log("aaaaaaaa");
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return AccountServicePrivate(prevRequest);
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      AccountServicePrivate.interceptors.request.eject(requestIntercept);
      AccountServicePrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return AccountServicePrivate;
};

export default useAccountServicePrivate;
