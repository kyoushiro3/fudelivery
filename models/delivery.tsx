import mongoose, { Schema, Types } from "mongoose";

const deliverySchema = new Schema({
  orderId: {
    type: Types.ObjectId,
    ref: "order", // Reference to the ORDER collection
    required: true,
  },
  customerId: {
    type: Types.ObjectId,
    ref: "customer", // Reference to the CUSTOMER collection
    required: true,
  },

  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },

  deliveryStatus: {
    type: String,
    enum: ["out for delivery", "delivered", "pending"],
    required: true,
  },

  estimatedDeliveryTime: {
    type: Date,
    default: Date.now(),
  },
  deliveryAt: {
    type: Date,
    default: Date.now(),
  },
});

const Delivery = mongoose.model("delivery", deliverySchema);

export default Delivery;
