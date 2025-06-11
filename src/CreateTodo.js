import storageManager from "./storage.js";

const MyTodosarray = [];
const projectArray = [];

class CreateTodo {
  constructor(id, name, dueDate, priority, notes) {
    // the constructor...will only have the properties
    this.id = id;
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }

  addTodos() {
    const tododetails = {
      id: this.id,
      name: this.name,
      dueDate: this.dueDate,
      priority: this.priority,
      notes: this.notes,
    };
    MyTodosarray.push(tododetails);
    console.log("Current Tasklist:", MyTodosarray);

    // Save to localStorage after adding
    storageManager.saveTodos(MyTodosarray);
  }
  addProjecttodo(PID) {
    const projectTodo = {
      PID: PID,
      id: this.id,
      name: this.name,
      dueDate: this.dueDate,
      priority: this.priority,
      notes: this.notes,
    };
    projectArray.push(projectTodo);
    console.log("Current ProjectTask:", projectArray);

    // Save to localStorage after adding
    storageManager.saveProjectTasks(projectArray);
  }

  addtoDOM = (ID) => {
    if (ID && ID.includes("PID")) {
      // This is a project task
      const projectCardID = ID + "-card";
      const ProjectDiv = document.getElementById(projectCardID);
      if (!ProjectDiv) {
        console.error(`Project container with ID ${projectCardID} not found`);
        return;
      }
      const ProjectButton = document.createElement("button");
      ProjectButton.id = this.id;
      ProjectButton.classList.add("ProjectTaskbutton");
      ProjectButton.innerText = this.name;
      ProjectDiv.appendChild(ProjectButton);
    } else {
      // This is a regular todo
      const todoDiv = document.getElementById("todoArea");
      const taskButton = document.createElement("button");
      taskButton.id = this.id;
      taskButton.classList.add("todoTaskbutton");
      taskButton.innerText = this.name;
      todoDiv.appendChild(taskButton);
    }
  };
}

//add task to DOM
export { MyTodosarray };
export { projectArray };
export default CreateTodo;
