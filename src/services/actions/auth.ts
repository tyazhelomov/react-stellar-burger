import { Dispatch } from "redux";
import { AppThunk } from "../..";
import { ERROR_MAP } from "../../utils/constants";
import { fetchWithRefresh } from "../../utils/utils";
import { TErrorStateInitialState, errorStateSlice } from "../error-state";
import { IAuthData } from "../types/authData";
import { ILoginInfo, IUserInfo } from "../types/user-state";
import { userStateSlice } from '../user-state';

export function auth(endpoint: string, method: string, data?: IAuthData): AppThunk {
  return function(dispatch: Dispatch) {
    const { update, login, addToken } = userStateSlice.actions;
    const { updateForm } = errorStateSlice.actions;
    const loginInfo = {
      isLoading: true,
    };
    const errorInfo = {
      error: false
    };

    dispatch(update(loginInfo));
    dispatch(updateForm(errorInfo));

    fetchWithRefresh(endpoint, {
      body: JSON.stringify(data),
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then(({ response: data, accessToken }) => {
      const user = data.user as IUserInfo;
      const loginInfo: ILoginInfo = {
        user,
        isLoading: false,
      };
      const errorInfo = {
        error: false
      };

      if (accessToken) {
        dispatch(addToken(accessToken));
      }

      dispatch(login(loginInfo));
      dispatch(updateForm(errorInfo));
    })
    .catch((err) => {
      console.error(err)

      const loginInfo: ILoginInfo = {
        isLoading: false,
      };
      const errorInfo: TErrorStateInitialState = {
        error: true,
        errorMsg: ERROR_MAP[err.message],
      };

      dispatch(update(loginInfo));
      dispatch(updateForm(errorInfo));
    });
  }
}