import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public scrollToInvalidControl(modalElement?: HTMLElement | Element) {
    const container = modalElement ? modalElement : document;
    const listInvalidControls = container.querySelectorAll(
       'input.ng-invalid,[formControlName="password"].ng-invalid input,.input.ng-invalid, .ng-invalid'
    );
    const firstInvalidControl = listInvalidControls[0];

    if (!firstInvalidControl) {
      return;
    }

    firstInvalidControl.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    setTimeout(() => (firstInvalidControl as HTMLElement).focus(), 300);
  }
}
