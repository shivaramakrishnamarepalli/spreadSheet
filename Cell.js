export class Cell {
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