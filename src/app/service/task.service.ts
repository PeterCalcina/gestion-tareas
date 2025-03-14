import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../interface/Task.interface';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'data.json';
  private http = inject(HttpClient);

  getAllTasks() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  createTask(task: Task) {
    console.log('Task created:', task);
  }

  updateTask(task: Task) {
    console.log('Task updated:', task);
  }

}
