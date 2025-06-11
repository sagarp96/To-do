// App Initializer - Restores data from localStorage on page load
import storageManager from "./storage.js";
import CreateTodo, { MyTodosarray, projectArray } from "./CreateTodo.js";

class AppInitializer {
  constructor() {
    this.projectButtonsArray = [];
  }

  // Initialize the app by restoring all data from localStorage
  init() {
    console.log("Initializing app with stored data...");

    // Load and restore todos
    this.restoreTodos();

    // Load and restore project buttons
    this.restoreProjectButtons();

    // Load and restore project tasks
    this.restoreProjectTasks();
    this.populatesampleArray();
    console.log("App initialization complete");
  }
  // Restore todos from localStorage
  restoreTodos() {
    const storedTodos = storageManager.loadTodos();

    // Clear current array and populate with stored data
    MyTodosarray.length = 0;
    MyTodosarray.push(...storedTodos);

    // Recreate todo buttons in DOM
    storedTodos.forEach((todo) => {
      this.createTodoButton(todo);
    });

    console.log(`Restored ${storedTodos.length} todos`);
  }

  // Restore project buttons from localStorage
  restoreProjectButtons() {
    const storedProjectButtons = storageManager.loadProjectButtons();

    // Clear current array and populate with stored data
    this.projectButtonsArray.length = 0;
    this.projectButtonsArray.push(...storedProjectButtons);

    // Recreate project buttons and cards in DOM
    storedProjectButtons.forEach((project) => {
      this.createProjectButton(project);
    });

    console.log(`Restored ${storedProjectButtons.length} project buttons`);
  }

  // Restore project tasks from localStorage
  restoreProjectTasks() {
    const storedProjectTasks = storageManager.loadProjectTasks();
    console.log(projectArray);
    // Clear current array and populate with stored data
    projectArray.length = 0;
    projectArray.push(...storedProjectTasks);

    // Recreate project task buttons in DOM
    storedProjectTasks.forEach((task) => {
      this.createProjectTaskButton(task);
    });

    console.log(`Restored ${storedProjectTasks.length} project tasks`);
  }

  // Helper method to create todo button in DOM
  createTodoButton(todo) {
    const todoDiv = document.getElementById("todoArea");
    if (!todoDiv) return;

    const taskButton = document.createElement("button");
    taskButton.id = todo.id;
    taskButton.classList.add("todoTaskbutton");
    taskButton.innerText = todo.name;
    todoDiv.appendChild(taskButton);
  }

  // Helper method to create project button and card in DOM
  createProjectButton(project) {
    const projectDiv = document.getElementById("projectArea");
    if (!projectDiv) return;

    // Create project button
    const projectButton = document.createElement("button");
    projectButton.id = project.id;
    projectButton.classList.add("mainProject");
    projectButton.innerText = project.name;
    projectDiv.appendChild(projectButton);

    // Create corresponding project card
    this.createProjectCard(project);
  }

  // Helper method to create project card in DOM
  createProjectCard(project) {
    const projectCard = document.createElement("div");
    projectCard.id = project.id + "-card";
    projectCard.classList.add("ProjectCard");
    projectCard.style.display = "none";

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("project-card-header");

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = project.name;
    projectTitle.classList.add("project-title");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("project-buttons");

    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("add-tasks-btn");
    addTaskBtn.textContent = "+ Add Task";

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-project-btn");
    closeBtn.textContent = "Close";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-project-btn");
    deleteBtn.textContent = "Delete Project";

    buttonContainer.appendChild(addTaskBtn);
    buttonContainer.appendChild(closeBtn);
    buttonContainer.appendChild(deleteBtn);

    cardHeader.appendChild(projectTitle);
    cardHeader.appendChild(buttonContainer);
    projectCard.appendChild(cardHeader);

    const projectDiv = document.getElementById("projectArea");
    projectDiv.appendChild(projectCard);
  }

  // Helper method to create project task button in DOM
  createProjectTaskButton(task) {
    const projectCardID = task.PID + "-card";
    const ProjectDiv = document.getElementById(projectCardID);
    if (!ProjectDiv) {
      console.error(`Project container with ID ${projectCardID} not found`);
      return;
    }

    const ProjectButton = document.createElement("button");
    ProjectButton.id = task.id;
    ProjectButton.classList.add("ProjectTaskbutton");
    ProjectButton.innerText = task.name;
    ProjectDiv.appendChild(ProjectButton);
  }

  // Getter for project buttons array (for other modules to access)
  getProjectButtonsArray() {
    return this.projectButtonsArray;
  }
  populatesampleArray() {
    const task = MyTodosarray.find(
      (todo) => todo.id === "02376c18-49af-4697-b363-dcf4556a4353"
    );
    if (!task) {
      const tododetails = {
        id: "02376c18-49af-4697-b363-dcf4556a4353",
        name: "Sample Task",
        dueDate: "2025-06-01",
        priority: "medium",
        notes: "Add some notes",
      };
      MyTodosarray.push(tododetails);
      console.log("SampleArray", MyTodosarray);
      const todoArea = document.getElementById("todoArea");
      const sampleTask = document.createElement("button");
      sampleTask.id = "02376c18-49af-4697-b363-dcf4556a4353";
      sampleTask.classList.add("todoTaskbutton");
      sampleTask.innerHTML = "Sample Task";
      todoArea.appendChild(sampleTask);
      storageManager.saveTodos(MyTodosarray);
    }
    // Save to localStorage after adding
  }
}

// Create and export a singleton instance
const appInitializer = new AppInitializer();
export default appInitializer;
