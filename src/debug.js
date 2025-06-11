// Debug functions for testing localStorage functionality
// Add this to your browser console or create a separate debug script

// Function to view all localStorage data
function debugStorage() {
  console.log("=== LocalStorage Debug Info ===");
  console.log(
    "Todos:",
    JSON.parse(localStorage.getItem("todoList_todos") || "[]")
  );
  console.log(
    "Project Tasks:",
    JSON.parse(localStorage.getItem("todoList_projectTasks") || "[]")
  );
  console.log(
    "Project Buttons:",
    JSON.parse(localStorage.getItem("todoList_projectButtons") || "[]")
  );
  console.log("==============================");
}

// Function to clear all localStorage data
function clearStorage() {
  localStorage.removeItem("todoList_todos");
  localStorage.removeItem("todoList_projectTasks");
  localStorage.removeItem("todoList_projectButtons");
  console.log("All localStorage data cleared");
  // Reload page to see changes
  location.reload();
}

// Function to add sample data for testing
function addSampleData() {
  const sampleTodos = [
    {
      id: "sample-todo-1",
      name: "Sample Todo 1",
      dueDate: "2024-12-25",
      priority: "High",
      notes: "This is a sample todo for testing",
    },
  ];

  const sampleProjectButtons = [
    {
      id: "PID:sample-project-1",
      name: "Sample Project",
    },
  ];

  const sampleProjectTasks = [
    {
      PID: "PID:sample-project-1",
      id: "sample-project-task-1",
      name: "Sample Project Task",
      dueDate: "2024-12-30",
      priority: "Medium",
      notes: "This is a sample project task",
    },
  ];

  localStorage.setItem("todoList_todos", JSON.stringify(sampleTodos));
  localStorage.setItem(
    "todoList_projectButtons",
    JSON.stringify(sampleProjectButtons)
  );
  localStorage.setItem(
    "todoList_projectTasks",
    JSON.stringify(sampleProjectTasks)
  );

  console.log("Sample data added to localStorage");
  // Reload page to see changes
  location.reload();
}

// Export functions for use in browser console
window.debugStorage = debugStorage;
window.clearStorage = clearStorage;
window.addSampleData = addSampleData;

console.log("Debug functions loaded! Available functions:");
console.log("- debugStorage() - View all stored data");
console.log("- clearStorage() - Clear all stored data");
console.log("- addSampleData() - Add sample data for testing");
