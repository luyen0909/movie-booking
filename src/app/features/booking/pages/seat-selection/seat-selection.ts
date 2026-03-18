import { Component, computed, signal, input } from '@angular/core';
import { CommonModule, formatNumber } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Seat {
  id: string; // e.g., 'A1', 'C5'
  status: 'available' | 'selected' | 'occupied';
}

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.scss',
})
export class SeatSelection {
  // Bước 2.1: Bind trực tiếp query params vào các input của component
  // Tên của các input này phải TRÙNG KHỚP với tên query params bạn gửi đi
  movieId = input<string>();
  cinemaId = input<string>();
  date = input<string>();
  time = input<string>();
  room = input<string>();

  // Bước 2.2: Biến movieInfo thành một computed signal
  // Nó sẽ tự động tính toán lại khi bất kỳ input nào ở trên thay đổi
  movieInfo = computed(() => {
    // Trong ứng dụng thực tế, bạn sẽ dùng movieId() và cinemaId() để gọi service lấy dữ liệu
    // Ở đây, chúng ta sẽ giả lập việc đó để hiển thị thông tin từ URL
    const movieTitles: { [key: string]: string } = {
      '1': 'Dune: Hành Tinh Cát 2',
      '2': 'Godzilla x Kong',
    };
    const cinemaNames: { [key: string]: string } = {
      '1': 'Galaxy Nguyễn Du',
      '2': 'Galaxy Kinh Dương Vương',
      '3': 'CGV Hùng Vương Plaza',
    };

    return {
      title: movieTitles[this.movieId() ?? ''] || 'Unknown Movie',
      cinema: cinemaNames[this.cinemaId() ?? ''] || 'Unknown Cinema',
      showtime: `${this.time() || 'N/A'} - ${this.date() || 'N/A'}`,
      room: this.room() || 'N/A',
    };
  });
  
  seatPrice = 75000; // 75,000 VND

  // Generate a grid of seats
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  // Use a signal to manage the state of all seats
  seats = signal<Seat[][]>(
    this.rows.map(row => 
      this.cols.map(col => ({
        id: `${row}${col}`,
        // Randomly mark some seats as occupied
        status: Math.random() > 0.7 ? 'occupied' : 'available'
      }))
    )
  );

  // Computed signal to get the list of selected seats
  selectedSeats = computed(() => 
    this.seats().flat().filter(seat => seat.status === 'selected')
  );

  // Computed signal to calculate the total price
  totalPrice = computed(() => this.selectedSeats().length * this.seatPrice);

  toggleSeat(seat: Seat) {
    if (seat.status === 'occupied') {
      return; // Cannot select occupied seats
    }

    // Create a deep copy of the seats to update the signal
    const updatedSeats = this.seats().map(row => row.map(s => ({...s})));
    
    const seatToUpdate = updatedSeats
      .flat()
      .find(s => s.id === seat.id);

    if (seatToUpdate) {
      seatToUpdate.status = seatToUpdate.status === 'available' ? 'selected' : 'available';
      this.seats.set(updatedSeats);
    }
  }

  bookSeats() {
    if (this.selectedSeats().length === 0) {
      alert('Vui lòng chọn ít nhất 1 ghế!');
      return;
    }
    alert(`Bạn đã đặt thành công ${this.selectedSeats().length} ghế.\nGhế đã chọn: ${this.selectedSeats().map(s => s.id).join(', ')}\nTổng tiền: ${formatNumber(this.totalPrice(), 'vi-VN')} VNĐ`);
    // In a real app, this would navigate to a payment page or show a confirmation modal
  }
}