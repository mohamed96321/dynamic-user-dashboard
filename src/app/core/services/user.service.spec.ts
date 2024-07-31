import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve users from the API', () => {
    const dummyUsers: User[] = [
      { id: 1, email: 'test1@test.com', first_name: 'Test1', last_name: 'User1', avatar: 'avatar1.jpg' },
      { id: 2, email: 'test2@test.com', first_name: 'Test2', last_name: 'User2', avatar: 'avatar2.jpg' }
    ];

    service.getUsers(1).subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`https://reqres.in/api/users?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should retrieve a single user by ID from the API', () => {
    const dummyUser: User = { id: 1, email: 'test1@test.com', first_name: 'Test1', last_name: 'User1', avatar: 'avatar1.jpg' };

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`https://reqres.in/api/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });
});
