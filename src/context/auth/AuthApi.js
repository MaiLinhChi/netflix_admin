import { loginFailure, loginSuccess } from "./AuthActions";
import * as authService from "@/services/auths";

export const login = async (user, dispatch, setLoading) => {
  try {
    setLoading(true);
    const res = await authService.login(user);
    dispatch(loginSuccess(res.data));
    setLoading(false);
  } catch (error) {
    dispatch(loginFailure);
    setLoading(false);
  }
};
