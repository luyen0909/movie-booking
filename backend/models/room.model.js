const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  capacity: { type: Number, required: true },
  seatLayout: [
    {
      row: { type: String, required: true },
      columns: [{ type: String }],
      type: { type: String, enum: ['standard', 'vip', 'sweetbox'], default: 'standard' }
    }
  ]
});

module.exports = mongoose.model('Room', roomSchema);
