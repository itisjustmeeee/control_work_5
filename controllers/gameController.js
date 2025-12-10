let currentNumber = null;
let attempts = 0;
let gameStarted = false;

const startGame = (req, res) => {
  currentNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameStarted = true;
  res.json({ message: "Игра начата! Я загадал число от 1 до 100." });
};

const guessNumber = (req, res) => {
  if (!gameStarted) {
    return res.status(400).json({ error: "Сначала начните игру: POST /api/start" });
  }

  const guess = parseInt(req.body.guess) || parseInt(req.query.guess);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    return res.status(400).json({ error: "Введите число от 1 до 100" });
  }

  attempts++;

  if (guess === currentNumber) {
    gameStarted = false;
    res.json({
      result: "win",
      message: Поздравляю! Вы угадали число \( {currentNumber} за \){attempts} попыток!
    });
  } else if (guess < currentNumber) {
    res.json({ result: "low", message: "Слишком мало!" });
  } else {
    res.json({ result: "high", message: "Слишком много!" });
  }
};

const getStats = (req, res) => {
  res.json({
    gameStarted,
    attempts: gameStarted ? attempts : 0,
    secretNumber: process.env.NODE_ENV === 'development' ? currentNumber : undefined
  });
};

module.exports = { startGame, guessNumber, getStats };
