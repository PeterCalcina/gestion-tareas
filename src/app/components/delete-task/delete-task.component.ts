import { Component, effect, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TaskService } from '../../service/task.service';
import { ShareTaskService } from '../../service/shareTask.service';
import { Task } from '../../interface/Task.interface';
import { ToastService } from '../../service/toastService.service';

@Component({
  selector: 'app-delete-task',
  imports: [ConfirmDialogModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css',
  providers: [ConfirmationService],
})
export class DeleteTaskComponent {
  private confirmationService = inject(ConfirmationService);
  private taskService = inject(TaskService);
  private shareTaskService = inject(ShareTaskService);
  private toastService = inject(ToastService);

  task: Task | undefined;

  /**
   * This function listens to the changes in the shareTaskService to show the confirm dialog
   * when the user wants to delete a task.
   */
  public showConfirmDialog = effect(() => {
    if(this.shareTaskService.openConfirmDialog() === true) {
      this.task = this.shareTaskService.currentTaskToDelete();
      this.showConfirmAlert();
    }
  });

  showConfirmAlert() {
    if(this.task === undefined) return;

    const title = `${this.task.title}`;
    const message = `¿Está seguro que desea eliminar tarea <strong>${title}?</strong>`;

    this.confirmationService.confirm({
      message: message,
      header: 'Eliminar tarea',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      rejectButtonProps: { severity: 'secondary' },

      accept: () => {
        this.taskService.deleteTask(this.task!).subscribe({
          next: () => {
            this.shareTaskService.deleteTask(this.task!);
            this.shareTaskService.setConfirmDeleteTask(false, undefined);
            this.toastService.showSuccess('La tarea ha sido eliminada correctamente', 4500);
          },
          error: (error) => {
            this.toastService.showError('Error al eliminar la tarea', 4500);
            console.error('Error deleting task', error);
          }
        });
      },
      reject: () => {
        this.shareTaskService.setConfirmDeleteTask(false, undefined);
      }
    });
  }
}
