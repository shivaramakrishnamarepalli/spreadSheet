export class Cell {
  constructor(row, column, parentContainer) {
    this.row = row;
    this.column = column;
    this.domReference = document.createElement("input");
    this.domReference.setAttribute("id", `${row}${column}`);
    this.domReference.setAttribute("class", "grid-item cell");
    this.domReference.classList.add("grid-item");
    parentContainer.appendChild(this.domReference);
  }
  setFormula(formula) {
    //extract formula
  }
  getDomReference() {
    return this.domReference;
  }
  getId() {
    return this.domReference.id;
  }
  getValue() {
    return this.domReference.value;
  }
  computeFormula() {
    //compute value
  }
  setWidth(width) {
    this.domReference.style.width = width;
  }
  getWidth() {
    return this.domReference.style.width;
  }
  getRow() {
    return this.row;
  }
  getColumn() {
    return this.column;
  }
  setValue(value) {
    this.value = value;
  }
}
