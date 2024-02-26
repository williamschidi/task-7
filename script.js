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

    spanText.appendChild(document.createTextNode(arr));
    textContainer.appendChild(checkbox);
    textContainer.appendChild(spanText);
    textContainer.classList.add('format');

    spanBtn.classList.add('btn-li');
    li.classList.add('layout');

    li.appendChild(textContainer);
    li.appendChild(spanBtn);

    // li.setAttribute('data-id', ind);
    // editBtn.setAttribute('data-id', ind);
    // delBtn.setAttribute('data-id', ind);
    ul.appendChild(li), todoList;

    checkbox.addEventListener('change', function () {
      if (checkbox.value === 'checked') {
        spanText.classList.toggle('toggle');
        spanBtn.classList.toggle('hidden');
      }
    });

    console.log(spanText.textContent);

    deleteTask(delBtn, li, todoList);

    updateTask(editBtn, editTaskBtn, todoList, ind);
  });
}

function updateTask(btn, btn2, taskArray, id) {
  btn.addEventListener('click', function (e) {
    console.log(id, taskArray[id]);

    document.querySelector('.add-task-container').classList.toggle('hidden');
    document.querySelector('.edit-task-container').classList.toggle('hidden');

    btn2.addEventListener('click', (e) => {
      e.preventDefault();

      document.querySelector('.add-task-container').classList.toggle('hidden');
      document.querySelector('.edit-task-container').classList.toggle('hidden');
      const editValue = document.querySelector('#editInput').value;

      taskArray[id] = editValue[0].toUpperCase() + editValue.slice(1);

      console.log(taskArray);

      viewTask(e);
    });
  });
}

function deleteTask(del, li, dataArray) {
  del.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    console.log(id);
    dataArray.splice(id, 1);
    li.remove();
    return dataArray;
  });
}

addTaskBtn.addEventListener('click', addTask);
viewTaskBtn.addEventListener('click', viewTask);
