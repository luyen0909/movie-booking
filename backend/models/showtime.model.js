const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  basePrice: { type: Number, required: true },
  bookedSeats: [{ type: String }] // Mảng lưu mã ghế đã bị khách hàng mua (ví dụ: ['A1', 'B2'])
});

module.exports = mongoose.model('Showtime', showtimeSchema);
