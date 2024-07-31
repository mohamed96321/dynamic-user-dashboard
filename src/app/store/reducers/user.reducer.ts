import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../../core/models/user.model';

export interface State {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: any;
  page: number;
}

export const initialState: State = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  page: 1
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UserActions.loadUserById, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false,
  })),
  on(UserActions.loadUserByIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UserActions.searchUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.searchUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UserActions.searchUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UserActions.setPage, (state, { page }) => ({
    ...state,
    page,
  }))
);
