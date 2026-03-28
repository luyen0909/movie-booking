import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-confirm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-confirm.html',
  styleUrl: './booking-confirm.scss'
})
export class BookingConfirm implements OnInit {
  private router = inject(Router);
  
  movieInfo: any;
  selectedSeats: string[] = [];
  totalPrice: number = 0;
  
  selectedPayment: string = 'momo';
  isProcessing = false;
  isSuccess = false;

  constructor() {
    // It's safer to read history state in constructor
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.movieInfo = state['movieInfo'];
      this.selectedSeats = state['selectedSeats'];
      this.totalPrice = state['totalPrice'];
    }
  }

  ngOnInit() {
    if (!this.movieInfo) {
       const state = history.state;
       if (state && state.movieInfo) {
         this.movieInfo = state.movieInfo;
         this.selectedSeats = state.selectedSeats;
         this.totalPrice = state.totalPrice;
       } else {
         // Fallback if accessed directly
         this.movieInfo = { title: 'Dune: Hành Tinh Cát 2', cinema: 'Galaxy Nguyễn Du', room: 'Phòng 2', showtime: '20:45 - 2026-03-24' };
         this.selectedSeats = ['J6', 'J7'];
         this.totalPrice = 150000;
       }
    }
  }

  confirmPayment() {
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      this.isSuccess = true;
    }, 1500);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
