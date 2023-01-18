import { Cell } from "./Cell.js";
import { columnNumberToLetter } from "./unicodeConversions.js";
export function createGrid(container, numberOfRows, numberOfColumns) {
  numberOfRows++;
  let cells = Array.from(Array(numberOfRows), () => new Array(numberOfColumns));
  let fixedRow = [];
  let fixedCol = [];
  container.classList.add("grid-container");
  container.classList.add("grid-container-wrapper");
  container.style.backgroundColor = "rgb(135, 190, 237)";

  for (let i = 1; i <= numberOfColumns * numberOfRows; i++) {
    let grid;
    if (i % numberOfColumns == 1) {
      grid = document.createElement("div");
      grid.style.width = "30px";
      grid.textContent = `${Math.ceil(i / numberOfColumns) - 1}`;
      grid.classList.add("horizontal-index");
      fixedRow[Math.ceil(i / numberOfColumns) - 1] = grid;
    } else if (i <= numberOfColumns) {
      grid = document.createElement("div");
      const columnNumber =
        Math.ceil(i % numberOfColumns) - 1 == -1
          ? numberOfColumns - 1
          : Math.ceil(i % numberOfColumns) - 1;
      const columnLetter = columnNumberToLetter(columnNumber);
      grid.textContent = columnLetter;
      grid.style.width = "150px";
      grid.classList.add("vertical-index");
      fixedCol[columnNumber] = grid;
    } else {
      const columnNumber =
        Math.ceil(i % numberOfColumns) - 1 == -1
          ? numberOfColumns - 1
          : Math.ceil(i % numberOfColumns) - 1;
      const columnLetter = columnNumberToLetter(columnNumber);
      const rowNumber = Math.ceil(i / numberOfColumns) - 1;
      const cell = new Cell(rowNumber, columnLetter, container);
      cells[rowNumber][columnNumber] = cell;
      cell.setWidth("150px");
    }
    if (i == 1) {
      grid.textContent = "";
      grid.classList.remove("vertical-index");
    }
    if (i % numberOfColumns == 1 || i <= numberOfColumns) {
      grid.type = "text";
      grid.classList.add("grid-item");
      container.appendChild(grid);
      grid.setAttribute("row", Math.ceil(i / numberOfColumns) - 1);
      grid.setAttribute("colomn", (i % numberOfColumns) - 1);
    }
  }

  let box = document.createElement("div");
  box.append(container);
  box.style.padding = "10px";
  document.body.appendChild(box);

  return [cells, fixedRow, fixedCol];
}
