import { createSlice } from '@reduxjs/toolkit';

const selectedLaunchSlice = createSlice({
  name: 'selectedLaunch',
  initialState: {},
  reducers: {
    selectLaunch(state, action) {
      return action.payload;
    },
  },
});

export const { selectLaunch } = selectedLaunchSlice.actions;

export const selectLaunchR = launch => {
  return async dispatch => {
    localStorage.setItem('rocket', JSON.stringify(launch));
    await dispatch(selectLaunch(launch));
  };
};

export default selectedLaunchSlice.reducer;
