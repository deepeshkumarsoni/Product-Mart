import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface } from './product';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private $http: HttpClient) {}

  getAllProducts(): Observable<ProductInterface> {
    return this.$http.get('products.json').pipe(delay(1000)) as 
    Observable<ProductInterface>;
  }
}
