import mongoose, { Schema } from "mongoose";

export interface ICustomer extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
}

const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },

  { timestamps: true }
);

const Customer = mongoose.model<ICustomer>("customer", customerSchema);
export default Customer;
