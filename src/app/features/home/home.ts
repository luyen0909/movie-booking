import { Component } from '@angular/core';
import { Movie } from '../../core/models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: false
})
export class Home {
  // Mock Data cho giao diện
  categories = ['Hành Động', 'Tình Cảm', 'Kinh Dị', 'Hài Hước', 'Khoa Học Viễn Tưởng', 'Hoạt Hình'];
  
  // Dữ liệu Featured Movies đã được chuyển sang MovieBannerComponent
  
  bestSellers: Movie[] = [
    {
      title: 'Thỏ ơi', image: 'https://cdn.galaxycine.vn/media/2026/2/10/tho-oi-500_1770696594579.jpg', genre: 'Tâm lý, Gia đình', rating: '8.8',
      isNowShowing: false
    },
    {
      title: 'Quỷ Nhập Tràng 2', image: 'https://cdn.galaxycine.vn/media/2026/2/26/quy-nhap-trang-2-500_1772097817869.jpg', genre: 'Kinh dị, Bí ẩn', rating: '8.9',
      isNowShowing: false
    },
    {
      title: 'Tài', image: 'https://cdn.galaxycine.vn/media/2026/2/27/tai_1772174772211.jpg', genre: 'Tâm lý, Gia đình', rating: '8.0',
      isNowShowing: false
    },
    {
      title: 'Cảm Ơn Người Đã Thức Cùng Tôi', image: 'https://cdn.galaxycine.vn/media/2026/2/24/cam-on-nguoi-da-thuc-cung-toi-500_1771925954223.jpg', genre: 'Tìm cảm, Tâm lý, Ca nhạc', rating: '9.1',
      isNowShowing: false
    },
  ];

  reviews = [
    { name: 'Nguyễn Văn A', content: 'Hệ thống đặt vé cực kỳ nhanh và mượt mà. Rất thích không gian thiết kế của web!', avatar: 'https://cdn.galaxycine.vn/media/c/h/chris-ngang_1.jpg' },
    { name: 'Trần Thị B', content: 'Nhiều rạp chiếu, giá cả hợp lý và hay có nhiều chương trình khuyến mãi.', avatar: 'https://cdn.galaxycine.vn/media/g/a/gallery-1436740108-elle-aug-15-margot-robbie-02.jpg' },
    { name: 'Lê Hoàng C', content: 'Tôi đã đặt vé xem Dune 2 ở đây, trải nghiệm UI/UX rất tốt, rõ ràng.', avatar: 'https://cdn.galaxycine.vn/media/t/h/theron-charlize-bannner.jpg' }
  ];
featuredMovies: any;
}