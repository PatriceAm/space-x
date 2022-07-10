import {createSlice} from "@reduxjs/toolkit";

import updateUserServices from "../services/updateUserServices";
import {showNotificationR} from "./notificationReducer";
import {logOutUserR} from "./loginReducer";

const updateSlice = createSlice({
  name: "update",
  initialState: "",
  reducers: {
    updatePassword(state, action) {
      return action.payload;
    },
  },
});

export const {updatePassword} = updateSlice.actions;

export const updatePasswordR = (data) => {
  return async (dispatch, getState) => {
    const getUserToken = getState();
    updateUserServices.setToken(getUserToken.user.token);

    try {
      const updatedPassword = await updateUserServices.updateUser(data);
      dispatch(updatePassword(updatedPassword));
      dispatch(
        showNotificationR(
          "success",
          "Your Password has been successfuly updated, please login with your new credentials",
          5
        )
      );
      await dispatch(logOutUserR());
    } catch (error) {
      dispatch(showNotificationR("error", error.response.data.error, 5));
    }
  };
};

export default updateSlice.reducer;
