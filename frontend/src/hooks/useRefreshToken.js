import AccountService from "../services/AccountService";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await AccountService.get("auth/refresh-token", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        role: response.data.role,
        accessToken: response.data.accessToken,
        loggedInUserId: response.data.user_id,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
