export function navigate(e, current, setCurrent, cells) {
  if (current.value === undefined) {
    current.value = "";
  }
  const totalRows = cells.length - 1;
  const totalColumns = cells[0].length - 1;
  let currentRow = current.row;
  let currentCol = columnLetterToNumber(current.column);
  let nextCell;
  if (e.keyCode === 40) {
    // down arrow
    let nextRow = currentRow + 1;
    nextCell = nextRow <= totalRows ? cells[nextRow][currentCol] : null;
  } else if (e.keyCode === 38) {
    // up arrow
    let nextRow = currentRow - 1;
    nextCell = nextRow >= 1 ? cells[nextRow][currentCol] : null;
  } else if (e.keyCode === 37) {
    // left arrow
    let nextCol = currentCol - 1;
    nextCell = nextCol >= 1 ? cells[currentRow][nextCol] : null;
  } else if (e.keyCode === 39) {
    // right arrow
    let nextCol = currentCol + 1;

    nextCell = nextCol <= totalColumns ? cells[currentRow][nextCol] : null;
  }
  if (nextCell) {
    setCurrent(e, nextCell);
  }
}
export function isArrowKey(keyCode) {
  if (keyCode === 40 || keyCode === 38 || keyCode === 37 || keyCode === 39) {
    return true;
  }
  return false;
}
function columnLetterToNumber(columnLetter) {
  const charCodeOfA = "A".charCodeAt(0);
  return columnLetter.charCodeAt(0) - charCodeOfA + 1;
}
