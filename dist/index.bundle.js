"use strict";
(self["webpackChunktodolist_webpack"] = self["webpackChunktodolist_webpack"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_toDoList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/toDoList.js */ "./src/modules/toDoList.js");
/* harmony import */ var _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ui.js */ "./src/modules/ui.js");
/* harmony import */ var _modules_localStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/localStorage.js */ "./src/modules/localStorage.js");
// import './style.css';




document
  .querySelector('.fa-arrows-rotate')
  .addEventListener('click', () => window.location.reload());

document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.querySelector('.add-to-list');
  listContainer.innerHTML = `<p class = "error-message">*Error</p>
        <form class= "add-to-list" action="">
            <input type="text" class="text" placeholder="Add to list ..." required />
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </form>
        `;
  _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].showToDoLists();
  _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeToDoLists();
});

document.querySelector('.add-to-list').addEventListener('submit', (e) => {
  e.preventDefault();

  const inputText = document.querySelector('.text');
  const todolists = _modules_localStorage_js__WEBPACK_IMPORTED_MODULE_2__["default"].getToDoLists();
  const description = inputText.value;
  const index = todolists.length + 1;
  const completed = false;

  const todotask = new _modules_toDoList_js__WEBPACK_IMPORTED_MODULE_0__["default"](description, completed, index);

  _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].addToDoLists(todotask);

  _modules_localStorage_js__WEBPACK_IMPORTED_MODULE_2__["default"].addToDoLists(todotask);

  _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].clearFields();

  window.location.reload();
});

/***/ }),

/***/ "./src/modules/localStorage.js":
/*!*************************************!*\
  !*** ./src/modules/localStorage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LocalStorage);


/***/ }),

