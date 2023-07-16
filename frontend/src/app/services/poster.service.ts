import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poster } from '../models/poster';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosterService {
  apiUrl = '';
  constructor(private http: HttpClient) { }

  getAllPosters(): Observable<Poster[]> {
    return this.http.get<Poster[]>(this.apiUrl);
  }

  addPoster(poster: Poster): Observable<Poster> {
    return this.http.post<Poster>(this.apiUrl, poster);
  }
}
