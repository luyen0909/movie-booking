const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  banner: { type: String },
  trailer: { type: String },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true }],
  description: String,
  director: String,
  cast: [String],
  releaseDate: Date,
  duration: Number, // tính bằng phút
  ageRating: String,
  vote: Number,
  voteCount: Number,
  country: String,
  studio: String,
  languages: [String],           // Ngôn ngữ: ['Tiếng Việt', 'Phụ đề']
  subtitles: [String],
  tags: [String],                // Tag tìm kiếm nhanh
  status: { 
    type: String, 
    enum: ['now-showing', 'coming-soon', 'stopped'], 
    default: 'coming-soon' 
  }
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
