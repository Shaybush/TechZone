import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { BasketItem, BasketState, Product } from '../../types/store';

const initialState: BasketState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchBasket = createAsyncThunk(
  'basket/fetchBasket',
  async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/basket`);
      return response.data as BasketItem[];
    } catch (error) {
      console.error('Error fetching basket:', error);
      throw error;
    }
  }
);

export const addToBasket = createAsyncThunk(
  'basket/addToBasket',
  async ({ product, quantity }: { product: Product; quantity: number }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/basket`, {
        productId: product.id,
        quantity,
      });
      return response.data as BasketItem;
    } catch (error) {
      console.error('Error adding to basket:', error);
      throw error;
    }
  }
);

export const removeFromBasket = createAsyncThunk(
  'basket/removeFromBasket',
  async (productId: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/basket/${productId}`);
      return productId;
    } catch (error) {
      console.error('Error removing from basket:', error);
      throw error;
    }
  }
);

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch basket
      .addCase(fetchBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch basket';
      })
      // Add to basket
      .addCase(addToBasket.fulfilled, (state, action) => {
        const existingItem = state.items.find(item => item.productId === action.payload.productId);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      // Remove from basket
      .addCase(removeFromBasket.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.productId !== action.payload);
      });
  },
});

export default basketSlice.reducer; 