import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: false
})
export class Home {
  // Mock Data cho giao diện
  categories = ['Hành Động', 'Tình Cảm', 'Kinh Dị', 'Hài Hước', 'Khoa Học Viễn Tưởng', 'Hoạt Hình'];
  
  featuredMovies = [
    { title: 'Dune: Hành Tinh Cát 2', image: 'https://placehold.co/300x450/111/fff?text=Dune+2', genre: 'Hành động, Viễn tưởng', rating: '9.0' },
    { title: 'Mai', image: 'https://placehold.co/300x450/111/fff?text=Mai', genre: 'Tình cảm, Tâm lý', rating: '8.5' },
    { title: 'Godzilla x Kong', image: 'https://placehold.co/300x450/111/fff?text=GxK', genre: 'Hành động, Giật gân', rating: '8.2' },
    { title: 'Kung Fu Panda 4', image: 'https://placehold.co/300x450/111/fff?text=Panda+4', genre: 'Hoạt hình, Hài', rating: '7.8' },
  ];

  bestSellers = [
    { title: 'Lật Mặt 7', image: 'https://placehold.co/300x450/111/fff?text=Lat+Mat+7', genre: 'Tâm lý, Gia đình', rating: '8.8' },
    { title: 'Exhuma', image: 'https://placehold.co/300x450/111/fff?text=Exhuma', genre: 'Kinh dị, Bí ẩn', rating: '8.9' },
    { title: 'Đào, Phở và Piano', image: 'https://placehold.co/300x450/111/fff?text=Dao+Pho', genre: 'Lịch sử, Chiến tranh', rating: '8.0' },
    { title: 'Spider-Man', image: 'https://placehold.co/300x450/111/fff?text=Spider-Man', genre: 'Hành động', rating: '9.1' },
  ];

  reviews = [
    { name: 'Nguyễn Văn A', content: 'Hệ thống đặt vé cực kỳ nhanh và mượt mà. Rất thích không gian thiết kế của web!', avatar: 'https://placehold.co/50' },
    { name: 'Trần Thị B', content: 'Nhiều rạp chiếu, giá cả hợp lý và hay có nhiều chương trình khuyến mãi.', avatar: 'https://placehold.co/50' },
    { name: 'Lê Hoàng C', content: 'Tôi đã đặt vé xem Dune 2 ở đây, trải nghiệm UI/UX rất tốt, rõ ràng.', avatar: 'https://placehold.co/50' }
  ];
}