const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
  totalAmount: { type: Number, required: true },
  popcornDrinks: [
    {
      item: String,
      quantity: Number,
      price: Number
    }
  ],
  paymentMethod: { type: String, enum: ['momo', 'zalopay', 'atm', 'visa'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'success', 'failed', 'cancelled'], default: 'pending' },
  bookingCode: { type: String, required: true, unique: true },
  seats: [{
    seatCode: String,           // 'A1'
    seatType: { type: String, enum: ['standard', 'vip', 'sweetbox'] },
    price: Number               // Snapshot giá tại thời điểm đặt
  }],
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },    // Shortcut cho query
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },  // Shortcut cho query
  expiresAt: Date,              // Hết hạn giữ ghế nếu chưa thanh toán
  refundStatus: { type: String, enum: ['none', 'requested', 'refunded'], default: 'none' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
