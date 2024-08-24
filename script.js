document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskPriority = document.getElementById('task-priority');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to local storage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text} - ${task.date} - ${task.priority}</span>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);

        // Add delete event
        li.querySelector('.delete').addEventListener('click', () => {
            removeTask(task.id);
        });
    };

    // Add task
    const addTask = (e) => {
        e.preventDefault();
        const text = taskInput.value;
        const date = taskDate.value;
        const priority = taskPriority.value;

        if (text === '' || date === '') return;

        const task = {
            id: Date.now(),
            text,
            date,
            priority
        };

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        saveTasks(tasks);
        addTaskToDOM(task);

        taskInput.value = '';
        taskDate.value = '';
        taskPriority.value = 'Low';
    };

    // Remove task
    const removeTask = (taskId) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks(tasks);
        taskList.innerHTML = '';
        loadTasks();
    };

    taskForm.addEventListener('submit', addTask);

    loadTasks();
});