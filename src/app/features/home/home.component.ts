import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, NgZone, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductService } from '../../service/product.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
// import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper/bundle';
import { RouterLink } from '@angular/router';
import { BasicAuthService } from '../../service/BasicAuth.service';

// Swiper.use([Navigation, Pagination, Autoplay, EffectCoverflow]);
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class HomeComponent {
  private productService = inject(ProductService);
  private http = inject(HttpClient);
  private basicAuthService = inject(BasicAuthService);

  public detailProduct!: any;
  public allProduct!: any;
  public trendingProduct!: any;
  public currentIndex = 0;
  public coverflowEffect = {
    rotate: 50,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: true,
  };

  public navigationConfig = {
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  };

  @ViewChild('swiper') swiper!: ElementRef<any>;

  initializeSwiper() {
    const swiperParams = {
      slidesPerView: 3,
      navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      },
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      spaceBetween: 30,
      centeredSlides: true,
    };
    Object.assign(this.swiper?.nativeElement, swiperParams);
    this.swiper.nativeElement.initialize();
  }

  getNewProduct() {
    this.productService.newProduct().subscribe((res: any) => this.detailProduct = res);
  }

  getAllProduct() {
    this.productService.getAllProducts().subscribe((res: any) => this.allProduct = res)
  }

  getTrendingProduct() {
    this.productService.trendingProduct().subscribe((res: any) => {
      this.trendingProduct = res;
      setTimeout(() => {
        this.initializeSwiper();
      }, 0);
    })
  }

  callApi() {
    // this.basicAuthService.excuteLogout();
  }

  ngOnInit() {
    // this.getNewProduct();
    // this.getAllProduct();
    this.getTrendingProduct();
    this.swiper?.nativeElement.addEventListener('swiperInit', () => {
      this.swiper.nativeElement.swiper.autoplay?.start();
    });
  }
}
