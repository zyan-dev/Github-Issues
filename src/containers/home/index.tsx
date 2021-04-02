import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RepositoryListScreen from './RepositoryList';
import IssueListScreen from './IssueList';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="HomeStack">
      <Stack.Screen name="RepositoryList" component={RepositoryListScreen} />
      <Stack.Screen name="IssueList" component={IssueListScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
