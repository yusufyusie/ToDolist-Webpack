let todolists = [];

class LocalStorage {
  static addToDoLists(data) {
    const todolists = LocalStorage.getToDoLists();
    todolists.push(data);
    localStorage.setItem('todolists', JSON.stringify(todolists));
  }

  static getToDoLists() {
    if (localStorage.getItem('todolists') === null) {
      localStorage.setItem('todolists', JSON.stringify(todolists));
    } else {
      todolists = JSON.parse(localStorage.getItem('todolists'));
    }
    return todolists;
  }

  static removeToDoLists(newdesc) {
    const todolists = LocalStorage.getToDoLists();
    todolists.forEach((data, index) => {
      if (data.description === newdesc) {
        todolists.splice(index, 1);
        localStorage.setItem('todolists', JSON.stringify(todolists));
      }
    });

    LocalStorage.resetIndex();
  }

  static resetIndex() {
    const todolists = LocalStorage.getToDoLists();
    todolists.forEach((item, index) => {
      item.index = index + 1;
      localStorage.setItem('todolists', JSON.stringify(todolists));
    });
  }

  static updateDesc(description, index) {
    const todolists = LocalStorage.getToDoLists();
    for (let i = 0; i < todolists.length; i += 1) {
      if (todolists[i].index === +index) {
        todolists[i].description = description;
        localStorage.setItem('todolists', JSON.stringify(todolists));
      }
    }
  }

  static completetask(index) {
    const todolists = LocalStorage.getToDoLists();
    for (let i = 0; i < todolists.length; i += 1) {
      if (todolists[i].index === +index) {
        todolists[i].completed = !todolists[i].completed;
      }
    }
    localStorage.setItem('todolists', JSON.stringify(todolists));
  }
}

module.exports = LocalStorage;
