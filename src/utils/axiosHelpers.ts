import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { auth } from "@/plugins/firebase";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.VUE_APP_baseUrl;

axiosClient.defaults.withCredentials = false;

axiosClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let token = localStorage.getItem("token") ?? null;

    if (!token) {
      const idToken = await auth.currentUser?.getIdTokenResult(true);
      token = idToken?.token ?? null;
    }

    const headers: AxiosRequestHeaders = {
      Authorization: `Bearer ${token}`,
    };
    config.headers = headers;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
