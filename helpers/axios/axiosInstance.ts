import { authKey } from '@/constants/authKey';
import { getNewAccessToken, removeUserInfo } from '@/services/auth.service';
import { ResponseSuccessType, TGenericErrorResponse } from '@/types/common';
import { getFromCookies, setToCookies } from '@/utils/cookiesStorage';
import { notify } from '@/utils/customToast';
import axios from 'axios';

const instance = axios.create();

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromCookies(authKey);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
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

        config.headers['Authorization'] = accessToken;

        setToCookies(authKey, accessToken);

        return instance(config);
      } else {
        removeUserInfo(authKey);

        notify('error', 'Something went wrong!');
      }
    } else {
      const responseObject: TGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || 'Something went wrong',
        errorMessages: error?.response?.data?.errorMessages,
      };
      return { error: responseObject };
    }
  },
);

export { instance };
