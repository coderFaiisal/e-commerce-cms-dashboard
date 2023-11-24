import { getNewAccessToken, removeAdminInfo } from "@/services/auth.service";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types/common";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import { toast } from "sonner";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage("accessToken");

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };

    return responseObject;
  },

  async function (error) {
    const config = error?.config;

    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;

      const response = await getNewAccessToken();

      if (response?.data?.accessToken) {
        const accessToken = response.data.accessToken;

        config.headers["Authorization"] = accessToken;

        setToLocalStorage("accessToken", accessToken);

        return instance(config);
      } else {
        removeAdminInfo("accessToken");
        toast.message("Something went wrong!", {
          description: "Please, sign in again...",
        });
      }
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong",
        errorMessages: error?.response?.data?.errorMessages,
      };
      return { error: responseObject };
    }
  }
);

export { instance };
