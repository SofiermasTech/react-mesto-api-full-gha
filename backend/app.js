require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
// Защита сервера
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorsHandler = require('./utils/errorsHandler');
const mainRouter = require('./routes/index');

const app = express();
app.use(helmet());
app.use(cors());

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

app.use(requestLogger);
app.use(limiter);
app.use(express.json()); // для собирания JSON-формата
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
// app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => console.log(PORT));
