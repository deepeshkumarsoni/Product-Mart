import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartItemInterface } from '@core/cart/cart-item';
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from '@core/cart/cart.service';
import { getIsItemAlreadyInCart } from '@core/cart/cartSelectors';
import { CartStoreService } from '@core/cart/cartstore.service';
import { ProductInt } from '@core/product-services/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartComponent implements OnInit {
  @Input() 
  product: ProductInt;
  availableQuantities: number[];
  quantity: number;
  isItemAlreadyInCart: Observable<boolean>;

  constructor(
    private cartStore: CartStoreService,
    private cartService: CartService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.isItemAlreadyInCart = this.cartStore.select(
      getIsItemAlreadyInCart(this.product.id)
    );
    this.quantity = 1;
  }

  addItemToCart() {
    this.cartService
      .addToCart(this.product, this.quantity)
      .subscribe((cartItem) => 
      console.log("Item Added To Cart", cartItem));
      //this.openDialog(cartItem));
  }

  // openDialog(cartItem: CartItemInterface) {
  //   this.matDialog.open(AddToCartDialogComponent, {
  //     width: "350px",
  //     height: "250px",
  //     data: { cartItem },
  //     disableClose: true,
  //   });    
  // }

}
