import { Grid } from "./Grid.js";
import { Cell } from "./Cell.js";
import { isArrowKey } from "./Navigate.js ";
import { navigate } from "./Navigate.js";
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

container.addEventListener("click", handleClickOnContainer);
/*  keydown is  for navigation, as user may hold the arrow key continously  amd also for registering first character pressed in a cell */
document.addEventListener("keydown", handleKeydown);
/* keyup is for normal text and 'enter' key, the cell TextContent will always be updated with the last character pressed 
 https://stackoverflow.com/a/3502777/19767708 */
document.addEventListener("keyup", handleKeyUp); // for normal text or 'enter' key

function handleClickOnContainer(event) {
  if (event.target.className !== "grid-item cell") return;
  if (event.target.id === current.getId()) return;
  current.setBackgroundColor("rgba(255, 255, 255, 0.8)");
  if (current.getDomReference().innerText.startsWith("=")) {
    current.setFormula();
  }
  updateCurrentCell();
  current.setEditingMode(false);
  prev = current;
  const id = event.target.id;
  let [row, column] = Cell.extractRowAndColumn(id);
  current = Grid.cellsArray[row][column];
  current.setBackgroundColor("red");
  highlightCoordinates();
  updateCellContentDisplay();
}
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
const handleArrowKey = (e) => {
  if (!current.isEditingMode()) {
    if (current.isFocused()) {
      current.toggleFocus();
    }
    updateCurrentCell();
    navigate(e, current, setCurrent, Grid.cellsArray);
  }
};
const handleEnterKey = (e) => {
  /* https://stackoverflow.com/a/61237402 */
  e.preventDefault();
  if (current.isFocused()) {
    if (current.getDomReference().innerText.startsWith("=")) {
      current.setFormula(current.getDomReference().innerText.startsWith("="));
    } else {
      current.setFormula(null);
    }
    updateCurrentCell();
    current.setEditingMode(false);
  } else {
    if (current.getFormula()) {
      current.getDomReference().innerText = `=${current.getFormula()}`;
    }
    current.setEditingMode(true);
  }
  current.toggleFocus();
};
const handleCharacterKey = (e) => {
  if (current.isFocused()) {
    if (current.getDomReference().innerText.startsWith("=")) {
      current.setEditingMode(true);
    }
  }
  if (!current.isFocused()) {
    current.getDomReference().innerText = "";
    current.toggleFocus();
  }
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
// following function is incomplete
// function updateDependentCells() {
//   if (current.getFormula()) {
//     const cells = extractCells(current.getFormula());
//     cells.forEach((cell) => {
//       const [row, col] = Cell.extractRowAndColumn(cell);
//       Grid.cellsArray[row][col].addDependentCell(current.getLocation());
//     });
//   }
// }
function updateCurrentCell() {
  current.updateValue();

  if (current.getFormula()) {
    current.getDomReference().innerText = current.getValue();
  }
}
function setCurrent(e, nextCell) {
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
