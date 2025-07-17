import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  public id!: string;
  public detailProduct!: any;

  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id)
    this.productService.detailProduct(this.id).subscribe((res: any) => this.detailProduct = res)
  }
}
