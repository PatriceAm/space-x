import {createSlice} from "@reduxjs/toolkit";
import {getInitialData} from "../services/space";

const launchSlice = createSlice({
  name: "launches",
  initialState: [],
  reducers: {
    getAllLaunches(state, action) {
      return action.payload;
    },
  },
});

export const {getAllLaunches} = launchSlice.actions;

export const getAllLaunchesR = () => {
  return async (dispatch) => {
    const allLaunches = await getInitialData();
    dispatch(getAllLaunches(allLaunches));
  };
};

export default launchSlice.reducer;
