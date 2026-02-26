interface Order {
  _id: string;
  id: number;                    // the incremental order number (1, 2, 3, ...)
  __v: number;

  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };

  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;

  paymentMethodType: "cash" | "card";   // you can make this more strict if needed

  isPaid: boolean;
  isDelivered: boolean;

  paidAt?: string;               // ISO date string, only present when isPaid = true
  createdAt: string;             // ISO date
  updatedAt: string;             // ISO date

  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };

  cartItems: CartItem[];
}

interface CartItem {
  _id: string;
  count: number;
  price: number;                 // unit price at time of order
  product: ProductSnapshot;
}

interface ProductSnapshot {
  _id: string;
  id: string;                    // same as _id in most cases
  title: string;
  imageCover: string;            // URL
  ratingsAverage: number;
  ratingsQuantity: number;

  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };

  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };

  subcategory: Array<{
    _id: string;
    name: string;
    slug: string;
    category: string;            // category _id
  }>;
}

// For the full response (array of orders)
type OrdersResponse = Order[];