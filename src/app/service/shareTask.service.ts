import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interface/Task.interface';

@Injectable({
  providedIn: 'root',
})
export class ShareTaskService {
  /**
   * Manages task-related state for sharing across components, including task data,
   * modal visibility, and task deletion confirmation.
   */
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

  /**
    * Manages task deletion confirmation state, including the task to delete and
    * the visibility of the confirmation dialog.
   */
  private _openConfirmDialog = signal<boolean>(false);
  private _taskToDelete = signal<Task | undefined>(undefined);
  public openConfirmDialog = computed(() => this._openConfirmDialog());
  public currentTaskToDelete = computed(() => this._taskToDelete());

  setConfirmDeleteTask(value: boolean, taskToDelete: Task | undefined) {
    this._openConfirmDialog.set(value);
    this._taskToDelete.set(taskToDelete);
  }

  /* Current Tasks */
  private _taskList = signal<Task[]>([]);
  public taskList = computed(() => this._taskList());

  setTaskList(tasks: Task[]) {
    this._taskList.set(tasks);
  }

  addTask(task: Task) {
    this._taskList.set([...this._taskList(), task]);
  }

  updateTask(task: Task) {
    this.handleTasks(task);
  }

  deleteTask(task: Task) {
    this.handleTasks(task, true);
  }

  //Generic method to handle update and delete tasks
  private handleTasks(task: Task | null, remove = false) {
    const tasks = this._taskList();
    const index = tasks.findIndex((t) => t.id === task?.id);

    if (index !== -1) {
      if (remove) tasks.splice(index, 1);
      else if (task) tasks[index] = task;
    }

    this._taskList.set([...tasks]);
  }
}
