import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

import { Task } from '../../interface/Task.interface';

@Component({
  selector: 'app-card-task',
  imports: [ButtonModule, PopoverModule],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent {
  @Input() task!: Task;
  newStatus: string = '';

  getStatus( status: string ) {
    this.newStatus = status === 'pending' ? 'Pendiente' : 'Completado';
    return this.newStatus;
  }
}
