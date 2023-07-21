// // import LocalStorage from './modules/localStorage.js';
// const LocalStorage = require('./modules/localStorage.js');
const UI = require('./modules/ui.js');

describe('addToDoLists function', () => {
  let localStorageMock = {};
  beforeEach(() => {
    localStorageMock = {};
    global.localStorage = {
      getItem: (key) => localStorageMock[key],
      setItem: (key, value) => {
        localStorageMock[key] = value;
      },
    };
  });

  document.addEventListener('DOMContentLoaded', () => {
    test('should add a new item to the todoList', () => {
      localStorageMock.todoListItems = '[]';

      const listContainer = document.querySelector('.add-to-list');
      listContainer.innerHTML = `<p class = "error-message">*Error</p>
        <form class= "add-to-list" action="">
            <input type="text" class="text" placeholder="Add to list ..." required />
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </form>
        `;
      UI.showToDoLists();
      UI.removeToDoLists();
      UI.updateDesc();
    });
  });
});
