import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(action => this.userService.getUsers(action.page).pipe(
      map(users => UserActions.loadUsersSuccess({ users })),
      catchError(error => of(UserActions.loadUsersFailure({ error })))
    ))
  ));

  loadUserById$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUserById),
    mergeMap(action => this.userService.getUserById(action.id).pipe(
      map(user => UserActions.loadUserByIdSuccess({ user })),
      catchError(error => of(UserActions.loadUserByIdFailure({ error })))
    ))
  ));

  searchUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.searchUsers),
    mergeMap(action => this.userService.searchUsers(action.query).pipe(
      map(users => UserActions.searchUsersSuccess({ users })),
      catchError(error => of(UserActions.searchUsersFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
