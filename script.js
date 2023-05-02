const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');

// Event Listener for adding tasks
taskForm.addEventListener('submit', addTask);

// Event Listener for deleting tasks
taskList.addEventListener('click', deleteTask);

// Event Listener for clearing all tasks
clearBtn.addEventListener('click', clearTasks);

// Event Listener for loading tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a task
function addTask(e) {
  e.preventDefault();

  if (taskInput.value.trim() === '') {
    alert('Please enter a task!');
    return;
  }

  // Create a new task item
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskInput.value}</span>
    <button class="delete-btn">Delete</button>
  `;
  taskList.appendChild(li);

  // Save task to local storage
  saveTaskToLocalStorage(taskInput.value);

  // Clear the input field
  taskInput.value = '';
}

// Function to delete a task
function deleteTask(e) {
  if (e.target.classList.contains('delete-btn')) {
    if (confirm('Are you sure you want to delete this task?')) {
      const li = e.target.parentElement;
      taskList.removeChild(li);

      // Delete task from local storage
      deleteTaskFromLocalStorage(li);
    }
  }
}

// Function to clear all tasks
function clearTasks() {
  if (confirm('Are you sure you want to clear all tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from local storage
    clearTasksFromLocalStorage();
  }
}

// Function to save a task to local storage
function saveTaskToLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

// Function to load tasks from local storage
function loadTasks() {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function(task) {
    // Create a new task item
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Function to delete a task from local storage
function deleteTaskFromLocalStorage(taskItem) {
  let tasks = getTasksFromLocalStorage();
  const taskIndex = taskItem.children[0].textContent;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to clear all tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
