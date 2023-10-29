import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const wsOwnerSlice = createSlice({
  name: 'web-socket-owner',
  initialState,
  reducers: {
    ws_owner_success: (state) => ({ ...state, error: false, wsConnected: true }),
    ws_owner_error: (state, action) => ({ ...state, error: action.payload, wsConnected: false }),
    ws_owner_closed: (state) => ({ ...state, error: undefined, wsConnected: false }),
    ws_owner_get_message: (state, action) => ({ ...state, error: undefined, messages: action.payload }),
  }
});