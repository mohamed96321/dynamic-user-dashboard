import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserLoading } from './store/selectors/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'dynamic-user-dashboard';
  loading$: Observable<boolean> | undefined;

  constructor(private store: Store) {
    setTimeout(() => {
      this.loading$ = this.store.select(selectUserLoading);
    }, 0);
  }
}
