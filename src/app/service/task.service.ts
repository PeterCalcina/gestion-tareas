import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../interface/Task.interface';
import { environment } from '../../environment/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = environment.API_URL;
  private http = inject(HttpClient);

  private createUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  //Generic request method to handle all requests
  private request<T>(method: string, url: string, body?: Task) {
    const options = body ? { body } : {};
    return this.http.request<T>(method, url, options);
  }

  getAllTasks(): Observable<Task[]> {
    return this.request<Task[]>('GET', this.createUrl('getAllTasks'));
  }

  createTask(task: Task): Observable<Task> {
    return this.request<Task>('POST', this.createUrl('createTask'), task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.request<Task>('PUT', this.createUrl('updateTask') + '/' + task.id, task);
  }

  deleteTask(task: Task): Observable<void> {
    return this.request<void>('DELETE', this.createUrl('deleteTask') + '/' + task.id);
  }
}
