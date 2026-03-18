const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
  seats: [{ type: String, required: true }],
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
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
