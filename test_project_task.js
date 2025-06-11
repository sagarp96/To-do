// Test script to verify project task functionality
// Run this in the browser console after loading the app

function testProjectTaskCreation() {
  console.log("🧪 Testing Project Task Creation...\n");

  // Step 1: Clear any existing data
  console.log("Step 1: Clearing existing data...");
  localStorage.removeItem("todoList_todos");
  localStorage.removeItem("todoList_projectButtons");
  localStorage.removeItem("todoList_projectTasks");

  // Step 2: Create a test project
  console.log("Step 2: Creating a test project...");
  const createProjectBtn = document.getElementById("createProject");
  if (createProjectBtn) {
    createProjectBtn.click();

    // Wait a moment then fill the form
    setTimeout(() => {
      const projectForm = document.querySelector(".projectForm");
      if (projectForm) {
        const titleInput = projectForm.querySelector("#taskName");
        const submitBtn = projectForm.querySelector("#addProjectButton");

        if (titleInput && submitBtn) {
          titleInput.value = "Test Project";
          submitBtn.click();

          console.log("✅ Project created: 'Test Project'");

          // Step 3: Test adding a task to the project
          setTimeout(() => {
            testAddTaskToProject();
          }, 500);
        } else {
          console.log("❌ Could not find project form elements");
        }
      } else {
        console.log("❌ Project form not found");
      }
    }, 500);
  } else {
    console.log("❌ Create Project button not found");
  }
}

function testAddTaskToProject() {
  console.log("Step 3: Testing Add Task to Project...");

  // Find the first project button
  const projectBtn = document.querySelector(".mainProject");
  if (projectBtn) {
    console.log("Found project button:", projectBtn.id, projectBtn.textContent);

    // Click to open the project
    projectBtn.click();

    setTimeout(() => {
      // Find the project card
      const projectCard = document.querySelector(".ProjectCard");
      if (projectCard) {
        console.log("Project card found:", projectCard.id);

        // Find the Add Task button
        const addTaskBtn = projectCard.querySelector(".add-tasks-btn");
        if (addTaskBtn) {
          console.log("Add Task button found");

          // Click the Add Task button
          addTaskBtn.click();

          setTimeout(() => {
            // Check if form appeared
            const taskForm = document.querySelector(".task-form");
            if (taskForm) {
              console.log("✅ Task form appeared");

              // Fill the form
              const nameInput = taskForm.querySelector("#taskName");
              const dueDateInput = taskForm.querySelector("#dueDate");
              const prioritySelect = taskForm.querySelector("#priority");
              const notesInput = taskForm.querySelector("#notes");
              const submitBtn = taskForm.querySelector("button[type='submit']");

              if (nameInput && submitBtn) {
                nameInput.value = "Test Project Task";
                if (dueDateInput) dueDateInput.value = "2025-06-15";
                if (prioritySelect) prioritySelect.value = "high";
                if (notesInput)
                  notesInput.value = "This is a test project task";

                console.log("Form filled. Submit button ID:", submitBtn.id);

                // Submit the form
                submitBtn.click();

                setTimeout(() => {
                  verifyProjectTaskCreation(projectBtn.id);
                }, 500);
              } else {
                console.log("❌ Could not find form elements");
              }
            } else {
              console.log("❌ Task form did not appear");
            }
          }, 500);
        } else {
          console.log("❌ Add Task button not found");
        }
      } else {
        console.log("❌ Project card not found");
      }
    }, 500);
  } else {
    console.log("❌ No project button found");
  }
}

function verifyProjectTaskCreation(projectId) {
  console.log("Step 4: Verifying project task creation...");

  // Check if task button was created in the project card
  const projectCard = document.getElementById(projectId + "-card");
  if (projectCard) {
    const taskButtons = projectCard.querySelectorAll(".ProjectTaskbutton");
    console.log(`Found ${taskButtons.length} task buttons in project`);

    if (taskButtons.length > 0) {
      console.log("✅ Project task button created successfully!");
      console.log("Task button ID:", taskButtons[0].id);
      console.log("Task button text:", taskButtons[0].textContent);

      // Check localStorage
      const storedProjectTasks = JSON.parse(
        localStorage.getItem("todoList_projectTasks") || "[]"
      );
      console.log("Stored project tasks:", storedProjectTasks);

      if (storedProjectTasks.length > 0) {
        console.log("✅ Project task saved to localStorage!");
        console.log("Task data:", storedProjectTasks[0]);

        // Final verification
        if (storedProjectTasks[0].PID === projectId) {
          console.log(
            "🎉 SUCCESS: Project task was correctly added to the project!"
          );
          console.log("✅ Task is associated with correct project ID");

          // Check if task appears in todo area (should NOT happen)
          const todoArea = document.getElementById("todoArea");
          const todoButtons = todoArea.querySelectorAll(".todoTaskbutton");
          console.log(
            `Todo area has ${todoButtons.length} buttons (should be 0 for project tasks)`
          );

          if (todoButtons.length === 0) {
            console.log("✅ PERFECT: Task was NOT added to todo area");
            console.log(
              "\n🏆 ALL TESTS PASSED! The 'Add Task' button is working correctly!"
            );
          } else {
            console.log(
              "⚠️ WARNING: Task may have been added to todo area as well"
            );
          }
        } else {
          console.log("❌ ERROR: Task has wrong project ID");
        }
      } else {
        console.log("❌ ERROR: Task not saved to localStorage");
      }
    } else {
      console.log("❌ ERROR: No task button created in project");

      // Check if task was incorrectly added to todo area
      const todoArea = document.getElementById("todoArea");
      const todoButtons = todoArea.querySelectorAll(".todoTaskbutton");
      console.log(`Checking todo area: found ${todoButtons.length} buttons`);

      if (todoButtons.length > 0) {
        console.log(
          "❌ ERROR: Task was incorrectly added to todo area instead of project!"
        );
        console.log("This indicates the bug is still present");
      }
    }
  } else {
    console.log("❌ Project card not found");
  }
}

// Add cleanup function
function cleanup() {
  console.log("🧹 Cleaning up test data...");
  localStorage.removeItem("todoList_todos");
  localStorage.removeItem("todoList_projectButtons");
  localStorage.removeItem("todoList_projectTasks");
  location.reload();
}

// Make functions available globally
window.testProjectTaskCreation = testProjectTaskCreation;
window.cleanup = cleanup;

console.log("🧪 Project Task Test Script Loaded!");
console.log("Run testProjectTaskCreation() to start the test");
console.log("Run cleanup() to clear test data and reload");
