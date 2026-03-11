import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class HomeBanner implements OnInit, OnDestroy {
  currentSlide = 0;
  autoSlideInterval: any;
  scrollY = 0; // Biến lưu vị trí scroll

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Dữ liệu phim nổi bật hiển thị trên Banner
  slides = [
    { 
      id: 1,
      title: 'Dune: Hành Tinh Cát 2', 
      description: 'Paul Atreides hợp nhất với Chani và người Fremen trong hành trình trả thù những kẻ đã hủy hoại gia đình mình.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh2nn2sCworwC6hABlfMrlbvqZ1BXMAH6vnA&s', 
      genre: 'Hành động, Viễn tưởng', 
      rating: '9.0' 
    },
    { 
      id: 2,
      title: 'Godzilla x Kong: Đế Chế Mới', 
      description: 'Kong và Godzilla đụng độ một mối đe dọa khổng lồ chưa từng được khám phá ẩn sâu trong thế giới của chúng ta.',
      image: 'https://i.ytimg.com/vi/B2Jlyq_Tf3Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBsl4vJYQm-z7JXhdGKTxuNuEn2oQ', 
      genre: 'Hành động, Quái vật', 
      rating: '8.2' 
    },
    { 
      id: 3,
      title: 'Kung Fu Panda 4', 
      description: 'Po chuẩn bị trở thành Thần Long Đại Hiệp, nhưng trước tiên cậu phải tìm người kế thừa vị trí Chiến Binh Rồng.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5rcKFQqqI0CN0sdES-7htbSUsMB-9fHmSjQ&s', 
      genre: 'Hoạt hình, Hài hước', 
      rating: '7.8' 
    },
  ];

  // Lắng nghe sự kiện cuộn chuột để làm hiệu ứng Parallax
  @HostListener('window:scroll', [])
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollY = window.scrollY;
    }
  }

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    // Chỉ chạy interval khi ở trên trình duyệt (Browser)
    if (isPlatformBrowser(this.platformId)) {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}


