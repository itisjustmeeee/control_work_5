const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = 3000;

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', gameRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
