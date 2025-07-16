import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../service/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  public mode!: any;

  switchMode() {
    this.themeService.toggleTheme();
    this.mode = localStorage;
  }
}
