const Movie = require('../models/movie.model');
const Category = require('../models/category.model');
const Post = require('../models/post.model');
const Showtime = require('../models/showtime.model');
const Cinema = require('../models/cinema.model'); 
const Booking = require('../models/booking.model');

exports.getHome = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'now-showing' }).limit(5);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

// Trả về phim Đang chiếu cho Trang chủ (Giới hạn 5 phim)
exports.getNowShowing = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'now-showing' }).limit(8);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trả về phim Sắp chiếu cho Trang chủ (Giới hạn 5 phim)
exports.getComingSoon = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'coming-soon' }).limit(8);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trả về phim Top Trending cho Trang chủ (Giới hạn 5 phim)
exports.getTopTrending = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // 1. Thống kê số lượng vé bán ra trong 7 ngày qua cho từng phim (chỉ tính giao dịch thành công)
    const trendingData = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          paymentStatus: 'success'
        }
      },
      {
        $group: {
          _id: "$movieId",
          ticketsSold: { $sum: { $size: { $ifNull: ["$seats", []] } } }
        }
      }
    ]);

    // 2. Lấy tất cả phim đang chiếu
    const nowShowingMovies = await Movie.find({ status: 'now-showing' });

    // 3. Map dữ liệu vé bán với phim
    const ticketsMap = {};
    trendingData.forEach(item => {
      if (item._id) {
        ticketsMap[item._id.toString()] = item.ticketsSold;
      }
    });

    const moviesWithStats = nowShowingMovies.map(movie => {
      return {
        ...movie.toObject(),
        ticketsSold: ticketsMap[movie._id.toString()] || 0
      };
    });

    // 4. Sắp xếp: Ưu tiên vé bán ra (thực tế thị trường), sau đó đến vote và voteCount
    moviesWithStats.sort((a, b) => {
      if (b.ticketsSold !== a.ticketsSold) {
        return b.ticketsSold - a.ticketsSold;
      }
      if (b.vote !== a.vote) {
        return b.vote - a.vote;
      }
      return b.voteCount - a.voteCount;
    });

    // 5. Trả về 5 phim đầu tiên (Top 5 Trending)
    res.json(moviesWithStats.slice(0, 5));
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

