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
/* harmony import */ var _modules_Completelist_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/Completelist.js */ "./src/modules/Completelist.js");
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
  _modules_Completelist_js__WEBPACK_IMPORTED_MODULE_3__["default"].CompleteToDoList();
  _modules_Completelist_js__WEBPACK_IMPORTED_MODULE_3__["default"].clearCompleted();
  _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].updateDesc();
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

/***/ "./src/modules/Completelist.js":
/*!*************************************!*\
  !*** ./src/modules/Completelist.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage.js */ "./src/modules/localStorage.js");


class Completelist {
  static CompleteToDoList() {
    const checkbox = document
      .querySelector('.to-do-list')
      .querySelectorAll('.checkbox');

    checkbox.forEach((elemnt) => {
      elemnt.addEventListener('change', (e) => {
        _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].completetask(e.target.parentElement.parentElement.id);
      });
    });
  }

  static clearCompleted() {
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', () => {
      let todolists = _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getToDoLists();
      todolists = todolists.filter((elemnt) => elemnt.completed !== true);
      localStorage.setItem('todolists', JSON.stringify(todolists));
      window.location.reload();
      _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].resetIndex();
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Completelist);

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

  static showToDoLists() {
    const todolists = _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getToDoLists();

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
        const todolists = _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getToDoLists();
        const element = e.target.parentElement;

        if (element.classList.contains('text-btn')) {
          element.parentElement.remove();
        }
        localStorage.setItem('todolists', JSON.stringify(todolists));

        _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeToDoLists(
          e.target.parentElement.previousElementSibling.children[1].value,
        );
      });
    });
  }

  static updateDesc() {
    const description = document.querySelector('#to-do-list').querySelectorAll('.description');

    description.forEach((element) => {
      element.addEventListener('change', (e) => {
        _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].updateDesc(
          e.target.value,
          e.target.parentElement.parentElement.id,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDNkM7QUFDWjtBQUNvQjtBQUNBOztBQUVyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsc0RBQUU7QUFDSixFQUFFLHNEQUFFO0FBQ0osRUFBRSxnRUFBWTtBQUNkLEVBQUUsZ0VBQVk7QUFDZCxFQUFFLHNEQUFFO0FBQ0osQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGdFQUFZO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsNERBQVE7O0FBRS9CLEVBQUUsc0RBQUU7O0FBRUosRUFBRSxnRUFBWTs7QUFFZCxFQUFFLHNEQUFFOztBQUVKO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDM0M0Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSx3REFBWTtBQUNwQixPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix3REFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQSxNQUFNLHdEQUFZO0FBQ2xCLEtBQUs7QUFDTDtBQUNBOztBQUVBLGlFQUFlLFlBQVk7Ozs7Ozs7Ozs7Ozs7O0FDM0IzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDM0Q1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7QUNSc0I7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0Esa0RBQWtELGdCQUFnQjtBQUNsRSx3REFBd0QsaUJBQWlCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLHdEQUFZOztBQUVsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsd0RBQVk7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSx3REFBWTtBQUNwQjtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHdEQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxpRUFBZSxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3Qtd2VicGFjay8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL21vZHVsZXMvQ29tcGxldGVsaXN0LmpzIiwid2VicGFjazovL3RvZG9saXN0LXdlYnBhY2svLi9zcmMvbW9kdWxlcy9sb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qtd2VicGFjay8uL3NyYy9tb2R1bGVzL3RvRG9MaXN0LmpzIiwid2VicGFjazovL3RvZG9saXN0LXdlYnBhY2svLi9zcmMvbW9kdWxlcy91aS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBUb0RvTGlzdCBmcm9tICcuL21vZHVsZXMvdG9Eb0xpc3QuanMnO1xuaW1wb3J0IFVJIGZyb20gJy4vbW9kdWxlcy91aS5qcyc7XG5pbXBvcnQgTG9jYWxTdG9yYWdlIGZyb20gJy4vbW9kdWxlcy9sb2NhbFN0b3JhZ2UuanMnO1xuaW1wb3J0IENvbXBsZXRlbGlzdCBmcm9tICcuL21vZHVsZXMvQ29tcGxldGVsaXN0LmpzJztcblxuZG9jdW1lbnRcbiAgLnF1ZXJ5U2VsZWN0b3IoJy5mYS1hcnJvd3Mtcm90YXRlJylcbiAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG8tbGlzdCcpO1xuICBsaXN0Q29udGFpbmVyLmlubmVySFRNTCA9IGA8cCBjbGFzcyA9IFwiZXJyb3ItbWVzc2FnZVwiPipFcnJvcjwvcD5cbiAgICAgICAgPGZvcm0gY2xhc3M9IFwiYWRkLXRvLWxpc3RcIiBhY3Rpb249XCJcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQWRkIHRvIGxpc3QgLi4uXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtYXJyb3ctcmlnaHQtdG8tYnJhY2tldFwiPjwvaT5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICBgO1xuICBVSS5zaG93VG9Eb0xpc3RzKCk7XG4gIFVJLnJlbW92ZVRvRG9MaXN0cygpO1xuICBDb21wbGV0ZWxpc3QuQ29tcGxldGVUb0RvTGlzdCgpO1xuICBDb21wbGV0ZWxpc3QuY2xlYXJDb21wbGV0ZWQoKTtcbiAgVUkudXBkYXRlRGVzYygpO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG8tbGlzdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBpbnB1dFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dCcpO1xuICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gaW5wdXRUZXh0LnZhbHVlO1xuICBjb25zdCBpbmRleCA9IHRvZG9saXN0cy5sZW5ndGggKyAxO1xuICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcblxuICBjb25zdCB0b2RvdGFzayA9IG5ldyBUb0RvTGlzdChkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBpbmRleCk7XG5cbiAgVUkuYWRkVG9Eb0xpc3RzKHRvZG90YXNrKTtcblxuICBMb2NhbFN0b3JhZ2UuYWRkVG9Eb0xpc3RzKHRvZG90YXNrKTtcblxuICBVSS5jbGVhckZpZWxkcygpO1xuXG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbn0pOyIsImltcG9ydCBMb2NhbFN0b3JhZ2UgZnJvbSAnLi9sb2NhbFN0b3JhZ2UuanMnO1xuXG5jbGFzcyBDb21wbGV0ZWxpc3Qge1xuICBzdGF0aWMgQ29tcGxldGVUb0RvTGlzdCgpIHtcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcignLnRvLWRvLWxpc3QnKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveCcpO1xuXG4gICAgY2hlY2tib3guZm9yRWFjaCgoZWxlbW50KSA9PiB7XG4gICAgICBlbGVtbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgICAgTG9jYWxTdG9yYWdlLmNvbXBsZXRldGFzayhlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJDb21wbGV0ZWQoKSB7XG4gICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXInKTtcbiAgICBjbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XG4gICAgICB0b2RvbGlzdHMgPSB0b2RvbGlzdHMuZmlsdGVyKChlbGVtbnQpID0+IGVsZW1udC5jb21wbGV0ZWQgIT09IHRydWUpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0cycsIEpTT04uc3RyaW5naWZ5KHRvZG9saXN0cykpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgTG9jYWxTdG9yYWdlLnJlc2V0SW5kZXgoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21wbGV0ZWxpc3Q7IiwibGV0IHRvZG9saXN0cyA9IFtdO1xuXG5jbGFzcyBMb2NhbFN0b3JhZ2Uge1xuICBzdGF0aWMgYWRkVG9Eb0xpc3RzKGRhdGEpIHtcbiAgICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XG4gICAgdG9kb2xpc3RzLnB1c2goZGF0YSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0cycsIEpTT04uc3RyaW5naWZ5KHRvZG9saXN0cykpO1xuICB9XG5cbiAgc3RhdGljIGdldFRvRG9MaXN0cygpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0cycpID09PSBudWxsKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZG9saXN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0cycpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRvZG9saXN0cztcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUb0RvTGlzdHMobmV3ZGVzYykge1xuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgICB0b2RvbGlzdHMuZm9yRWFjaCgoZGF0YSwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChkYXRhLmRlc2NyaXB0aW9uID09PSBuZXdkZXNjKSB7XG4gICAgICAgIHRvZG9saXN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBMb2NhbFN0b3JhZ2UucmVzZXRJbmRleCgpO1xuICB9XG5cbiAgc3RhdGljIHJlc2V0SW5kZXgoKSB7XG4gICAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICAgIHRvZG9saXN0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgaXRlbS5pbmRleCA9IGluZGV4ICsgMTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVEZXNjKGRlc2NyaXB0aW9uLCBpbmRleCkge1xuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG9saXN0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRvZG9saXN0c1tpXS5pbmRleCA9PT0gK2luZGV4KSB7XG4gICAgICAgIHRvZG9saXN0c1tpXS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNvbXBsZXRldGFzayhpbmRleCkge1xuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG9saXN0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRvZG9saXN0c1tpXS5pbmRleCA9PT0gK2luZGV4KSB7XG4gICAgICAgIHRvZG9saXN0c1tpXS5jb21wbGV0ZWQgPSAhdG9kb2xpc3RzW2ldLmNvbXBsZXRlZDtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0cycsIEpTT04uc3RyaW5naWZ5KHRvZG9saXN0cykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvY2FsU3RvcmFnZTtcbiIsImNsYXNzIFRvRG9MaXN0IHtcbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgaW5kZXgpIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvRG9MaXN0OyIsImltcG9ydCBMb2NhbFN0b3JhZ2UgZnJvbSAnLi9sb2NhbFN0b3JhZ2UuanMnO1xuXG5jbGFzcyBVSSB7XG4gIHN0YXRpYyBhZGRUb0RvTGlzdHMoZGF0YSkge1xuICAgIGNvbnN0IGxpc3RDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvLWRvLWxpc3QnKTtcbiAgICBjb25zdCBsaXN0aXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGlzdGl0ZW0uY2xhc3NMaXN0ID0gJ25ldyc7XG4gICAgbGlzdGl0ZW0uaWQgPSBgJHtkYXRhLmluZGV4fWA7XG4gICAgbGlzdGl0ZW0uaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dHNcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiY2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiAke2RhdGEuY29tcGxldGVkfSAvPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJkZXNjcmlwdGlvblwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke2RhdGEuZGVzY3JpcHRpb259XCIgLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwidGV4dC1idG5cIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaC1jYW5cIj48L2k+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBgO1xuICAgIGxpc3RDb250ZW50LmFwcGVuZENoaWxkKGxpc3RpdGVtKTtcbiAgfVxuXG4gIHN0YXRpYyBzaG93VG9Eb0xpc3RzKCkge1xuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcblxuICAgIHRvZG9saXN0cy5mb3JFYWNoKChkYXRhKSA9PiBVSS5hZGRUb0RvTGlzdHMoZGF0YSkpO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyRmllbGRzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0JykudmFsdWUgPSAnJztcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUb0RvTGlzdHMoKSB7XG4gICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcudG8tZG8tbGlzdCcpXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLmZhLXRyYXNoLWNhbicpO1xuICAgIHJlbW92ZS5mb3JFYWNoKChiaW4pID0+IHtcbiAgICAgIGJpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0ZXh0LWJ0bicpKSB7XG4gICAgICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcblxuICAgICAgICBMb2NhbFN0b3JhZ2UucmVtb3ZlVG9Eb0xpc3RzKFxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlblsxXS52YWx1ZSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZURlc2MoKSB7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG8tZG8tbGlzdCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjcmlwdGlvbicpO1xuXG4gICAgZGVzY3JpcHRpb24uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgICBMb2NhbFN0b3JhZ2UudXBkYXRlRGVzYyhcbiAgICAgICAgICBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVSTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=