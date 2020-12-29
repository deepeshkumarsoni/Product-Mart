import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsModule } from './products/products.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BlockModule } from './block/block.module';
import { AppComponent } from './block/root/app.component';
import { CoreModule } from '@core/core.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    BlockModule,
    ProductsModule,
    HttpClientModule,
  ],
  // providers:[httpInterceptorProviders, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
