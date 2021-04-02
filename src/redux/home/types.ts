export const FETCH_REPOSITORY = 'FETCH_REPOSITORY';
export const FETCH_ISSUE = 'FETCH_ISSUE';
export const FETCH_MORE_ISSUE = 'FETCH_MORE_ISSUE';
export const SET_REPOSITORIES = 'SET_REPOSITORIES';
export const SET_REPOSITORY_ERROR = 'SET_REPOSITORY_ERROR';
export const SET_ISSUES = 'SET_ISSUES';
export const ADD_ISSUES = 'ADD_ISSUES';
export const SET_END_REACHED = 'SET_END_REACHED';
export const SET_ISSUES_ERROR = 'SET_ISSUES_ERROR';

export type RepoOwner = {
  "login": string;
  "id": number;
  "node_id": string;
  "avatar_url": string;
  "gravatar_id": string;
  "url": string;
  "html_url": string;
  "followers_url": string;
  "following_url": string;
  "gists_url": string;
  "starred_url": string;
  "subscriptions_url": string;
  "organizations_url": string;
  "repos_url": string;
  "events_url": string;
  "received_events_url": string;
  "type": string;
  "site_admin": boolean
}

export type Repository = {
  id: number;
  name: string;
  description: string;
  owner: RepoOwner;
  has_issues: boolean;
  open_issues: number;
}

export type IssueLabel = {
  id: number,
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export type Issue = {
  id: number;
  title: string;
  user: RepoOwner;
  labels: IssueLabel[];
  state: string;
  comments: number;
  body: string;
}

export type FetchRepositoriesAction = {
  type: typeof FETCH_REPOSITORY;
  payload: string;
};

export type FetchIssuesAction = {
  type: typeof FETCH_ISSUE;
  payload: any;
};

export type SetRepositoriesAction = {
  type: typeof SET_REPOSITORIES;
  payload: Repository[];
};

export type SetRepositoryError = {
  type: typeof SET_REPOSITORY_ERROR;
  payload: string;
};

export type SetIssuesAction = {
  type: typeof SET_ISSUES;
  payload: Issue[];
};

export type AddIssuesAction = {
  type: typeof ADD_ISSUES;
  payload: Issue[];
};

export type SetIssueError = {
  type: typeof SET_ISSUES_ERROR;
  payload: string;
};

export type HomeActionTypes = 
FetchRepositoriesAction | 
SetRepositoriesAction | 
SetRepositoryError | 
SetIssuesAction | 
SetIssueError |
AddIssuesAction;
