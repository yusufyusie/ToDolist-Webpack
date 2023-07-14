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
  listContainer.innerHTML = `<p class = "error-message">*Error</p>
        <form class= "add-to-list" action="">
            <input type="text" class="text" placeholder="Add to list ..." required />
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </form>
        `;
  _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].showToDoLists();
  _modules_ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeToDoLists();
  _modules_CompleteToDoList_js__WEBPACK_IMPORTED_MODULE_3__["default"].compToDoList();
  _modules_CompleteToDoList_js__WEBPACK_IMPORTED_MODULE_3__["default"].clearComp();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDNkM7QUFDWjtBQUNvQjtBQUNROztBQUU3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsc0RBQUU7QUFDSixFQUFFLHNEQUFFO0FBQ0osRUFBRSxvRUFBZ0I7QUFDbEIsRUFBRSxvRUFBZ0I7QUFDbEIsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGdFQUFZO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsNERBQVE7O0FBRS9CLEVBQUUsc0RBQUU7O0FBRUosRUFBRSxnRUFBWTs7QUFFZCxFQUFFLHNEQUFFOztBQUVKO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUM0Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSx3REFBWTtBQUNwQixPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix3REFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQSxNQUFNLHdEQUFZO0FBQ2xCLEtBQUs7QUFDTDtBQUNBOztBQUVBLGlFQUFlLGdCQUFnQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMzQmhDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzVENUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7Ozs7O0FDUnNCOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBLGtEQUFrRCxnQkFBZ0I7QUFDbEUsd0RBQXdELGlCQUFpQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0Isd0RBQVk7O0FBRWxDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQix3REFBWTtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHdEQUFZO0FBQ3BCO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUVBQWUsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0LXdlYnBhY2svLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qtd2VicGFjay8uL3NyYy9tb2R1bGVzL0NvbXBsZXRlVG9Eb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qtd2VicGFjay8uL3NyYy9tb2R1bGVzL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL21vZHVsZXMvdG9Eb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qtd2VicGFjay8uL3NyYy9tb2R1bGVzL3VpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vbW9kdWxlcy90b0RvTGlzdC5qcyc7XG5pbXBvcnQgVUkgZnJvbSAnLi9tb2R1bGVzL3VpLmpzJztcbmltcG9ydCBMb2NhbFN0b3JhZ2UgZnJvbSAnLi9tb2R1bGVzL2xvY2FsU3RvcmFnZS5qcyc7XG5pbXBvcnQgQ29tcGxldGVUb0RvTGlzdCBmcm9tICcuL21vZHVsZXMvQ29tcGxldGVUb0RvTGlzdC5qcyc7XG5cbmRvY3VtZW50XG4gIC5xdWVyeVNlbGVjdG9yKCcuZmEtYXJyb3dzLXJvdGF0ZScpXG4gIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGxpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvLWxpc3QnKTtcbiAgbGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSBgPHAgY2xhc3MgPSBcImVycm9yLW1lc3NhZ2VcIj4qRXJyb3I8L3A+XG4gICAgICAgIDxmb3JtIGNsYXNzPSBcImFkZC10by1saXN0XCIgYWN0aW9uPVwiXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkFkZCB0byBsaXN0IC4uLlwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWFycm93LXJpZ2h0LXRvLWJyYWNrZXRcIj48L2k+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgYDtcbiAgVUkuc2hvd1RvRG9MaXN0cygpO1xuICBVSS5yZW1vdmVUb0RvTGlzdHMoKTtcbiAgQ29tcGxldGVUb0RvTGlzdC5jb21wVG9Eb0xpc3QoKTtcbiAgQ29tcGxldGVUb0RvTGlzdC5jbGVhckNvbXAoKTtcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvLWxpc3QnKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgaW5wdXRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQnKTtcbiAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGlucHV0VGV4dC52YWx1ZTtcbiAgY29uc3QgaW5kZXggPSB0b2RvbGlzdHMubGVuZ3RoICsgMTtcbiAgY29uc3QgY29tcGxldGVkID0gZmFsc2U7XG5cbiAgY29uc3QgdG9kb3Rhc2sgPSBuZXcgVG9Eb0xpc3QoZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgaW5kZXgpO1xuXG4gIFVJLmFkZFRvRG9MaXN0cyh0b2RvdGFzayk7XG5cbiAgTG9jYWxTdG9yYWdlLmFkZFRvRG9MaXN0cyh0b2RvdGFzayk7XG5cbiAgVUkuY2xlYXJGaWVsZHMoKTtcblxuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG59KTsiLCJpbXBvcnQgTG9jYWxTdG9yYWdlIGZyb20gJy4vbG9jYWxTdG9yYWdlLmpzJztcblxuY2xhc3MgQ29tcGxldGVUb0RvTGlzdCB7XG4gIHN0YXRpYyBjb21wVG9Eb0xpc3QoKSB7XG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyN0by1kby1saXN0JylcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tib3gnKTtcblxuICAgIGNoZWNrYm94LmZvckVhY2goKGVsdCkgPT4ge1xuICAgICAgZWx0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAgIExvY2FsU3RvcmFnZS50YXNrQ29tcChlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJDb21wKCkge1xuICAgIGNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyJyk7XG4gICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICAgICAgdG9kb2xpc3RzID0gdG9kb2xpc3RzLmZpbHRlcigoZWx0KSA9PiBlbHQuY29tcGxldGVkICE9PSB0cnVlKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIExvY2FsU3RvcmFnZS5yZXNldEluZGV4KCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcGxldGVUb0RvTGlzdDtcbiIsImxldCB0b2RvbGlzdHMgPSBbXTtcblxuY2xhc3MgTG9jYWxTdG9yYWdlIHtcbiAgc3RhdGljIGdldFRvRG9MaXN0cygpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0cycpID09PSBudWxsKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZG9saXN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0cycpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRvZG9saXN0cztcbiAgfVxuXG4gIHN0YXRpYyBhZGRUb0RvTGlzdHMoZGF0YSkge1xuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgICB0b2RvbGlzdHMucHVzaChkYXRhKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlVG9Eb0xpc3RzKG5ld2Rlc2MpIHtcbiAgICBjb25zdCB0b2RvbGlzdHMgPSBMb2NhbFN0b3JhZ2UuZ2V0VG9Eb0xpc3RzKCk7XG4gICAgdG9kb2xpc3RzLmZvckVhY2goKGRhdGEsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoZGF0YS5kZXNjcmlwdGlvbiA9PT0gbmV3ZGVzYykge1xuICAgICAgICB0b2RvbGlzdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0cycsIEpTT04uc3RyaW5naWZ5KHRvZG9saXN0cykpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUkVTRVQgSU5ERVhcbiAgICBMb2NhbFN0b3JhZ2UucmVzZXRJbmRleCgpO1xuICB9XG5cbiAgc3RhdGljIHJlc2V0SW5kZXgoKSB7XG4gICAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICAgIHRvZG9saXN0cy5mb3JFYWNoKChkYXRhLCBpbmRleCkgPT4ge1xuICAgICAgZGF0YS5pbmRleCA9IGluZGV4ICsgMTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVEZXNjKGRlc2NyaXB0aW9uLCBpbmRleCkge1xuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG9saXN0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRvZG9saXN0c1tpXS5pbmRleCA9PT0gK2luZGV4KSB7XG4gICAgICAgIHRvZG9saXN0c1tpXS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRhc2tDb21wKGluZGV4KSB7XG4gICAgY29uc3QgdG9kb2xpc3RzID0gTG9jYWxTdG9yYWdlLmdldFRvRG9MaXN0cygpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb2xpc3RzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodG9kb2xpc3RzW2ldLmluZGV4ID09PSAraW5kZXgpIHtcbiAgICAgICAgdG9kb2xpc3RzW2ldLmNvbXBsZXRlZCA9ICF0b2RvbGlzdHNbaV0uY29tcGxldGVkO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3RzJywgSlNPTi5zdHJpbmdpZnkodG9kb2xpc3RzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9jYWxTdG9yYWdlO1xuIiwiY2xhc3MgVG9Eb0xpc3Qge1xuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBpbmRleCkge1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9Eb0xpc3Q7IiwiaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tICcuL2xvY2FsU3RvcmFnZS5qcyc7XG5cbmNsYXNzIFVJIHtcbiAgc3RhdGljIGFkZFRvRG9MaXN0cyhkYXRhKSB7XG4gICAgY29uc3QgbGlzdENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG8tZG8tbGlzdCcpO1xuICAgIGNvbnN0IGxpc3RpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBsaXN0aXRlbS5jbGFzc0xpc3QgPSAnbmV3JztcbiAgICBsaXN0aXRlbS5pZCA9IGAke2RhdGEuaW5kZXh9YDtcbiAgICBsaXN0aXRlbS5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0c1wiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJjaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiICR7ZGF0YS5jb21wbGV0ZWR9IC8+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImRlc2NyaXB0aW9uXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7ZGF0YS5kZXNjcmlwdGlvbn1cIiAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ0ZXh0LWJ0blwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoLWNhblwiPjwvaT5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIGA7XG4gICAgbGlzdENvbnRlbnQuYXBwZW5kQ2hpbGQobGlzdGl0ZW0pO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyRmllbGRzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0JykudmFsdWUgPSAnJztcbiAgfVxuXG4gIHN0YXRpYyBzaG93VG9Eb0xpc3RzKCkge1xuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcblxuICAgIHRvZG9saXN0cy5mb3JFYWNoKChkYXRhKSA9PiBVSS5hZGRUb0RvTGlzdHMoZGF0YSkpO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRvRG9MaXN0cygpIHtcbiAgICBjb25zdCBkdXN0YmluID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcudG8tZG8tbGlzdCcpXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLmZhLXRyYXNoLWNhbicpO1xuXG4gICAgZHVzdGJpbi5mb3JFYWNoKChiaW4pID0+IHtcbiAgICAgIGJpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcbiAgICAgICAgY29uc3QgZWx0ID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcblxuICAgICAgICBpZiAoZWx0LmNsYXNzTGlzdC5jb250YWlucygndGV4dC1idG4nKSkge1xuICAgICAgICAgIGVsdC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdHMnLCBKU09OLnN0cmluZ2lmeSh0b2RvbGlzdHMpKTtcblxuICAgICAgICBMb2NhbFN0b3JhZ2UucmVtb3ZlVG9Eb0xpc3RzKFxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlblsxXS52YWx1ZSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVJOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==