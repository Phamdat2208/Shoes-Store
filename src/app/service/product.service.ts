import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = `http://localhost:3001/`;

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + `products`);
  }

  detailProduct(params: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + `products/${params}`);
  }

  newProduct(): Observable<any> {
    return this.http.get<any>(this.apiUrl + `new-product`);
  }

  trendingProduct(): Observable<any> {
    return this.http.get<any>(this.apiUrl + `trending-products`);
  }
}
