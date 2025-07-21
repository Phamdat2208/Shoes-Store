import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private productService = inject(ProductService);
  public detailProduct!: any;
  public allProduct!: any;

  getNewProduct() {
    this.productService.newProduct().subscribe((res: any) => this.detailProduct = res);
  }

  getAllProduct() {
    this.productService.getAllProducts().subscribe((res: any) => this.allProduct = res)
  }

  ngOnInit() {
    this.getNewProduct();
    this.getAllProduct();
  }
}
