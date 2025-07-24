import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, NgZone, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductService } from '../../service/product.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class HomeComponent {
  private productService = inject(ProductService);
  public detailProduct!: any;
  public allProduct!: any;
  public trendingProduct!: any;
  public currentIndex = 0;

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

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.trendingProduct.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.trendingProduct.length) % this.trendingProduct.length;
  }
}
