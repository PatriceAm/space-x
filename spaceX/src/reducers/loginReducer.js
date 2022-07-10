import {createSlice} from "@reduxjs/toolkit";

import loginServices from "../services/loginServices";
import {showNotificationR} from "./notificationReducer";

const user = JSON.parse(localStorage.getItem("spaceX-user"));
const initialState = user ? user : null;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser(state, action) {
      return action.payload;
    },
    loadUser(state, action) {
      return state.user;
    },

    logOutUser(state, action) {
      return null;
    },
  },
});

export const {loginUser, loadUser, logOutUser} = loginSlice.actions;

export const loginUserR = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginServices.login(username, password);
      localStorage.setItem("spaceX-user", JSON.stringify(user));
      dispatch(loginUser(user));
      dispatch(showNotificationR("success", `Welcome, ${user.username}`, 5));
    } catch (error) {
      dispatch(showNotificationR("error", error.response.data.error, 5));
    }
  };
};

export const loadUserR = () => {
  return async (dispatch) => {
    await JSON.parse(localStorage.getItem("spaceX-user"));
    await dispatch(loadUser(user));
  };
};

export const logOutUserR = () => {
  return async (dispatch) => {
    localStorage.removeItem("spaceX-user");
    dispatch(logOutUser());
  };
};

export default loginSlice.reducer;
