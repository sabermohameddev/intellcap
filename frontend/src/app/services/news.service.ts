import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://localhost:3000/news';

  constructor(private http: HttpClient) {}

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      );
  }

  getNewsById(id: number): Observable<News> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<News>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      );
  }

  deleteNews(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}
