import { Component, effect, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TaskService } from '../../service/task.service';
import { ShareTaskService } from '../../service/shareTask.service';
import { Task } from '../../interface/Task.interface';

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

  task: Task | undefined;

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
        this.taskService.deleteTask(this.task!);
      },
      reject: () => {
        this.shareTaskService.setConfirmDeleteTask(false, undefined);
      }
    });
  }
}
