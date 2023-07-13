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
}

export default UI;