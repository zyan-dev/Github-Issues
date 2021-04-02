export const SET_APP_LOADING = 'SET_APP_LOADING';

export type LoadingAction = {
  type: typeof SET_APP_LOADING;
  payload: boolean;
};

export type RouteConfig = {
  navigator: any;
};

export type RouterActionTypes = LoadingAction;
