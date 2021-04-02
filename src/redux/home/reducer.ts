import { 
  SET_REPOSITORIES, 
  SET_REPOSITORY_ERROR, 
  SET_ISSUES, 
  SET_ISSUES_ERROR, 
  ADD_ISSUES,
  HomeActionTypes, 
  Repository, 
  Issue, 
} from './types';

export interface HomeState {
  loading: boolean;
  repositories: Repository[];
  issuePages: number;
  issues: Issue[];
  repoError: string;
  issueError: string;
  issueEndReached: boolean;
}

const InitialState = {
  loading: false,
  repositories: [],
  issues: [],
  issuePages: 1,
  repoError: '',
  issueError: '',
  issueEndReached: false
};

export default function homeReducer(
  state: HomeState = InitialState,
  action: HomeActionTypes
): HomeState {
  switch (action.type) {
    case SET_REPOSITORIES:
      return {
        ...state,
        repoError: '',
        repositories: action.payload
      }
    case SET_ISSUES:
      return {
        ...state,
        repoError: '',
        issues: action.payload,
        issueEndReached: action.payload.length < 30,
      }
    case ADD_ISSUES:
      return {
        ...state,
        issueError: '',
        issuePages: action.payload.length > 0 ? state.issuePages + 1 : state.issuePages,
        issueEndReached: action.payload.length < 30,
        issues: [...state.issues, ...action.payload]
      }
    case SET_REPOSITORY_ERROR:
      return {
        ...state,
        repoError: action.payload
      }
    case SET_ISSUES_ERROR:
      return {
        ...state,
        issueError: action.payload
      }
    default:
      return state;
  }
}
