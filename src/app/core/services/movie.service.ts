import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Định nghĩa interface cho Movie để dùng chung
export interface Movie {
banner: any;
trailer: any;
  _id: string; // MongoDB dùng _id
  title: string;
  image: string;
  genre: string;
  description: string;
  director: string;
  cast: string[];
  releaseDate: string;
  duration: number;
  ageRating: string;
  vote: number;
  voteCount: number;
  country: string;
  studio: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/movies'; 

  // Lấy danh sách phim đang chiếu
  getNowShowingMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/now-showing`).pipe(
      catchError(this.handleError<Movie[]>('getNowShowingMovies', []))
    );
  }

  // Lấy danh sách phim sắp chiếu
  getComingSoonMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/coming-soon`).pipe(
      catchError(this.handleError<Movie[]>('getComingSoonMovies', []))
    );
  }

  // Lấy danh sách phim theo thể loại
  getMoviesByCategory(slug: string): Observable<{category: any, movies: Movie[]}> {
    return this.http.get<{category: any, movies: Movie[]}>(`${this.apiUrl}/category/${slug}`).pipe(
      catchError(this.handleError<{category: any, movies: Movie[]}>('getMoviesByCategory'))
    );
  }

  // Lấy chi tiết phim theo ID
  getMovieById(id: string): Observable<Movie | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      catchError(this.handleError<Movie>(`getMovieById id=${id}`))
    );
  }
// Tìm kiếm phim theo tiêu đề
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  // lọc theo sản phẩm mới nhất
  
}
