import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const wsAllSlice = createSlice({
  name: 'web-socket-all',
  initialState,
  reducers: {
    ws_all_success: (state) => ({ ...state, error: false, wsConnected: true }),
    ws_all_error: (state, action) => ({ ...state, error: action.payload, wsConnected: false }),
    ws_all_closed: (state) => ({ ...state, error: undefined, wsConnected: false }),
    ws_all_get_message: (state, action) => ({ ...state, error: undefined, messages: action.payload }),
  }
});