require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
const cors = require("cors");
const { DB_ADRESS } = require("./config");
const { errorHandler } = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://project.mesto.nomoredomainsrocks.ru",
    ],
    credentials: true,
    maxAge: 30,
  })
);
const { PORT = 3000 } = process.env;

mongoose.connect(DB_ADRESS);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.get("/", (req, res) => {
  res.json({ message: "Сервер работает и ждет запросы, все круто!" });
});

app.use("/", require("./routes/index"));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
