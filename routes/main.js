const express = require('express');

const mainController = require('../controller/main');

const router = express.Router();

router.get('/home', mainController.getHome);

router.post('/', mainController.reviewForm);

router.get('/reviews', mainController.getReviews);

module.exports = router;
