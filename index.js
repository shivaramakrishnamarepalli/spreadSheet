import { createGrid } from "./Grid.js";
import { isArrowKey } from "./Navigate.js ";
import { navigate } from "./Navigate.js";
import { compute } from "./Compute.js";

let container = document.createElement("div");
let cells = createGrid(container, 200, 27);
let current = cells[0];
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
  setCurrent(cells.find((a) => a.getId() == event.target.id))
}

function handleKeydown(e) {
  if (document.activeElement === formulaInputBox) {
    if (e.keyCode == 13) {
      current.setFormula(formulaInputBox.value);
      formulaInputBox.blur();
    }
    return;
  }
  if (isArrowKey(e.keyCode)) {
    if (!current.isFocused()) {
      navigate(e, current, setCurrent, cells);
      return;
    }
  }
  if (e.keyCode == 13) {
    //'Enter key'
    /* https://stackoverflow.com/a/61237402 */
    e.preventDefault();
    if (current.isFocused()) {
      current.setValue();
    }
    current.toggleFocus();
    return;
  } else {
    if (!current.isFocused()) {
      current.toggleFocus();
    }
  }
}

function setCurrent(nextCell) {
  current.getDomReference().style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  current = nextCell;
  current.getDomReference().scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
  container.scrollTop = current.getDomReference().offsetTop - container.offsetTop - container.clientHeight/2;
  container.scrollLeft = current.getDomReference().offsetLeft - container.offsetLeft - container.clientWidth/2;
  current.getDomReference().style.backgroundColor = "red";
}
