import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  private apiUrl = 'http://localhost:3001/products';
  private http = inject(HttpClient);
  public data!: any;

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  ngOnInit() {
    this.getAllProducts().subscribe((res: any) => this.data = res)
  }
}
