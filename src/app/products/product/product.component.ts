import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Observable<any>;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }
}
