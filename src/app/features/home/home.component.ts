import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private productService = inject(ProductService);
  public detailProduct!: any;

  ngOnInit() {
    this.productService.newProduct().subscribe((res: any) => this.detailProduct = res);
  }
}
