import { Cell } from "./Cell.js";
export function createGrid(container, n, m) {
  let cells = [];
  container.classList.add("grid-container");
  container.style.width = `${157.5 * m}px`;
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
      const columnNumber =
        Math.ceil(i % m) - 1 == -1 ? m - 1 : Math.ceil(i % m) - 1;
      const charCodeOfA = "A".charCodeAt(0);
      const columnLetter = String.fromCharCode(charCodeOfA + columnNumber - 1);
      grid.textContent = columnLetter;
      grid.style.width = "150px";
    } else {
      const columnNumber =
        Math.ceil(i % m) - 1 == -1 ? m - 1 : Math.ceil(i % m) - 1;
      const charCodeOfA = "A".charCodeAt(0);
      const columnLetter = String.fromCharCode(charCodeOfA + columnNumber - 1);

      const cell = new Cell(Math.ceil(i / m) - 1, columnLetter, container);
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
  return cells;
}
/* https://stackoverflow.com/a/22021709 */
function unicodeToChar(text) {
  console.log(typeof text);
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
}
