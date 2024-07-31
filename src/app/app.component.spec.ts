import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { userReducer } from './store/reducers/user.reducer';
import { selectUserLoading } from './store/selectors/user.selectors';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        StoreModule.forRoot({ user: userReducer })
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading bar when loading', () => {
    store.overrideSelector(selectUserLoading, true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-bar')).toBeTruthy();
  });

  it('should not display loading bar when not loading', () => {
    store.overrideSelector(selectUserLoading, false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-bar')).toBeFalsy();
  });
});
