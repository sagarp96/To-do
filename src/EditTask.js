import storageManager from "./storage.js";
import CreateTodo, { MyTodosarray, projectArray } from "./CreateTodo.js";

class editTodo {
  constructor(todoarea, buttoElement) {
    this.todoarea = todoarea;
    this.buttoElement = buttoElement;
    this.taskID = buttoElement.id;
  }
  //handleTODOedit
  todoTaskedit() {
    const todoAreacard = document.getElementById(`Todotask:${this.taskID}`);

    const task = MyTodosarray.find((task) => task.id === this.taskID);
    if (!task) {
      console.error("Task not found");
      return;
    }

    todoAreacard.style.display = "none";
    //Get the details of the task

    this.createUpdateForm(task, "todo");
  }
  projectTaskedit() {
    // const PID = projectArray.filter(
    //   (task) => task.PID === this.todoarea.replace("-card", "")
    // );
    // const task = PID.find((task) => task.id === this.taskID);
    const task = projectArray.find((task) => task.id === this.taskID);

    if (!task) {
      console.error("Project task not found");
      return;
    }
    // Hide the project task details card
    // const projectTaskCard = document.getElementById(this.todoarea);
    // if (projectTaskCard) {
    //   projectTaskCard.style.display = "none";
    // }

    // Create the update form
    this.createUpdateForm(task, "project");
  }

  createUpdateForm(task, taskType) {
    const todoAreacard = document.getElementById("todoArea");
    // Create the main form div
    const updateTaskformDiv = document.createElement("div");
    updateTaskformDiv.id = "updateTaskformDiv";

    const form = document.createElement("form");
    form.classList.add("update-task-form");

    // Create input for task title
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "taskName";

    titleInput.value = task.name;
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
    dueDate.value = task.dueDate;

    //priority
    const priority = document.createElement("select");
    priority.id = "priority";
    priority.placeholder = task.priority;

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
    notes.placeholder = task.notes;

    // Create submit button

    // Create button container
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-container");

    // Create update button
    const updateButton = document.createElement("button");
    updateButton.type = "submit";
    updateButton.textContent = "Update";
    updateButton.classList.add("update-btn");

    // Create cancel button
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel-btn");

    buttonDiv.appendChild(updateButton);
    buttonDiv.appendChild(cancelButton);

    // Append all elements to form
    form.appendChild(titleInput);
    form.appendChild(notes);
    form.appendChild(dueDate);
    form.appendChild(priority);
    form.appendChild(buttonDiv);
    // Append form to main div

    updateTaskformDiv.appendChild(form);

    if (taskType === "todo") {
      todoAreacard.appendChild(updateTaskformDiv);

      // Append to appropriate parent
      cancelButton.addEventListener("click", () => {
        const todoArea = document.getElementById("todoArea");
        todoArea.removeChild(updateTaskformDiv);
        const todoAreacard = document.getElementById(`Todotask:${task.id}`);
        todoAreacard.style.display = "block";
      });

      //update Array
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get updated values from form
        const updatedTask = {
          ...task, // Spread existing task properties
          name: titleInput.value,
          notes: notes.value,
          dueDate: dueDate.value,
          priority: priority.value,
        };
        const taskIndex = MyTodosarray.findIndex((e) => e.id === task.id);

        MyTodosarray.splice(taskIndex, 1, updatedTask);
        storageManager.saveTodos(MyTodosarray);

        //update dom
        const todoArea = document.getElementById("todoArea");
        todoArea.removeChild(updateTaskformDiv);
        this.reRenderDOM(this.taskID, "TODO");
        const todoTaskCard = document.getElementById(`Todotask:${task.id}`);
        todoTaskCard.style.display = "block";
      });

