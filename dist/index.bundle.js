"use strict";
(self["webpackChunktodolist_webpack"] = self["webpackChunktodolist_webpack"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui.js */ "./src/modules/ui.js");
// import './style.css';


document.onload((0,_modules_ui_js__WEBPACK_IMPORTED_MODULE_0__["default"])());

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addToDoLists);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDMkM7O0FBRTNDLGdCQUFnQiwwREFBWTs7Ozs7Ozs7Ozs7Ozs7QUNINUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxnQkFBZ0I7QUFDbEUsd0RBQXdELGlCQUFpQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0LXdlYnBhY2svLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qtd2VicGFjay8uL3NyYy9tb2R1bGVzL3VpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGFkZFRvRG9MaXN0cyBmcm9tICcuL21vZHVsZXMvdWkuanMnO1xuXG5kb2N1bWVudC5vbmxvYWQoYWRkVG9Eb0xpc3RzKCkpOyIsImNvbnN0IGxpc3RDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvLWRvLWxpc3QnKTtcblxuY29uc3QgbGlzdHMgPSBbXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ3RvZG8xJyxcbiAgICBjb21wbGV0ZWQ6ICd0cnVlJyxcbiAgICBpbmRleDogJzEnLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICd0b2RvMicsXG4gICAgY29tcGxldGVkOiAnZmFsc2UnLFxuICAgIGluZGV4OiAnMicsXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ3RvZG8zJyxcbiAgICBjb21wbGV0ZWQ6ICd0cnVlJyxcbiAgICBpbmRleDogJzMnLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICd0b2RvNCcsXG4gICAgY29tcGxldGVkOiAnZmFsc2UnLFxuICAgIGluZGV4OiAnNCcsXG4gIH0sXG5dO1xuXG5jb25zdCBhZGRUb0RvTGlzdHMgPSAoKSA9PiB7XG4gIGxpc3RzLmZvckVhY2goKGRhdGEpID0+IHtcbiAgICBjb25zdCBsaXN0aXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGlzdGl0ZW0uZGF0YXNldC5saXN0SWQgPSBkYXRhLmluZGV4O1xuICAgIGxpc3RpdGVtLmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94Jyk7XG4gICAgbGlzdGl0ZW0uaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dHNcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiY2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiAke2RhdGEuY29tcGxldGVkfSAvPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJkZXNjcmlwdGlvblwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke2RhdGEuZGVzY3JpcHRpb259XCIgLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICBgO1xuICAgIGxpc3RDb250ZW50LmFwcGVuZENoaWxkKGxpc3RpdGVtKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGRUb0RvTGlzdHM7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9