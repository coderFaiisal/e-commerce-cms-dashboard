import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

export const storeAdminInfo = (accessToken: string) => {
  return setToLocalStorage("accessToken", accessToken);
};

export const getAdminInfo = () => {
  const authToken = getFromLocalStorage("accessToken");

  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("accessToken");
  return !!authToken;
};

export const removeAdminInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `http://localhost:5000/api/v1/admins/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
