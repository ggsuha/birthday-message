const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    data: {
      message: err.message,
      stack: err.stack,
    },
    pagination: null,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      data: {
        message: err.message,
      },
      pagination: null,
    });
  } else {
    console.error("ERROR:", err);

    res.status(500).json({
      data: {
        message: "Something went very wrong!",
      },
      pagination: null,
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
};
