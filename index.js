import { createGrid } from "./Grid.js";
import { isArrowKey } from "./Navigate.js ";
import { navigate } from "./Navigate.js";
import { columnLetterToNumber } from "./unicodeConversions.js";
import { compute } from "./Compute.js";
import { parseFormula } from "./Formula.js";
//console.log(parseFormula("E1+E2*A0+45/67-123*SUM(E1:E2)/AVG(E1,E2,E3)"));

/* https://stackoverflow.com/a/10744577 */
document.body.style.overflow = "hidden"; // hide browser scroll bar

const container = document.createElement("div");
const box = createGrid(container, 20, 27);
const cells = box[0];
const cellContentsDisplay = document.getElementById("cell-contents-display");
let current = cells[1][1];
let prev = null;
let fixedRow = box[1];
let fixedCol = box[2];
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
  current.setBackgroundColor("rgba(255, 255, 255, 0.8)");
  prev = current;
  const id = event.target.id;
  const column = id.slice(0, id.search(/\d/));
  const row = +id.replace(column, "");
  current = cells[row][columnLetterToNumber(column)];
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
  current.updateCellContent();
  updateCellContentDisplay();
}
const handleArrowKey = (e) => {
  if (!current.isEditingMode()) {
    if (current.isFocused()) {
      current.toggleFocus();
    }
    navigate(e, current, setCurrent, cells);
  }
};
const handleEnterKey = (e) => {
  /* https://stackoverflow.com/a/61237402 */
  e.preventDefault();
  if (current.isFocused()) {
    current.setEditingMode(false);
  } else {
    current.setEditingMode(true);
  }
  current.toggleFocus();
};
const handleCharacterKey = (e) => {
  if (!current.isFocused()) {
    current.toggleFocus();
  }
};
const updateCellContentDisplay = () => {
  if (current.getFormula()) {
    cellContentsDisplay.innerText = `=${current.getFormula()}`;
  } else if (current.getValue()) {
    cellContentsDisplay.innerText = current.getValue();
  } else {
    cellContentsDisplay.innerText = "";
  }
};

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
    fixedRow[prev.getRow()].style.backgroundColor = "#bef3a4";
    fixedCol[
      prev.getColumn().charCodeAt(0) - "A".charCodeAt(0) + 1
    ].style.backgroundColor = "#bef3a4";
  }
  fixedRow[current.getRow()].style.backgroundColor = "#48de37";
  fixedCol[
    current.getColumn().charCodeAt(0) - "A".charCodeAt(0) + 1
  ].style.backgroundColor = "#48de37";
}
