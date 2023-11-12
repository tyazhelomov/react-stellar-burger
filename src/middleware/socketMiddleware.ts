
import { auth } from "../services/actions/auth";
import { WS_ALL_CLOSE, WS_ALL_CONNECTION_START, WS_OWNER_CLOSE, WS_OWNER_CONNECTION_START } from "../services/actions/socket";
import { wsAllSlice } from "../services/socket-all";
import { wsOwnerSlice } from "../services/socket-owner";
import { ENDPOINTS } from "../utils/constants";
import { RootState } from "..";
import { TActions } from "../services/types";
import { Middleware } from "redux";


const { ws_all_success, ws_all_error, ws_all_closed, ws_all_get_message } = wsAllSlice.actions;
const { ws_owner_success, ws_owner_error, ws_owner_closed, ws_owner_get_message } = wsOwnerSlice.actions;

export function socketMiddleware(): Middleware<{}, RootState> {
  return store => {
    let socketAll: WebSocket;
    let socketOwner: WebSocket;

    return next => (action: { url: string, type: TActions }) => {
      const { dispatch } = store;
      const { url, type } = action;

      if (type === WS_ALL_CONNECTION_START) {
        socketAll = new WebSocket(url);
      }

      if (type === WS_OWNER_CONNECTION_START) {
        socketOwner = new WebSocket(url);
      }

      if (type === WS_ALL_CLOSE && socketAll) {
        socketAll.close(1000);
      }

      if (type === WS_OWNER_CLOSE && socketOwner) {
        socketOwner.close(1000);
      }

      if (socketAll) {
        socketAll.onopen = () => {
          dispatch(ws_all_success());
        };
        socketAll.onerror = event => {
          dispatch(ws_all_error(event));
        };
        socketAll.onmessage = event => {
          const { data } = event;
          dispatch(ws_all_get_message(JSON.parse(data)));
        };
        socketAll.onclose = event => {
          dispatch(ws_all_closed());

          if (event.code !== 1000) {
            setTimeout(() => {
              console.log(event)
              const { url } = event.target as WebSocket;
              dispatch({ type: WS_ALL_CONNECTION_START, url });
            }, 1000)
          }
        };
      }

      if (socketOwner) {
        socketOwner.onopen = event => {
          dispatch(ws_owner_success());
        };
        socketOwner.onerror = event => {
          dispatch(ws_owner_error(event));
        };
        socketOwner.onmessage = event => {
          const { data } = event;
          if (JSON.parse(data).message === 'Invalid or missing token' && localStorage.getItem('accessToken')) {
            dispatch(
              auth(
                ENDPOINTS.USER_INFO,
                'GET'
              )
            )
          }
          dispatch(ws_owner_get_message(JSON.parse(data)));
        };
        socketOwner.onclose = event => {
          dispatch(ws_owner_closed());

          if (event.code !== 1000) {
            setTimeout(() => {
              const { url } = event.target as WebSocket;
              dispatch({ type: WS_OWNER_CONNECTION_START, url });
            }, 1000)
          }
        };
      }

      next(action);
    };
  };
};