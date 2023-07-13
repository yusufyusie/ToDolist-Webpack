import LocalStorage from "./localStorage.js";
class UI {
    static addToDoLists(data) {
        const listContent = document.querySelector('.add-to-list');
        const listitem = document.createElement('li');
        listitem.classList = 'new';
        listitem.id = `
        <span class="inputs"><input class="checkbox" type="checkbox" ${data.completed} /><input class="description" type="text" value="${data.description}" /></span>
        <button class="text-btn" type="button">
          <i class="fa-solid fa-trash-can"></i>
        </button>
        `;
        listContent.appendChild(listitem);
    }

    static clearFields() {
        document.querySelector('.text').value = '';
      }

      static showToDoLists() {
        const todolists = LocalStorage.getToDoLists();
    
        todolists.forEach((data) => UserInterface.addToDoLists(data));
      }

      static removeToDoLists() {
        const dustbin = document
          .querySelector('#to-do-list')
          .querySelectorAll('.fa-trash-can');
    
        dustbin.forEach((bin) => {
          bin.addEventListener('click', (e) => {
            const todolists = LocalStorage.getToDoLists();
            const elt = e.target.parentElement;
    
            if (elt.classList.contains('text-btn')) {
              elt.parentElement.remove();
            }
            localStorage.setItem('todolists', JSON.stringify(todolists));
    
            LocalStorage.removeToDoLists(
              e.target.parentElement.previousElementSibling.children[1].value,
            );
          });
        });
      }

      static updateDesc() {
        const desc = document.querySelector('#to-do-list').querySelectorAll('.description');
    
        desc.forEach((elt) => {
          elt.addEventListener('change', (e) => {
            LocalStorage.updateDesc(
              e.target.value,
              e.target.parentElement.parentElement.id,
            );
          });
        });
      }
}

export default UI;