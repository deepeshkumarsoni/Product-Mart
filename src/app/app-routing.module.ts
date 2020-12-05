import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : ''
  },
  {
    path : 'Home',
    pathMatch : 'full',
    component : HomeComponent
  },
  {
    path : 'products',
    pathMatch : 'full',
    loadChildren : './products/products.module#ProductsModule'
  },
  {
    path : 'auth',
    pathMatch : 'full',
    loadChildren : './auth/auth.module#AuthModule'
  }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
