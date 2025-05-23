import { Store } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface BasketItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface BasketState {
  items: BasketItem[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  products: ProductsState;
  basket: BasketState;
}

export type AppDispatch = Store['dispatch']; 