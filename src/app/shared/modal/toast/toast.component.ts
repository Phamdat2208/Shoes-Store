import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationComponent, NzNotificationDataOptions, NzNotificationRef, NzNotificationService } from 'ng-zorro-antd/notification';
import { ToastService } from '../../../service/toast.service';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@UntilDestroy()
@Component({
  selector: 'app-toast',
  imports: [CommonModule, NzButtonModule, NzIconModule, NzDividerModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  @ViewChild('template', { static: false }) template!: TemplateRef<any>;
  @ViewChild('templateDanger', { static: false }) templateDanger!: TemplateRef<any>;
  @ViewChild('templateWarning', { static: false }) templateWarning!: TemplateRef<any>;
  private nzNotificationService = inject(NzNotificationService);

  private toastService = inject(ToastService);
  private toast$ = this.toastService.toast$;
  public status!: any;
  public toastRef?: NzNotificationRef;
  private currentMessageId?: string;
  private toastRefs: NzNotificationRef[] = [];
  readonly MAX_TOASTS = 1;

  ngOnInit(): void {
    this.toast$
      .pipe(untilDestroyed(this))
      .subscribe((paramData) => {
        const notificationConfig: NzNotificationDataOptions = {
          nzData: paramData,
          nzDuration: paramData.duration || 3000,
          nzPlacement: paramData.placement || 'top',
          nzClass: paramData.class,
          nzCloseIcon: paramData.closeIcon ?? false,
          nzStyle: { padding: '0' }
        };

        if (this.toastRefs.length >= this.MAX_TOASTS) {
          const oldestToast = this.toastRefs.shift();
          oldestToast?.messageId && this.nzNotificationService.remove(oldestToast.messageId);
        }

        const toastRef = this.nzNotificationService.template(this.template, notificationConfig);
        this.toastRefs.push(toastRef);

        toastRef.onClose.subscribe(() => {
          this.toastRefs = this.toastRefs.filter(ref => ref !== toastRef);
        });
      });
  }

  closeToast() {
    this.nzNotificationService.remove();
  }
}
