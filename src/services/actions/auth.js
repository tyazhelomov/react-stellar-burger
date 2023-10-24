import { ERROR_MAP } from "../../utils/constants";
import { fetchWithRefresh } from "../../utils/utils";
import { errorStateSlice } from "../error-state";
import { userStateSlice } from '../user-state';

export function auth(endpoint, method, data) {
  return function(dispatch) {
    const { update, login } = userStateSlice.actions;
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
    .then(data => {
      console.log(111, data)
      const loginInfo = {
        user: data.user,
        isLoading: false,
      };
      const errorInfo = {
        error: false
      };

      dispatch(login(loginInfo));
      dispatch(updateForm(errorInfo));
    })
    .catch((err) => {
      console.error(123, err)

      const loginInfo = {
        isLoading: false,
      };
      const errorInfo = {
        error: true,
        errorMsg: ERROR_MAP[err.message],
      };

      console.log(999, errorInfo, loginInfo)

      dispatch(update(loginInfo));
      dispatch(updateForm(errorInfo));
    });
  }
}