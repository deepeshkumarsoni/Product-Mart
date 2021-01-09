import { Component, OnInit } from '@angular/core';
import { CartItemInterface } from '@core/cart/cart-item';
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from '@core/cart/cart.service';
import { getCartItems, getCartItemsCount } from '@core/cart/cartSelectors';
import { CartStoreService } from '@core/cart/cartstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Observable<CartItemInterface[]>;
  availableQuantities: number[];
  cartItemsCount: Observable<number>;
  displayedColumns = ["imgUrl", "name", "price", "quantity", "remove"];

  constructor(
    private cartStore: CartStoreService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
    this.cartItems = this.cartStore.select(getCartItems);
  }

  updateCartItem({ value }, cartItem: CartItemInterface) {
    console.log("Attempting to update quantity from cart page");
    this.cartService.updateCartItem({ ...cartItem, quantity: value });
  }

  removeCartItem(cartItem: CartItemInterface) {
    console.log("Attempting to remove item from cart page");
    this.cartService.removeCartItem(cartItem);
  }

}
