import type { ProductType } from "./Product";

export type CartItem = {
  id: string;
  userId: string;
  productId: string;
  product: ProductType;
};
