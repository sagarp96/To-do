import "./styles.css";
import newTaskform from "./taskForm.js";
import HandleTodo from "./HandleTodos.js";
import newProjectform from "./CreateProject.js";
import Handlerpoject from "./handleProject.js";
import HandleprojectTodo from "./Handle_Project_tasks.js";
import appInitializer from "./appInit.js";

// Initialize the app with stored data on page load
document.addEventListener("DOMContentLoaded", () => {
  appInitializer.init();
});

const addTask = document.getElementById("createTask");
addTask.addEventListener("click", (event) => {
  const todoPopup = new newTaskform(event.target);
  todoPopup.createnewTaskform();
});

// Event delegation - listen on parent container
const todoArea = document.getElementById("todoArea");
todoArea.addEventListener("click", (event) => {
  // Check if clicked element has the specific class
  if (event.target.classList.contains("todoTaskbutton")) {
    const todohandler = new HandleTodo(event.target);
    todohandler.showTodo();
  }
});

const addProject = document.getElementById("createProject");
addProject.addEventListener("click", newProjectform);

const projectArea = document.getElementById("projectArea");
projectArea.addEventListener("click", (event) => {
  // Check if clicked element has the specific class
  if (event.target.classList.contains("mainProject")) {
    const handleProject = new Handlerpoject(event.target);
    handleProject.ifTaskexist();
  }
  //checking for CloseButtonCLICk
  else if (event.target.classList.contains("close-project-btn")) {
    const projectCard = event.target.closest(".ProjectCard");
    if (projectCard) {
      const projectID = projectCard.id.replace("-card", "");
      const projectButton = document.getElementById(projectID);
      if (projectButton) {
        const handleProject = new Handlerpoject(projectButton);
        handleProject.closeTask();
      }
    }
  } else if (event.target.classList.contains("add-tasks-btn")) {
    const projectCard = event.target.closest(".ProjectCard");
    if (projectCard) {
      const projectId = projectCard.id.replace("-card", "");
      const projectButton = document.getElementById(projectId);
      if (projectButton) {
        const handleProject = new Handlerpoject(projectButton);
        handleProject.projectTaskform();
      }
    }
  }
  // Handle delete project buttons
  else if (event.target.classList.contains("delete-project-btn")) {
    const projectCard = event.target.closest(".ProjectCard");
    if (projectCard) {
      const projectId = projectCard.id.replace("-card", "");
      const projectButton = document.getElementById(projectId);
      if (projectButton) {
        const handleProject = new Handlerpoject(projectButton);
        handleProject.deleteProject();
      }
    }
  } else if (event.target.classList.contains("ProjectTaskbutton")) {
    const projectCard = event.target.closest(".ProjectCard");
    if (projectCard) {
      const projectId = projectCard.id.replace("-card", "");
      const projectButton = document.getElementById(projectId);
      const Handle_Project_tasks = new HandleprojectTodo(
        event.target,
        projectButton
      );
      Handle_Project_tasks.showTaskdetails();
    }
    //Project-task-cancel
  } else if (event.target.classList.contains("projecttask_CLS_BTN")) {
    const projectCard = event.target.closest(".ProjectCard");
    if (projectCard) {
      const projectId = projectCard.id.replace("-card", "");
      const projectButton = document.getElementById(projectId);
      const Handle_Project_tasks = new HandleprojectTodo(
        event.target,
        projectButton
      );
      Handle_Project_tasks.clsoePorjectTask();
    }
  } else if (event.target.classList.contains("projecttask_DLT_BTN")) {
    const projectCard = event.target.closest(".ProjectCard");
    if (projectCard) {
      const projectId = projectCard.id.replace("-card", "");
      const projectButton = document.getElementById(projectId);
      const Handle_Project_tasks = new HandleprojectTodo(
        event.target,
        projectButton
      );
      Handle_Project_tasks.deleteProjectTask();
    }
  }
});
