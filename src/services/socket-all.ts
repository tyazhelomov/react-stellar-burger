import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFeed, IFeedMessage } from "./types/socket";

const initialState: IFeed = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const wsAllSlice = createSlice({
  name: 'web-socket-all',
  initialState,
  reducers: {
    ws_all_success: (state): IFeed => ({ ...state, error: false, wsConnected: true }),
    ws_all_error: (state, action: PayloadAction<Event>): IFeed => ({ ...state, error: action.payload, wsConnected: false }),
    ws_all_closed: (state): IFeed => ({ ...state, error: undefined, wsConnected: false }),
    ws_all_get_message: (state, action: PayloadAction<IFeedMessage>): IFeed => ({ ...state, error: undefined, messages: action.payload }),
  }
});