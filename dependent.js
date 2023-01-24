//functions dealing with dependent cells
import { Grid } from "./Grid.js";
import { Cell } from "./Cell.js";
import { extractCells } from "./Formula.js";
export function removeCurrentAsDependentCell(current) {
  if (current.getFormula()) {
    const cells = extractCells(current.getFormula());
    cells.forEach((cell) => {
      const [row, col] = Cell.extractRowAndColumn(cell);
      Grid.cellsArray[row][col].removeDependentCell(current.getLocation());
    });
  }
}
export function addCurrentAsDependentCell(current) {
  if (current.getFormula()) {
    const cells = extractCells(current.getFormula());
    cells.forEach((cell) => {
      const [row, col] = Cell.extractRowAndColumn(cell);
      Grid.cellsArray[row][col].addDependentCell(current.getLocation());
    });
  }
}
export function onValueUpdate(currentCell) {
  //update all the dependent cells recursively
  currentCell.getDependentCells().forEach((cell) => {
    const [row, col] = Cell.extractRowAndColumn(cell);
    const cellObj = Grid.cellsArray[row][col];
    if (cellObj === currentCell) return;
    // compute and get formula
    cellObj.setValue("yet to compute dependent");
    cellObj.getDomReference().innerText = `${cellObj.getValue()}`;
    onValueUpdate(cellObj);
  });
}
