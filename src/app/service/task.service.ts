import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../interface/Task.interface';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);

  createTask(task: Task) {
    console.log('Task created:', task);
  }
}
