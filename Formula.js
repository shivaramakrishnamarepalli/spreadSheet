import { Cell } from "./Cell.js";
import { Grid } from "./Grid.js";
/*........................... this is incomplete code ....................*/
export function parseFormula(formula) {
  const regex =
    /(?<function>[A-Z]+\(.+?\))|(?<cell>[A-Z]\d)|(?<rest>[\d.()+*\/-]+)/g;
  const components = formula.match(regex);
  console.log("components", components);
  if (components) {
    const parsedExpr = components
      .map((component) => {
        return parseComponent(component);
      })
      .join("");
    return parsedExpr;
  } else return null;
}
export function extractCells(formula) {
  const regex = /[:\(\)\/*+-]/g;
  const splittedArray = formula.split(regex);
  const isCell = (cell) => {
    return cell.search(/^[A-Z]+[0-9]+$/g) !== -1;
  };
  return splittedArray.filter((item) => {
    return item ? isCell(item) : false;
  });
}
function parseComponent(component) {
  const cellRegexp = /^[A-Z]\d$/;
  const functionRegexp = /^[A-Z]+\(.+?\)$/;
  if (cellRegexp.test(component)) {
    //cell
    console.log("cell:", component);
    return "C";
  } else if (functionRegexp.test(component)) {
    //function
    console.log("function:", component);
    return "F";
  }
  return "-";
}
