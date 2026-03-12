// d:\angular\movie-booking\src\app\features\movies\pages\movie-list\movie-list.ts
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../../../core/models/movie.model';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList {
  // Dữ liệu gốc, có thể coi là private
  allMovies: Movie[] = [
    { title: 'Thỏ ơi', image: 'https://cdn.galaxycine.vn/media/2026/2/10/tho-oi-500_1770696594579.jpg', genre: 'Tâm lý, Gia đình', rating: '8.8', isNowShowing: true },
    { title: 'Quỷ Nhập Tràng 2', image: 'https://cdn.galaxycine.vn/media/2026/2/26/quy-nhap-trang-2-500_1772097817869.jpg', genre: 'Kinh dị, Bí ẩn', rating: '8.9', isNowShowing: true },
    { title: 'Tài', image: 'https://cdn.galaxycine.vn/media/2026/2/27/tai_1772174772211.jpg', genre: 'Tâm lý, Gia đình', rating: '8.0', isNowShowing: false },
    { title: 'Cảm Ơn Người Đã Thức Cùng Tôi', image: 'https://cdn.galaxycine.vn/media/2026/2/24/cam-on-nguoi-da-thuc-cung-toi-500_1771925954223.jpg', genre: 'Tình cảm, Tâm lý, Ca nhạc', rating: '9.1', isNowShowing: false },
    { title: 'Dune: Hành Tinh Cát 2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh2nn2sCworwC6hABlfMrlbvqZ1BXMAH6vnA&s', genre: 'Hành động, Viễn tưởng', rating: '9.0', isNowShowing: true },
    { title: 'Godzilla x Kong', image: 'https://i.ytimg.com/vi/B2Jlyq_Tf3Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBsl4vJYQm-z7JXhdGKTxuNuEn2oQ', genre: 'Hành động, Quái vật', rating: '8.2', isNowShowing: true },
    { title: 'Kung Fu Panda 4', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5rcKFQqqI0CN0sdES-7htbSUsMB-9fHmSjQ&s', genre: 'Hoạt hình, Hài hước', rating: '7.8', isNowShowing: false },
    { title: 'Tội phạm 101', image: 'https://cdn.galaxycine.vn/media/2026/2/10/toi-pham-101-500_1770698178754.jpg', genre: 'Giật gân, Hành động', rating: '8.5', isNowShowing: false }
  ];

  // Chuyển trạng thái sang Signal
  activeTab = signal<'now' | 'coming'>('now');

  // Dùng computed để tạo danh sách phim được lọc một cách tự động
  filteredMovies = computed(() => {
    const tab = this.activeTab();
    return this.allMovies.filter(movie => 
      tab === 'now' ? movie.isNowShowing : !movie.isNowShowing
    );
  });

  switchTab(tab: 'now' | 'coming') {
    this.activeTab.set(tab); // Cập nhật giá trị cho Signal
    console.log('Đã chuyển tab sang:', tab); // Kiểm tra log trên trình duyệt (F12)
    // Sau này có thể gọi API load lại list phim theo tab ở đây
  }
}
