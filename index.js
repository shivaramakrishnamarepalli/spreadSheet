import { createGrid } from "./Grid.js";
import { isArrowKey } from "./Navigate.js ";
import { navigate } from "./Navigate.js";
import { compute } from "./Compute.js";
import { parseFormula } from "./Formula.js";
console.log(parseFormula("E1+E2*A0+45/67-123*SUM(E1:E2)/AVG(E1,E2,E3)"));

/* https://stackoverflow.com/a/10744577 */
document.body.style.overflow = "hidden"; // hide browser scroll bar

let container = document.createElement("div");
let box = createGrid(container, 200, 27);
let cells =box[0]
let prev = null;
let fixedRow =box[1]
let fixedCol = box[2]

let current = cells[0];
highlight();
current.getDomReference().style.backgroundColor = "red";
const formulaBox = document.getElementById("formula-box");
const formulaInputBox = document.getElementById("formula-input");

formulaBox.addEventListener("click", handleClickOnFormulaBox);
container.addEventListener("click", handleClickOnContainer);
document.addEventListener("keydown", handleKeydown);

function handleClickOnFormulaBox(e) {
  if (e.target.id !== "formula-enter") return;
  current.setFormula(formulaInputBox.value);
}
function handleClickOnContainer(event) {
  if (event.target.className !== "grid-item cell") return;
  current.getDomReference().style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  prev = current;
  current=cells.find((a) => a.getId() == event.target.id)
  current.getDomReference().style.backgroundColor = "red";
  highlight();
}

function handleKeydown(e) {
  if (document.activeElement === formulaInputBox) {
    if (e.keyCode == 13) {
      //enter key
      current.setFormula(formulaInputBox.value);
      formulaInputBox.blur();
    }
    return;
  }
  if (isArrowKey(e.keyCode)) {
    if (!current.isEditingMode()) {
      if (current.isFocused()) {
        current.toggleFocus();
      }
      current.setValue();
      navigate(e, current, setCurrent, cells);
      formulaInputBox.value = current.getFormula() || "";
    }
    return;
  }
  if (e.keyCode == 13) {
    //'Enter key'
    /* https://stackoverflow.com/a/61237402 */
    e.preventDefault();
    if (current.isFocused()) {
      current.setValue();
      current.setEditingMode(false);
    } else {
      current.setEditingMode(true);
    }
    current.toggleFocus();
    return;
  } else {
    if (!current.isFocused()) {
      current.toggleFocus();
    }
  }
}

function setCurrent(e,nextCell) {
  current.getDomReference().style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  prev = current;
  current = nextCell;
  current
    .getDomReference()
    .scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
  if(e.keyCode===38||e.keyCode ===40)
  {
    container.scrollTop =
      current.getDomReference().offsetTop -
      container.offsetTop -
      container.clientHeight / 2;
  }
  if(e.keyCode===37||e.keyCode ===39)
  {
    container.scrollLeft =
      current.getDomReference().offsetLeft -
      container.offsetLeft -
      container.clientWidth / 2;
  }
  current.getDomReference().style.backgroundColor = "red";
  highlight();
}


function highlight()
{
  if(prev)
  {
    fixedRow[prev.getRow()].style.backgroundColor="#bef3a4"
    fixedCol[prev.getColumn().charCodeAt(0) - "A".charCodeAt(0) +1].style.backgroundColor="#bef3a4"
  }
  fixedRow[current.getRow()].style.backgroundColor="#48de37"
  fixedCol[current.getColumn().charCodeAt(0) - "A".charCodeAt(0) +1].style.backgroundColor="#48de37"
}