export class Cell {
    constructor(row, col, parentContainer) {
      this.row = row;
      this.column = col;
      this.domReference = document.createElement("input");
      this.domReference.setAttribute("id", `${row}${col}`);
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
    
  }