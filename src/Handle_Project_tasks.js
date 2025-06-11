import "./styles.css";
import { projectArray } from "./CreateTodo.js";
import storageManager from "./storage.js";
// const todoDiv = document.getElementById("projectArea");

class HandleprojectTodo {
  constructor(buttoElement, projectButtonElement) {
    this.buttoElement = buttoElement;
    this.buttoID = buttoElement.id;

    this.projectButton = projectButtonElement;
    this.ProjectID = projectButtonElement.id;
  }

  showTaskdetails() {
    //Hide all buttons
    console.log(this.buttoID, this.ProjectID);
    const taskCarddiv = document.getElementById(this.ProjectID + "-card");
    taskCarddiv.querySelectorAll("button").forEach((button) => {
      button.style.display = button.style.display === "none" ? "block" : "none";
    });
    //finding the element with PID
    const currentPID = projectArray.filter(
      (task) => task.PID === this.ProjectID
    );
    console.log(currentPID);

    const currentTask = currentPID.find((todo) => todo.id == this.buttoID);
    console.log("current Task", currentTask);
    //
    // Create main task card div
    const projectTaskCard = document.createElement("div");
    projectTaskCard.className = "projecttaskcard";
    projectTaskCard.id = currentTask.id;

    // Create and populate the 4 detail divs
    const nameDiv = document.createElement("div");
    nameDiv.textContent = `Name: ${currentTask.name}`;

    const dueDateDiv = document.createElement("div");
    dueDateDiv.textContent = `Due Date: ${currentTask.dueDate}`;

    const notesDiv = document.createElement("div");
    notesDiv.textContent = `Notes: ${currentTask.notes}`;

    const priorityDiv = document.createElement("div");
    priorityDiv.textContent = `Priority: ${currentTask.priority}`;
    // Create close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close Task";
    closeButton.id = this.buttoID;
    closeButton.className = "projecttask_CLS_BTN";

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Task";
    deleteButton.id = this.buttoID;
    deleteButton.className = "projecttask_DLT_BTN";

    const editTaskBtn = document.createElement("button");
    editTaskBtn.textContent = "Edit Task";
    editTaskBtn.id = this.buttoID;
    editTaskBtn.classList.add("projecttaskedit");

    // Append all detail divs to the main task card
    projectTaskCard.appendChild(nameDiv);
    projectTaskCard.appendChild(dueDateDiv);
    projectTaskCard.appendChild(notesDiv);
    projectTaskCard.appendChild(priorityDiv);
    projectTaskCard.appendChild(closeButton);
    projectTaskCard.appendChild(editTaskBtn);
    projectTaskCard.appendChild(deleteButton);

    // Find parent div and append the task card
    const parentDiv = document.querySelector(
      `.ProjectCard[id="${this.ProjectID}-card"]`
    );
    parentDiv.appendChild(projectTaskCard);
    // parentDiv.className = "ProjectCard";
  }

  clsoePorjectTask() {
    const parentDiv = document.getElementById(this.ProjectID + "-card");

    const taskdetailcard = document.querySelector(
      `.projecttaskcard[id="${this.buttoID}"]`
    );
    parentDiv.removeChild(taskdetailcard);

    taskdetailcard.style.display = "none";
    const taskCarddiv = document.getElementById(this.ProjectID + "-card");

    taskCarddiv.querySelectorAll("button").forEach((button) => {
      button.style.display =
        button.style.display === "none" ? "block" : "block";
    });
  }

  deleteProjectTask() {
    //remove task from array
    const taskIndex = projectArray.findIndex(
      (todo) => todo.id === this.buttoID
    );
    if (taskIndex > -1) {
      projectArray.splice(taskIndex, 1);
    }

    // Save to localStorage after deletion
    storageManager.saveProjectTasks(projectArray);

    const parentDiv = document.querySelector(
      `.ProjectCard[id="${this.ProjectID}-card"]`
    );
    const taskdetailcard = document.querySelector(
      `.projecttaskcard[id="${this.buttoID}"]`
    );
    parentDiv.removeChild(taskdetailcard);
    const taskButton = document.querySelector(
      `.ProjectTaskbutton[id="${this.buttoID}"]`
    );

    parentDiv.removeChild(taskButton);

    //show main projectcard
    const taskCarddiv = document.getElementById(this.ProjectID + "-card");
    taskCarddiv.querySelectorAll("button").forEach((button) => {
      button.style.display =
        button.style.display === "none" ? "block" : "block";
    });
  }
}

export default HandleprojectTodo;
