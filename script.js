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

    delBtn.onclick = function () {
      li.remove();
    };

    editBtn.addEventListener('click', function () {
      document.querySelector('.add-task-container').classList.toggle('hidden');
      document.querySelector('.edit-task-container').classList.toggle('hidden');

      editTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const editValue = document.querySelector('#edit-task').value;
        spanText.textContent = editValue;

        document
          .querySelector('.add-task-container')
          .classList.toggle('hidden');
        document
          .querySelector('.edit-task-container')
          .classList.toggle('hidden');
      });
    });

    li.classList.add('layout');

    li.appendChild(textContainer);
    li.appendChild(spanBtn);

    console.log(ul.appendChild(li), todoList);
  });
}

addTaskBtn.addEventListener('click', addTask);
viewTaskBtn.addEventListener('click', viewTask);
