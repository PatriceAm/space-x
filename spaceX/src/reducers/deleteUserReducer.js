import {createSlice} from "@reduxjs/toolkit";

import deleteUserService from "../services/deleteUserService";
import {logOutUserR} from "./loginReducer";
import {showNotificationR} from "./notificationReducer";

const deleteAccountSlice = createSlice({
  name: "delete-account",
  initialState: "",
  reducers: {
    deleteAccount(state, action) {
      return action.payload;
    },
  },
});

export const {deleteAccount} = deleteAccountSlice.actions;

export const deleteAccountR = (data) => {
  return async (dispatch, getState) => {
    const getUserToken = getState();
    deleteUserService.setToken(getUserToken.user.token);

    try {
      await deleteUserService.deleteUser(data.username);

      dispatch(deleteAccount(data.username));
      dispatch(
        showNotificationR(
          "success",
          "Your Account has been successfuly deleted",
          5
        )
      );
      await dispatch(logOutUserR());
    } catch (error) {
      dispatch(showNotificationR("error", error.response.data.error, 5));
    }
  };
};

export default deleteAccountSlice.reducer;
