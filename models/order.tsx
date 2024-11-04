import mongoose, { Schema, Types } from "mongoose";

const orderSchema = new Schema({
  customerId: {
    type: Types.ObjectId, // Reference to the CUSTOMER collection
    ref: "customer",
    required: true,
  },
  items: [
    {
      foodId: {
        type: Types.ObjectId, // Reference to the FOOD collection
        ref: "food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "delivered", "cancelled"], //given statuses
    default: "pending",
    required: true,
  },
  deliveryFee: {
    type: Number,
    required: true,
    min: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;
