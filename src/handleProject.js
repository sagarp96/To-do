import createTaskform from "./taskForm.js";
import storageManager from "./storage.js";
import appInitializer from "./appInit.js";
import { projectArray } from "./CreateTodo.js";

class Handlerpoject {
  constructor(buttoElement) {
    this.buttoElement = buttoElement;
    this.buttoID = buttoElement.id;
  }
  //closebutton
  ifTaskexist() {
    // Use getElementById
    // Get buttons within the current project
    // Look for project card with modified ID

    const projectCardID = this.buttoID + "-card";
    const currentProjecttask = document.getElementById(projectCardID);

    if (currentProjecttask) {
      currentProjecttask.style.display = "flex";

      this.hideAllproject();
    } else {
      this.addNewproject();
    }
  }

  addNewproject() {
    const projectArea = document.getElementById("projectArea");
    const projectDiv = document.createElement("div");
    projectDiv.id = this.buttoID + "-card";
    projectDiv.className = "ProjectCard";
    const addTasksBtn = document.createElement("button");
    addTasksBtn.textContent = "Add Tasks";
    addTasksBtn.id = this.buttoID;
    addTasksBtn.classList.add("add-tasks-btn");
    const closeProjectBtn = document.createElement("button");
    closeProjectBtn.textContent = "Close Project";
    closeProjectBtn.classList.add("close-project-btn");
    const projectHeading = document.createElement("div");
    projectHeading.textContent = this.buttoElement.textContent;
    projectHeading.classList.add("project-heading");
    projectHeading.style.fontSize = "24px";
    projectHeading.style.fontWeight = "bold";
    projectHeading.style.marginBottom = "10px";
    projectDiv.appendChild(projectHeading);
    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.textContent = "Delete Project";
    deleteProjectBtn.classList.add("delete-project-btn");

    projectDiv.appendChild(addTasksBtn);
    projectDiv.appendChild(closeProjectBtn);
    projectDiv.appendChild(deleteProjectBtn);
    projectArea.appendChild(projectDiv);
    //add project in the array

    projectDiv.style.display = "flex";
    this.hideAllproject();
  }

  closeTask() {
    const currentTodo = document.getElementById(this.buttoID + "-card");
    currentTodo.style.display = "none";
    this.hideAllproject();
    this.showAllprojects();
  }

  deleteProject() {
    const projectButton = this.buttoElement;
    const projectCard = document.getElementById(this.buttoID + "-card");
    const projectArea = document.getElementById("projectArea");

    // Remove project button and card from DOM
    if (projectButton && projectButton.parentNode) {
      projectButton.parentNode.removeChild(projectButton);
    }
    if (projectCard && projectCard.parentNode) {
      projectCard.parentNode.removeChild(projectCard);
    }

    // Remove from project buttons array and save to localStorage
    const projectButtonsArray = appInitializer.getProjectButtonsArray();
    const projectIndex = projectButtonsArray.findIndex(
      (project) => project.id === this.buttoID
    );
    if (projectIndex > -1) {
      projectButtonsArray.splice(projectIndex, 1);
      storageManager.saveProjectButtons(projectButtonsArray);
    }

    // Remove all tasks associated with this project from projectArray
    const tasksToRemove = projectArray.filter(
      (task) => task.PID === this.buttoID
    );
    tasksToRemove.forEach((task) => {
      const taskIndex = projectArray.findIndex((t) => t.id === task.id);
      if (taskIndex > -1) {
        projectArray.splice(taskIndex, 1);
      }
    });

    // Save updated project tasks to localStorage
    storageManager.saveProjectTasks(projectArray);

    // Show all remaining projects
    this.showAllprojects();

    console.log(`Project ${this.buttoID} deleted successfully`);
  }
  projectTaskform() {
    const projectDiv = document.getElementById(this.buttoID + "-card");
    const addTasksBtn = projectDiv.querySelector(".add-tasks-btn");
    // Pass the project button (this.buttoElement) instead of the add tasks button
    const newProjecttask = new createTaskform(this.buttoElement);
    newProjecttask.createnewTaskform();
  }

  hideAllproject() {
    const alltodosArray = document.querySelectorAll(".mainProject");
    if (!alltodosArray) {
      return;
    }
    alltodosArray.forEach((todos) => {
      todos.style.display = "none";
    });
  }
  showAllprojects() {
    const alltodosArray = document.querySelectorAll(".mainProject");
    if (!alltodosArray) {
      return;
    }
    alltodosArray.forEach((todos) => {
      todos.style.display = "flex";
    });
  }
}

export default Handlerpoject;
