export class Cell {
  constructor(row, column, parentContainer) {
    this.row = row;
    this.column = column;
    this.domReference = document.createElement("div");
    this.domReference.setAttribute("id", `${row}${column}`);
    this.domReference.setAttribute("class", "grid-item cell");
    this.domReference.classList.add("grid-item");
    parentContainer.appendChild(this.domReference);
  }
  setFormula(formula) {
    //extract formula
    this.formula = formula;
  }
  getDomReference() {
    return this.domReference;
  }
  getId() {
    return this.domReference.id;
  }
  getValue() {
    return +this.domReference.textContent;
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
  setValue() {
    this.value = this.domReference.textContent;
  }
  toggleFocus() {
    if (this.isFocused()) {
      this.domReference.contenteditable = "false";
      this.domReference.blur();
    } else {
      this.domReference.contentEditable = "true";
      this.domReference.focus();
      /* https://stackoverflow.com/a/55811159/19767708 */
      document.execCommand("selectAll", false, null); //execCommand is deprecated but still supported
      document.getSelection().collapseToEnd();
    }
  }
  isFocused() {
    return this.domReference === document.activeElement;
  }
}
