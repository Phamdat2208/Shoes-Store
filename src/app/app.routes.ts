import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import(
        './features/home/home.component'
      ).then((m) => m.HomeComponent),
  },
  {
    path: 'product-detail/:id',
    loadComponent: () =>
      import(
        './features/product/product-detail/product-detail.component'
      ).then((m) => m.ProductDetailComponent),
  },
];
