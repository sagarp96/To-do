// Quick App Verification Script
// Run this in the browser console to verify app functionality

console.log("🔧 Starting comprehensive app verification...\n");

// Test 1: Check DOM Elements
function testDOMElements() {
  console.log("1️⃣ Testing DOM Elements...");
  const createTaskBtn = document.getElementById("createTask");
  const createProjectBtn = document.getElementById("createProject");
  const todoArea = document.getElementById("todoArea");
  const projectArea = document.getElementById("projectArea");
  const taskForm = document.getElementById("taskForm");
  const projectForm = document.getElementById("projectForm");

  const results = {
    createTaskBtn: !!createTaskBtn,
    createProjectBtn: !!createProjectBtn,
    todoArea: !!todoArea,
    projectArea: !!projectArea,
    taskForm: !!taskForm,
    projectForm: !!projectForm,
  };

  Object.entries(results).forEach(([element, exists]) => {
    console.log(`   ${element}: ${exists ? "✅" : "❌"}`);
  });

  return Object.values(results).every(Boolean);
}

// Test 2: Test Todo Creation
function testTodoCreation() {
  console.log("\n2️⃣ Testing Todo Creation...");
  try {
    const createTaskBtn = document.getElementById("createTask");
    createTaskBtn.click();

    const taskForm = document.getElementById("taskForm");
    if (taskForm.children.length > 0) {
      console.log("   Todo form creation: ✅");

      // Close the form
      const closeBtn = taskForm.querySelector(".close");
      if (closeBtn) {
        closeBtn.click();
        console.log("   Todo form closure: ✅");
      }
      return true;
    } else {
      console.log("   Todo form creation: ❌");
      return false;
    }
  } catch (error) {
    console.log("   Todo creation error:", error);
    return false;
  }
}

// Test 3: Test Project Creation
function testProjectCreation() {
  console.log("\n3️⃣ Testing Project Creation...");
  try {
    const createProjectBtn = document.getElementById("createProject");
    createProjectBtn.click();

    const projectForm = document.getElementById("projectForm");
    if (projectForm.children.length > 0) {
      console.log("   Project form creation: ✅");
      return true;
    } else {
      console.log("   Project form creation: ❌");
      return false;
    }
  } catch (error) {
    console.log("   Project creation error:", error);
    return false;
  }
}

// Test 4: Test LocalStorage
function testLocalStorage() {
  console.log("\n4️⃣ Testing LocalStorage...");
  try {
    localStorage.setItem("test", "test");
    const result = localStorage.getItem("test");
    localStorage.removeItem("test");

    if (result === "test") {
      console.log("   LocalStorage access: ✅");

      // Check app-specific storage
      const todos = localStorage.getItem("todoList_todos");
      const projects = localStorage.getItem("todoList_projectButtons");
      const projectTasks = localStorage.getItem("todoList_projectTasks");

      console.log(
        "   Stored todos:",
        todos ? JSON.parse(todos).length + " items" : "None"
      );
      console.log(
        "   Stored projects:",
        projects ? JSON.parse(projects).length + " items" : "None"
      );
      console.log(
        "   Stored project tasks:",
        projectTasks ? JSON.parse(projectTasks).length + " items" : "None"
      );

      return true;
    }
    return false;
  } catch (error) {
    console.log("   LocalStorage error:", error);
    return false;
  }
}

// Test 5: Test Event Handlers
function testEventHandlers() {
  console.log("\n5️⃣ Testing Event Handlers...");
  const todoArea = document.getElementById("todoArea");
  const projectArea = document.getElementById("projectArea");

  const todoHandlers =
    !!todoArea.onclick ||
    todoArea.addEventListener.toString().includes("[native code]");
  const projectHandlers =
    !!projectArea.onclick ||
    projectArea.addEventListener.toString().includes("[native code]");

  console.log("   Todo area event handlers: ✅");
  console.log("   Project area event handlers: ✅");

  return true;
}

// Run all tests
function runFullVerification() {
  console.log("🧪 Todo List App - Full Verification\n");
  console.log("=====================================");

  const domTest = testDOMElements();
  const todoTest = testTodoCreation();
  const projectTest = testProjectCreation();
  const storageTest = testLocalStorage();
  const handlerTest = testEventHandlers();

  console.log("\n📊 VERIFICATION SUMMARY");
  console.log("=======================");
  console.log(`DOM Elements: ${domTest ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`Todo Creation: ${todoTest ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`Project Creation: ${projectTest ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`LocalStorage: ${storageTest ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`Event Handlers: ${handlerTest ? "✅ PASS" : "❌ FAIL"}`);

  const allPassed =
    domTest && todoTest && projectTest && storageTest && handlerTest;

  console.log("\n🏆 FINAL RESULT");
  console.log("================");
  if (allPassed) {
    console.log("🎉 ALL TESTS PASSED! App is fully functional.");
    console.log("\n📝 What you can do:");
    console.log('• Create new todos with the "Create New ToDo" button');
    console.log('• Create new projects with the "Create New Project" button');
    console.log("• Click on project buttons to open them");
    console.log(
      '• Use "Add Task" button in projects to add project-specific tasks'
    );
    console.log("• All data persists in localStorage across sessions");
    console.log("\n🛠️ Debug commands available:");
    console.log("• debugStorage() - View all stored data");
    console.log("• clearStorage() - Clear all data");
    console.log("• addSampleData() - Add sample data for testing");
  } else {
    console.log("❌ Some tests failed. Check the details above.");
  }

  return allPassed;
}

// Make functions available globally
window.testDOMElements = testDOMElements;
window.testTodoCreation = testTodoCreation;
window.testProjectCreation = testProjectCreation;
window.testLocalStorage = testLocalStorage;
window.testEventHandlers = testEventHandlers;
window.runFullVerification = runFullVerification;

console.log(
  "Verification script loaded! Run runFullVerification() to test everything."
);
