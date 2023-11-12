import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAB_VALUES } from "../utils/constants";

type TCurrentTabInitialState = { [name: string]: string; };

const currentTabInitialState: TCurrentTabInitialState = { currentTopic: TAB_VALUES.bun };

export const currentTabSlice = createSlice({
  name: 'currentTab',
  initialState: currentTabInitialState,
  reducers: {
    changeTab: (state, action: PayloadAction<string>): TCurrentTabInitialState => ({ currentTopic: action.payload }),
  },
});