      //close the update taskform
    } else if (taskType === "project") {
      const projectTodoAreacard = document.querySelectorAll(
        `.projecttaskcard[id="${this.taskID}"]`
      );

      // const updateTaskformDiv = document.getElementById("updateTaskformDiv");
      const projecttodoArea = document.getElementById(this.todoarea);

      projecttodoArea.appendChild(updateTaskformDiv);

      projectTodoAreacard.forEach((element) => {
        element.style.display = "none";
      });
      cancelButton.addEventListener("click", () => {
        // const todoArea = document.getElementById("todoArea");
        projecttodoArea.removeChild(updateTaskformDiv);
        projectTodoAreacard.forEach((element) => {
          element.style.display = "block";
        });
      });
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("THis is the task: ", task.id);

        // Get updated values from form
        const updatedProjecttask = {
          ...task, // Spread existing task properties
          name: titleInput.value,
          notes: notes.value,
          dueDate: dueDate.value,
          priority: priority.value,
        };
        // ...existing code...

        const ProjecttaskIndex = projectArray.findIndex(
          (e) => e.id === task.id
        );

        projectArray.splice(ProjecttaskIndex, 1, updatedProjecttask);
        storageManager.saveProjectTasks(projectArray);
        console.log(projectArray);
        projecttodoArea.removeChild(updateTaskformDiv);
        this.reRenderDOM(this.taskID, "PROJECT");
        projectTodoAreacard.forEach((element) => {
          element.style.display = "block";
        });
      });
    }
  }

  reRenderDOM(taskID, taskArea) {
    if (taskArea === "TODO") {
      const task = MyTodosarray.find((task) => task.id === this.taskID);
      if (!task) {
        console.error("Task not found");
        return;
      }

      // Fix the selector syntax - remove quotes around the CSS selector
      const updateTodoDiv = document.getElementById(`Todotask:${taskID}`);

      if (updateTodoDiv) {
        // Update each div with the new task data
        const nameDiv = updateTodoDiv.querySelector(".name");
        const dueDateDiv = updateTodoDiv.querySelector(".DueDate");
        const priorityDiv = updateTodoDiv.querySelector(".Duedate"); // Note: this might be a typo in your original code
        const notesDiv = updateTodoDiv.querySelector(".Notes");

        // Update the content with the new values using spread operator data
        if (nameDiv) {
          nameDiv.textContent = `TaskName: ${task.name}`;
        }
        if (dueDateDiv) {
          dueDateDiv.textContent = `DueDate: ${task.dueDate}`;
        }
        if (priorityDiv) {
          priorityDiv.textContent = `Priority: ${task.priority}`;
        }
        if (notesDiv) {
          notesDiv.textContent = `Notes: ${task.notes}`;
        }
      }
      const todoButton = document.querySelector(
        `.todoTaskbutton[id="${task.id}"]`
      );
      todoButton.innerHTML = task.name;
    } else if (taskArea === "PROJECT") {
      const task = projectArray.find((task) => task.id === this.taskID);
      if (!task) {
        console.error("Task not found");
        return;
      }

      // Handle project task updates
      const projectTask = projectArray.find((task) => task.id === this.taskID);

      if (projectTask) {
        const projectTaskCard = document.querySelector(
          `.projecttaskcard[id="${taskID}"]`
        );

        if (projectTaskCard) {
          // console.log("ProjectButtonIs", projectTasbutton);
          // Update project task card elements
          const divs = projectTaskCard.querySelectorAll("div");
          divs.forEach((div) => {
            const text = div.textContent;
            if (text.startsWith("Name:")) {
              div.textContent = `Name: ${projectTask.name}`;
            } else if (text.startsWith("Due Date:")) {
              div.textContent = `Due Date: ${projectTask.dueDate}`;
            } else if (text.startsWith("Notes:")) {
              div.textContent = `Notes: ${projectTask.notes}`;
            } else if (text.startsWith("Priority:")) {
              div.textContent = `Priority: ${projectTask.priority}`;
            }
          });
        }
        const projectTasbutton = document.querySelector(
          `.ProjectTaskbutton[id="${taskID}"]`
        );
        projectTasbutton.innerHTML = projectTask.name;
      }
    }
  }
}

export default editTodo;
