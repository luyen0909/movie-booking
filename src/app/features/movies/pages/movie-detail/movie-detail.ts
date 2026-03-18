import { Component, input, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService, Movie } from '../../../../core/services/movie.service';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

interface Showtime {
  format: string;
  times: string[];
}

interface CinemaShow {
  id: number;
  name: string;
  showtimes: Showtime[];
}

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail implements OnInit {
  
  private movieService = inject(MovieService);
  id = input.required<string>();

  // Convert the movie observable to a signal
  private movie$ = toObservable(this.id).pipe(switchMap(id => this.movieService.getMovieById(id)));
  movie = toSignal(this.movie$, {
    initialValue: null
  });

  // The `movie` signal is now used directly in the template with an @if block.
  // The movieDetails computed signal is no longer needed.
  
  // Fetch the list of now showing movies for the sidebar
  private nowShowingMovies = toSignal(this.movieService.getNowShowingMovies(), { initialValue: [] });

  // Dữ liệu cột phải (Phim đang chiếu)
  sidebarMovies = computed(() => {
    // Lấy tối đa 3 phim đang chiếu từ the signal
    return this.nowShowingMovies().slice(0, 3).map((m: Movie) => ({
      ...m,
      age: m.ageRating || 'T18' // Dữ liệu giả lập nhãn tuổi
    }));
  });

  // Quản lý ngày
  selectedDate = signal<Date>(new Date());
  nextDays = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // Dữ liệu rạp
  cinemas = signal<CinemaShow[]>([
    { 
      id: 1, 
      name: 'Galaxy CineX - Hanoi Centre', 
      showtimes: [{ format: 'VIP - LAGOM 2D Phụ Đề', times: ['19:15'] }] 
    },
    { 
      id: 2, 
      name: 'Galaxy Nguyễn Du', 
      showtimes: [{ format: '2D Phụ Đề', times: ['15:15', '18:30', '20:45'] }] 
    },
    { 
      id: 3, 
      name: 'Galaxy Sala', 
      showtimes: [{ format: 'VIP - LAGOM 2D Phụ Đề', times: ['14:30', '19:30'] }] 
    }
  ]);

  ngOnInit(): void {
    // Lifecycle hook implementation
  }

  selectDate(date: Date) {
    this.selectedDate.set(date);
  }
}