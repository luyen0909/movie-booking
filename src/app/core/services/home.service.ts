import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from './movie.service';
import { category } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/home';

  // lấy danh sách phim đang chiếu
  getNowShowing(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/now-showing`).pipe(
      catchError(this.handleError<Movie[]>('getNowShowing', []))
    );
  }

  // lấy danh sách phim sắp chiếu
  getComingSoon(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/coming-soon`).pipe(
      catchError(this.handleError<Movie[]>('getComingSoon', []))
    );
  }

  // lấy danh sách phim nổi bật cho Banner
  getBannerMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/banner`).pipe(
      catchError(this.handleError<Movie[]>('getBannerMovies', []))
    );
  }

  // lấy danh sách Góc điện ảnh
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`).pipe(
      catchError(this.handleError<any[]>('getPosts', []))
    );
  }

  // lấy danh sách Khuyến mãi
  getPromotions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/promotions`).pipe(
      catchError(this.handleError<any[]>('getPromotions', []))
    );
  }

  // lấy danh sách thể loại phim
  getCategories(): Observable<category[]> {
    return this.http.get<category[]>(`${this.apiUrl}/categories`).pipe(
      catchError(this.handleError<category[]>('getCategories', []))
    );
  }

  // ── Quick Booking ─────────────────────────────────────────────
  getQuickMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quick/movies`).pipe(
      catchError(this.handleError<any[]>('getQuickMovies', []))
    );
  }

  getQuickCinemas(movieId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quick/cinemas/${movieId}`).pipe(
      catchError(this.handleError<any[]>('getQuickCinemas', []))
    );
  }

  getQuickDates(movieId: string, cinemaId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/quick/dates/${movieId}/${cinemaId}`).pipe(
      catchError(this.handleError<string[]>('getQuickDates', []))
    );
  }

  getQuickShowtimes(movieId: string, cinemaId: string, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quick/showtimes/${movieId}/${cinemaId}/${date}`).pipe(
      catchError(this.handleError<any[]>('getQuickShowtimes', []))
    );
  }

  // xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
