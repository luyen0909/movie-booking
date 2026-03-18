import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Cinema {
  id: number;
  name: string;
  address: string;
  logo: string;
}

@Component({
  selector: 'app-cinema-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cinema-list.html',
  styleUrl: './cinema-list.scss',
})
export class CinemaList {
  // Mock data danh sách rạp
  cinemas = signal<Cinema[]>([
    {
      id: 1,
      name: 'Galaxy Nguyễn Du',
      address: '116 Nguyễn Du, Quận 1, TP.HCM',
      logo: 'https://www.galaxycine.vn/website/images/galaxy-logo.png'
    },
    {
      id: 2,
      name: 'Galaxy Kinh Dương Vương',
      address: '718bis Kinh Dương Vương, P.13, Q.6, TP.HCM',
      logo: 'https://www.galaxycine.vn/website/images/galaxy-logo.png'
    },
    {
      id: 3,
      name: 'CGV Hùng Vương Plaza',
      address: 'Tầng 7, Hùng Vương Plaza, 126 Hồng Bàng, P.12, Q.5, TP.HCM',
      logo: 'https://static.mservice.io/placebrand/s/momo-upload-api-200618103929-637280831692998495.jpg'
    }
  ]);
}