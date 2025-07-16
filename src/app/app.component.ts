import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from './shared/components/header/header.component';
import { ThemeService } from './service/theme.service';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ProductListComponent } from './features/product/product-list/product-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ProductCardComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ShoesStore';
  private themeService = inject(ThemeService);

  ngOnInit() {
    localStorage.clear();
    this.themeService.applyTheme();
  }
}
