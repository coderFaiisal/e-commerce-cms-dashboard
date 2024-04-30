import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const setToCookies = (key: string, token: string) => {
  return setCookie(key, token);
};

export const getFromCookies = (key: string) => {
  return getCookie(key);
};

export const removeFromCookies = (key: string) => {
  return deleteCookie(key);
};
