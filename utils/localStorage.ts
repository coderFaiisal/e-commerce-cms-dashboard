export const setToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.setItem(key, token as string);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(key);
};
