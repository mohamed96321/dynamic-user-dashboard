import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import * as UserActions from '../../store/actions/user.actions';
import { selectSelectedUser, selectUserLoading } from '../../store/selectors/user.selectors';
import { ChangeDetectorRef } from '@angular/core'; 

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<User | null>;
  loading$: Observable<boolean> | undefined;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {
    this.user$ = this.store.select(selectSelectedUser);
    this.loading$ = this.store.select(selectUserLoading);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(UserActions.loadUserById({ id }));
    this.cdr.detectChanges();
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
