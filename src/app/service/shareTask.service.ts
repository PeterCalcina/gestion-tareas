import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interface/Task.interface';


@Injectable({
  providedIn: 'root',
})
export class ShareTaskService {
  /* Task Object to EDIT */
  private _task = signal<Task | undefined>(undefined);
  public task = computed(() => this._task());
  private _openModal = signal<boolean>(false);
  public openModal = computed(() => this._openModal());

  setTask(task: Task) {
    this._task.set(task);
  }

  clearTask() {
    this._task.set(undefined);
  }

  setOpenModal(value: boolean) {
    this._openModal.set(value);
  }

  /* Task Object to DELETE */
  private _openConfirmDialog = signal<boolean>(false);
  private _taskToDelete = signal<Task | undefined>(undefined);
  public openConfirmDialog = computed(() => this._openConfirmDialog());
  public currentTaskToDelete = computed(() => this._taskToDelete());

  setConfirmDeleteTask(value: boolean, taskToDelete: Task | undefined) {
    this._openConfirmDialog.set(value);
    this._taskToDelete.set(taskToDelete);
  }
}
