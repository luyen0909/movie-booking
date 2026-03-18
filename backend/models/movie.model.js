const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  banner: { type: String },
  trailer: { type: String },
  genre: { type: String, required: true },
  
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
  status: { 
    type: String, 
    enum: ['now-showing', 'coming-soon', 'stopped'], 
    default: 'coming-soon' 
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
