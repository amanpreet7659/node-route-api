require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./api/routes/products");
const mongose = require("mongoose");
const orderRoutes = require("./api/routes/orders");
const user=require('./api/routes/users')

mongose.connect(process.env.URL);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow_Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT",
      "POST",
      "PATCH",
      "DELETE",
      "GET"
    );
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use('/user',user)

//Error handling

app.use((req, res, next) => {
  const error = new Error("NOT FOUND");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const err = res.status(error.status || 500);
  err.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
