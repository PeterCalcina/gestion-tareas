import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { TaskListComponent } from './components/task-list/task-list.component';
import { FormTaskComponent } from "./components/form-task/form-task.component";
import { DeleteTaskComponent } from "./components/delete-task/delete-task.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateTaskComponent, TaskListComponent, FormTaskComponent, DeleteTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-tareas';
}
