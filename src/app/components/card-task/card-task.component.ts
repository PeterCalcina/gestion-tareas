import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

import { Task } from '../../interface/Task.interface';
import { ShareTaskService } from '../../service/shareTask.service';

@Component({
  selector: 'app-card-task',
  imports: [ButtonModule, PopoverModule],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent {
  @Input() task!: Task;

  private shareTaskService = inject(ShareTaskService);

  newStatus: string = '';

  getStatus( status: string ) {
    this.newStatus = status === 'pending' ? 'Pendiente' : 'Completado';
    return this.newStatus;
  }

  setTask( task: Task ) {
    this.shareTaskService.setTask(task);
    this.shareTaskService.setOpenModal(true);
  }

  deleteTask( task: Task ) {
    this.shareTaskService.setConfirmDeleteTask(true, task);
  }

  taskCompleted( task: Task ) {
    task.status = 'complete';

    this.taskService.updateTask(task).subscribe({
      next: (task: Task) => {
        console.log('Task updated', task);
      },
      error: (error) => {
        console.error('Error updating task', error);
      }
    });
  }
}
