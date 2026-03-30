import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Movie {
  banner: string;
  trailer: string;
  _id: string;
  slug: string;
  title: string;
  image: string;
  genre: any;
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

  getNowShowingMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/now-showing`).pipe(
      catchError(this.handleError<Movie[]>('getNowShowingMovies', []))
    );
  }

  getComingSoonMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/coming-soon`).pipe(
      catchError(this.handleError<Movie[]>('getComingSoonMovies', []))
    );
  }

  getMoviesByCategory(slug: string): Observable<{category: any, movies: Movie[]}> {
    return this.http.get<{category: any, movies: Movie[]}>(`${this.apiUrl}/category/${slug}`).pipe(
      catchError(this.handleError<{category: any, movies: Movie[]}>('getMoviesByCategory'))
    );
  }

  getMovieBySlug(slug: string): Observable<Movie | undefined> {
    return this.http.get<Movie>(`${this.apiUrl}/${slug}`).pipe(
      catchError(this.handleError<Movie>(`getMovieBySlug slug=${slug}`))
    );
  }

  searchMovies(keyword: string): Observable<Movie[]> {
    if (!keyword.trim()) {
      return of([]);
    }

    return this.http.get<Movie[]>(`${this.apiUrl}/search/${encodeURIComponent(keyword.trim())}`).pipe(
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
