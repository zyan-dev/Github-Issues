import { put, call, takeLatest, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import {
  FetchIssuesAction,
  FetchRepositoriesAction,
  FETCH_ISSUE,
  FETCH_REPOSITORY,
  SET_ISSUES,
  ADD_ISSUES,
  SET_END_REACHED,
  SET_ISSUES_ERROR,
  SET_REPOSITORIES,
  SET_REPOSITORY_ERROR,
  FETCH_MORE_ISSUE,
} from './types';
import API from '../../services/api';
import { SET_APP_LOADING } from '../router/types';

export function* FetchRepositories(action: FetchRepositoriesAction) {
  yield put({ type: SET_APP_LOADING, payload: true });
  try {
    const response = yield call(API.fetchRepositories, action.payload);
    if(response.status === 200) {
      const repos = response.data.map((item: any) => _.pick(item, ['id', 'name', 'description', 'owner', 'has_issues', 'open_issues']));
      yield put({ type: SET_REPOSITORIES, payload: repos });
    }
  } catch (e) {
    yield put({ type: SET_REPOSITORY_ERROR, payload: "Can't find the organization" });
  }
  yield put({ type: SET_APP_LOADING, payload: false });
}

export function* FetchIssues(action: FetchIssuesAction) {
  yield put({ type: SET_APP_LOADING, payload: true });
  yield put({ type: SET_ISSUES, payload: [] });
  try {
    const {org, repo} = action.payload;
    console.log({org, repo})
    const response = yield call(API.fetchIssues, org, repo, 1);
    if(response.status === 200) {
      const issues = response.data.map((item: any) => _.pick(item, ['id', 'title', 'user', 'labels', 'state', 'comments', 'body']));
      yield put({ type: SET_ISSUES, payload: issues });
    }
  } catch (e) {
    console.log(e.toString())
    yield put({ type: SET_ISSUES_ERROR, payload: "Error occured" });
  }
  yield put({ type: SET_APP_LOADING, payload: false });
}

export function* FetchMoreIssues(action: FetchIssuesAction) {
  const state = yield select();
  const {issuePages} = state.home;
  yield put({ type: SET_APP_LOADING, payload: true });
  try {
    const {org, repo} = action.payload;
    console.log({org, repo})
    const response = yield call(API.fetchIssues, org, repo, issuePages + 1);
    if(response.status === 200) {
      const issues = response.data.map((item: any) => _.pick(item, ['id', 'title', 'user', 'labels', 'state', 'comments', 'body']));
      yield put({ type: ADD_ISSUES, payload: issues });
      console.log(issues.length)
    }
  } catch (e) {
    console.log(e.toString())
    yield put({ type: SET_ISSUES_ERROR, payload: "Error occured" });
  }
  yield put({ type: SET_APP_LOADING, payload: false });
}

function* HomeSaga(): Generator {
  yield takeLatest(FETCH_REPOSITORY, FetchRepositories);
  yield takeLatest(FETCH_ISSUE, FetchIssues);
  yield takeLatest(FETCH_MORE_ISSUE, FetchMoreIssues);
}

export default HomeSaga;
