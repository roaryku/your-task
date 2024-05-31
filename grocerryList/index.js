const input = document.querySelector('input');
const form = document.querySelector('form');
const list = document.querySelector('.list');
const deleteBtn = document.querySelector('.delete');

let tasks = []; 

const renderTask = task => {
    const li = document.createElement('li');
    li.innerHTML = task;
    li.classList.add('toDoAdded')
    list.appendChild(li);
    input.value = '';

    li.addEventListener('click', function() {
        li.classList.add('toDoComplited')
    })

    li.addEventListener('bdlclick', function() {
        list.removeChild(li)
    })
};


if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem('tasks')); 
    tasks.forEach(task => renderTask(task)); 
};


const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    };


const addTask = e => {
    e.preventDefault(); 
    const taskInput = input.value.trim();
    if (taskInput.length === 0) return false
    tasks.push(taskInput); 
    renderTask(taskInput); 
    input.value = ''; 
    saveToLocalStorage(); 
};

const deleteTask = e => {
    const clickedTask = e.target
    tasks = tasks.filter(task => task !== clickedTask.innerText);
    saveToLocalStorage(); 
    list.removeChild(clickedTask);
}

const deleteAll = () => {
    localStorage.removeItem('tasks'); 
    tasks = []; 
    const tasksHTML = list.querySelectorAll('li'); 
    tasksHTML.forEach(task => task.remove()); 
}

form.addEventListener('submit', addTask);
list.addEventListener('dblclick', deleteTask);
deleteBtn.addEventListener('click', deleteAll);