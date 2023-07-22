import LocalStorage from './localStorage.js';

class UI {
  static addToDoLists(data) {
    const listContent = document.querySelector('.to-do-list');
    const listitem = document.createElement('li');
    listitem.classList = 'new';
    listitem.id = `${data.index}`;
    listitem.innerHTML += `
        <span class="inputs">
        <input class="checkbox" type="checkbox" ${data.completed} />
        <input class="description" type="text" value="${data.description}" />
        </span>
        <button class="text-btn" type="button">
          <i class="fa-solid fa-trash-can"></i>
        </button>
        `;
    listContent.appendChild(listitem);
  }

  static showToDoLists() {
    const todolists = LocalStorage.getToDoLists();

    todolists.forEach((data) => UI.addToDoLists(data));
  }

  static clearFields() {
    document.querySelector('.text').value = '';
  }

  static removeToDoLists() {
    const remove = document
      .querySelector('.to-do-list')
      .querySelectorAll('.fa-trash-can');
    remove.forEach((bin) => {
      bin.addEventListener('click', (e) => {
        const todolists = LocalStorage.getToDoLists();
        const element = e.target.parentElement;

        if (element.classList.contains('text-btn')) {
          element.parentElement.remove();
        }
        localStorage.setItem('todolists', JSON.stringify(todolists));

        LocalStorage.removeToDoLists(
          e.target.parentElement.previousElementSibling.children[1].value,
        );
      });
    });
  }

  static updateDesc() {
    const description = document.querySelector('#to-do-list').querySelectorAll('.description');

    description.forEach((element) => {
      element.addEventListener('change', (e) => {
        LocalStorage.updateDesc(
          e.target.value,
          e.target.parentElement.parentElement.id,
        );
      });
    });
  }
}

export default UI;