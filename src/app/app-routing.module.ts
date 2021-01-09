import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/auth-service-token/auth-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'products',
    pathMatch: 'full',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
