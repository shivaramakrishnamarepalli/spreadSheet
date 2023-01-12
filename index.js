class Cell {
  constructor(row, col, parentContainer) {
    this.location = `${row}${col}`;
    this.domReference = document.createElement("input");
    this.domReference.setAttribute("id", this.location);
    this.domReference.classList.add("grid-item");
    parentContainer.appendChild(this.domReference);
  }
  setFormula(formula) {
    //extract formula
  }
  computeValue() {
    //compute value
    this.domReference.setAttribute("value", value);
  }
}
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
