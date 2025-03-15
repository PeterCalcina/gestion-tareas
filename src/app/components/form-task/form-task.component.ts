import { Component, computed, effect, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';

import { Task } from '../../interface/Task.interface';
import { TaskService } from '../../service/task.service';
import { ShareTaskService } from '../../service/shareTask.service';

@Component({
  selector: 'app-form-task',
  imports: [
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css',
})
export class FormTaskComponent {
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TaskService);
  private shareTaskService = inject(ShareTaskService);

  isCreate: boolean = true;
  showModal: boolean = false;
  title: string = 'Crear nueva tarea';
  task: Task | undefined;

  readShowModal = effect(() => {
    this.showModal = this.shareTaskService.openModal();
  });

  readTask = effect(() => {
    if(this.shareTaskService.task() !== undefined) {
      this.task = this.shareTaskService.task()!;
      this.isCreate = false;
      this.title = 'Editar tarea';
      this.loadTask(this.task);
    }
  });

  taskForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['pending'],
    registerDate: [new Date()],
  });

  loadTask(task: Task) {
    this.taskForm.setValue({
      title: task.title,
      description: task.description,
      status: task.status,
      registerDate: task.registerDate,
    });
  }

  createTask() {
    const task: Task = this.taskForm.value;
    this.taskService.createTask(task).subscribe({
      next: (task) => {
        this.shareTaskService.addTask(task);
        this.resetValues();
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  updateTask() {
    const updatedTask: Task = {
      id: this.task!.id,
      ...this.taskForm.value,
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: (task) => {
        this.shareTaskService.updateTask(task);
        this.resetValues();
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  resetValues() {
    this.shareTaskService.setOpenModal(false);
    this.shareTaskService.clearTask();
    this.taskForm.reset();
    this.isCreate = true;
    this.title = 'Crear nueva tarea';
  }
}
