import axios, {InternalAxiosRequestConfig} from "axios";
import {BASE_URL, TOKEN} from "../consts.ts";
import Cookies from "js-cookie";
import UserStore from "../store/UserStore.ts";

const $api = axios.create({
  baseURL: BASE_URL,
});

const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const token = Cookies.get(TOKEN);
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
};

const responseInterceptor = async (error: any) => {
  const config = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    config._isRetry = true;
    try {
      await UserStore.renew();
      return $api.request(config);
    } catch (e) {
      console.log(e);
    }
  }
  throw error;
};

$api.interceptors.request.use(requestInterceptor);

$api.interceptors.response.use((config) => config, responseInterceptor);

export default $api;
