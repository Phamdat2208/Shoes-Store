import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ToastComponent } from "./shared/modal/toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ShoesStore';
  private router = inject(Router);

  ngAfterViewInit(): void {
    import('flowbite').then(({ initFlowbite }) => {
      initFlowbite();

      // ⚡ Tự init lại mỗi khi route thay đổi
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          initFlowbite();
        });
    });
  }
}
