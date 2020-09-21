import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';


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
    path : 'Login',
    pathMatch : 'full',
    component : LoginComponent
  },
  {
    path : 'register',
    pathMatch : 'full',
    component : RegisterationComponent
  },
  {
    path : 'products',
    pathMatch : 'full',
    loadChildren : './products/products.module#ProductsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
