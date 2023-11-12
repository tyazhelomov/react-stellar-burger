import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TErrorStateInitialState = {
  error: boolean;
  errorMsg?: string;
}

const errorStateInitialState: TErrorStateInitialState = {
  error: false,
  errorMsg: '',
};

export const errorStateSlice = createSlice({
  name: 'error-state',
  initialState: errorStateInitialState,
  reducers: {
    updateForm: (state, action: PayloadAction<TErrorStateInitialState>): TErrorStateInitialState => action.payload,
    refreshForm: (): TErrorStateInitialState => errorStateInitialState,
  },
});