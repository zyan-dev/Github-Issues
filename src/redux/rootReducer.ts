import { combineReducers } from 'redux';
import homeReducer, { HomeState } from './home/reducer';
import appReducer, { RouterState } from './router/reducer';

export interface AppState {
  router: RouterState;
  home: HomeState;
}

const rootReducer = combineReducers<AppState>({
  router: appReducer,
  home: homeReducer,
});

export default rootReducer;
