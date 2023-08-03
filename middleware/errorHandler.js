const { constants } = require("../constants");

const errorMiddleWareHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "VALIDATION",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "NOT FOUND",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN_ERROR:
      res.json({
        title: "FORBIDDEN_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHICATED_ERROR:
      res.json({
        title: "UNAUTHICATED_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error!");
      next();
  }
};

module.exports = errorMiddleWareHandler;
