import "./styles.css";
import CreateTodo from "./CreateTodo.js";
import { add } from "date-fns";

class createTaskform {
  constructor(buttoElement) {
    this.buttoElement = buttoElement;
    this.buttoID = buttoElement.id;
    console.log(this.buttoID);
  }
  createnewTaskform() {
    //close
    const addtodoButton = document.getElementById("createTask");
    addtodoButton.style.display = "none";
    const addprojectButton = document.getElementById("createProject");
    addprojectButton.style.display = "none";

    // Create form element
    const form = document.createElement("form");
    form.classList.add("task-form");
    const taskDiv = document.getElementById("taskForm");
    // Create input for task title
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "taskName";

    titleInput.placeholder = "Enter task title";
    titleInput.required = true;

    const closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = "&times;";

    // <span class="close">&times;</span>;
    // Due date
    const dueDate = document.createElement("input");
    dueDate.id = "dueDate";
    dueDate.type = "date";
    dueDate.placeholder = "DueDate";
    dueDate.required = true;

    //priority
    const priority = document.createElement("select");
    priority.id = "priority";
    priority.placeholder = "Priority";

    const priorityOption = ["Low", "Medium", "High"];
    priorityOption.forEach((options) => {
      const option = document.createElement("option");
      option.value = options.toLowerCase();
      option.textContent = options;
      priority.appendChild(option);
    });
    //notes

    const notes = document.createElement("input");
    notes.type = "text";
    notes.id = "notes";
    notes.placeholder = "Notes";

    // Create submit button
    const submitButton = document.createElement("button");

    if (this.buttoID === "createTask") {
      submitButton.id = "Addtodo-Submit";
    } else if (this.buttoID.startsWith("PID:")) {
      // This is a project task
      submitButton.id = "Project-Submit";
    } else {
      submitButton.id = "Project-Submit";
    }
    submitButton.type = "submit";
    submitButton.textContent = "Add Task";

    // Append elements to form
    form.appendChild(titleInput);
    form.appendChild(dueDate);
    form.appendChild(priority);
    form.append(notes);
    form.appendChild(submitButton);
    form.appendChild(closeButton);

    taskDiv.appendChild(form);
    form.style.display = "flex";

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (submitButton.id === "Addtodo-Submit") {
        const TID = crypto.randomUUID();
        const taskName = titleInput.value;
        const taskDueDate = dueDate.value;
        const taskPriority = priority.value;
        const taskNotes = notes.value;

        const newTask = new CreateTodo(
          TID,
          taskName,
          taskDueDate,
          taskPriority,
          taskNotes
        );

        newTask.addTodos();
        newTask.addtoDOM(this.buttoID);
        console.log("Task created:", newTask);
        form.reset();

        form.style.display = "none";
        addtodoButton.style.display = "block";
        addprojectButton.style.display = "block";
      } else {
        //handle Project and it's Task
        const PID = this.buttoID;
        const TID = crypto.randomUUID();
        const taskName = titleInput.value;
        const taskDueDate = dueDate.value;
        const taskPriority = priority.value;
        const taskNotes = notes.value;

        const newTask = new CreateTodo(
          TID,
          taskName,
          taskDueDate,
          taskPriority,
          taskNotes
        );

        newTask.addProjecttodo(this.buttoID);
        newTask.addtoDOM(this.buttoID);
        form.reset();
        form.style.display = "none";
        addtodoButton.style.display = "block";
        addprojectButton.style.display = "block";
      }
    });
    closeButton.addEventListener("click", function (event) {
      form.style.display = "none";
      addtodoButton.style.display = "block";
      addprojectButton.style.display = "block";
    });
  }
}

export default createTaskform;
