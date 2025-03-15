import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TaskService } from './task.service';
import { Task } from '../interface/Task.interface';
import { environment } from '../../environment/environment';

const expectedTasks: Task[] = [
  {
    id: 1,
    title: 'Tarea 1',
    description: 'Descripción de la tarea 1',
    status: 'pending',
    registerDate: new Date('2021-01-01T00:00:00.000Z'),
  },
  {
    id: 2,
    title: 'Tarea 2',
    description: 'Descripción de la tarea 2',
    status: 'pending',
    registerDate: new Date('2021-01-02T00:00:00.000Z'),
  }
];

const mockTask: Task = {
  id: 1,
  title: 'mock title',
  description: 'mock description',
  status: 'pending',
  registerDate: new Date('2021-01-01T00:00:00.000Z'),
};

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of tasks', () => {
    service.getAllTasks().subscribe((tasks) => {
      expect(tasks).toEqual(expectedTasks);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/getAllTasks`);

    expect(req.request.method).toBe('GET');

    req.flush(expectedTasks);
  });

  it('should return an empty list if no tasks are found', () => {
    service.getAllTasks().subscribe((tasks) => {
      expect(tasks).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/getAllTasks`);
    expect(req.request.method).toBe('GET');

    req.flush([]);
  });


  it('should create a task', () => {
    service.createTask(mockTask).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/createTask`);

    expect(req.request.method).toBe('POST');

    req.flush(mockTask);
  });

  it('should update a task', () => {
    service.updateTask(mockTask).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/updateTask/${mockTask.id}`);

    expect(req.request.method).toBe('PUT');

    req.flush(mockTask);
  });

  it('should delete a task', () => {
    service.deleteTask(mockTask).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.API_URL}/deleteTask/${mockTask.id}`);

    expect(req.request.method).toBe('DELETE');

    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});
