const Movie = require('../models/movie.model');

// Dành cho trang Movie List (Tất cả phim / lọc)
exports.getMovieList = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dành cho trang Chi tiết Phim (Movie Detail)
exports.getMovieDetail = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNowShowing = async (req, res) => {
  const movies = await Movie.find({ status: 'now-showing' });
  res.json(movies);
};


