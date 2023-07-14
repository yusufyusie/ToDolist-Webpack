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
/* harmony import */ var _modules_CompleteToDoList_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/CompleteToDoList.js */ "./src/modules/CompleteToDoList.js");
// import './style.css';





document
  .querySelector('.fa-arrows-rotate')
  .addEventListener('click', () => window.location.reload());

  document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.querySelector('.add-to-list');
    listContainer.innerHTML = 
        `<p class = "error-message">*Error</p>
        <form class= "add-to-list" action="">
            <input type="text" class="text" placeholder="Add to list ..." required />
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </form>
        `;
        _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].showToDoLists();
        _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeToDoLists();
        _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].updateDesc();
        _modules_CompleteToDoList_js__WEBPACK_IMPORTED_MODULE_3__["default"].compToDoList();
        _modules_CompleteToDoList_js__WEBPACK_IMPORTED_MODULE_3__["default"].clearComp();    
  })

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

/***/ "./src/modules/CompleteToDoList.js":
/*!*****************************************!*\
  !*** ./src/modules/CompleteToDoList.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage.js */ "./src/modules/localStorage.js");


class CompleteToDoList {
  static compToDoList() {
    const checkbox = document
      .querySelector('#to-do-list')
      .querySelectorAll('.checkbox');

    checkbox.forEach((elt) => {
      elt.addEventListener('change', (e) => {
        _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].taskComp(e.target.parentElement.parentElement.id);
      });
    });
  }

  static clearComp() {
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', () => {
      let todolists = _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getToDoLists();
      todolists = todolists.filter((elt) => elt.completed !== true);
      localStorage.setItem('todolists', JSON.stringify(todolists));
      window.location.reload();
      _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].resetIndex();
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CompleteToDoList);


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
        localStorage.setItem('todolists', JSON.stringify(todolists));
      }
    });

    // RESET INDEX
    LocalStorage.resetIndex();
  }

  static resetIndex() {
    const todolists = LocalStorage.getToDoLists();
    todolists.forEach((data, index) => {
      data.index = index + 1;
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

  static taskComp(index) {
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
        const todolists = _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getToDoLists();
    
        todolists.forEach((data) => UI.addToDoLists(data));
      }

      static removeToDoLists() {
        const dustbin = document
          .querySelector('#to-do-list')
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

      static updateDesc() {
        const desc = document.querySelector('#to-do-list').querySelectorAll('.description');
    
        desc.forEach((elt) => {
          elt.addEventListener('change', (e) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDNkM7QUFDWjtBQUNvQjtBQUNRO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFFO0FBQ1YsUUFBUSxzREFBRTtBQUNWLFFBQVEsc0RBQUU7QUFDVixRQUFRLG9FQUFnQjtBQUN4QixRQUFRLG9FQUFnQjtBQUN4QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnRUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw0REFBUTtBQUNqQztBQUNBLElBQUksc0RBQUU7QUFDTjtBQUNBLElBQUksZ0VBQVk7QUFDaEI7QUFDQSxJQUFJLHNEQUFFO0FBQ047QUFDQTtBQUNBLEdBQUc7Ozs7Ozs7Ozs7Ozs7OztBQzVDMEM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3REFBWTtBQUNwQixPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isd0RBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsTUFBTSx3REFBWTtBQUNsQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsZ0JBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzNCaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1RDVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7QUNSc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLGdCQUFnQixrREFBa0QsaUJBQWlCO0FBQzFKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3REFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHdEQUFZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx3REFBWTtBQUN4QjtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksd0RBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3Qtd2VicGFjay8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL21vZHVsZXMvQ29tcGxldGVUb0RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL21vZHVsZXMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9saXN0LXdlYnBhY2svLi9zcmMvbW9kdWxlcy90b0RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL21vZHVsZXMvdWkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICcuL3N0eWxlLmNzcyc7XHJcbmltcG9ydCBUb0RvTGlzdCBmcm9tIFwiLi9tb2R1bGVzL3RvRG9MaXN0LmpzXCI7XHJcbmltcG9ydCBVSSBmcm9tICcuL21vZHVsZXMvdWkuanMnO1xyXG5pbXBvcnQgTG9jYWxTdG9yYWdlIGZyb20gJy4vbW9kdWxlcy9sb2NhbFN0b3JhZ2UuanMnO1xyXG5pbXBvcnQgQ29tcGxldGVUb0RvTGlzdCBmcm9tICcuL21vZHVsZXMvQ29tcGxldGVUb0RvTGlzdC5qcyc7XHJcblxyXG5kb2N1bWVudFxyXG4gIC5xdWVyeVNlbGVjdG9yKCcuZmEtYXJyb3dzLXJvdGF0ZScpXHJcbiAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpKTtcclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IGxpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvLWxpc3QnKTtcclxuICAgIGxpc3RDb250YWluZXIuaW5uZXJIVE1MID0gXHJcbiAgICAgICAgYDxwIGNsYXNzID0gXCJlcnJvci1tZXNzYWdlXCI+KkVycm9yPC9wPlxyXG4gICAgICAgIDxmb3JtIGNsYXNzPSBcImFkZC10by1saXN0XCIgYWN0aW9uPVwiXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQWRkIHRvIGxpc3QgLi4uXCIgcmVxdWlyZWQgLz5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1hcnJvdy1yaWdodC10by1icmFja2V0XCI+PC9pPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgICBgO1xyXG4gICAgICAgIFVJLnNob3dUb0RvTGlzdHMoKTtcclxuICAgICAgICBVSS5yZW1vdmVUb0RvTGlzdHMoKTtcclxuICAgICAgICBVSS51cGRhdGVEZXNjKCk7XHJcbiAgICAgICAgQ29tcGxldGVUb0RvTGlzdC5jb21wVG9Eb0xpc3QoKTtcclxuICAgICAgICBDb21wbGV0ZVRvRG9MaXN0LmNsZWFyQ29tcCgpOyAgICBcclxuICB9KVxyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvLWxpc3QnKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxyXG4gICAgY29uc3QgaW5wdXRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQnKTtcclxuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaW5wdXRUZXh0LnZhbHVlO1xyXG4gICAgY29uc3QgaW5kZXggPSB0b2RvbGlzdHMubGVuZ3RoICsgMTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHRvZG90YXNrID0gbmV3IFRvRG9MaXN0KGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIGluZGV4KTtcclxuXHJcbiAgICBVSS5hZGRUb0RvTGlzdHModG9kb3Rhc2spO1xyXG5cclxuICAgIExvY2FsU3RvcmFnZS5hZGRUb0RvTGlzdHModG9kb3Rhc2spO1xyXG5cclxuICAgIFVJLmNsZWFyRmllbGRzKCk7XHJcblxyXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gIH0pOyIsImltcG9ydCBMb2NhbFN0b3JhZ2UgZnJvbSAnLi9sb2NhbFN0b3JhZ2UuanMnO1xyXG5cclxuY2xhc3MgQ29tcGxldGVUb0RvTGlzdCB7XHJcbiAgc3RhdGljIGNvbXBUb0RvTGlzdCgpIHtcclxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyN0by1kby1saXN0JylcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveCcpO1xyXG5cclxuICAgIGNoZWNrYm94LmZvckVhY2goKGVsdCkgPT4ge1xyXG4gICAgICBlbHQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICBMb2NhbFN0b3JhZ2UudGFza0NvbXAoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjbGVhckNvbXAoKSB7XHJcbiAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGVhcicpO1xyXG4gICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGxldCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XHJcbiAgICAgIHRvZG9saXN0cyA9IHRvZG9saXN0cy5maWx0ZXIoKGVsdCkgPT4gZWx0LmNvbXBsZXRlZCAhPT0gdHJ1ZSk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICBMb2NhbFN0b3JhZ2UucmVzZXRJbmRleCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21wbGV0ZVRvRG9MaXN0O1xyXG4iLCJsZXQgdG9kb2xpc3RzID0gW107XHJcblxyXG5jbGFzcyBMb2NhbFN0b3JhZ2Uge1xyXG4gIHN0YXRpYyBnZXRUb0RvTGlzdHMoKSB7XHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0cycpID09PSBudWxsKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvZG9saXN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0cycpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0b2RvbGlzdHM7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkVG9Eb0xpc3RzKGRhdGEpIHtcclxuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcclxuICAgIHRvZG9saXN0cy5wdXNoKGRhdGEpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0cycsIEpTT04uc3RyaW5naWZ5KHRvZG9saXN0cykpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlbW92ZVRvRG9MaXN0cyhuZXdkZXNjKSB7XHJcbiAgICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XHJcbiAgICB0b2RvbGlzdHMuZm9yRWFjaCgoZGF0YSwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGRhdGEuZGVzY3JpcHRpb24gPT09IG5ld2Rlc2MpIHtcclxuICAgICAgICB0b2RvbGlzdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJFU0VUIElOREVYXHJcbiAgICBMb2NhbFN0b3JhZ2UucmVzZXRJbmRleCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlc2V0SW5kZXgoKSB7XHJcbiAgICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XHJcbiAgICB0b2RvbGlzdHMuZm9yRWFjaCgoZGF0YSwgaW5kZXgpID0+IHtcclxuICAgICAgZGF0YS5pbmRleCA9IGluZGV4ICsgMTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0cycsIEpTT04uc3RyaW5naWZ5KHRvZG9saXN0cykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdXBkYXRlRGVzYyhkZXNjcmlwdGlvbiwgaW5kZXgpIHtcclxuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb2xpc3RzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGlmICh0b2RvbGlzdHNbaV0uaW5kZXggPT09ICtpbmRleCkge1xyXG4gICAgICAgIHRvZG9saXN0c1tpXS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHRhc2tDb21wKGluZGV4KSB7XHJcbiAgICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG9saXN0cy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBpZiAodG9kb2xpc3RzW2ldLmluZGV4ID09PSAraW5kZXgpIHtcclxuICAgICAgICB0b2RvbGlzdHNbaV0uY29tcGxldGVkID0gIXRvZG9saXN0c1tpXS5jb21wbGV0ZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvY2FsU3RvcmFnZTtcclxuIiwiY2xhc3MgVG9Eb0xpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb0RvTGlzdDsiLCJpbXBvcnQgTG9jYWxTdG9yYWdlIGZyb20gXCIuL2xvY2FsU3RvcmFnZS5qc1wiO1xyXG5jbGFzcyBVSSB7XHJcbiAgICBzdGF0aWMgYWRkVG9Eb0xpc3RzKGRhdGEpIHtcclxuICAgICAgICBjb25zdCBsaXN0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG8tbGlzdCcpO1xyXG4gICAgICAgIGNvbnN0IGxpc3RpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBsaXN0aXRlbS5jbGFzc0xpc3QgPSAnbmV3JztcclxuICAgICAgICBsaXN0aXRlbS5pZCA9IGBcclxuICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0c1wiPjxpbnB1dCBjbGFzcz1cImNoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCIgJHtkYXRhLmNvbXBsZXRlZH0gLz48aW5wdXQgY2xhc3M9XCJkZXNjcmlwdGlvblwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke2RhdGEuZGVzY3JpcHRpb259XCIgLz48L3NwYW4+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRleHQtYnRuXCIgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaC1jYW5cIj48L2k+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgYDtcclxuICAgICAgICBsaXN0Q29udGVudC5hcHBlbmRDaGlsZChsaXN0aXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFyRmllbGRzKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0JykudmFsdWUgPSAnJztcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RhdGljIHNob3dUb0RvTGlzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xyXG4gICAgXHJcbiAgICAgICAgdG9kb2xpc3RzLmZvckVhY2goKGRhdGEpID0+IFVJLmFkZFRvRG9MaXN0cyhkYXRhKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0YXRpYyByZW1vdmVUb0RvTGlzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgZHVzdGJpbiA9IGRvY3VtZW50XHJcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcignI3RvLWRvLWxpc3QnKVxyXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYS10cmFzaC1jYW4nKTtcclxuICAgIFxyXG4gICAgICAgIGR1c3RiaW4uZm9yRWFjaCgoYmluKSA9PiB7XHJcbiAgICAgICAgICBiaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsdCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKGVsdC5jbGFzc0xpc3QuY29udGFpbnMoJ3RleHQtYnRuJykpIHtcclxuICAgICAgICAgICAgICBlbHQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XHJcbiAgICBcclxuICAgICAgICAgICAgTG9jYWxTdG9yYWdlLnJlbW92ZVRvRG9MaXN0cyhcclxuICAgICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW5bMV0udmFsdWUsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RhdGljIHVwZGF0ZURlc2MoKSB7XHJcbiAgICAgICAgY29uc3QgZGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0by1kby1saXN0JykucXVlcnlTZWxlY3RvckFsbCgnLmRlc2NyaXB0aW9uJyk7XHJcbiAgICBcclxuICAgICAgICBkZXNjLmZvckVhY2goKGVsdCkgPT4ge1xyXG4gICAgICAgICAgZWx0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIExvY2FsU3RvcmFnZS51cGRhdGVEZXNjKFxyXG4gICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZCxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVJOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==