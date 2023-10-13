import { createSlice } from "@reduxjs/toolkit";

const modalInfoInitialState = {};

export const modalInfoSlice = createSlice({
  name: 'modalInfo',
  initialState: modalInfoInitialState,
  reducers: {
    addModalInfo: (state, action) => action.payload,
    removeModalInfo: () => modalInfoInitialState,
  },
});