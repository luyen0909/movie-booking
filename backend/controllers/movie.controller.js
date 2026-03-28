const Movie = require('../models/movie.model');
const Category = require('../models/category.model');

// Dành cho trang Movie List (Tất cả phim / lọc)
exports.getMovieList = async (req, res) => {
  try {
    const movies = await Movie.find().populate('genre');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dành cho trang Now Showing
exports.getNowShowing = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'now-showing' }).populate('genre');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dành cho trang Coming Soon
exports.getComingSoon = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'coming-soon' }).populate('genre');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dành cho trang Movie List theo thể loại (Category Movie List)
exports.getMoviesByCategorySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Không tìm thấy thể loại phim này' });
    }
    const movies = await Movie.find({ genre: category._id }).populate('genre');
    res.json({ category, movies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dành cho trang Chi tiết Phim (Movie Detail)
exports.getMovieDetail = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('genre');
    if (!movie) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

