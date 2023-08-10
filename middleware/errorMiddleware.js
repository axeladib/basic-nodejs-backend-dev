const errorMiddleware = (err, req, res, next) => {
  console.log("here is an error middleware");
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  //This is the way to prevent user to see the error message that contain sensitive information of the application
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorMiddleware;
