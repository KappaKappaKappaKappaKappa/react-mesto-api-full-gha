const winston = require("winston");
const expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
<<<<<<< HEAD
  transports: [new winston.transports.File({ filename: "request-log" })],
=======
  transports: [new winston.transports.File({ filename: "request.log" })],
>>>>>>> fdc226bbc1d4ce10322cbc3d6055c0c25034868a
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
<<<<<<< HEAD
  transports: [new winston.transports.File({ filename: "error-log" })],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
=======
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
>>>>>>> fdc226bbc1d4ce10322cbc3d6055c0c25034868a
