import { Cell } from "./Cell.js";
import { Grid } from "./Grid.js";
import { MathFn } from "./functions/math/Math.js";
export function parseFormula(formula) {
  const regex =
    /(?<function>[A-Z]+\(.+?\))|(?<cell>[A-Z]\d+)|(?<rest>[\d.()+*\/-]+)/g;
  const components = formula.match(regex);
  console.log("comp", components);

  if (components) {
    const parsedExpr = components
      .map((component) => {
        return parseComponent(component);
      })
      .join("");
    console.log("parsedExpr", parsedExpr);
    if (parsedExpr.includes("#ERROR")) return null;

    return parsedExpr;
  } else return null;
}

function parseComponent(component) {
  const cellRegexp = /^[A-Z]\d+$/;
  const functionRegexp = /^[A-Z]+\(.+?\)$/;
  if (cellRegexp.test(component)) {
    const [row, col] = Cell.extractRowAndColumn(component);
    const cell = Grid.cellsArray[row][col];
    let cellValue = null;
    if (cell) cellValue = cell.getValue();
    if (!isNaN(+cellValue)) {
      if (parseFloat(cellValue) < 0)
        return `(0${cellValue})`; //-1 becomes (0-1)
      else return cellValue;
    }
    return "#ERROR";
  } else if (functionRegexp.test(component)) {
    const [name, args] = component.match(/([A-Z]+)|(\(.+?\))/g);
    if (typeof MathFn[name] === "function") {
      return MathFn[name](args);
    }
    return "#ERROR";
  }
  return component;
}
