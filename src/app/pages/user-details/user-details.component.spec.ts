import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserDetailsComponent } from './user-details.component';
import { userReducer } from '../../store/reducers/user.reducer';
import * as UserActions from '../../store/actions/user.actions';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let store: Store;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ user: userReducer })
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } }
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUserById action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.loadUserById({ id: '1' }));
  });

  it('should navigate back to user list on back button click', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
