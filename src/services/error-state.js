import { createSlice } from "@reduxjs/toolkit";

const errorStateInitialState = {
  error: false,
  errorMsg: '',
};

export const errorStateSlice = createSlice({
  name: 'error-state',
  initialState: {},
  reducers: {
    updateForm: (state, action) => action.payload,
    refreshForm: (state, action) => errorStateInitialState,
  },
});