import { Injectable } from '@angular/core';
import { LogService } from '@core/log.service';
import { ProductInt } from '@core/product-services/product';

import { of } from 'rxjs';
import { CartItemInterface } from './cart-item';
import { CartStoreService } from './cartstore.service';

export const ALLOWED_PRODUCT_QUANTITIES = 
  Array.from(
    { length: 30 },
    (v, i) => i + 1
  );

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private logService: LogService,
    private cartStore: CartStoreService
  ) {}

  addToCart(product: ProductInt, quantity: number) {
    this.logService.log('[Cart] Add Item');
    const cartItemToAdd = {
      ...product,
      quantity,
      itemTotal: product.price * quantity,
    };
    this.cartStore.addCartItem(cartItemToAdd);
    return of(cartItemToAdd);
  }

  updateCartItem(cartItemToUpdate: CartItemInterface) {
    cartItemToUpdate = {
      ...cartItemToUpdate,
      itemTotal: cartItemToUpdate.price * cartItemToUpdate.quantity,
    };

    this.cartStore.updateCartItem(cartItemToUpdate);

    return of(cartItemToUpdate);
  }

  removeCartItem(itemToRemove: CartItemInterface) {
    this.cartStore.removeCartItem(itemToRemove);

    return of(itemToRemove);
  }

  clearCart() {
    this.cartStore.clearCart();
  }

}
