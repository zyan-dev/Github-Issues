import { RouterActionTypes, SET_APP_LOADING } from "./types";

export interface RouterState {
  loading: boolean;
}

const InitialState = {
  loading: false,
};

export default function routerState(
  state: RouterState = InitialState,
  action: RouterActionTypes
): RouterState {
  switch (action.type) {
    case SET_APP_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
