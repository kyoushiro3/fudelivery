export interface foodData {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  img: string;
  isAvailable: boolean;
}

export interface customerData {
  id?: string;
}

export interface orderItem{
  foodId: string;
  quantity: number;
  price:number;
}

export interface orderFormData{
  customerId: string;
  items: orderItem[];
  status: string;
  deliveryFee: number;
  totalAmount: number;
  orderedAt: string;
}