import {Cell} from './Cell.js'
let cells = [];
function createGrid(n) {
  let container = document.createElement("div");
  container.classList.add("grid-container");
  for (let i = 0; i < 10 * n; i++) {
    cells[i] = new Cell(Math.ceil(i / 10), i % 10, container);
  }
  document.body.appendChild(container);
}
createGrid(20);
let container = document.querySelector(".grid-container");
container.addEventListener("click", handleClick);
function handleClick(event) {
  console.log(event.target)
  console.log(event.target.id)
  const cellTarget = cells.find((a) => a.getId()==event.target.id)
  console.log(cellTarget)
}