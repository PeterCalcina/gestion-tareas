import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FormTaskComponent } from './components/form-task/form-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from './service/toastService.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CreateTaskComponent,
    TaskListComponent,
    FormTaskComponent,
    DeleteTaskComponent,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ToastService, MessageService],
})
export class AppComponent {

}
