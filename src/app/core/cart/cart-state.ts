import { CartItemInterface } from './cart-item';

export interface CartState {
  cartItems: CartItemInterface[];
}

export const initialState = { 
  cartItems: [] 
};
