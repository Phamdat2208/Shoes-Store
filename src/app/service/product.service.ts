import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../shared/components/utils/endpoint.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `http://localhost:8080/`;

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + EndPoint.Products);
  }

  detailProduct(params: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + EndPoint.Products + `/${params}`);
  }

  newProduct(): Observable<any> {
    return this.http.get<any>(this.apiUrl + EndPoint.NewProducts);
  }

  trendingProduct(): Observable<any> {
    return this.http.get<any>(this.apiUrl + EndPoint.Products);
  }
}
