import { createGrid } from "./Grid.js";
import { isArrowKey } from "./Navigate.js ";
import { navigate } from "./Navigate.js";
import { compute } from "./Compute.js";

let container = document.createElement("div");
let cells = createGrid(container, 20, 27);
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
  setCurrent(cells.find((a) => a.getId() == event.target.id));
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

function setCurrent(nextCell) {
  current.getDomReference().style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  current = nextCell;
  current.getDomReference().style.backgroundColor = "red";
}
