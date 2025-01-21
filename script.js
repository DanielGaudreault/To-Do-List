// DOM Elements
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const priorityInput = document.getElementById('priority-input');
const addTaskBtn = document.getElementById('add-task-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addTaskBtn.addEventListener('click', addTask);

// Clear all tasks
clearAllBtn.addEventListener('click', clearAllTasks);

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create new task item
  const li = document.createElement('li');

  // Task info (text, due date, priority)
  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task-info');
  taskInfo.innerHTML = `
    <span>${taskText}</span>
    <span>Due: ${dueDate || 'No date'}</span>
  `;

  // Priority badge
  const priorityBadge = document.createElement('span');
  priorityBadge.classList.add('priority', priority);
  priorityBadge.textContent = priority.toUpperCase();

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', deleteTask);

  // Append elements to the task item
  li.appendChild(taskInfo);
  li.appendChild(priorityBadge);
  li.appendChild(deleteBtn);

  // Add click event to mark as complete
  li.addEventListener('click', toggleComplete);

  // Add task to the list
  taskList.appendChild(li);

  // Save task to local storage
  saveTaskToLocalStorage({ text: taskText, dueDate, priority });

  // Clear input fields
  taskInput.value = '';
  dueDateInput.value = '';
  priorityInput.value = 'low';
}

// Function to delete a task
function deleteTask(event) {
  const li = event.target.closest('li');
  taskList.removeChild(li);
  removeTaskFromLocalStorage(li.querySelector('.task-info span').textContent);
}

// Function to toggle task completion
function toggleComplete(event) {
  const li = event.currentTarget;
  li.classList.toggle('completed');
}

// Function to clear all tasks
function clearAllTasks() {
  taskList.innerHTML = '';
  localStorage.removeItem('tasks');
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

    // Task info
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');
    taskInfo.innerHTML = `
      <span>${task.text}</span>
      <span>Due: ${task.dueDate || 'No date'}</span>
    `;

    // Priority badge
    const priorityBadge = document.createElement('span');
    priorityBadge.classList.add('priority', task.priority);
    priorityBadge.textContent = task.priority.toUpperCase();

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', deleteTask);

    // Append elements
    li.appendChild(taskInfo);
    li.appendChild(priorityBadge);
    li.appendChild(deleteBtn);

    // Add click event
    li.addEventListener('click', toggleComplete);

    // Add task to the list
    taskList.appendChild(li);
  });
}

// Function to remove task from local storage
function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
