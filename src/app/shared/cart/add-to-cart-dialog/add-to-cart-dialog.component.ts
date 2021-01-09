import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartItemInterface } from '@core/cart/cart-item';

interface AddToCartDialogData {
  cartItem: CartItemInterface;
}

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.scss']
})
export class AddToCartDialogComponent implements OnInit {
  cartItem: CartItemInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: AddToCartDialogData,
    private router: Router,
    private matDialogRef: MatDialogRef<AddToCartDialogComponent>
  ) {
    this.cartItem = data.cartItem;
   }

  ngOnInit(): void {
  }

  goToCart() {
    this.router.navigate(["cart"]).then(() => this.closeDialog());
  }

  continueShopping() {
    this.router.navigate(["products"]).then(() => this.closeDialog());
  }

  closeDialog() {
    this.matDialogRef.close();
  }

}
