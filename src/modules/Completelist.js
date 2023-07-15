import LocalStorage from './localStorage.js';

class Completelist {
  static CompleteToDoList() {
    const checkbox = document
      .querySelector('.to-do-list')
      .querySelectorAll('.checkbox');

    checkbox.forEach((elemnt) => {
      elemnt.addEventListener('change', (e) => {
        LocalStorage.completetask(e.target.parentElement.parentElement.id);
      });
    });
  }

  static clearCompleted() {
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', () => {
      let todolists = LocalStorage.getToDoLists();
      todolists = todolists.filter((elemnt) => elemnt.completed !== true);
      localStorage.setItem('todolists', JSON.stringify(todolists));
      window.location.reload();
      LocalStorage.resetIndex();
    });
  }
}

export default Completelist;