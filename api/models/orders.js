const mongoes = require("mongoose");
const orderSchema = mongoes.Schema({
  _id: mongoes.Schema.Types.ObjectId,
  color: Array,
  stock: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  bsingle: Boolean,
  image_url: Array
});
module.exports = mongoes.model("order", orderSchema);
