import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { FormTaskComponent } from '../form-task/form-task.component';
import { ShareTaskService } from '../../service/shareTask.service';

@Component({
  selector: 'app-create-task',
  imports: [ButtonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  private shareTaskService = inject(ShareTaskService);

  openModal() {
    this.shareTaskService.setOpenModal(true);
  }
}
