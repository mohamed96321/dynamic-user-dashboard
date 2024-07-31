import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { userReducer } from '../../store/reducers/user.reducer';
import * as UserActions from '../../store/actions/user.actions';
import { UserCardComponent } from '../../shared/components/user-card/user-card.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, UserCardComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ user: userReducer })
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.loadUsers({ page: 1 }));
  });

  it('should navigate to user details page on user click', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onUserClick(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/user', 1]);
  });
});
