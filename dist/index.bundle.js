(self["webpackChunktodolist_webpack"] = self["webpackChunktodolist_webpack"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

document
  .querySelector('.fa-arrows-rotate')
  .addEventListener('click', () => window.location.reload());

  document.addEventListener('DOMContentLoaded', () => {
    listContainer = document.querySelector('.add-to-list');
    listContainer.innerHTML = 
        `<p class = "error-message">*Error</p>
        <form class= "add-to-list" action="">
            <input type="text" class="text" placeholder="Add to list ..." required />
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </form>
        `;
  })

  document.querySelector('.add-to-list').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    const inputText = document.querySelector('.text');
    const todolists = LocalStorage.getToDoLists();
    const description = inputText.value;
    const index = todolists.length + 1;
    const completed = false;

    const todotask = new ToDoList(description, completed, index);

    UserInterface.addToDoLists(todotask);

    LocalStorage.addToDoLists(todotask);

    UserInterface.clearFields();

    window.location.reload();
  });

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC13ZWJwYWNrLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50XHJcbiAgLnF1ZXJ5U2VsZWN0b3IoJy5mYS1hcnJvd3Mtcm90YXRlJylcclxuICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCkpO1xyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG8tbGlzdCcpO1xyXG4gICAgbGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSBcclxuICAgICAgICBgPHAgY2xhc3MgPSBcImVycm9yLW1lc3NhZ2VcIj4qRXJyb3I8L3A+XHJcbiAgICAgICAgPGZvcm0gY2xhc3M9IFwiYWRkLXRvLWxpc3RcIiBhY3Rpb249XCJcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJBZGQgdG8gbGlzdCAuLi5cIiByZXF1aXJlZCAvPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWFycm93LXJpZ2h0LXRvLWJyYWNrZXRcIj48L2k+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIGA7XHJcbiAgfSlcclxuXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10by1saXN0JykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgIC8vIFByZXZlbnQgYWN0dWFsIHN1Ym1pdFxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxyXG4gICAgY29uc3QgaW5wdXRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQnKTtcclxuICAgIGNvbnN0IHRvZG9saXN0cyA9IExvY2FsU3RvcmFnZS5nZXRUb0RvTGlzdHMoKTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaW5wdXRUZXh0LnZhbHVlO1xyXG4gICAgY29uc3QgaW5kZXggPSB0b2RvbGlzdHMubGVuZ3RoICsgMTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHRvZG90YXNrID0gbmV3IFRvRG9MaXN0KGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIGluZGV4KTtcclxuXHJcbiAgICBVc2VySW50ZXJmYWNlLmFkZFRvRG9MaXN0cyh0b2RvdGFzayk7XHJcblxyXG4gICAgTG9jYWxTdG9yYWdlLmFkZFRvRG9MaXN0cyh0b2RvdGFzayk7XHJcblxyXG4gICAgVXNlckludGVyZmFjZS5jbGVhckZpZWxkcygpO1xyXG5cclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICB9KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=