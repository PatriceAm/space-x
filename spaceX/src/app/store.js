import {configureStore} from "@reduxjs/toolkit";

import launchReducer from "../reducers/launchReducer";
import selectedLaunch from "../reducers/selecLaunchRed";
import loginReducer from "../reducers/loginReducer";
import registerReducer from "../reducers/registerReducer";
import notificationReducer from "../reducers/notificationReducer";
import updateReducer from "../reducers/updateReducer";
import deleteUserReducer from "../reducers/deleteUserReducer";

export const store = configureStore({
  reducer: {
    launches: launchReducer,
    launch: selectedLaunch,
    user: loginReducer,
    register: registerReducer,
    notification: notificationReducer,
    update: updateReducer,
    deleteUser: deleteUserReducer,
  },
});
