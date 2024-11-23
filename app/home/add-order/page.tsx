"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

type OrderFormData = {
  items: { foodId: string; quantity: number; price: number }[];
  status: string;
  deliveryFee: number;
  totalAmount: number;
};

type Props = {
  userId: string;
};

const OrderPage = ({ userId }: Props) => {
  const { register, handleSubmit, reset } = useForm<OrderFormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: OrderFormData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, customerId: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const result = await response.json();
      console.log("Order created:", result);
      reset();
      router.push("/"); // Redirect to orders list or confirmation page
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Items</label>
          <input
            type="text"
            {...register("items.0.foodId")}
            placeholder="Food ID"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            {...register("items.0.quantity")}
            placeholder="Quantity"
            className="w-full px-3 py-2 border rounded mt-2"
          />
          <input
            type="number"
            {...register("items.0.price")}
            placeholder="Price"
            className="w-full px-3 py-2 border rounded mt-2"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Order Status</label>
          <input
            type="text"
            {...register("status")}
            placeholder="Status"
            className="w-full px-3 py-2 border rounded"
          />
        </div> */}
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Delivery Fee</label>
          <input
            type="number"
            {...register("deliveryFee")}
            placeholder="Delivery Fee"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Total Amount</label>
          <input
            type="number"
            {...register("totalAmount")}
            placeholder="Total Amount"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
