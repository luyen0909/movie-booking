const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String },
  hotline: { type: String }
});

module.exports = mongoose.model('Cinema', cinemaSchema);
