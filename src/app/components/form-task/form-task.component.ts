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
import { ToastService } from '../../service/toastService.service';

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
  private toastService = inject(ToastService);

  isCreate: boolean = true;
  showModal: boolean = false;
  title: string = 'Crear nueva tarea';
  task: Task | undefined;

  /**
   * This function listens the changes in the computed() *openModal*
   * and updates the value of showModal.
   */
  readShowModal = effect(() => {
    this.showModal = this.shareTaskService.openModal();
  });

  /**
   * This function listens the changes in the computed() *task*
   * if the task is not undefined, it means that the user wants to edit a task.
   */
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

  /**
   * Load the task in the form
   * @param task Task to load in the form
   */
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
        this.toastService.showSuccess('Tarea creada correctamente', 4500);
        this.resetValues();
      },
      error: (error) => {
        this.toastService.showError('Error al crear la tarea', 4500);
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
        this.toastService.showSuccess('Tarea actualizada correctamente', 4500);
        this.resetValues();
      },
      error: (error) => {
        this.toastService.showError('Error al actualizar la tarea', 4500);
        console.error('Error:', error);
      }
    });
  }

  resetValues() {
    this.shareTaskService.setOpenModal(false);
    this.shareTaskService.clearTask();
    this.taskForm.reset( { status: 'pending', registerDate: new Date() } );
    this.isCreate = true;
    this.title = 'Crear nueva tarea';
  }
}
