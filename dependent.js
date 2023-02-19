//functions dealing with dependent cells
import { Grid } from "./Grid.js";
import { Cell } from "./Cell.js";
import { extractCells } from "./extractCells.js";
import { parseFormula } from "./Formula.js";
import { compute } from "./Compute.js";
export function removeCurrentAsDependentCell(current) {
  if (current.getFormula() && current.getValue() !== "#ERROR") {
    const cells = extractCells(current.getFormula());
    cells.forEach((cell) => {
      const [row, col] = Cell.extractRowAndColumn(cell);
      const cellObj = Grid.cellsArray[row][col];
      if (cellObj) cellObj.removeDependentCell(current.getLocation());
    });
  }
}
export function addCurrentAsDependentCell(current) {
  if (current.getFormula() && current.getValue() !== "#ERROR") {
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
    const parsedFormula = parseFormula(cellObj.getFormula());
    let val;
    if (!parseFormula) val = "#ERROR";
    else val = compute(parsedFormula);
    cellObj.setValue(val);
    cellObj.getDomReference().innerText = `${cellObj.getValue()}`;
    onValueUpdate(cellObj);
  });
}
