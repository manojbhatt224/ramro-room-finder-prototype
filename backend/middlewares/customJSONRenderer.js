function customRenderer(req, res, next) {
    res.sendData = (statusCode, data = {}) => {
      res
        .status(statusCode)
        .json({ msg: statusCode >= 200 && statusCode < 300, data });
    };
    next();
  }
  
  export { customRenderer };
  