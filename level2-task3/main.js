const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date-input");
const addTaskBtn = document.getElementById("add-task-btn");
const pendingTasksList = document.getElementById("pending-tasks");
const completedTasksList = document.getElementById("completed-tasks");

function createTaskElement(task, isCompleted = false) {
  const li = document.createElement("li");

  const taskText = document.createElement("div");
  taskText.className = "task";
  taskText.innerHTML = `<strong>${task.text}</strong>`;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML = `Created: ${task.created} | Due: ${task.due}`;

  const buttonRow = document.createElement("div");
  buttonRow.className = "btn-row";

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.textContent = isCompleted ? "Undo" : "Complete";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  // Append
  buttonRow.appendChild(completeBtn);
  buttonRow.appendChild(editBtn);
  buttonRow.appendChild(deleteBtn);

  li.appendChild(taskText);
  li.appendChild(meta);
  li.appendChild(buttonRow);

  // Events
  completeBtn.addEventListener("click", () => toggleTaskComplete(task, li));
  editBtn.addEventListener("click", () => editTask(task, taskText, meta));
  deleteBtn.addEventListener("click", () => li.remove());

  return li;
}

function addTask() {
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!text || !dueDate) {
    alert("Please enter both task and due date.");
    return;
  }

  const task = {
    text,
    due: new Date(dueDate).toLocaleDateString(),
    created: new Date().toLocaleString()
  };

  const taskEl = createTaskElement(task);
  pendingTasksList.appendChild(taskEl);

  taskInput.value = "";
  dueDateInput.value = "";
}

function toggleTaskComplete(task, taskEl) {
  if (taskEl.parentNode === pendingTasksList) {
    completedTasksList.appendChild(taskEl);
  } else {
    pendingTasksList.appendChild(taskEl);
  }
}

function editTask(task, taskTextDiv, metaDiv) {
  const newText = prompt("Edit task", task.text);
  const newDue = prompt("Edit due date (YYYY-MM-DD)", new Date(task.due).toISOString().split('T')[0]);

  if (newText && newDue) {
    task.text = newText;
    task.due = new Date(newDue).toLocaleDateString();

    taskTextDiv.innerHTML = `<strong>${task.text}</strong>`;
    metaDiv.innerHTML = `Created: ${task.created} | Due: ${task.due}`;
  }
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
