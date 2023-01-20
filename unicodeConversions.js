export function columnLetterToNumber(columnLetter) {
  const charCodeOfA = "A".charCodeAt(0);
  return columnLetter.charCodeAt(0) - charCodeOfA + 1;
}

export function columnNumberToLetter(columnNumber) {
  const charCodeOfA = "A".charCodeAt(0);

  const char = String.fromCharCode(charCodeOfA + columnNumber - 1);
  return char;
}
