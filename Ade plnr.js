// Select the HTML elements
const taskInputs = document.querySelectorAll("input");
const addButtons = document.querySelectorAll(".add-btn");
const taskList = document.getElementById("task-list");

const allButton = document.getElementById("all-btn");
const activeButton = document.getElementById("active-btn");
const completedButton = document.getElementById("completed-btn");
const deleteButton = document.getElementById("delete-btn");

// Store all tasks
let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}

// Display tasks on the page
function displayTasks(filter = "all") {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "active" && task.completed) return;
        if (filter === "completed" && !task.completed) return;

        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        // Task checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks(filter);
        });

        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        // Delete individual task
        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.textContent = "Delete";

        deleteTaskButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks(filter);
        });

        // Add elements to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteTaskButton);

        taskList.appendChild(taskItem);
    });
}

// Add a new task
function addTask(input) {
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task first!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    input.value = "";

    displayTasks();
}

// Connect each Add button to its input
addButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
        addTask(taskInputs[index]);
    });
});

// Show all tasks
allButton.addEventListener("click", function () {
    displayTasks("all");
});

// Show active tasks
activeButton.addEventListener("click", function () {
    displayTasks("active");
});

// Show completed tasks
completedButton.addEventListener("click", function () {
    displayTasks("completed");
});

// Delete all tasks
deleteButton.addEventListener("click", function () {
    if (tasks.length === 0) {
        alert("There are no tasks to delete!");
        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmDelete) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
});

// Display saved tasks when the page loads
displayTasks();

// Contact Form Validation//

// Select the contact form
const contactForm = document.querySelector("form");

// Listen for form submission
contactForm.addEventListener("submit", function (event) {

    // Prevent the form from submitting immediately
    event.preventDefault();

    // Get the values entered by the user
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const message = document.querySelector("#message").value.trim();

    // Check whether any field is empty
    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Error: Please fill in all fields.");
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Error: Please enter a valid email address.");
        return;
    }

    // Validate phone number (digits only)
    const phonePattern = /^\d+$/;

    if (!phonePattern.test(phone)) {
        alert("Error: Phone number must contain digits only.");
        return;
    }

    // Display success message
    alert("Success! Your contact form has been validated.");

    // Reset the form
    contactForm.reset();
});