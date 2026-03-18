import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie, MovieService } from '../../../../core/services/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'./movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList {
  private movieService = inject(MovieService);

  // Convert the movies observable to a signal
  private movies = toSignal(this.movieService.getNowShowingMovies(), { initialValue: [] });

  // Chuyển trạng thái sang Signal
  activeTab = signal<'now' | 'coming'>('now');
  
  // Dùng computed để tạo danh sách phim được lọc một cách tự động
  filteredMovies = computed(() => {
    const tab = this.activeTab();
    const allMovies = this.movies();

    // The current service only provides 'now showing' movies.
    // The 'coming soon' tab will be empty until the service is updated.
    if (tab === 'now') {
      return allMovies;
    }
    return []; // Return empty for 'coming' tab
  });

  switchTab(tab: 'now' | 'coming') {
    this.activeTab.set(tab); // Cập nhật giá trị cho Signal
    console.log('Đã chuyển tab sang:', tab); // Kiểm tra log trên trình duyệt (F12)
    // Sau này có thể gọi API load lại list phim theo tab ở đây
  }
}
