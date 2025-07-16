import { Component, Input } from '@angular/core';

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
}
