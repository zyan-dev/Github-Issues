import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeStack from '../containers/home';
import NavigationServices from './NavigationServices';

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={ref => NavigationServices.setNavigator(ref)}>
      <Stack.Navigator headerMode="none" initialRouteName="AuthStack">
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
