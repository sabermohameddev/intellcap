import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  apiUrl = "http://localhost:3000/users";

  getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  updateUser(id: number, data: User): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<User>(url, data)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      );
  }

  updateProfile(data: Partial<User>): Observable<User> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const url = `${this.apiUrl}/${currentUser.id}`;
    const user: User = {...currentUser, ...data};

    localStorage.setItem('currentUser', JSON.stringify(user))
    return this.http.put<User>(url, user)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      );
  }

  toggleActivation(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      )
      .pipe(
        switchMap((user: User) => {
          user.isActive = !user.isActive;
          return this.http.put<User>(url, user);
        })
      );
  }

  changeUserRole(id: number, newRole: Role): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      )
      .pipe(
        switchMap((user: User) => {
          user.role = newRole;
          return this.http.put<User>(url, user);
        })
      );
  }
}
