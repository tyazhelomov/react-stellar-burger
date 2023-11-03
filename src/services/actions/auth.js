import { ERROR_MAP } from "../../utils/constants";
import { fetchWithRefresh } from "../../utils/utils";
import { errorStateSlice } from "../error-state";
import { userStateSlice } from '../user-state';

export function auth(endpoint, method, data) {
  return function(dispatch) {
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
      const loginInfo = {
        user: data.user,
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

      const loginInfo = {
        isLoading: false,
      };
      const errorInfo = {
        error: true,
        errorMsg: ERROR_MAP[err.message],
      };

      dispatch(update(loginInfo));
      dispatch(updateForm(errorInfo));
    });
  }
}