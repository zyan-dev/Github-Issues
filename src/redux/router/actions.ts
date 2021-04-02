import { SET_APP_LOADING } from "./types";

export const setLoading = (loading: boolean) => {
  return {
    type: SET_APP_LOADING,
    payload: loading,
  };
};
