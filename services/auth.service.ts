import { accessKey } from '@/constants/authKey';
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { CustomJwtPayload } from '@/types/common';
import {
  getFromCookies,
  removeFromCookies,
  setToCookies,
} from '@/utils/cookiesStorage';
import { decodedToken } from '@/utils/jwtDecode';

export const storeUserInfo = (accessToken: string) => {
  return setToCookies(accessKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromCookies(accessKey);

  if (authToken) {
    const decodedData = decodedToken(authToken as string) as CustomJwtPayload;
    return decodedData;
  }
  return {
    email: null,
    role: null,
  };
};

export const isLoggedIn = () => {
  const authToken = getFromCookies(accessKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return removeFromCookies(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/users/access-token`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};