/***/ "./src/modules/toDoList.js":
/*!*********************************!*\
  !*** ./src/modules/toDoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ToDoList {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToDoList);

/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage.js */ "./src/modules/localStorage.js");


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

  static clearFields() {
    document.querySelector('.text').value = '';
  }

  static showToDoLists() {
    const todolists = _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getToDoLists();

    todolists.forEach((data) => UI.addToDoLists(data));
  }

  static removeToDoLists() {
    const dustbin = document
      .querySelector('.to-do-list')
      .querySelectorAll('.fa-trash-can');

    dustbin.forEach((bin) => {
      bin.addEventListener('click', (e) => {
        const todolists = _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getToDoLists();
        const elt = e.target.parentElement;

        if (elt.classList.contains('text-btn')) {
          elt.parentElement.remove();
        }
        localStorage.setItem('todolists', JSON.stringify(todolists));

        _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeToDoLists(
          e.target.parentElement.previousElementSibling.children[1].value,
        );
      });
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUM2QztBQUNaO0FBQ29COztBQUVyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsc0RBQUU7QUFDSixFQUFFLHNEQUFFO0FBQ0osQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGdFQUFZO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsNERBQVE7O0FBRS9CLEVBQUUsc0RBQUU7O0FBRUosRUFBRSxnRUFBWTs7QUFFZCxFQUFFLHNEQUFFOztBQUVKO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUN2Q0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbEQ1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7QUNSc0I7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0Esa0RBQWtELGdCQUFnQjtBQUNsRSx3REFBd0QsaUJBQWlCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQix3REFBWTs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLHdEQUFZO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsd0RBQVk7QUFDcEI7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxpRUFBZSxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3Qtd2VicGFjay8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL21vZHVsZXMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9saXN0LXdlYnBhY2svLi9zcmMvbW9kdWxlcy90b0RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL21vZHVsZXMvdWkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9tb2R1bGVzL3RvRG9MaXN0LmpzJztcbmltcG9ydCBVSSBmcm9tICcuL21vZHVsZXMvdWkuanMnO1xuaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tICcuL21vZHVsZXMvbG9jYWxTdG9yYWdlLmpzJztcblxuZG9jdW1lbnRcbiAgLnF1ZXJ5U2VsZWN0b3IoJy5mYS1hcnJvd3Mtcm90YXRlJylcbiAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG8tbGlzdCcpO1xuICBsaXN0Q29udGFpbmVyLmlubmVySFRNTCA9IGA8cCBjbGFzcyA9IFwiZXJyb3ItbWVzc2FnZVwiPipFcnJvcjwvcD5cbiAgICAgICAgPGZvcm0gY2xhc3M9IFwiYWRkLXRvLWxpc3RcIiBhY3Rpb249XCJcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQWRkIHRvIGxpc3QgLi4uXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtYXJyb3ctcmlnaHQtdG8tYnJhY2tldFwiPjwvaT5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICBgO1xuICBVSS5zaG93VG9Eb0xpc3RzKCk7XG4gIFVJLnJlbW92ZVRvRG9MaXN0cygpO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG8tbGlzdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBpbnB1dFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dCcpO1xuICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gaW5wdXRUZXh0LnZhbHVlO1xuICBjb25zdCBpbmRleCA9IHRvZG9saXN0cy5sZW5ndGggKyAxO1xuICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcblxuICBjb25zdCB0b2RvdGFzayA9IG5ldyBUb0RvTGlzdChkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBpbmRleCk7XG5cbiAgVUkuYWRkVG9Eb0xpc3RzKHRvZG90YXNrKTtcblxuICBMb2NhbFN0b3JhZ2UuYWRkVG9Eb0xpc3RzKHRvZG90YXNrKTtcblxuICBVSS5jbGVhckZpZWxkcygpO1xuXG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbn0pOyIsImxldCB0b2RvbGlzdHMgPSBbXTtcblxuY2xhc3MgTG9jYWxTdG9yYWdlIHtcbiAgc3RhdGljIGdldFRvRG9MaXN0cygpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0cycpID09PSBudWxsKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZG9saXN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0cycpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRvZG9saXN0cztcbiAgfVxuXG4gIHN0YXRpYyBhZGRUb0RvTGlzdHMoZGF0YSkge1xuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgICB0b2RvbGlzdHMucHVzaChkYXRhKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlVG9Eb0xpc3RzKG5ld2Rlc2MpIHtcbiAgICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XG4gICAgdG9kb2xpc3RzLmZvckVhY2goKGRhdGEsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoZGF0YS5kZXNjcmlwdGlvbiA9PT0gbmV3ZGVzYykge1xuICAgICAgICB0b2RvbGlzdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJFU0VUIElOREVYXG4gICAgTG9jYWxTdG9yYWdlLnJlc2V0SW5kZXgoKTtcblxuICAgIExvY2FsU3RvcmFnZS51cGRhdGVEZXNjKCk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gIH1cblxuICBzdGF0aWMgcmVzZXRJbmRleCgpIHtcbiAgICB0b2RvbGlzdHMuZm9yRWFjaCgoZGF0YSwgaW5kZXgpID0+IHtcbiAgICAgIGRhdGEuaW5kZXggPSBpbmRleCArIDE7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlRGVzYyhkZXNjcmlwdGlvbiwgaW5kZXgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG9saXN0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRvZG9saXN0c1tpXS5pbmRleCA9PT0gK2luZGV4KSB7XG4gICAgICAgIHRvZG9saXN0c1tpXS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvY2FsU3RvcmFnZTtcbiIsImNsYXNzIFRvRG9MaXN0IHtcbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgaW5kZXgpIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvRG9MaXN0OyIsImltcG9ydCBMb2NhbFN0b3JhZ2UgZnJvbSAnLi9sb2NhbFN0b3JhZ2UuanMnO1xuXG5jbGFzcyBVSSB7XG4gIHN0YXRpYyBhZGRUb0RvTGlzdHMoZGF0YSkge1xuICAgIGNvbnN0IGxpc3RDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvLWRvLWxpc3QnKTtcbiAgICBjb25zdCBsaXN0aXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGlzdGl0ZW0uY2xhc3NMaXN0ID0gJ25ldyc7XG4gICAgbGlzdGl0ZW0uaWQgPSBgJHtkYXRhLmluZGV4fWA7XG4gICAgbGlzdGl0ZW0uaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dHNcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiY2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiAke2RhdGEuY29tcGxldGVkfSAvPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJkZXNjcmlwdGlvblwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke2RhdGEuZGVzY3JpcHRpb259XCIgLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwidGV4dC1idG5cIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaC1jYW5cIj48L2k+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBgO1xuICAgIGxpc3RDb250ZW50LmFwcGVuZENoaWxkKGxpc3RpdGVtKTtcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckZpZWxkcygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dCcpLnZhbHVlID0gJyc7XG4gIH1cblxuICBzdGF0aWMgc2hvd1RvRG9MaXN0cygpIHtcbiAgICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XG5cbiAgICB0b2RvbGlzdHMuZm9yRWFjaCgoZGF0YSkgPT4gVUkuYWRkVG9Eb0xpc3RzKGRhdGEpKTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUb0RvTGlzdHMoKSB7XG4gICAgY29uc3QgZHVzdGJpbiA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcignLnRvLWRvLWxpc3QnKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYS10cmFzaC1jYW4nKTtcblxuICAgIGR1c3RiaW4uZm9yRWFjaCgoYmluKSA9PiB7XG4gICAgICBiaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XG4gICAgICAgIGNvbnN0IGVsdCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGVsdC5jbGFzc0xpc3QuY29udGFpbnMoJ3RleHQtYnRuJykpIHtcbiAgICAgICAgICBlbHQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG5cbiAgICAgICAgTG9jYWxTdG9yYWdlLnJlbW92ZVRvRG9MaXN0cyhcbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW5bMV0udmFsdWUsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVSTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=