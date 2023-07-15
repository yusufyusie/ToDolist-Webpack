// import './style.css';
import ToDoList from './modules/toDoList.js';
import UI from './modules/ui.js';
import LocalStorage from './modules/localStorage.js';
import Completelist from './modules/Completelist.js';

document
  .querySelector('.fa-arrows-rotate')
  .addEventListener('click', () => window.location.reload());

document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.querySelector('.add-to-list');
  listContainer.innerHTML = `<p class = "error-message">*Error</p>
        <form class= "add-to-list" action="">
            <input type="text" class="text" placeholder="Add to list ..." required />
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </form>
        `;
  UI.showToDoLists();
  UI.removeToDoLists();
  Completelist.CompleteToDoList();
  Completelist.clearCompleted();
  UI.updateDesc();
});

document.querySelector('.add-to-list').addEventListener('submit', (e) => {
  e.preventDefault();

  const inputText = document.querySelector('.text');
  const todolists = LocalStorage.getToDoLists();
  const description = inputText.value;
  const index = todolists.length + 1;
  const completed = false;

  const todotask = new ToDoList(description, completed, index);

  UI.addToDoLists(todotask);

  LocalStorage.addToDoLists(todotask);

  UI.clearFields();

  window.location.reload();
});