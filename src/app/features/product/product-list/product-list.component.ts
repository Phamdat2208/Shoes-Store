import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  private apiUrl = 'http://localhost:3001/products';
  private productService = inject(ProductService);
  public data!: any;

  ngOnInit() {
    this.productService.getAllProducts().subscribe((res: any) => this.data = res)
  }
}
