import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
 

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, ProductsRoutingModule,HttpClientModule], 
  providers : [ProductService]
})
export class ProductsModule { }
