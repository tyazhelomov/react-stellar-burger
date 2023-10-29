import { auth } from "../services/actions/auth";
import { wsAllSlice } from "../services/socket-all";
import { wsOwnerSlice } from "../services/socket-owner";
import { ENDPOINTS } from "../utils/constants";

const { ws_all_success, ws_all_error, ws_all_closed, ws_all_get_message } = wsAllSlice.actions;
const { ws_owner_success, ws_owner_error, ws_owner_closed, ws_owner_get_message } = wsOwnerSlice.actions

export const socketMiddleware = wsUrl => {
  return store => {
    let socketAll = null;
    let socketOwner = null;

    return next => action => {
      const { dispatch } = store;
      const { type, endpoint } = action;
      const token = localStorage.getItem('accessToken');

      if (type === 'WS_ALL_CONNECTION_START') {
        socketAll = new WebSocket(`${ wsUrl }${ endpoint }`);
      }

      if (type === 'WS_OWNER_CONNECTION_START') {
        socketOwner = new WebSocket(`${ wsUrl }${ endpoint }`);
      }

      if (socketAll) {
        socketAll.onopen = event => {
          dispatch(ws_all_success(event));
        };
        socketAll.onerror = event => {
          dispatch(ws_all_error(event));
        };
        socketAll.onmessage = event => {
          const { data } = event;
          dispatch(ws_all_get_message(JSON.parse(data)));
        };
        socketAll.onclose = event => {
          dispatch(ws_all_closed(event));
        };
      }

      if (socketOwner) {
        socketOwner.onopen = event => {
          dispatch(ws_owner_success(event));
        };
        socketOwner.onerror = event => {
          dispatch(ws_owner_error(event));
        };
        socketOwner.onmessage = event => {
          const { data } = event;
          if (JSON.parse(data).message === 'Invalid or missing token' && token) {
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
          dispatch(ws_owner_closed(event));
        };
      }

      next(action);
    };
  };
};