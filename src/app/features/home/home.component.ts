import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-center my-8">Trang Chủ Movie Booking</h1>
      <p class="text-center">Danh sách phim đang chiếu sẽ hiển thị tại đây.</p>
    </div>
  `,
  standalone: false
})
export class HomeComponent {}
