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

}
