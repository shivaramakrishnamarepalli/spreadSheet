import { Cell } from "./Cell.js";
let cells = [];

import { compute } from "./Compute.js";
compute("23+44-33*2+6/2")

function createGrid(n) {
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
      //creating a new cell object 
      const cell = new Cell(Math.ceil(i / m) - 1, (i % m) - 1,"25px","150px", container);
      cells.push(cell); //adding the cell object to 'cells' array
      cell.getDomReference().style.width = "150px";
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

let m = 20; // number of columns declared in grid container of css
let n=200;
createGrid(200); //creating a grid with 200 rows

let container = document.querySelector(".grid-container");
container.addEventListener("click", handleClick);
function handleClick(event) {
  const cellTarget = cells.find((a) => a.getId() == event.target.id);
  console.log(cellTarget);
}
                                // Read this.

// fix this the get width and set width are not working i am not able to do it 
// and also we should create a array for indexes also so when a row is resized the  index will also be resized 
// and if we are not able to resolve this we can just move to the previous version of the code so lets just try this.


container.addEventListener("mousedown", function(e) {
  if (e.target.classList.contains("grid-item")) {
    let initialWidth = e.target.getWidth();
    let initialX = e.clientX;
    let currentCol = e.target.column;

    let mouseMoveHandler = function(e) {
      let widthDiff = e.clientX - initialX;
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].column == currentCol) {
          cells[i].setWidth(initialWidth + widthDiff + "px");
        }
      }
    };

    let mouseUpHandler = function() {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }
});



