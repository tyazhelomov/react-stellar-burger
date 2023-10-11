import { createSlice } from "@reduxjs/toolkit";
import { TAB_VALUES } from "../utils/constants";

const currentTabInitialState = { currentTopic: TAB_VALUES.bun };

export const currentTabSlice = createSlice({
  name: 'currentTab',
  initialState: currentTabInitialState,
  reducers: {
    changeTab: (state, action) => ({ currentTopic: action.payload }),
  },
});
