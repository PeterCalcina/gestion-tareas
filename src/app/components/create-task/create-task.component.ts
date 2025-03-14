import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { TaskService } from '../../service/task.service';
import { Task } from '../../interface/Task.interface';

@Component({
  selector: 'app-create-task',
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    TextareaModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  private taskService = inject(TaskService);

  showModal: boolean = false;

  private formBuilder = inject(FormBuilder);

  taskForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    state: ['pending'],
    registerDate: [new Date()],
  });

  createTask() {
    const task: Task = this.taskForm.value;
    this.taskService.createTask(task);
    this.showModal = false;
  }
}
