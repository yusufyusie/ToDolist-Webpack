import LocalStorage from './localStorage.js';

class CompleteToDoList {
  static compToDoList() {
    const checkbox = document
      .querySelector('#to-do-list')
      .querySelectorAll('.checkbox');

    checkbox.forEach((elt) => {
      elt.addEventListener('change', (e) => {
        LocalStorage.taskComp(e.target.parentElement.parentElement.id);
      });
    });
  }

  static clearComp() {
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', () => {
      let todolists = LocalStorage.getToDoLists();
      todolists = todolists.filter((elt) => elt.completed !== true);
      localStorage.setItem('todolists', JSON.stringify(todolists));
      window.location.reload();
      LocalStorage.resetIndex();
    });
  }
}

export default CompleteToDoList;
