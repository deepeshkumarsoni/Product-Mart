import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsModule } from './products.module';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    component : ProductComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
