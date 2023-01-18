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
  getDomReference() {
    return this.domReference;
  }
  setWidth(width) {
    this.domReference.style.width = width;
  }
  getWidth() {
    return this.domReference.style.width;
  }
  setBackgroundColor(color) {
    this.domReference.style.backgroundColor = color;
  }
  setEditingMode(value) {
    this.editingMode = value;
  }
  isEditingMode() {
    return this.editingMode;
  }

  updateCellContent() {
    const text = this.domReference.textContent;
    if (text[0] === "=") {
      this.formula = text.slice(1);
      this.value = null;
    } else {
      this.value = text;
      this.formula = null;
    }
  }
  // setValue(value) {
  //   this.value = value;
  // }
  getValue() {
    return this.value;
  }
  // setFormula(formula) {
  //   //extract formula
  //   this.formula = formula;
  // }
  getFormula() {
    return this.formula;
  }

  getId() {
    return this.domReference.id;
  }
  getRow() {
    return this.row;
  }
  getColumn() {
    return this.column;
  }
  computeFormula() {
    //compute value
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
