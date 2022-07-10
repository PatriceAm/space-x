import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
  },
});

export const {showNotification} = notificationSlice.actions;

export const showNotificationR = (classType, text, time) => {
  return async (dispatch) => {
    await dispatch(showNotification({classType, text}));

    setTimeout(() => {
      dispatch(showNotification(null));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
