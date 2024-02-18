import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  baseClass = 'rounded-full transition-all duration-300 ease-in-out';
  baseContentClass = 'flex justify-center items-center';
  constructor(private toast: MessageService) {}

  showSuccess(message: string) {
    this.toast.add({
      severity: 'success',
      key: 'alertaGeneral',
      summary: 'Éxito',
      life: 3000,
      contentStyleClass: 'bg-green-200 text-green-900',
      styleClass: `${this.baseClass} bg-green-200 text-green-900 hover:bg-green-900 hover:text-green-200`,
      detail: message,
    });
  }

  showError(message: string) {
    this.toast.add({
      severity: 'error',
      key: 'alertaGeneral',
      life: 3000,
      contentStyleClass: this.baseContentClass,
      styleClass: `${this.baseClass} bg-red-200 text-red-900 hover:bg-red-900 hover:text-red-200`,
      summary: 'Error',
      detail: message,
    });
  }

  showWarn(message: string) {
    this.toast.add({
      severity: 'warn',
      key: 'alertaGeneral',
      summary: 'Advertencia',
      closable: true,
      life: 3000,
      contentStyleClass: this.baseContentClass,
      styleClass: `${this.baseClass} bg-yellow-200 text-yellow-900 hover:bg-yellow-900 hover:text-yellow-200`,
      detail: message,
    });
  }

  showInfo(message: string) {
    this.toast.add({
      severity: 'info',
      key: 'alertaGeneral',
      summary: 'Información',
      life: 3000,
      contentStyleClass: this.baseContentClass,
      styleClass: `${this.baseClass} bg-blue-200 text-blue-900 hover:bg-blue-900 hover:text-blue-200`,
      detail: message,
    });
  }

  showCustom(message: Message) {
    this.toast.add({ ...message, key: 'alertaGeneral' });
  }
}
