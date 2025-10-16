import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../../service/theme.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../service/shared.service';
import { CartItemComponent } from '../../modal/cart-item/cart-item.component';
import { Router, RouterLink } from '@angular/router';
import { BasicAuthService } from '../../../service/BasicAuth.service';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../../../service/modal.service';
import { LoginComponent } from '../../../features/login/login.component';
import { filter, tap } from 'rxjs';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, CartItemComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private sharedService = inject(SharedService);
  private basicAuthService = inject(BasicAuthService);
  private http = inject(HttpClient);
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);

  public mode!: any;
  public productCart?: any;
  public isShowCartItem = false;
  public username?: any;
  public token?: any;

  switchMode() {
    this.themeService.toggleTheme();
    this.mode = localStorage;
  }

  ngOnInit() {
    this.sharedService.data$.subscribe((data: any) => {
      this.productCart = data
    })
    this.username = this.basicAuthService.getAuthUsername();
    this.token = this.basicAuthService.getAuthToken();
  }

  showCartItem() {
    this.isShowCartItem = !this.isShowCartItem;
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    // window.location.reload();
    this.basicAuthService.excuteLogout(this.username, this.token);
  }
}
