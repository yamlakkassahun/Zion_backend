const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");


//router
const adminRouter = require("../routes/adminRouter"); 
const customerRouter = require("../routes/customerRouter"); 

const app =  async (app) => {
  //this is the express server service
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "jade");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "../public")));

  //routes
  app.get("/", (req, res, next) => {
    res.render("index");
  });

  app.use('/admin', adminRouter);
  app.use('/customer', customerRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  return app;
};

module.exports = app;
