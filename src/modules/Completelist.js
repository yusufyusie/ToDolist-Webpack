import LocalStorage from './localStorage.js';

class Completelist {
  static CompleteToDoList() {
    const checkbox = document
      .querySelector('.to-do-list')
      .querySelectorAll('.checkbox');

    checkbox.forEach((elemnt) => {
      elemnt.addEventListener('change', (e) => {
        LocalStorage.taskComp(e.target.parentElement.parentElement.id);
      });
    });
  }

  static clearCompleted() {
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', () => {
      let todolists = LocalStorage.getToDoLists();
      todolists = todolists.filter((elemnt) => elemnt.comp !== true);
      localStorage.setItem('todolists', JSON.stringify(todolists));
      window.location.reload();
      LocalStorage.resetIndex();
    });
  }
}

export default Completelist;