import { inject, Injectable, TemplateRef, Type } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private nzModalService = inject(NzModalService);

  open<C>(modalComponent: string | TemplateRef<NzSafeAny> | Type<C>, params?: any, style?: object, modalApi?: object, data?: object) {
    return this.nzModalService.create({
      nzContent: modalComponent,
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzMaskClosable: params.nzMaskClosable ? params.nzMaskClosable : false,
      nzKeyboard: false,
      ...modalApi,
      nzData: data,
      nzBodyStyle: {
        padding: '0'
      },
      nzStyle: style
    });
  }
}
