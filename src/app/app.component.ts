import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTaskComponent } from "./components/create-task/create-task.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-tareas';
}
