import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { PmDemoMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItemCountComponent } from './cart/cart-item-count/cart-item-count.component';
import { AddToCartComponent } from './cart/add-to-cart/add-to-cart.component';

@NgModule({
  declarations: [CartItemCountComponent, AddToCartComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    PmDemoMaterialModule,
  ],
  exports: [
    PmDemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    CartItemCountComponent,
    AddToCartComponent
  ],
})
export class SharedModule {}
