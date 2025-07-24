import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Carousel } from 'flowbite';
import 'flowbite';

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
  public trendingProduct!: any;
  public selectedIndex = 0;

  getNewProduct() {
    this.productService.newProduct().subscribe((res: any) => this.detailProduct = res);
  }

  getAllProduct() {
    this.productService.getAllProducts().subscribe((res: any) => this.allProduct = res)
  }

  getTrendingProduct() {
    this.productService.trendingProduct().subscribe((res: any) => this.trendingProduct = res)
  }

  ngOnInit() {
    this.getNewProduct();
    this.getAllProduct();
    this.getTrendingProduct();
  }

  prevImage(i: any) {

  }

  nextImage() {
    console.log(2)
  }
}
