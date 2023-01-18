export function navigate(e, current, setCurrent, cells) {
  if (current.value === undefined) {
    current.value = "";
  }
  let currentRow = current.row;
  let currentCol = current.column;
  let nextCell
  if (e.keyCode === 40) {
    // down arrow
    let nextRow = currentRow + 1;
    nextCell = cells.find(
      (a) => a.row == nextRow && a.column == currentCol
    );
  } else if (e.keyCode === 38) {
    // up arrow
    let nextRow = currentRow - 1;
    nextCell = cells.find(
      (a) => a.row == nextRow && a.column == currentCol
    );
  } else if (e.keyCode === 37) {
    // left arrow
    let nextCol = String.fromCharCode(currentCol.charCodeAt(0) - 1);
    nextCell = cells.find(
      (a) => a.row == currentRow && a.column == nextCol
    );
  } else if (e.keyCode === 39) {
    // right arrow
    let nextCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);

    nextCell = cells.find(
      (a) => a.row == currentRow && a.column == nextCol
    );

  }
  if (nextCell) {
    setCurrent(e,nextCell);
  }
}
export function isArrowKey(keyCode) {
  if (keyCode === 40 || keyCode === 38 || keyCode === 37 || keyCode === 39) {
    return true;
  }
  return false;
}
