let todolists = [];

class LocalStorage {
  static getToDoLists() {
    if (localStorage.getItem('todolists') === null) {
      localStorage.setItem('todolists', JSON.stringify(todolists));
    } else {
      todolists = JSON.parse(localStorage.getItem('todolists'));
    }
    return todolists;
  }

  static addToDoLists(data) {
    const todolists = LocalStorage.getToDoLists();
    todolists.push(data);
    localStorage.setItem('todolists', JSON.stringify(todolists));
  }

  static removeToDoLists(newdesc) {
    const todolists = LocalStorage.getToDoLists();
    todolists.forEach((data, index) => {
      if (data.description === newdesc) {
        todolists.splice(index, 1);
      }
    });

    // RESET INDEX
    LocalStorage.resetIndex();

    LocalStorage.updateDesc();

    localStorage.setItem('todolists', JSON.stringify(todolists));
  }

  static resetIndex() {
    todolists.forEach((data, index) => {
      data.index = index + 1;
    });
  }

  static updateDesc(description, index) {
    for (let i = 0; i < todolists.length; i += 1) {
      if (todolists[i].index === +index) {
        todolists[i].description = description;
        localStorage.setItem('todolists', JSON.stringify(todolists));
      }
    }
  }
}

export default LocalStorage;
