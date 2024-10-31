import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  img: String,
  isAvailable: Boolean,
});

const Food = mongoose.models.food || mongoose.model("food", foodSchema);

export default Food;
