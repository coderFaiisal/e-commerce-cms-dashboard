import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const setToCookies = (key: string, value: string) => {
  return setCookie(key, value);
};

export const getFromCookies = (key: string) => {
  return getCookie(key);
};

export const removeFromCookies = (key: string) => {
  return deleteCookie(key);
};
