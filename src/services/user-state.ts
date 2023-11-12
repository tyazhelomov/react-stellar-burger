import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILoginInfo } from "./types/user-state";

const userStateSInitialState: ILoginInfo = {
  isLoading: false,
};

export const userStateSlice = createSlice({
  name: 'user-state',
  initialState: userStateSInitialState,
  reducers: {
    update: (state, action: PayloadAction<ILoginInfo>): ILoginInfo => {
      return {
        ...state,
        isLoading: action.payload.isLoading as boolean,
      }
    },
    login: (state, action: PayloadAction<ILoginInfo>): ILoginInfo => action.payload,
    logoutUser: (): ILoginInfo => userStateSInitialState,
    addToken: (state, action: PayloadAction<string>): ILoginInfo => ({ ...state, token: action.payload })
  },
});