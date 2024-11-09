import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';


@Injectable({
  providedIn: 'root'
})

export class ToastService
{
  constructor(private messageService: MessageService) {}

  showSuccess(text: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showInfo(text: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: text });
  }

  showWarn(text: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: text });
  }

  showError(text: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }


}
