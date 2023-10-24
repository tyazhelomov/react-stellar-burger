import { createSlice } from "@reduxjs/toolkit";

const userStateSInitialState = {
  isLoading: false,
  user: undefined,
};

export const userStateSlice = createSlice({
  name: 'user-state',
  initialState: userStateSInitialState,
  reducers: {
    update: (state, action) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    },
    login: (state, action) => action.payload,
    logoutUser: () => userStateSInitialState,
  },
});