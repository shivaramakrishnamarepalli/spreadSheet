import { Grid } from "./Grid.js";
import { Cell } from "./Cell.js";
import { isArrowKey } from "./Navigate.js ";
import { navigate } from "./Navigate.js";
import {
  modifyExistingInput,
  overwriteExistingInput,
  saveCurrentInput,
} from "./input.js";
import { parseFormula, extractCells } from "./Formula.js";
// console.log("E1+E2*A0+45/67-123+16.99*SUM(E1:E2)/AVG(E1,E2,E3)");
// console.log(parseFormula("E1+E2*A0+45/67-123+16.99*SUM(E1:E2)/AVG(E1,E2,E3)"));
// console.log(
//   extractDependentCells("E1+E2*A0+45/67-123+16.99*SUM(E1:E2)/AVG(E1,E2,E3)")
// );

const cellContentsDisplay = document.getElementById("cell-contents-display");
const container = document.createElement("div");
Grid.createGrid(container, 200, 27);
let current = Grid.cellsArray[1][1];
let prev = null;
highlightCoordinates();
current.setBackgroundColor("red");

/* since e.preventdefault() doesn't work with click , https://stackoverflow.com/a/16045050 */
container.addEventListener("mousedown", handleMouseDownOnContainer);
/*  keydown is  for navigation, as user may hold the arrow key continously  amd also for registering first character pressed in a cell */
document.addEventListener("keydown", handleKeydown);
/* keyup is for normal text and 'enter' key, the cell TextContent will always be updated with the last character pressed 
 https://stackoverflow.com/a/3502777/19767708 */
document.addEventListener("keyup", handleKeyUp); // for normal text or 'enter' key

/*............................ mouse events ..............................*/

function handleMouseDownOnContainer(e) {
  e.preventDefault();
  if (e.target.className !== "grid-item cell") return;
  if (e.target.id === current.getId()) return;
  if (current.isFocused()) {
    saveCurrentInput(current);
  }
  setCurrentByClick(e);
  updateCellContentDisplay();
}

/*............................. Keyboard events ....................................*/

function handleKeydown(e) {
  if (e.keyCode == 13) {
    /* https://stackoverflow.com/a/61237402 */
    e.preventDefault();
  } else if (isArrowKey(e.keyCode)) {
    handleArrowKey(e);
  } else {
    handleCharacterKey(e);
  }

  updateCellContentDisplay();
}
function handleKeyUp(e) {
  if (isArrowKey(e.keyCode)) return;
  if (e.keyCode == 13) {
    //'Enter key'
    handleEnterKey(e);
  } else {
    handleCharacterKey(e);
  }
  updateCellContentDisplay();
}

const handleEnterKey = (e) => {
  /* https://stackoverflow.com/a/61237402 */
  e.preventDefault();
  if (current.isFocused()) {
    saveCurrentInput(current);
  } else {
    modifyExistingInput(current);
  }
};
const handleArrowKey = (e) => {
  if (current.isEditingMode()) return;
  if (current.isFocused()) {
    saveCurrentInput(current);
  }
  navigate(e, current, setCurrentByKeys, Grid.cellsArray);
};
const handleCharacterKey = (e) => {
  overwriteExistingInput(current);
};

const updateCellContentDisplay = () => {
  if (current.getFormula()) {
    cellContentsDisplay.innerText = `=${current.getFormula()}`;
  } else if (!current.getFormula()) {
    cellContentsDisplay.innerText = current.getDomReference().innerText;
  } else {
    cellContentsDisplay.innerText = "";
  }
};

function setCurrentByClick(e) {
  current.setBackgroundColor("rgba(255, 255, 255, 0.8)");
  prev = current;
  const id = e.target.id;
  let [row, column] = Cell.extractRowAndColumn(id);
  current = Grid.cellsArray[row][column];
  current.setBackgroundColor("red");
  highlightCoordinates();
}
function setCurrentByKeys(e, nextCell) {
  current.setBackgroundColor("rgba(255, 255, 255, 0.8)");
  prev = current;
  current = nextCell;
  current
    .getDomReference()
    .scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
  if (e.keyCode === 38 || e.keyCode === 40) {
    container.scrollTop =
      current.getDomReference().offsetTop -
      container.offsetTop -
      container.clientHeight / 2;
  }
  if (e.keyCode === 37 || e.keyCode === 39) {
    container.scrollLeft =
      current.getDomReference().offsetLeft -
      container.offsetLeft -
      container.clientWidth / 2;
  }
  current.setBackgroundColor("red");
  highlightCoordinates();
}

function highlightCoordinates() {
  if (prev) {
    Grid.fixedRow[prev.getRow()].style.backgroundColor = "#bef3a4";
    Grid.fixedCol[
      prev.getColumn().charCodeAt(0) - "A".charCodeAt(0) + 1
    ].style.backgroundColor = "#bef3a4";
  }
  Grid.fixedRow[current.getRow()].style.backgroundColor = "#48de37";
  Grid.fixedCol[
    current.getColumn().charCodeAt(0) - "A".charCodeAt(0) + 1
  ].style.backgroundColor = "#48de37";
}
