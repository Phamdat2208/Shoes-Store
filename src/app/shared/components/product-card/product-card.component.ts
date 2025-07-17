import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() price!: number;
  @Input() nameProduct!: number;
  @Input() rate!: number;
  @Input() imgUrl!: string;
  @Input() id!: string;

  private router = inject(Router);

  route(id: any) {
    this.router.navigate([`/product-detail/${id}`]);
  }
}
