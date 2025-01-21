// DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addTaskBtn.addEventListener('click', addTask);

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create new task item
  const li = document.createElement('li');
  li.textContent = taskText;

  // Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', deleteTask);

  li.appendChild(deleteBtn);

  // Add click event to mark as complete
  li.addEventListener('click', toggleComplete);

  // Add task to the list
  taskList.appendChild(li);

  // Save task to local storage
  saveTaskToLocalStorage(taskText);

  // Clear input field
  taskInput.value = '';
}

// Function to delete a task
function deleteTask(event) {
  const li = event.target.parentElement;
  taskList.removeChild(li);
  removeTaskFromLocalStorage(li.textContent);
}

// Function to toggle task completion
function toggleComplete(event) {
  const li = event.target;
  li.classList.toggle('completed');
}

// Function to save task to local storage
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
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', deleteTask);

    li.appendChild(deleteBtn);
    li.addEventListener('click', toggleComplete);

    taskList.appendChild(li);
  });
}

// Function to remove task from local storage
function removeTaskFromLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(t => t !== task.replace('Delete', '').trim());
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
