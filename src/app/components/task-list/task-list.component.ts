import { Component, effect, inject, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task } from '../../interface/Task.interface';
import { CardTaskComponent } from "../card-task/card-task.component";
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ShareTaskService } from '../../service/shareTask.service';

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

  filterTasks: Task[] = [];
  originalTasks: Task[] = [];
  // Status to filter tasks
  status: Status[] = [];

  ngOnInit(): void {
    this.loadTasks();
    this.loadStatus();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((taskResponse) => {
      this.shareTaskService.setTaskList(taskResponse);
    });
  }

  loadStatus() {
    this.status = [
      { label: 'Todos', value: 'all' },
      { label: 'Pendiente', value: 'pending' },
      { label: 'Completado', value: 'complete' }
    ];
  }

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
