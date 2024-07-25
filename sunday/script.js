document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    let taskDescription = prompt("Enter task description:");
    
    if (taskDescription) {
        addTask(taskDescription);
        saveTask(taskDescription, false);
    }
});

function addTask(description, isCompleted = false) {
    let taskList = document.getElementById('task-list');
    let taskItem = document.createElement('div');
    taskItem.className = 'task';
    if (isCompleted) {
        taskItem.classList.add('completed');
    }
    
    let taskContent = document.createElement('h2');
    taskContent.textContent = description;
    
    let actions = document.createElement('div');
    actions.className = 'actions';
    
    let doneBtn = document.createElement('a');
    doneBtn.href = '#';
    doneBtn.className = 'done-btn';
    doneBtn.innerHTML = '<i class="bx bx-check"></i>';
    
    doneBtn.addEventListener('click', function(e) {
        e.preventDefault();
        taskItem.classList.toggle('completed');
        updateTaskInStorage(description, taskItem.classList.contains('completed'));
    });
    
    let editBtn = document.createElement('a');
    editBtn.href = '#';
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '<i class="bx bx-edit"></i>';
    
    editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let newDescription = prompt("Edit task description:", taskContent.textContent);
        if (newDescription) {
            taskContent.textContent = newDescription;
            updateTaskDescriptionInStorage(description, newDescription);
            description = newDescription;
        }
    });
    
    let deleteBtn = document.createElement('a');
    deleteBtn.href = '#';
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="bx bx-trash"></i>';
    
    deleteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        taskList.removeChild(taskItem);
        removeTaskFromStorage(description);
    });
    
    actions.appendChild(doneBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    taskItem.appendChild(taskContent);
    taskItem.appendChild(actions);
    
    taskList.appendChild(taskItem);
}

function saveTask(description, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ description, isCompleted });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.description, task.isCompleted);
    });
}

function updateTaskInStorage(description, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.description === description) {
            return { description, isCompleted };
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskDescriptionInStorage(oldDescription, newDescription) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.description === oldDescription) {
            return { description: newDescription, isCompleted: task.isCompleted };
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(description) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.description !== description);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}