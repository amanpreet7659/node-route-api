const express = require("express");
const morgan = require("morgan");
const app = express();

const bodyParser = require("body-parser");
const productRoutes = require("./api/routes/products");
const mongose = require("mongoose");
const orderRoutes = require("./api/routes/orders");
mongose.connect(
  "mongodb+srv://Node-Rest-API:we1CyOZp9OGX1kYV@cluster0.i2tf4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

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
  //   if (req.status == 404 || req.status == 500) {
  //     swal({ title: "Error", icon: "warning", text: `${error.message}` });
  //   }
});

module.exports = app;
