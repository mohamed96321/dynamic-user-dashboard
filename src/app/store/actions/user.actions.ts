import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const loadUsers = createAction(
  '[User List] Load Users',
  props<{ page: number }>()
);
export const loadUsersSuccess = createAction(
  '[User List] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User List] Load Users Failure',
  props<{ error: any }>()
);

export const loadUserById = createAction(
  '[User Details] Load User By Id',
  props<{ id: number }>()
);
export const loadUserByIdSuccess = createAction(
  '[User Details] Load User By Id Success',
  props<{ user: User }>()
);
export const loadUserByIdFailure = createAction(
  '[User Details] Load User By Id Failure',
  props<{ error: any }>()
);

export const searchUsers = createAction(
  '[User List] Search Users',
  props<{ query: string }>()
);
export const searchUsersSuccess = createAction(
  '[User List] Search Users Success',
  props<{ users: User[] }>()
);
export const searchUsersFailure = createAction(
  '[User List] Search Users Failure',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[User List] Set Page',
  props<{ page: number }>()
);
