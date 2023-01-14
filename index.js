import { Cell } from "./Cell.js";
let cells = [];

import { compute } from "./Compute.js";
compute("23+44-33*2+6/2")

function createGrid(n, m) {
  let container = document.createElement("div");
  container.classList.add("grid-container");
  container.style.width = `${156 * m}px`;
  container.style.height = `${n * 30}px`;
  container.style.backgroundColor = "rgb(135, 190, 237)";

  for (let i = 1; i <= m * n; i++) {
    let grid;
    if (i % m == 1) {
      grid = document.createElement("div");
      grid.style.width = "30px";
      grid.textContent = `${Math.ceil(i / m) - 1}`;
    } else if (i <= m) {
      grid = document.createElement("div");
      grid.textContent = `${
        Math.ceil(i % m) - 1 == -1 ? m - 1 : Math.ceil(i % m) - 1
      }`;
      grid.style.width = "150px";
    } else {
      const cell = new Cell(Math.ceil(i / m) - 1, (i % m) - 1, container);
      cells.push(cell);
      cell.setWidth("150px");
    }
    if (i == 1) {
      grid.textContent = "";
    }
    if (i % m == 1 || i <= m) {
      grid.type = "text";
      grid.classList.add("grid-item");
      container.appendChild(grid);
      grid.setAttribute("row", Math.ceil(i / m) - 1);
      grid.setAttribute("colomn", (i % m) - 1);
    }
  }

  document.body.appendChild(container);
}
createGrid(20, 20); //creating a grid with 20 rows



let container = document.querySelector(".grid-container");
//container.addEventListener("click", handleClick);
let current = cells[0];


function handleClick(event) {
  if (event.target.className !== "grid-item cell") return;
  const cellTarget = cells.find((a) => a.id == event.target.id);
  current = cellTarget
  console.log(cellTarget)//printing undefined to console                --  main problem
  const handleKeydown = (e) => {
      if (event.target.className !== "grid-item cell") return;
      if (e.code !== "Enter") return;
      cellTarget.setValue(e.target.innerText);
      console.log(cellTarget.getValue())
  };
  document.addEventListener("keydown", handleKeydown);
}


//only the current is changing input is not being taken to new tab
document.onkeydown = checkKey;
function checkKey(e) {
  const handleKeydown = (e) => {
    if (e.target.className !== "grid-item cell") return;
    if (e.code !== "Enter") return;
    current.setValue(e.target.innerText);
    console.log(current.getValue())
  };
  document.addEventListener("keydown", handleKeydown);

    if (e.keyCode == '40') {
      // down arrow
      let currentRow = current.row;
      let currentCol = current.column;
      let nextRow = currentRow + 1;
      let nextCell = cells.find((a) => a.row == nextRow && a.column == currentCol);
      if(nextCell){
        current.getDomReference().style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        current = nextCell;
        current.getDomReference().style.backgroundColor = "red";
      }
    }
    else if (e.keyCode == '38') {
      // up arrow
      let currentRow = current.row;
      let currentCol = current.column;
      let nextRow = currentRow - 1;
      let nextCell = cells.find((a) => a.row == nextRow && a.column == currentCol);
      if(nextCell){
        current.getDomReference().style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        current = nextCell;
        current.getDomReference().style.backgroundColor = "red";
      }
    }
    else if (e.keyCode == '37') {
      // left arrow
      let currentRow = current.row;
      let currentCol = current.column;
      let nextCol = currentCol - 1;
      let nextCell = cells.find((a) => a.row == currentRow && a.column == nextCol);
      if(nextCell){
        current.getDomReference().style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        current = nextCell;
        current.getDomReference().style.backgroundColor = "red";
      }
    }
    else if (e.keyCode == '39') {
      // right arrow
      let currentRow = current.row;
      let currentCol = current.column;
      let nextCol = currentCol + 1;
      let nextCell = cells.find((a) => a.row == currentRow && a.column == nextCol);
      if(nextCell){
        current.getDomReference().style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        current = nextCell;
        current.getDomReference().style.backgroundColor = "red";
      }
    }
}
