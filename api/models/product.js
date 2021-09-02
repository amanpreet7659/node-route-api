const mongose = require("mongoose");
const productSchema = mongose.Schema({
   _id: mongose.Schema.Types.ObjectId,
  color: Array,
  stock: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  bsingle: Boolean,
  image_url: Array
});

module.exports = mongose.model("products", productSchema);
