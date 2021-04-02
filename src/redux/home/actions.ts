import { FETCH_REPOSITORY, FETCH_ISSUE, FETCH_MORE_ISSUE } from "./types";

export const fetchRepositories = (org: string) => {
  return {
    type: FETCH_REPOSITORY,
    payload: org,
  };
};

export const fetchIssues = (org: string, repo: string) => {
  return {
    type: FETCH_ISSUE,
    payload: {org, repo},
  };
};

export const fetchMoreIssues = (org: string, repo: string) => {
  return {
    type: FETCH_MORE_ISSUE,
    payload: {org, repo},
  };
};
