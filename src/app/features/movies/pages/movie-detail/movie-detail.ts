import { Component, input, signal, inject, OnInit, computed, effect } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService, Movie } from '../../../../core/services/movie.service';
import { HomeService } from '../../../../core/services/home.service';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

interface Showtime {
  format: string;
  times: { id: string, time: string }[];
}

interface CinemaShow {
  id: string;
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
  private homeService = inject(HomeService);
  private sanitizer = inject(DomSanitizer);
  id = input.required<string>();

  // Convert the movie observable to a signal
  private movie$ = toObservable(this.id).pipe(switchMap(id => this.movieService.getMovieById(id)));
  movie = toSignal(this.movie$, {
    initialValue: null
  });

  isPlayingTrailer = signal(false);

  // Chuyển đổi link YouTube sang URL an toàn để nhúng vào iframe
  safeTrailerUrl = computed<SafeResourceUrl | null>(() => {
    const movieData = this.movie();
    if (!movieData || !movieData.trailer) return null;

    let videoId = '';
    const url = movieData.trailer;

    // Các regex để lấy ID từ các loại link YouTube phổ biến
    const standardMatch = url.match(/v=([^&]+)/);
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    const embedMatch = url.match(/youtube\.com\/embed\/([^?]+)/);

    if (standardMatch) videoId = standardMatch[1];
    else if (shortMatch) videoId = shortMatch[1];
    else if (embedMatch) videoId = embedMatch[1];
    else videoId = url; // Giả sử nếu ko khớp regex thì bản thân nó là ID

    if (videoId) {
      // Thêm autoplay=1 nếu đang trong trạng thái phát
      const autoplay = this.isPlayingTrailer() ? '?autoplay=1' : '';
      const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    return null;
  });


  
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
  cinemas = signal<CinemaShow[]>([]);
  isLoadingCinemas = signal<boolean>(false);

  constructor() {
    // Gọi API mỗi khi movie hoặc selectedDate đổi
    effect(() => {
      const m = this.movie();
      const d = this.selectedDate();
      if (m && m._id && d) {
        this.loadShowtimes(m._id, d);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
  }

  loadShowtimes(movieId: string, date: Date) {
    this.isLoadingCinemas.set(true);
    // Convert local date to YYYY-MM-DD avoiding UTC offset issues
    const offset = date.getTimezoneOffset()
    const localeDate = new Date(date.getTime() - (offset*60*1000))
    const dateStr = localeDate.toISOString().split('T')[0];

    this.homeService.getQuickCinemas(movieId).subscribe({
      next: (cinemasData: any[]) => {
        if (!cinemasData || !cinemasData.length) {
          this.cinemas.set([]);
          this.isLoadingCinemas.set(false);
          return;
        }

        let loadedCount = 0;
        const resultCinemas: CinemaShow[] = [];

        cinemasData.forEach(c => {
          this.homeService.getQuickShowtimes(movieId, c._id, dateStr).subscribe({
            next: (stData: any[]) => {
              if (stData && stData.length > 0) {
                const times = stData.map(st => {
                   const d = new Date(st.startTime);
                   return {
                     id: st._id,
                     time: d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                   };
                });
                
                resultCinemas.push({
                   id: c._id,
                   name: c.name,
                   showtimes: [{ format: 'Phim 2D', times: times }]
                });
              }
              
              loadedCount++;
              if (loadedCount === cinemasData.length) {
                this.cinemas.set(resultCinemas);
                this.isLoadingCinemas.set(false);
              }
            },
            error: () => {
              loadedCount++;
              if (loadedCount === cinemasData.length) {
                this.cinemas.set(resultCinemas);
                this.isLoadingCinemas.set(false);
              }
            }
          });
        });
      },
      error: (err) => {
        console.error('Error loading cinemas', err);
        this.cinemas.set([]);
        this.isLoadingCinemas.set(false);
      }
    });
  }

  selectDate(date: Date) {
    this.selectedDate.set(date);
  }
}