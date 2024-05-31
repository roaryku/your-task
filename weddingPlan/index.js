
// const inputField = document.querySelector('.inputField');
// const add = document.querySelector('.add');
// const toDoContainer = document.querySelector('.toDoContainer');// to add append child

// inputField.addEventListener('keydown', (e) => {
//   if(e.keyCode === 13) {
//     add.click();
//   }
// })

// btn.addEventListener('click', () => {
//   const item = document.createElement('li');
//   item.innerText = inputField.value;
//   item.classList.add('toDoAdded');
//   toDoContainer.appendChild(item);
//   inputField.value = ' ';

//   item.addEventListener('click', () => {
//     item.classList.add('toDoComplited');
//   })
//   item.addEventListener('dblclick', () => {
//     toDoContainer.removeChild(item);
//   })
// })


const input = document.querySelector('.inputField');
const form = document.querySelector('.container');
const list = document.querySelector('.toDoContainer');
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