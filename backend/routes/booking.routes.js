const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

router.post('/seed', bookingController.seedBookingData);
router.get('/showtimes/:showtimeId/seats', bookingController.getSeatMap);
router.post('/', bookingController.createBooking);
router.get('/:bookingId', bookingController.getBookingById);
router.post('/:bookingId/pay', bookingController.payBooking);

module.exports = router;
