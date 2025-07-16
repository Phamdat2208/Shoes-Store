import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from './shared/components/header/header.component';
import { ThemeService } from './service/theme.service';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ShoesStore';

  private apiUrl = 'https://6874b85cdd06792b9c94ea54.mockapi.io/api/v1/products';

  // constructor(private http: HttpClient) {}

  // getAllProducts(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }
  private themeService = inject(ThemeService);

  ngOnInit() {
    // this.getAllProducts().subscribe((res: any) => res.data);
    localStorage.clear();
    this.themeService.applyTheme();
  }

//   constructor(private themeService: ThemeService) {
//   this.themeService.applyTheme();
// }
}
