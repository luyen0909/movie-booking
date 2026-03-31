import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from './movie.service';
import { category } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/home';

  // Cache các Observable để tránh gọi API lại khi navigate giữa các trang
  private cache = new Map<string, Observable<any>>();

  private cached<T>(key: string, source$: Observable<T>): Observable<T> {
    if (!this.cache.has(key)) {
      this.cache.set(key, source$.pipe(shareReplay(1)));
    }
    return this.cache.get(key)! as Observable<T>;
  }

  // lấy danh sách phim đang chiếu
  getNowShowing(): Observable<Movie[]> {
    return this.cached('now-showing',
      this.http.get<Movie[]>(`${this.apiUrl}/now-showing`).pipe(
        catchError(this.handleError<Movie[]>('getNowShowing', []))
      )
    );
  }

  // lấy danh sách phim sắp chiếu
  getComingSoon(): Observable<Movie[]> {
    return this.cached('coming-soon',
      this.http.get<Movie[]>(`${this.apiUrl}/coming-soon`).pipe(
        catchError(this.handleError<Movie[]>('getComingSoon', []))
      )
    );
  }

  // lấy danh sách phim top trending
  getTopTrending(): Observable<Movie[]> {
    return this.cached('top-trending',
      this.http.get<Movie[]>(`${this.apiUrl}/top-trending`).pipe(
        catchError(this.handleError<Movie[]>('getTopTrending', []))
      )
    );
  }

  // lấy danh sách phim nổi bật cho Banner
  getBannerMovies(): Observable<Movie[]> {
    return this.cached('banner',
      this.http.get<Movie[]>(`${this.apiUrl}/banner`).pipe(
        catchError(this.handleError<Movie[]>('getBannerMovies', []))
      )
    );
  }

  // lấy danh sách Góc điện ảnh (tin tức) - cached để không reload mỗi lần navigate
  getPosts(): Observable<any[]> {
    return this.cached('posts',
      this.http.get<any[]>(`${this.apiUrl}/posts`).pipe(
        catchError(this.handleError<any[]>('getPosts', []))
      )
    );
  }

  // lấy danh sách Khuyến mãi - cached để không reload mỗi lần navigate
  getPromotions(): Observable<any[]> {
    return this.cached('promotions',
      this.http.get<any[]>(`${this.apiUrl}/promotions`).pipe(
        catchError(this.handleError<any[]>('getPromotions', []))
      )
    );
  }

  // lấy danh sách thể loại phim
  getCategories(): Observable<category[]> {
    return this.cached('categories',
      this.http.get<category[]>(`${this.apiUrl}/categories`).pipe(
        catchError(this.handleError<category[]>('getCategories', []))
      )
    );
  }

  // ── Quick Booking ─────────────────────────────────────────────
  getQuickMovies(): Observable<any[]> {
    return this.cached('quick-movies',
      this.http.get<any[]>(`${this.apiUrl}/quick/movies`).pipe(
        catchError(this.handleError<any[]>('getQuickMovies', []))
      )
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

  /** Xóa cache thủ công khi cần refresh dữ liệu */
  clearCache(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
