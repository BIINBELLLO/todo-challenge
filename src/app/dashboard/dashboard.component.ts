import { Component, OnInit } from "@angular/core";
import { Todo } from "../models/todo";
import { v4 as uuidv4 } from "uuid";
import { TodoViewStatus } from "../models/todo-status.enum";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  currentlyViewing = 1;
  availableTodos: Array<Todo> = [];

  displayedTodos: Array<Todo> = this.availableTodos;
  todoDetail: string = "";
  todoViewStatus = TodoViewStatus;

  constructor() {}

  ngOnInit() {
    this.availableTodos = JSON.parse(localStorage.getItem("currentList"));
    console.log(this.availableTodos);
    this.refreshView(this.currentlyViewing);
  }

  refreshView(view: number) {
    this.currentlyViewing = view;
    if (view === this.todoViewStatus.All) {
      this.displayedTodos = this.availableTodos;
    } else if (view === this.todoViewStatus.Active) {
      this.displayedTodos = this.availableTodos.filter((el) => !el.completed);
    } else {
      this.displayedTodos = this.availableTodos.filter((el) => el.completed);
    }
  }

  addNewTodo() {
    const todo: Todo = {
      id: uuidv4(),
      detail: this.todoDetail,
      completed: false,
    };
    if (this.availableTodos == null) {
      this.availableTodos = [];
    }
    this.availableTodos = [...this.availableTodos, todo];
    this.removeAndSetToLocalStorage();
    this.todoDetail = "";
    this.refreshView(this.currentlyViewing);
  }

  removeAndSetToLocalStorage() {
    localStorage.removeItem("currentList");
    localStorage.setItem("currentList", JSON.stringify(this.availableTodos));
  }

  toggleTodoStatus(id: number) {
    this.availableTodos.forEach((el) => {
      if (el.id === id) {
        el.completed = !el.completed;
      }
    });
    this.refreshView(this.currentlyViewing);
    this.removeAndSetToLocalStorage();
  }

  deleteTodo(id: number) {
    this.availableTodos = this.availableTodos.filter((el) => el.id !== id);
    this.refreshView(this.currentlyViewing);
    this.removeAndSetToLocalStorage();
  }

  deleteAllTodo() {
    this.availableTodos = [];
    this.refreshView(this.currentlyViewing);
    this.removeAndSetToLocalStorage();
  }
}
