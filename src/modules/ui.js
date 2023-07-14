const listContent = document.querySelector('.to-do-list');

const lists = [
  {
    description: 'todo1',
    completed: 'true',
    index: '1',
  },
  {
    description: 'todo2',
    completed: 'false',
    index: '2',
  },
  {
    description: 'todo3',
    completed: 'true',
    index: '3',
  },
  {
    description: 'todo4',
    completed: 'false',
    index: '4',
  },
];

const addToDoLists = () => {
  lists.forEach((data) => {
    const listitem = document.createElement('li');
    listitem.dataset.listId = data.index;
    listitem.classList.add('checkbox');
    listitem.innerHTML += `
        <span class="inputs">
        <input class="checkbox" type="checkbox" ${data.completed} />
        <input class="description" type="text" value="${data.description}" />
        </span>
        `;
    listContent.appendChild(listitem);
  });
};

export default addToDoLists;