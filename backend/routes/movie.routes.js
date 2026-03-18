const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

// GET /api/movies
router.get('/', movieController.getMovieList);

// GET /api/movies/:id
router.get('/:id', movieController.getMovieDetail);

module.exports = router;
