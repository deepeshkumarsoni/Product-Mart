import { Component, OnInit } from '@angular/core';
import { getCartItemsCount, getCartSubTotal, getEstimatedTax, getOrderTotal, getShippingCost } from '@core/cart/cartSelectors';
import { CartStoreService } from '@core/cart/cartstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  cartSubTotal: Observable<number>;
  cartItemsCount: Observable<number>;
  shippingCost: Observable<number>;
  estimatedTax: Observable<number>;
  orderTotal: Observable<number>;

  constructor(private cartStore: CartStoreService) { }

  ngOnInit(): void {
    this.cartSubTotal = this.cartStore.select(getCartSubTotal);
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
    this.shippingCost = this.cartStore.select(getShippingCost);
    this.estimatedTax = this.cartStore.select(getEstimatedTax);
    this.orderTotal = this.cartStore.select(getOrderTotal);
  }

}
