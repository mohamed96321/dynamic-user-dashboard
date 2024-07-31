import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import * as UserActions from '../../store/actions/user.actions';
import {
  selectUsers,
  selectUserLoading,
  selectUserError,
} from '../../store/selectors/user.selectors';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  query: string = '';
  page: number = 1;
  hasMoreUsers: boolean = true; // Track if more users are available

  constructor(
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.cdr.detectChanges();
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers({ page: this.page }));
    this.users$.subscribe(users => {
      this.hasMoreUsers = users.length > 0; // Check if users are available
    });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.query = inputElement.value;
    if (this.query.trim()) {
      this.store.dispatch(UserActions.searchUsers({ query: this.query }));
      this.page = 1; // Reset to first page on search
    } else {
      this.loadUsers();
    }
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadUsers();
  }

  onUserClick(id: number): void {
    this.router.navigate(['/user', id]);
  }
}
