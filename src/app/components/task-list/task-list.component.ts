import { Component, effect, inject, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task } from '../../interface/Task.interface';
import { CardTaskComponent } from "../card-task/card-task.component";
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ShareTaskService } from '../../service/shareTask.service';
import { ToastService } from '../../service/toastService.service';

interface Status {
  label: string;
  value: string;
}

@Component({
  selector: 'app-task-list',
  imports: [CardTaskComponent, SelectModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private shareTaskService = inject(ShareTaskService);
  private toastService = inject(ToastService);

  filterTasks: Task[] = [];
  originalTasks: Task[] = [];
  // Status to filter tasks
  status: Status[] = [];

  ngOnInit(): void {
    this.loadTasks();
    this.loadStatus();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks: Task[]) => {
        this.shareTaskService.setTaskList(tasks);
      },
      error: (error) => {
        this.toastService.showError('Ha ocurrido un error al cargar las tareas', 4500);
        console.error('Error al cargar tareas: ', error);
      }
    });
  }

  loadStatus() {
    this.status = [
      { label: 'Todos', value: 'all' },
      { label: 'Pendiente', value: 'pending' },
      { label: 'Completado', value: 'complete' }
    ];
  }

  /**
   * Task listener to update the task list when a new task is added or updated
   */
  taskListener = effect(() => {
    if(this.shareTaskService.taskList().length > 0) {
      this.originalTasks = this.sortTasks(this.shareTaskService.taskList());
      this.filterTasks = [...this.originalTasks];
    }
  });

  sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      return new Date(a.registerDate).getTime() - new Date(b.registerDate).getTime();
    });
  }

  applyFilter(event: SelectChangeEvent) {
    this.filterTasks = [...this.originalTasks];

    switch (event.value.value) {
      case 'pending':
        this.filterTasks = this.filterTasks.filter((task) => task.status === 'pending');
        break;
      case 'complete':
        this.filterTasks = this.filterTasks.filter((task) => task.status === 'complete');
        break;
    }
  }
}
