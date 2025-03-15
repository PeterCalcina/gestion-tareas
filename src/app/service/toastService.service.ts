import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({providedIn: 'root'})

export class ToastService {
  private messageService = inject(MessageService);

  showSuccess(message: string, tiempo: number): void {
    this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: message, life: tiempo });
  }

  showError(message: string, tiempo: number): void {
    this.messageService.add({ severity: 'error', summary: '¡Error!', detail: message, life: tiempo });
  }
}
