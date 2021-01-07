import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { delay } from 'rxjs/operators';
import { ProductInt } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private $http: HttpClient) {}

  getAllProducts(): Observable<ProductInt> {
    return this.$http.get('products.json').pipe(delay(1000)) as 
    Observable<ProductInt>;
  }
}
