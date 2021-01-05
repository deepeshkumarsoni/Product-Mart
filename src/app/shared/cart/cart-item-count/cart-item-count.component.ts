import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getCartItemsCount } from '@core/cart/cartSelectors';
import { CartStoreService } from '@core/cart/cartstore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-item-count',
  templateUrl: './cart-item-count.component.html',
  styleUrls: ['./cart-item-count.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartItemCountComponent implements OnInit {
totalItemInCart$: Observable<number>;

  constructor(private cartStore: CartStoreService) { }

  ngOnInit(): void {
    this.totalItemInCart$ = this.cartStore.select(getCartItemsCount);
  }

}
