import {CommonActions} from '@react-navigation/native';
import {RouteConfig} from '../redux/router/types';

const config: RouteConfig = {
  navigator: null,
};

function setNavigator(nav: any) {
  if (nav) {
    config.navigator = nav;
  }
}
function navigate(routeName: string, params: any) {
  if (config.navigator && routeName) {
    config.navigator.dispatch(
      CommonActions.navigate({name: routeName, params}),
    );
  }
}

function reset(routeName: string, params: any) {
  if (config.navigator && routeName) {
    config.navigator.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: routeName}],
      }),
    );
  }
}

function goBack() {
  if (config.navigator) {
    config.navigator.dispatch(CommonActions.goBack());
  }
}

export default {
  setNavigator,
  navigate,
  reset,
  goBack,
};
