import axios from "axios";
import store from "../redux/store";
import Swal from "sweetalert2";
import logo from "../assets/logo.svg";

export const mainContant = {
  appName: "EDGE",
  appURL: "",
  logo: logo,
  contactNo: "+91 9630265692",
  email: "sakshikacher@gmail.com",
  address: "Navsari bilimora Gujarat, India - 396321",
};

export const backendConfig = {
  // base: "http://192.168.29.96:6056/api",
  // origin: "http://192.168.29.96:6056",

  base: "https://api.algo.starchainlabs.in/api",
  origin: "https://api.algo.starchainlabs.in/",
};

export const Axios = axios.create({ 
  baseURL: backendConfig.base,
  timeout: 15000, // optional (15s)
});

Axios.interceptors.request.use(
  (config) => {
    const state = store.getState();

    const token =
      state?.auth?.token || sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      if (!window.__sessionExpiredShown) {
        window.__sessionExpiredShown = true;

        await Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Please login again",
        });

        sessionStorage.clear();
        window.location.href = "/login";
      }
    }

  

    if (!error.response) {
      Swal.fire("Error", "Network error", "error");
    }

    return Promise.reject(error);
  }
);