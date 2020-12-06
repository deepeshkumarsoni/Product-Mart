import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductService } from '../core/product-services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { PmDemoMaterialModule } from '../shared/material-module';


@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, ProductsRoutingModule, HttpClientModule, PmDemoMaterialModule],
  providers : [ProductService]
})
export class ProductsModule { }
