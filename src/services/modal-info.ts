import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IModalInfo } from "./types/modal-info";

const modalInfoInitialState: IModalInfo = {};

export const modalInfoSlice = createSlice({
  name: 'modalInfo',
  initialState: modalInfoInitialState,
  reducers: {
    addModalInfo: (state, action: PayloadAction<IModalInfo>): IModalInfo => action.payload,
    removeModalInfo: (): IModalInfo => modalInfoInitialState,
  },
});