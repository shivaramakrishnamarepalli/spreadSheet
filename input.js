import {
  addCurrentAsDependentCell,
  removeCurrentAsDependentCell,
  onValueUpdate,
} from "./dependent.js";
import { parseFormula } from "./Formula.js";
import { compute } from "./Compute.js";
//functions dealing with input

export const modifyExistingInput = (current) => {
  //set the inner text (either formula or value of the current text)
  if (current.getFormula()) {
    current.getDomReference().innerText = `=${current.getFormula()}`;
  } else if (current.getValue()) {
    current.getDomReference().innerText = current.getValue();
  } else {
    current.getDomReference().innerText = "";
  }
  current.setEditingMode(true);
  current.setContentEditable(true);
  current.setFocus(true);
};
export const overwriteExistingInput = (current) => {
  if (current.isFocused()) {
    if (current.getDomReference().innerText.startsWith("=")) {
      current.setEditingMode(true);
    }
  } else {
    current.getDomReference().innerText = "";
    current.setContentEditable(true);
    current.setFocus(true);
  }
};
export const saveCurrentInput = (current) => {
  const text = current.getDomReference().innerText;
  /* since formula of current is changed or set to null ,
     current is no longer dependent on those in previous formula */
  removeCurrentAsDependentCell(current);
  if (text.startsWith("=")) {
    current.setFormula(text.slice(1));
    const formulaExpr = parseFormula(current.getFormula());
    let val;
    if (!formulaExpr) val = "#ERROR";
    else val = compute(formulaExpr);
    current.setValue(val);
    addCurrentAsDependentCell(current); // now current is dependent on those in the formula
  } else {
    current.setFormula(null);
    current.setValue(text);
  }
  // after value is set we will update all the cells which are dependent on current
  onValueUpdate(current);
  current.getDomReference().innerText = current.getValue();
  current.setEditingMode(false);
  current.setContentEditable(false);
  current.setFocus(false);
};
