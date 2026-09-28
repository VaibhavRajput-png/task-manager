const API_URL = "/api/tasks";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Fetch tasks
async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
        displayTask(task);
    });
}

// Display task
function displayTask(task) {
    const li = document.createElement("li");

    if (task.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${task.title}</span>

        <div>
            <button onclick="toggleTask(${task.id}, ${task.completed})">
                ${task.completed ? "Undo" : "Done"}
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        </div>
    `;

    taskList.appendChild(li);
}

// Add task
taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) {
        return;
    }

    await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title
        })
    });

    taskInput.value = "";

    loadTasks();
});

// Toggle task
async function toggleTask(id, completed) {

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            completed: !completed
        })
    });

    loadTasks();
}

// Delete task
async function deleteTask(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();