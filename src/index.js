import ToDoList from "./modules/toDoList.js";

document
  .querySelector('.fa-arrows-rotate')
  .addEventListener('click', () => window.location.reload());

  document.addEventListener('DOMContentLoaded', () => {
    listContainer = document.querySelector('.add-to-list');
    listContainer.innerHTML = 
        `<p class = "error-message">*Error</p>
        <form class= "add-to-list" action="">
            <input type="text" class="text" placeholder="Add to list ..." required />
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </form>
        `;
  })

  document.querySelector('.add-to-list').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    const inputText = document.querySelector('.text');
    const todolists = LocalStorage.getToDoLists();
    const description = inputText.value;
    const index = todolists.length + 1;
    const completed = false;

    const todotask = new ToDoList(description, completed, index);

    UserInterface.addToDoLists(todotask);

    LocalStorage.addToDoLists(todotask);

    UserInterface.clearFields();

    window.location.reload();
  });