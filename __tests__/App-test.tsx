/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import RepositoryListScreen from '../src/containers/home/RepositoryList';
import store from '../src/redux/store';
import IssueListScreen from '../src/containers/home/IssueList';

let queryResults = [];
let element = {};

it('Repositories screen correctly', async () => {
  const RepositoryList = (
    <Provider store={store}>
      <RepositoryListScreen />
    </Provider>
  );

  const {getByPlaceholderText, getByTestId, findByTestId} = render(
    RepositoryList,
  );
  fireEvent.changeText(
    getByPlaceholderText('Type your github organization...'),
    'Shopify',
  );
  fireEvent.press(getByTestId('organization-submit'));
  await waitForElementToBeRemoved(() => getByTestId('loader'));
  element = getByTestId('repository-list');
  expect(element).toBeDefined();
});

it('Issues screen correctly', async () => {
  const param = {
    route: {
      params: {
        org: 'Shopify',
        repo: 'active_fulfillment',
      },
    },
  };
  const IssueList = (
    <Provider store={store}>
      <IssueListScreen {...param} />
    </Provider>
  );

  const {
    getByPlaceholderText,
    queryAllByTestId,
    queryAllByText,
    getByTestId,
  } = render(IssueList);

  await waitForElementToBeRemoved(() => getByTestId('loader'));
  queryResults = queryAllByTestId('issue-item');
  expect(queryResults).toHaveLength(6);

  fireEvent.changeText(
    getByPlaceholderText('Search by issue title'),
    'consider',
  );
  queryResults = queryAllByText('open');
  expect(queryResults.length).toBeGreaterThan(0);
  fireEvent.changeText(
    getByPlaceholderText('Search by issue title'),
    'consider',
  );
  queryResults = queryAllByText('abcdedfghijklmnopqrstuvwxyz');
  expect(queryResults).toHaveLength(0);
});
