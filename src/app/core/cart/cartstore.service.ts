import { Injectable } from '@angular/core';
import { Store } from "@core/store";
import { CartItemInterface } from './cart-item';
import { CartState, initialState } from "./cart-state";

@Injectable({
  providedIn: 'root'
})
export class CartStoreService extends Store<CartState> {
  constructor(){
    super(initialState);
  }

  addCartItem(addItemToCart:CartItemInterface){
    console.log('[Cart] Add Card Item');
    const newState = {
      ...this.state,   // cartItem
      cartItems: [].concat(this.state.cartItems,addItemToCart)
    };
    this.setState(newState);
  }

  clearStore(){
    console.log('[Cart] Clear Cart Item');

    const newState = initialState;

    this.setState(newState);
  }

  restoreCart(stateToRestore: CartState){
    console.log('[Cart] Restore Cart Item');
    this.setState(stateToRestore);
  }

  removeCartItem(removeItemFromCart:CartItemInterface){
    console.log('[Cart] Remove Item Cart');
    const newState = {
      ...this.state,   // cartItem
      cartItems: this.state.cartItems.filter(cartItem =>
        cartItem.productId !== removeItemFromCart.productId)
    };
    this.setState(newState);
  }

  updateCartItem(cartItemToUpdate:CartItemInterface){
    console.log('[Cart] Update Cart Item');
    const newState = {
      ...this.state,   // cartItem
      cartItems: this.state.cartItems.map(cartItem =>
        cartItem.productId == cartItemToUpdate.productId
        ? cartItemToUpdate
        :cartItem
      )
    };
    this.setState(newState);
  }
}
