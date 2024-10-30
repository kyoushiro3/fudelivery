import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String, // like if the food is pizza, burger or a salad
  img: String, // we will be URL to an image and we will convert it
  isAvailable: Boolean,
});

const Food = mongoose.models.food || mongoose.model("food", foodSchema); //but first we have to add db food in omnogdb

//use prettier to make the code structure beautiful and understable

export default Food;

//click outside like this
//i'm having trouble switching tabs HAHAH
