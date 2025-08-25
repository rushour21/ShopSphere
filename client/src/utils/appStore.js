import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const persistedUser = localStorage.getItem("loggedUser")
  ? JSON.parse(localStorage.getItem("loggedUser"))
  : null;

const appStore = configureStore({
  reducer: {
    loggedUser: userReducer,
  },
  preloadedState: {
    loggedUser: persistedUser,
  }
});

export default appStore;
