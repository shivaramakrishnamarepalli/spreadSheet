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

createGrid(200, 20); //creating a grid with 200 rows
let container = document.querySelector(".grid-container");
container.addEventListener("mouseover", handleMouseover);
//todo:
//navigate entire sheet through keys
//remove handleMouseover when another cell is focused using tab
function handleMouseover(event) {
  if (event.target.className !== "grid-item cell") return;
  const cellTarget = cells.find((a) => a.getId() == event.target.id);
  let cellClicked = false;
  const handleClick = (e) => {
    if (event.target.className !== "grid-item cell") return;
    cellClicked = true;
  };
  const handleKeydown = (e) => {
    if (event.target.className !== "grid-item cell") return;
    if (cellClicked) {
      if (e.code !== "Enter") return;
      cellTarget.getDomReference().blur();
      cellTarget.setValue(e.target.value);
      cellClicked = false;
    } else {
      cellTarget.getDomReference().focus();
      cellClicked = true;
    }
  };
  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeydown);
}
