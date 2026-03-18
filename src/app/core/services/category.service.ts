import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Định nghĩa interface cho Category để dùng chung
export interface category {
  _id: string; // MongoDB dùng _id
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/categories'; // URL tới backend
  // Lấy danh sách thể loại phim
  getCategories(): Observable<category[]> {
    return this.http.get<category[]>(this.apiUrl).pipe(
      catchError(this.handleError<category[]>('getCategories', []))
    );
  }

  // Lấy chi tiết thể loại theo ID
  getCategoryById(id: string): Observable<category | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<category>(url).pipe(
      catchError(this.handleError<category>(`getCategoryById id=${id}`))
    );
  }

  // Tìm kiếm thể loại theo tên
  searchCategoriesByName(name: string): Observable<category[]> {
    const url = `${this.apiUrl}?name=${encodeURIComponent(name)}`;
    return this.http.get<category[]>(url).pipe(
        catchError(this.handleError<category[]>('searchCategoriesByName', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
    }
    }