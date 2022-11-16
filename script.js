const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const btnAdd = document.querySelector('#new-btn');
const btnDeleteChecked = document.querySelector('#delete-checked');
const btnDeleteAll = document.querySelector('#delete-all');

function addNew(task) {
    const newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(taskInput.value || task));
    taskList.appendChild(newLi);
    newLi.className = 'new-task';
    taskInput.value = '';
    saveAll();
}

function deleteChecked() {
    const completed = document.querySelectorAll('.completed');
    completed.forEach(li => li.innerHTML = '');
    saveAll();
}

function deleteAll() {
    taskList.innerHTML = '';
    saveAll();
}

function saveAll() {
    const allTasks = document.querySelectorAll('li');
    const arr = [];
    allTasks.forEach((task) => {
        arr.push(task.innerHTML);
    })
    localStorage.setItem('tasks', JSON.stringify(arr));
}

let saved = localStorage.getItem('tasks');
if (saved) {
    saved = JSON.parse(saved);
    saved.forEach((task) => {
        addNew(task);
    })
}

// bubble01 holds all interactions on click //
function bubble01(e) {
    if (e.target.id === 'new-btn') addNew();
    if (e.target.className === 'new-task') e.target.className = 'completed';
    if (e.target.id === 'delete-checked') deleteChecked();
    if (e.target.id === 'delete-all') deleteAll();
}
document.addEventListener('click', bubble01);

// bubble02 holds all interactions on double click //
function bubble02(e) {
    if (e.target.className === 'completed') e.target.className = 'new-task';
}
document.addEventListener('dblclick', bubble02);

// bubble03 holds all key pressing events //
function bubble03(e) {
    if (e.key === "Enter") addNew();
}
document.addEventListener("keypress", bubble03);