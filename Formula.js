import { Cell } from "./Cell.js";
import { Grid } from "./Grid.js";
/*........................... this is incomplete code ....................*/
export function parseFormula(formula) {
  const regex = /([\/*+-])/g; //matches only operators paranthesis keep the delimiters in the array after split()
  const splittedArray = formula.split(regex);
  return splittedArray
    .map((item) => {
      if (item.search(/[\/*+-]/) === -1) {
        return parseComponent(item, cells);
      }
      return item;
    })
    .join("");
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
  if (parseFloat(component)) {
    return component;
  } else if (component.search(/[\(\)]/) === -1) {
    //cell

    return "L";
  } else if (component.search(/[\(\)]/) !== -1) {
    //function
    return "M";
  }
  return "----";
}
