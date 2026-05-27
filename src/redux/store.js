import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import loaderReducer from "./slice/loaderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
  },
});

export default store;
