import { authKey } from '@/constants/authKey';
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { CustomJwtPayload } from '@/types/common';
import { decodedToken } from '@/utils/jwtDecode';

import { getBaseUrl } from '@/helpers/config/envConfig';
import {
  getFromCookies,
  removeFromCookies,
  setToCookies,
} from '@/utils/cookiesStorage';

export const storeUserInfo = (accessToken: string) => {
  return setToCookies(authKey, accessToken);
};

export const getClientUserInfo = () => {
  const authToken = getFromCookies(authKey);

  if (authToken) {
    const decodedData = decodedToken(authToken as string) as CustomJwtPayload;
    return decodedData;
  }
  return { id: '', role: '' };
};

export const isLoggedIn = () => {
  const authToken = getFromCookies(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return removeFromCookies(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};
