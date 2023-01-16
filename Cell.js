export class Cell {
  constructor(row, column, parentContainer) {
    this.row = row;
    this.column = column;
    this.domReference = document.createElement("div");
    this.domReference.setAttribute("id", `${column}${row}`);
    this.domReference.setAttribute("class", "grid-item cell");
    this.domReference.classList.add("grid-item");
    parentContainer.appendChild(this.domReference);
    this.editingMode = false;
  }
  setEditingMode(value) {
    this.editingMode = value;
  }
  isEditingMode() {
    return this.editingMode;
  }
  setFormula(formula) {
    //extract formula
    this.formula = formula;
  }
  getFormula() {
    return this.formula;
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
