// Storage Manager for Todo List App
class StorageManager {
  constructor() {
    this.keys = {
      TODOS: "todoList_todos",
      PROJECT_TASKS: "todoList_projectTasks",
      PROJECT_BUTTONS: "todoList_projectButtons",
    };
  }

  // Generic methods for localStorage operations
  save(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
      console.log(`Saved ${key}:`, data);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  }

  load(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return [];
    }
  }

  // Specific methods for todos
  saveTodos(todosArray) {
    this.save(this.keys.TODOS, todosArray);
  }

  loadTodos() {
    return this.load(this.keys.TODOS);
  }

  // Specific methods for project tasks
  saveProjectTasks(projectTasksArray) {
    this.save(this.keys.PROJECT_TASKS, projectTasksArray);
  }

  loadProjectTasks() {
    return this.load(this.keys.PROJECT_TASKS);
  }

  // Specific methods for project buttons
  saveProjectButtons(projectButtonsArray) {
    this.save(this.keys.PROJECT_BUTTONS, projectButtonsArray);
  }

  loadProjectButtons() {
    return this.load(this.keys.PROJECT_BUTTONS);
  }

  // Clear all data (useful for debugging)
  clearAll() {
    try {
      localStorage.removeItem(this.keys.TODOS);
      localStorage.removeItem(this.keys.PROJECT_TASKS);
      localStorage.removeItem(this.keys.PROJECT_BUTTONS);
      console.log("All localStorage data cleared");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  // Debug method to view all stored data
  viewAll() {
    console.log("=== LocalStorage Debug Info ===");
    console.log("Todos:", this.loadTodos());
    console.log("Project Tasks:", this.loadProjectTasks());
    console.log("Project Buttons:", this.loadProjectButtons());
    console.log("==============================");
  }
}

// Create and export a singleton instance
const storageManager = new StorageManager();
export default storageManager;
