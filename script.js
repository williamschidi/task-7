'use strict';

const addTaskBtn = document.getElementById('add-task');
const editTaskBtn = document.getElementById('edit-task');
const viewTaskBtn = document.querySelector('.view-to-do');
const ul = document.querySelector('.task');

const todoList = [];

function addTask(e) {
  e.preventDefault();
  const item = document.getElementById('addInput').value;
  const capitalizeItem = item[0].toUpperCase() + item.slice(1);
  todoList.push(capitalizeItem);
  document.getElementById('addInput').value = '';
}

function viewTask(e) {
  e.preventDefault();

  ul.innerHTML = '';
  todoList.forEach((arr, ind) => {
    const li = document.createElement('li');
    const textContainer = document.createElement('span');
    const spanText = document.createElement('span');
    const spanBtn = document.createElement('span');
    const delBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.id = 'myCheckbox';
    checkbox.value = 'checked';

    delBtn.appendChild(document.createTextNode('Delete'));
    editBtn.appendChild(document.createTextNode('Update'));
    delBtn.classList.add('delete');
    editBtn.classList.add('edit');
    spanBtn.appendChild(delBtn);
    spanBtn.appendChild(editBtn);
    spanBtn.classList.add('btn-li');

    delBtn.setAttribute('id', ind);
    editBtn.setAttribute('id', ind);

    spanText.appendChild(document.createTextNode(arr));
    spanText.classList.add('li-text');
    textContainer.appendChild(checkbox);
    textContainer.appendChild(spanText);
    textContainer.classList.add('format');

    const taskId = ind;

    li.classList.add('layout');
    li.appendChild(textContainer);
    li.appendChild(spanBtn);

    li.setAttribute('id', taskId);

    ul.appendChild(li);

    checkbox.addEventListener('change', function () {
      spanText.classList.toggle('toggle');
      spanBtn.classList.toggle('hidden');
    });

    deleteTask(delBtn, li, todoList);

    updateTask(editBtn, editTaskBtn, todoList);
  });
}

function updateTask(btn, btn2, taskArray) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.querySelector('#editInput').value !== '') {
      document.querySelector('#editInput').value = '';
    }
    const id = e.target.getAttribute('id');

    const text = e.target.closest('li').querySelector('.li-text');

    document.querySelector('.add-task-container').classList.toggle('hidden');
    document.querySelector('.edit-task-container').classList.toggle('hidden');

    btn2.addEventListener('click', (e) => {
      e.preventDefault();

      const editValue = document.querySelector('#editInput').value;
      text.innerHTML = editValue;

      document.querySelector('.add-task-container').classList.toggle('hidden');
      document.querySelector('.edit-task-container').classList.toggle('hidden');

      taskArray[id] = editValue[0].toUpperCase() + editValue.slice(1);
    });
  });
}

function deleteTask(del, li, dataArray) {
  del.addEventListener('click', (e) => {
    const id = Number(e.target.getAttribute('id'));
    dataArray.splice(id, 1);
    li.remove();
    return dataArray;
  });
}

addTaskBtn.addEventListener('click', addTask);
viewTaskBtn.addEventListener('click', viewTask);
