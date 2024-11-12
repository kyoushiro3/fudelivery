"use client";

import { Input } from "@/components/ui/input";
import { orderFormData } from "@/types/props";
import { ChangeEvent, FormEvent, useState } from "react";

const OrderForm: React.FC = () => {
  const [orderForm, setOrderForm] = useState<orderFormData>({
    customerId: "",
    items: [{ foodId: "", quantity: 1, price: 0 }],
    status: "",
    deliveryFee: 0,
    totalAmount: 0,
    orderedAt: new Date().toISOString(),
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedItems = [...orderForm.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: name === "quantity" || name === "price" ? +value : value,
    };
    setOrderForm((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setOrderForm((prev) => ({
      ...prev,
      items: [...prev.items, { foodId: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setOrderForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderForm),
      });

      if (res.ok) {
        console.log("Order created successfully.");
      } else {
        console.log("Error creating order:", res.statusText);
      }
    } catch (error) {
      console.log("Failed to create order.", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <Input
            name="customerId"
            placeholder="Customer ID"
            value={orderForm.customerId}
            onChange={handleInputChange}
            required
          />
        </div>

        {orderForm.items.map((item, index) => (
          <div key={index} className="mb-5">
            <Input
              name="foodId"
              placeholder="Food ID"
              value={item.foodId}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            <Input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            <button type="button" onClick={() => removeItem(index)}>
              Remove Item
            </button>
          </div>
        ))}
        <button type="button" onClick={addItem}>
          Add Item
        </button>

        <div className="mb-5">
          <Input
            name="status"
            placeholder="Status"
            value={orderForm.status}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-5">
          <Input
            name="deliveryFee"
            type="number"
            placeholder="Delivery Fee"
            value={orderForm.deliveryFee}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-5">
          <Input
            name="totalAmount"
            type="number"
            placeholder="Total Amount"
            value={orderForm.totalAmount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-5">
          <Input
            name="orderedAt"
            type="datetime-local"
            value={orderForm.orderedAt}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
