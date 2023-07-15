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
        _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].taskComp(e.target.parentElement.parentElement.id);
      });
    });
  }

  static clearCompleted() {
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', () => {
      let todolists = _localStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getToDoLists();
      todolists = todolists.filter((elemnt) => elemnt.comp !== true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDNkM7QUFDWjtBQUNvQjtBQUNBOztBQUVyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsc0RBQUU7QUFDSixFQUFFLHNEQUFFO0FBQ0osRUFBRSxnRUFBWTtBQUNkLEVBQUUsZ0VBQVk7QUFDZCxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsZ0VBQVk7QUFDaEM7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qiw0REFBUTs7QUFFL0IsRUFBRSxzREFBRTs7QUFFSixFQUFFLGdFQUFZOztBQUVkLEVBQUUsc0RBQUU7O0FBRUo7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxQzRDOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHdEQUFZO0FBQ3BCLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHdEQUFZO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLE1BQU0sd0RBQVk7QUFDbEIsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUVBQWUsWUFBWTs7Ozs7Ozs7Ozs7Ozs7QUMzQjNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3pENUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7Ozs7O0FDUnNCOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBLGtEQUFrRCxnQkFBZ0I7QUFDbEUsd0RBQXdELGlCQUFpQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQix3REFBWTs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdEQUFZO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsd0RBQVk7QUFDcEI7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSx3REFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUVBQWUsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0LXdlYnBhY2svLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qtd2VicGFjay8uL3NyYy9tb2R1bGVzL0NvbXBsZXRlbGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL21vZHVsZXMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9saXN0LXdlYnBhY2svLi9zcmMvbW9kdWxlcy90b0RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL21vZHVsZXMvdWkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9tb2R1bGVzL3RvRG9MaXN0LmpzJztcbmltcG9ydCBVSSBmcm9tICcuL21vZHVsZXMvdWkuanMnO1xuaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tICcuL21vZHVsZXMvbG9jYWxTdG9yYWdlLmpzJztcbmltcG9ydCBDb21wbGV0ZWxpc3QgZnJvbSAnLi9tb2R1bGVzL0NvbXBsZXRlbGlzdC5qcyc7XG5cbmRvY3VtZW50XG4gIC5xdWVyeVNlbGVjdG9yKCcuZmEtYXJyb3dzLXJvdGF0ZScpXG4gIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGxpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvLWxpc3QnKTtcbiAgbGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSBgPHAgY2xhc3MgPSBcImVycm9yLW1lc3NhZ2VcIj4qRXJyb3I8L3A+XG4gICAgICAgIDxmb3JtIGNsYXNzPSBcImFkZC10by1saXN0XCIgYWN0aW9uPVwiXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkFkZCB0byBsaXN0IC4uLlwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWFycm93LXJpZ2h0LXRvLWJyYWNrZXRcIj48L2k+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgYDtcbiAgVUkuc2hvd1RvRG9MaXN0cygpO1xuICBVSS5yZW1vdmVUb0RvTGlzdHMoKTtcbiAgQ29tcGxldGVsaXN0LkNvbXBsZXRlVG9Eb0xpc3QoKTtcbiAgQ29tcGxldGVsaXN0LmNsZWFyQ29tcGxldGVkKCk7XG59KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10by1saXN0JykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IGlucHV0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0Jyk7XG4gIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBpbnB1dFRleHQudmFsdWU7XG4gIGNvbnN0IGluZGV4ID0gdG9kb2xpc3RzLmxlbmd0aCArIDE7XG4gIGNvbnN0IGNvbXBsZXRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IHRvZG90YXNrID0gbmV3IFRvRG9MaXN0KGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIGluZGV4KTtcblxuICBVSS5hZGRUb0RvTGlzdHModG9kb3Rhc2spO1xuXG4gIExvY2FsU3RvcmFnZS5hZGRUb0RvTGlzdHModG9kb3Rhc2spO1xuXG4gIFVJLmNsZWFyRmllbGRzKCk7XG5cbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufSk7IiwiaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tICcuL2xvY2FsU3RvcmFnZS5qcyc7XG5cbmNsYXNzIENvbXBsZXRlbGlzdCB7XG4gIHN0YXRpYyBDb21wbGV0ZVRvRG9MaXN0KCkge1xuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcudG8tZG8tbGlzdCcpXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94Jyk7XG5cbiAgICBjaGVja2JveC5mb3JFYWNoKChlbGVtbnQpID0+IHtcbiAgICAgIGVsZW1udC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgICBMb2NhbFN0b3JhZ2UudGFza0NvbXAoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyQ29tcGxldGVkKCkge1xuICAgIGNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyJyk7XG4gICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICAgICAgdG9kb2xpc3RzID0gdG9kb2xpc3RzLmZpbHRlcigoZWxlbW50KSA9PiBlbGVtbnQuY29tcCAhPT0gdHJ1ZSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICBMb2NhbFN0b3JhZ2UucmVzZXRJbmRleCgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBsZXRlbGlzdDsiLCJsZXQgdG9kb2xpc3RzID0gW107XG5cbmNsYXNzIExvY2FsU3RvcmFnZSB7XG4gIHN0YXRpYyBhZGRUb0RvTGlzdHMoZGF0YSkge1xuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgICB0b2RvbGlzdHMucHVzaChkYXRhKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0VG9Eb0xpc3RzKCkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb2xpc3RzJykgPT09IG51bGwpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9kb2xpc3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb2xpc3RzJykpO1xuICAgIH1cbiAgICByZXR1cm4gdG9kb2xpc3RzO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRvRG9MaXN0cyhuZXdkZXNjKSB7XG4gICAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICAgIHRvZG9saXN0cy5mb3JFYWNoKChkYXRhLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGRhdGEuZGVzY3JpcHRpb24gPT09IG5ld2Rlc2MpIHtcbiAgICAgICAgdG9kb2xpc3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBMb2NhbFN0b3JhZ2UucmVzZXRJbmRleCgpO1xuICB9XG5cbiAgc3RhdGljIHJlc2V0SW5kZXgoKSB7XG4gICAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICAgIHRvZG9saXN0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgaXRlbS5pbmRleCA9IGluZGV4ICsgMTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVEZXNjKGRlc2NyaXB0aW9uLCBpbmRleCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb2xpc3RzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodG9kb2xpc3RzW2ldLmluZGV4ID09PSAraW5kZXgpIHtcbiAgICAgICAgdG9kb2xpc3RzW2ldLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY29tcGxldGV0YXNrKGluZGV4KSB7XG4gICAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb2xpc3RzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodG9kb2xpc3RzW2ldLmluZGV4ID09PSAraW5kZXgpIHtcbiAgICAgICAgdG9kb2xpc3RzW2ldLmNvbXBsZXRlZCA9ICF0b2RvbGlzdHNbaV0uY29tcGxldGVkO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9jYWxTdG9yYWdlO1xuIiwiY2xhc3MgVG9Eb0xpc3Qge1xuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBpbmRleCkge1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9Eb0xpc3Q7IiwiaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tICcuL2xvY2FsU3RvcmFnZS5qcyc7XG5cbmNsYXNzIFVJIHtcbiAgc3RhdGljIGFkZFRvRG9MaXN0cyhkYXRhKSB7XG4gICAgY29uc3QgbGlzdENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG8tZG8tbGlzdCcpO1xuICAgIGNvbnN0IGxpc3RpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBsaXN0aXRlbS5jbGFzc0xpc3QgPSAnbmV3JztcbiAgICBsaXN0aXRlbS5pZCA9IGAke2RhdGEuaW5kZXh9YDtcbiAgICBsaXN0aXRlbS5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0c1wiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJjaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiICR7ZGF0YS5jb21wbGV0ZWR9IC8+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImRlc2NyaXB0aW9uXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7ZGF0YS5kZXNjcmlwdGlvbn1cIiAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ0ZXh0LWJ0blwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoLWNhblwiPjwvaT5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIGA7XG4gICAgbGlzdENvbnRlbnQuYXBwZW5kQ2hpbGQobGlzdGl0ZW0pO1xuICB9XG5cbiAgc3RhdGljIHNob3dUb0RvTGlzdHMoKSB7XG4gICAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuXG4gICAgdG9kb2xpc3RzLmZvckVhY2goKGRhdGEpID0+IFVJLmFkZFRvRG9MaXN0cyhkYXRhKSk7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJGaWVsZHMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQnKS52YWx1ZSA9ICcnO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRvRG9MaXN0cygpIHtcbiAgICBjb25zdCByZW1vdmUgPSBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy50by1kby1saXN0JylcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcuZmEtdHJhc2gtY2FuJyk7XG4gICAgcmVtb3ZlLmZvckVhY2goKGJpbikgPT4ge1xuICAgICAgYmluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcblxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3RleHQtYnRuJykpIHtcbiAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0cycsIEpTT04uc3RyaW5naWZ5KHRvZG9saXN0cykpO1xuXG4gICAgICAgIExvY2FsU3RvcmFnZS5yZW1vdmVUb0RvTGlzdHMoXG4gICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNoaWxkcmVuWzFdLnZhbHVlLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlRGVzYygpIHtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0by1kby1saXN0JykucXVlcnlTZWxlY3RvckFsbCgnLmRlc2NyaXB0aW9uJyk7XG5cbiAgICBkZXNjcmlwdGlvbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAgIExvY2FsU3RvcmFnZS51cGRhdGVEZXNjKFxuICAgICAgICAgIGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZCxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVJOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==