const express = require('express');
const router = express.Router();
const { startGame, guessNumber, getStats } = require('../controllers/gameController');

router.post('/start', startGame);

router.post('/guess', guessNumber);

router.get('/stats', getStats);

module.exports = router;
