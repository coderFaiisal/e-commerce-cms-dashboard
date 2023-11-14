import { setToLocalStorage } from "@/utils/localStorage";

export const storeUserInfo = (accessToken: string) => {
  setToLocalStorage("accessToken", accessToken);
};
