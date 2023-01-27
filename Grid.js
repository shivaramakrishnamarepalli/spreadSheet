import { Cell } from "./Cell.js";
import { columnNumberToLetter } from "./unicodeConversions.js";
//import { createDiv } from "./Resize.js";
//import { setListeners } from "./Resize.js";

export const Grid = {
  cellsArray: null,
  fixedRow: null,
  fixedCol: null,
  createGrid(container, numberOfRows, numberOfColumns) {
    numberOfRows++;
    this.cellsArray = Array.from(
      Array(numberOfRows),
      () => new Array(numberOfColumns)
    );
    this.fixedRow = [];
    this.fixedCol = [];
    container.classList.add("grid-container");
    container.classList.add("grid-container-wrapper");

    for (let i = 1; i <= numberOfColumns * numberOfRows; i++) {
      let grid;
      if (i % numberOfColumns == 1) {
        grid = document.createElement("div");
        grid.style.width = "30px";
        grid.textContent = `${Math.ceil(i / numberOfColumns) - 1}`;
        grid.classList.add("vertical-index");
        this.fixedRow[Math.ceil(i / numberOfColumns) - 1] = grid;
      } else if (i <= numberOfColumns) {
        grid = document.createElement("div");
        const columnNumber =
          Math.ceil(i % numberOfColumns) - 1 == -1
            ? numberOfColumns - 1
            : Math.ceil(i % numberOfColumns) - 1;
        const columnLetter = columnNumberToLetter(columnNumber);
        grid.textContent = columnLetter;
        grid.style.width = "90px";
        grid.classList.add("horizontal-index");
        this.fixedCol[columnNumber] = grid;

        //var div = createDiv(numberOfRows*22);//just for trial calculate it correctly later
        //grid.appendChild(div);
        //grid.style.position = 'relative';
        //setListeners(div);                    
        
      } else {
        const columnNumber =
          Math.ceil(i % numberOfColumns) - 1 == -1
            ? numberOfColumns - 1
            : Math.ceil(i % numberOfColumns) - 1;
        const columnLetter = columnNumberToLetter(columnNumber);
        const rowNumber = Math.ceil(i / numberOfColumns) - 1;
        const cell = new Cell(rowNumber, columnLetter, container);
        this.cellsArray[rowNumber][columnNumber] = cell;
        cell.setWidth("90px");
        cell.setHeight("22px");
      }
      if (i == 1) {
        grid.textContent = "";
        grid.classList.remove("vertical-index");
        grid.style.height="25px";
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
  },
};
