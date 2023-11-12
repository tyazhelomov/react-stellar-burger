import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFeed, IFeedMessage } from "./types/socket";

const initialState: IFeed = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const wsOwnerSlice = createSlice({
  name: 'web-socket-owner',
  initialState,
  reducers: {
    ws_owner_success: (state): IFeed => ({ ...state, error: false, wsConnected: true }),
    ws_owner_error: (state, action: PayloadAction<Event>): IFeed => ({ ...state, error: action.payload, wsConnected: false }),
    ws_owner_closed: (state): IFeed => ({ ...state, error: undefined, wsConnected: false }),
    ws_owner_get_message: (state, action: PayloadAction<IFeedMessage>): IFeed => ({ ...state, error: undefined, messages: action.payload }),
  }
});