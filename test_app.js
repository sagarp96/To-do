// Simple test script to check app functionality
// Run this in browser console

// Test 1: Check if required elements exist
function testDOMElements() {
  console.log("=== DOM Elements Test ===");
  const createTaskBtn = document.getElementById("createTask");
  const createProjectBtn = document.getElementById("createProject");
  const todoArea = document.getElementById("todoArea");
  const projectArea = document.getElementById("projectArea");

  console.log("Create Task Button:", createTaskBtn ? "✓ Found" : "✗ Missing");
  console.log(
    "Create Project Button:",
    createProjectBtn ? "✓ Found" : "✗ Missing"
  );
  console.log("Todo Area:", todoArea ? "✓ Found" : "✗ Missing");
  console.log("Project Area:", projectArea ? "✓ Found" : "✗ Missing");

  return createTaskBtn && createProjectBtn && todoArea && projectArea;
}

// Test 2: Check if event listeners are attached
function testEventListeners() {
  console.log("=== Event Listeners Test ===");
  const createTaskBtn = document.getElementById("createTask");

  if (createTaskBtn) {
    // Simulate a click
    try {
      createTaskBtn.click();
      console.log("Create Task Click: ✓ No errors");

      // Check if form appeared
      const taskForm = document.getElementById("taskForm");
      if (taskForm && taskForm.children.length > 0) {
        console.log("Task Form Creation: ✓ Form appeared");
        return true;
      } else {
        console.log("Task Form Creation: ✗ Form did not appear");
        return false;
      }
    } catch (error) {
      console.log("Create Task Click: ✗ Error:", error);
      return false;
    }
  }
  return false;
}

// Test 3: Check localStorage functionality
function testLocalStorage() {
  console.log("=== LocalStorage Test ===");
  try {
    // Test if localStorage is available
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    console.log("LocalStorage Access: ✓ Working");

    // Check existing data
    const todos = localStorage.getItem("todoList_todos");
    const projects = localStorage.getItem("todoList_projectButtons");
    const projectTasks = localStorage.getItem("todoList_projectTasks");

    console.log("Stored Todos:", todos ? JSON.parse(todos) : "None");
    console.log("Stored Projects:", projects ? JSON.parse(projects) : "None");
    console.log(
      "Stored Project Tasks:",
      projectTasks ? JSON.parse(projectTasks) : "None"
    );

    return true;
  } catch (error) {
    console.log("LocalStorage Access: ✗ Error:", error);
    return false;
  }
}

// Run all tests
function runAllTests() {
  console.log("🧪 Starting App Functionality Tests...\n");

  const domTest = testDOMElements();
  console.log("");

  const eventTest = testEventListeners();
  console.log("");

  const storageTest = testLocalStorage();
  console.log("");

  console.log("=== Test Summary ===");
  console.log("DOM Elements:", domTest ? "✓ PASS" : "✗ FAIL");
  console.log("Event Listeners:", eventTest ? "✓ PASS" : "✗ FAIL");
  console.log("LocalStorage:", storageTest ? "✓ PASS" : "✗ FAIL");

  if (domTest && eventTest && storageTest) {
    console.log("\n🎉 All tests passed! App should be working.");
  } else {
    console.log("\n❌ Some tests failed. Check the details above.");
  }
}

// Make functions available globally
window.testDOMElements = testDOMElements;
window.testEventListeners = testEventListeners;
window.testLocalStorage = testLocalStorage;
window.runAllTests = runAllTests;

console.log(
  "Test functions loaded. Run runAllTests() to check app functionality."
);
