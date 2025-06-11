import "./styles.css";
import storageManager from "./storage.js";
import appInitializer from "./appInit.js";

function projectForm() {
  const addtodoButton = document.getElementById("createTask");
  addtodoButton.style.display = "none";
  const addprojectButton = document.getElementById("createProject");
  addprojectButton.style.display = "none";

  const projectArea = document.getElementById("projectArea");
  const form = document.createElement("form");
  form.classList.add("projectForm");
  const projectdDiv = document.getElementById("projectForm");
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "taskName";
  titleInput.placeholder = "Enter Project title";
  titleInput.required = true;
  //Cancel
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.id = "newProjectcancel";
  cancelButton.innerText = "Cancel";
  const addProjectButton = document.createElement("button");
  addProjectButton.type = "submit";
  addProjectButton.id = "addProjectButton";
  addProjectButton.innerText = "Add Project";
  form.appendChild(titleInput);

  form.appendChild(addProjectButton);
  form.appendChild(cancelButton);
  projectdDiv.appendChild(form);

  form.addEventListener("submit", function (event) {
    //This is important, because it will prevent the default browser Function

    event.preventDefault();

    const projectId = "PID:" + crypto.randomUUID();
    const projectName = titleInput.value;

    const projectButton = document.createElement("button");
    projectButton.id = projectId;
    projectButton.innerText = projectName;
    projectButton.className = "mainProject";
    projectArea.appendChild(projectButton);

    // Create project card
    createProjectCard(projectId, projectName);

    // Save project button data to localStorage
    const projectButtonsArray = appInitializer.getProjectButtonsArray();
    const projectData = {
      id: projectId,
      name: projectName,
    };
    projectButtonsArray.push(projectData);
    storageManager.saveProjectButtons(projectButtonsArray);

    titleInput.value = "";
    addtodoButton.style.display = "block";
    addprojectButton.style.display = "block";
    form.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    form.style.display = "none";
    addtodoButton.style.display = "block";
    addprojectButton.style.display = "block";
  });
}

function createProjectCard(projectId, projectName) {
  const projectArea = document.getElementById("projectArea");
  const projectCard = document.createElement("div");
  projectCard.id = projectId + "-card";
  projectCard.classList.add("ProjectCard");
  projectCard.style.display = "none";

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("project-card-header");

  const projectTitle = document.createElement("h3");
  projectTitle.textContent = projectName;
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

  projectArea.appendChild(projectCard);
}

export default projectForm;
