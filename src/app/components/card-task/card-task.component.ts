import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

import { Task } from '../../interface/Task.interface';
import { ShareTaskService } from '../../service/shareTask.service';
import { TaskService } from '../../service/task.service';
import { ToastService } from '../../service/toastService.service';

@Component({
  selector: 'app-card-task',
  imports: [ButtonModule, PopoverModule],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent {
  @Input() task!: Task;

  private shareTaskService = inject(ShareTaskService);
  private taskService = inject(TaskService);
  private toastService = inject(ToastService);

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
        this.shareTaskService.updateTask(task);
        this.toastService.showSuccess('Tarea completada correctamente', 4500);
      },
      error: (error) => {
        this.toastService.showError('Hubo un error al marcar la tarea como completada', 4500);
        console.error('Error updating task', error);
      }
    });
  }
}
