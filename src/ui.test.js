import UI from './modules/ui.js';

describe('Manipulate Add and delete Tasks', () => {
  document.body.innerHTML = '<div> <ul class="to-do-list"></ul> </div>';

  const localStorageMock = new UI();
  const taskLength = localStorageMock.tasks.length;

  test('Add a Task', () => {
    localStorageMock.addToDoLists('Test 1');
    expect(localStorageMock.tasks).toHaveLength(taskLength + 1);
  });

  test('Adding task to DOM', () => {
    const list = document.querySelectorAll('.task');
    expect(list).toHaveLength(taskLength + 1);
  });
});