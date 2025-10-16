import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SharedService } from '../../../service/shared.service';
@Component({
  selector: 'app-product-detail',
  imports: [ProductCardComponent, NgOptimizedImage, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  public id!: string;
  public detailProduct!: any;
  public isAddProduct = false;
  public sharedService = inject(SharedService);

  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);

  @Output() productCart: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.productService.detailProduct(this.id).subscribe((res: any) => this.detailProduct = res)
  }

  addProductToCart(data: any) {
    this.isAddProduct = !this.isAddProduct
    if(this.isAddProduct) {
      this.sharedService.addItemCart(data);
    } else {
      this.sharedService.removeItemCart(data);
    }
  }
}
