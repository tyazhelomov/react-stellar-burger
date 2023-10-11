import { createSlice } from "@reduxjs/toolkit";

const isVisibleModalInitialState = { isVisible: false };

export const modalVisibilitySlice = createSlice({
  name: 'modalVisibility',
  initialState: isVisibleModalInitialState,
  reducers: {
    openModal: () => ({ isVisible: true }),
    closeModal: () => isVisibleModalInitialState,
  },
});
