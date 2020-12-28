import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductInt } from '@core/product-services/product';
import { ProductService } from '@core/product-services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  
  dataSource = new MatTableDataSource<ProductInt>();
  loading = true;                
  subscriptions = [];
  displayedColumns = ["imgUrl", "name", "price", "action"];
  
  @ViewChild(MatSort) sort: MatSort;

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.productService
        .getAllProducts()
        .subscribe((products) => this.onDataLoad(products))
    );    
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onDataLoad(products) {
    this.loading = false;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.dataSource.data = products;
  }

}
