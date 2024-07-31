import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<State>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state: State) => state.users
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: State) => state.selectedUser
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: State) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: State) => state.error
);
