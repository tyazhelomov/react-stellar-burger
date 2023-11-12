import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import thunk, { ThunkAction } from "redux-thunk";
import { Action, configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./services";
import { HashRouter as Router } from "react-router-dom";
import { socketMiddleware } from './middleware/socketMiddleware';
import { TActions } from "./services/types";
import type {} from 'redux-thunk/extend-redux'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(thunk, socketMiddleware()),
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, Action<TActions>>;


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
