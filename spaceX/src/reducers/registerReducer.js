import {createSlice} from "@reduxjs/toolkit";

import registerServices from "../services/registerServices";
import {showNotificationR} from "./notificationReducer";

const registerSlice = createSlice({
  name: "register",
  initialState: [],
  reducers: {
    newUser(state, action) {
      return action.payload;
    },
  },
});

export const {newUser} = registerSlice.actions;

export const newUserR = (username, name, password) => {
  return async (dispatch) => {
    try {
      const user = await registerServices.createUser(username, name, password);
      dispatch(newUser(user));
      dispatch(
        showNotificationR(
          "success",
          "Thank you for joining, you can login now!",
          5
        )
      );
    } catch (error) {
      const mongoError = error.response.data.error;
      const splited = mongoError.split(":");

      if (mongoError.includes(":")) {
        dispatch(showNotificationR("error", splited[2], 5));
      } else {
        dispatch(showNotificationR("error", error.response.data.error, 5));
      }
    }
  };
};

export default registerSlice.reducer;
