import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toast$: Subject<any> = new Subject<any>();

  success(data: string | { message: string, duration?: string }) {
    let paramData = data;

    if (typeof data === 'string') {
      paramData = {
        message: data,
      }
    } else {
      paramData = data
    }

    this.show({ ...paramData, class: '', icon: '' });
  }

  error(data: string | { message: string, duration?: string }) {
    let paramData = data;

    if (typeof data === 'string') {
      paramData = {
        message: data,
      }
    } else {
      paramData = data
    }

    this.show({ ...paramData, class: '', icon: '' });
  }

  show(paramData: { message: string, class: string, icon: string}) {
    this.toast$.next(paramData);
  }
}
