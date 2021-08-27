const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Order GET request "
  });
});

router.post("/", (req, res, next) => {
  const order = {
    orderId: req.body.orderId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: "Order POST request",
    order: order
  });
});
router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: `Order GET request on ${id} id `
  });
});
router.patch("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: `Order update Request on ${id}`
  });
});
router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: `Order delete Request on ${id}`
  });
});

module.exports = router;
