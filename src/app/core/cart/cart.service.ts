import { Injectable } from '@angular/core';
import { LogService } from '@core/log.service';
import { ProductInt } from '@core/product-services/product';

import { of } from 'rxjs';
import { CartStoreService } from './cartstore.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private logService: LogService, 
    private cartStore: CartStoreService) { }

  addToCart(product: ProductInt, quantity: number){
    this.logService.log('[Cart] Add Item');
    const cartItemToAdd = {
      ...product,
      quantity,
      itemTotal: product.price * quantity
    }
    this.cartStore.addCartItem(cartItemToAdd);
    return of(cartItemToAdd);
  }
}
