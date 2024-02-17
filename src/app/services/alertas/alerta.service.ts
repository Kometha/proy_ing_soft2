import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(
    private messageService: MessageService
  ) { }

  // <p-toast key="alerta1"></p-toast>
  // Se encuentra en app.main.component.html

  showSuccess(mensaje: string) {
    this.messageService.add({key: 'alerta1', severity:'success', summary:'Exito!', detail: mensaje});
  }

  showInfo(mensaje: string) {
    this.messageService.add({key: 'alerta1', severity:'info', summary:'Mensaje!', detail: mensaje});
  }

  showWarning(mensaje: string) {
    this.messageService.add({key: 'alerta1', severity:'warn', summary:'Advertencia!', detail: mensaje});
  }

  showError(mensaje: string) {
    this.messageService.add({key: 'alerta1', severity:'error', summary:'Error!', detail: mensaje, sticky:true});
  }
}
