import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interface/Task.interface';


@Injectable({
  providedIn: 'root',
})
export class ShareTaskService {
  /* Task Object for EDIT */
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
}
