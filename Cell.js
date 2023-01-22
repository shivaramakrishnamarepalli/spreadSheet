import { columnLetterToNumber } from "./unicodeConversions.js";

export class Cell {
  constructor(row, column, parentContainer) {
    this.row = row;
    this.column = column;
    this.location = `${row}${column}`;
    this.domReference = document.createElement("div");
    this.domReference.setAttribute("id", `${column}${row}`);
    this.domReference.setAttribute("class", "grid-item cell");
    this.domReference.classList.add("grid-item");
    parentContainer.appendChild(this.domReference);
    this.editingMode = false;
    /* ..................Dependent Cells functionality is still work in progress ................*/
    this.dependentCells = new Set();
  }
  getDomReference() {
    return this.domReference;
  }
  getLocation() {
    return this.location;
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

  updateValue() {
    // each cell has a value, it is either the text Content entered by user or value computed from formula
    if (this.formula) {
      this.value = "yet to compute"; //parse
    } else {
      this.formula = null;
      this.value = this.domReference.innerText;
    }
  }
  // setValue(value) {
  //   this.value = value;
  // }
  getValue() {
    return this.value;
  }
  setFormula(value = null) {
    if (value === null) {
      this.formula = null;
    } else {
      const text = this.domReference.textContent;
      this.formula = text.slice(1);
    }
  }
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
  /* ..................Dependent Cells functionality is still work in progress ................*/
  // addDependentCell(cell) {
  //   this.dependentCells.add(cell);
  // }
  // removeDependentCell(cell) {
  //   this.dependentCells.delete(cell);
  // }
  static extractRowAndColumn(text) {
    let column = text.slice(0, text.search(/\d/));
    const row = +text.replace(column, "");
    column = columnLetterToNumber(column);
    return [row, column];
  }
}
