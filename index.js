import { Cell } from "./Cell.js";
let cells = [];

import { compute } from "./Compute.js";
console.log(compute("23+44-33*2+6/2"))

function createGrid(n, m) {
  let container = document.createElement("div");
  container.classList.add("grid-container");
  container.style.width = `${156 * m}px`;
  container.style.height = `${n * 30}px`;
  container.style.backgroundColor = "rgb(135, 190, 237)";

  for (let i = 1; i <= m * n; i++) {
    let grid;
    if (i % m === 1) {
      grid = document.createElement("div");
      grid.style.width = "30px";
      grid.textContent = `${Math.ceil(i / m) - 1}`;
    } else if (i <= m) {
      grid = document.createElement("div");
      grid.textContent = `${
        Math.ceil(i % m) - 1 === -1 ? m - 1 : Math.ceil(i % m) - 1
      }`;
      grid.style.width = "150px";
    } else {
      let col =(i % m) - 1;
      if(col===-1){
        col=m-1
      }
      const cell = new Cell(Math.ceil(i / m) - 1,col ,i, container);
      cells.push(cell);
      cell.setWidth("150px");
    }
    if (i === 1) {
      grid.textContent = "";
    }
    if (i % m === 1 || i <= m) {
      grid.type = "text";
      grid.classList.add("grid-item");
      container.appendChild(grid);
      grid.setAttribute("row", Math.ceil(i / m) - 1);
      grid.setAttribute("colomn", (i % m) - 1);
    }
  }

  document.body.appendChild(container);
}
createGrid(200, 20); //creating a grid with 20 rows


let container = document.querySelector(".grid-container");
container.addEventListener("click", handleClick);
let current = cells[0];
current.getDomReference().classList.add("current-cell");
current.getDomReference().focus()

function handleClick(event) {
  if (event.target.className !== "grid-item cell") return;
  setCurrent(cells.find((a) => a.getId() == event.target.id));
}


document.onkeydown = checkKey;
function checkKey(e) {

  if(current.value===undefined)
  {
    current.value=""
  }
  if(!isNaN(e.key))
  {
    current.setValue(current.value+e.key);
  }

  let currentRow = current.row;
  let currentCol = current.column;
  if (e.keyCode == '40') {
    // down arrow
    let nextRow = currentRow + 1;
    let nextCell = cells.find((a) => a.row == nextRow && a.column == currentCol);
    if(nextCell){
      setCurrent(nextCell)
    }
  }
  else if (e.keyCode == '38') {
    // up arrow
    let nextRow = currentRow - 1;
    let nextCell = cells.find((a) => a.row == nextRow && a.column == currentCol);
    if(nextCell){
      setCurrent(nextCell)
    }
  }
  else if (e.keyCode == '37') {
    // left arrow
    let nextCol = currentCol - 1;
    let nextCell = cells.find((a) => a.row == currentRow && a.column == nextCol);
    if(nextCell){
      setCurrent(nextCell)
    }
  }
  else if (e.keyCode == '39') {
    // right arrow
    let nextCol = currentCol + 1;
    let nextCell = cells.find((a) => a.row == currentRow && a.column == nextCol);
    if(nextCell){
      setCurrent(nextCell)
    }
  }
}

function setCurrent(nextCell)
{
  current.getDomReference().classList.remove("current-cell");
  current.getDomReference().blur()
  current = nextCell;
  current.getDomReference().focus()
  current.getDomReference().classList.add("current-cell");
}