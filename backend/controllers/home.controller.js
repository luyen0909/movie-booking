const Movie = require('../models/movie.model');
const Category = require('../models/category.model');
const Post = require('../models/post.model');
const Showtime = require('../models/showtime.model');
const Cinema = require('../models/cinema.model');

// ── QUICK BOOKING ──────────────────────────────────────────────────

// 1. Lấy danh sách phim đang chiếu (cho dropdown Chọn Phim)
exports.getQuickMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'now-showing' })
                              .select('_id title image ageRating')
                              .sort({ title: 1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Lấy danh sách rạp đang chiếu bộ phim đã chọn
exports.getQuickCinemas = async (req, res) => {
  try {
    const { movieId } = req.params;
    const showtimes = await Showtime.find({ movieId })
                                    .distinct('cinemaId');
    const cinemas = await Cinema.find({ _id: { $in: showtimes } })
                                .select('_id name address city');
    res.json(cinemas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Lấy danh sách ngày chiếu (theo phim + rạp)
exports.getQuickDates = async (req, res) => {
  try {
    const { movieId, cinemaId } = req.params;
    const showtimes = await Showtime.find({ movieId, cinemaId })
                                    .select('startTime')
                                    .sort({ startTime: 1 });
    // Lấy unique ngày (YYYY-MM-DD)
    const datesSet = new Set(
      showtimes.map(s => new Date(s.startTime).toISOString().split('T')[0])
    );
    res.json([...datesSet]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Lấy danh sách suất chiếu (theo phim + rạp + ngày)
exports.getQuickShowtimes = async (req, res) => {
  try {
    const { movieId, cinemaId, date } = req.params;
    const start = new Date(date);
    const end   = new Date(date);
    end.setDate(end.getDate() + 1);

    const showtimes = await Showtime.find({
      movieId, cinemaId,
      startTime: { $gte: start, $lt: end }
    }).select('_id startTime endTime basePrice').sort({ startTime: 1 });

    res.json(showtimes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách phim cho Banner trang chủ (ưu tiên phim có ảnh banner)
exports.getBannerMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'now-showing', banner: { $exists: true, $ne: '' } })
                              .sort({ vote: -1 })
                              .limit(5)
                              .select('title banner image genre description vote duration ageRating trailer');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trả về phim Đang chiếu cho Trang chủ (Giới hạn 8 phim)
exports.getNowShowing = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'now-showing' }).limit(8);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trả về phim Sắp chiếu cho Trang chủ (Giới hạn 8 phim)
exports.getComingSoon = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'coming-soon' }).limit(8);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trả về danh mục hiển thị ở Trang chủ
// Lấy danh mục thể loại
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách Góc Điện Ảnh (Reviews/Blogs) giới hạn 4 bài mới nhất
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Post.find({ type: { $in: ['review', 'blog'] } })
                              .sort({ createdAt: -1 })
                              .limit(4);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách Tin Khuyến Mãi giới hạn 4 bài mới nhất
exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Post.find({ type: 'promotion' })
                                 .sort({ createdAt: -1 })
                                 .limit(4);
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
