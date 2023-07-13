document
  .querySelector('.fa-arrows-rotate')
  .addEventListener('click', () => window.location.reload());
  
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