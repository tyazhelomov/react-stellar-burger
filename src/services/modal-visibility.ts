import { createSlice } from "@reduxjs/toolkit";

type TIsVisibleModal = { isVisible: boolean; };

const isVisibleModalInitialState: TIsVisibleModal = { isVisible: false };

export const modalVisibilitySlice = createSlice({
  name: 'modalVisibility',
  initialState: isVisibleModalInitialState,
  reducers: {
    openModal: (): TIsVisibleModal => ({ isVisible: true }),
    closeModal: (): TIsVisibleModal => isVisibleModalInitialState,
  },
});
