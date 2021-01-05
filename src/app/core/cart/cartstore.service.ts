import { Injectable } from '@angular/core';
import { Store } from "@core/store";
import { CartItem } from './cart-item';
import { CartState, initialState } from "./cart-state";

@Injectable({
  providedIn: 'root'
})
export class CartStoreService extends Store<CartState> {
  constructor(){
    super(initialState);
  }

  addCartItem(addItemToCart:CartItem){
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

  removeCartItem(removeItemFromCart:CartItem){
    console.log('[Cart] Remove Item Cart');
    const newState = {
      ...this.state,   // cartItem
      cartItems: this.state.cartItems.filter(cartItem =>
        cartItem.id !== removeItemFromCart.id)
    };
    this.setState(newState);
  }

  updateCartItem(cartItemToUpdate:CartItem){
    console.log('[Cart] Update Cart Item');
    const newState = {
      ...this.state,   // cartItem
      cartItems: this.state.cartItems.map(cartItem =>
        cartItem.id == cartItemToUpdate.id
        ? cartItemToUpdate
        :cartItem
      )
    };
    this.setState(newState);
  }


}
