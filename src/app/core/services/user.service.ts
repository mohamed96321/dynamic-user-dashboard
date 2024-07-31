import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../models/user.model';
import { map, expand, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<User[]> {
    return this.http.get<UserResponse>(`${this.baseUrl}?page=${page}`).pipe(
      map(response => response.data)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<{ data: User }>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  searchUsers(query: string): Observable<User[]> {
    return this.fetchAllUsers().pipe(
      map(users =>
        users.filter(user =>
          `${user.first_name} ${user.last_name}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      )
    );
  }

  private fetchAllUsers(page: number = 1): Observable<User[]> {
    return this.http.get<UserResponse>(`${this.baseUrl}?page=${page}`).pipe(
      expand(response => response.page < response.total_pages ? this.http.get<UserResponse>(`${this.baseUrl}?page=${response.page + 1}`) : []),
      map(response => response.data),
      reduce<User[], User[]>((acc, data) => acc.concat(data), [])
    );
  }
}
