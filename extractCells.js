export function extractCells(formula) {
  return formula.match(/[A-Z][0-9]+/g);
}
