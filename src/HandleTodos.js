import "./styles.css";
import { MyTodosarray } from "./CreateTodo.js";
import storageManager from "./storage.js";
const todoDiv = document.getElementById("todoArea");

class handleTodo {
  constructor(buttoElement) {
    this.buttoElement = buttoElement;
    this.buttoID = buttoElement.id;
  }
  //Get Details
  getTaskDetails() {
    const task = MyTodosarray.find((todo) => todo.id == this.buttoID);
    return task;
  }
  hideAlltasks() {
    const alltodosArray = document.querySelectorAll(".todoTaskbutton");
    if (!alltodosArray) {
      return;
    }
    alltodosArray.forEach((todos) => {
      todos.style.display = "none";
    });
  }
  showallTasks() {
    const alltodosArray = document.querySelectorAll(".todoTaskbutton");
    if (!alltodosArray) {
      return;
    }
    alltodosArray.forEach((todos) => {
      todos.style.display = "flex";
    });
  }
  showTodo() {
    const task = this.getTaskDetails(); // Get task data first
    if (!task) {
      console.log("Task not found");
      return;
    }
    this.hideAlltasks();

    const todoContainer = document.createElement("div");
    todoContainer.id = `Todotask:${task.id}`;
    todoContainer.classList.add(`Todotask:${task.id}`);
    const nameDiv = document.createElement("div");
    nameDiv.textContent = `TaskName: ${task.name}`;
    nameDiv.className = "name";

    const duedateDiv = document.createElement("div");
    duedateDiv.textContent = `DueDate: ${task.dueDate}`;
    duedateDiv.className = "DueDate";

    const priorityDiv = document.createElement("div");
    priorityDiv.textContent = `Proiority: ${task.priority}`;
    priorityDiv.className = "Duedate";

    const notesDiv = document.createElement("div");
    notesDiv.textContent = `Notes: ${task.notes}`;
    notesDiv.className = "Notes";

    const delteButton = document.createElement("button");
    delteButton.textContent = "DeleteTask";

    const cloesTask = document.createElement("button");
    cloesTask.textContent = "close";
    const editTask = document.createElement("button");
    editTask.textContent = "edit-task";
    editTask.id = this.buttoID;
    editTask.classList.add("todotaskedit");

    todoContainer.appendChild(nameDiv);
    todoContainer.appendChild(duedateDiv);
    todoContainer.appendChild(priorityDiv);
    todoContainer.appendChild(notesDiv);
    todoContainer.appendChild(editTask);
    todoContainer.appendChild(delteButton);
    todoContainer.appendChild(cloesTask);
    todoDiv.appendChild(todoContainer);
    // Delte Button
    const currentButtonTask = document.querySelector(
      `.todoTaskbutton[id="${task.id}"]`
    );
    console.log("showme", task.id);
    delteButton.addEventListener("click", () => {
      console.log(currentButtonTask);
      const toBeDeletedtask = document.getElementById(`Todotask:${task.id}`);
      todoDiv.removeChild(toBeDeletedtask);
      todoDiv.removeChild(currentButtonTask);

      const taskIndex = MyTodosarray.findIndex((todo) => todo.id === task.id);
      if (taskIndex > -1) {
        MyTodosarray.splice(taskIndex, 1);
      }

      // Save to localStorage after deletion
      storageManager.saveTodos(MyTodosarray);

      this.showallTasks();
      console.log(MyTodosarray);
    });

    const currentTodo = document.getElementById(`Todotask:${task.id}`);
    cloesTask.addEventListener("click", () => {
      todoDiv.removeChild(currentTodo);
      const taskButton = document.getElementById(this.buttoID);
      if (taskButton) {
        const task = MyTodosarray.find((todo) => todo.id == this.buttoID);
        if (task) {
          taskButton.innerHTML = task.name;
        }
      }
      this.hideAlltasks();
      this.showallTasks();
    });
  }
}

export default handleTodo;
