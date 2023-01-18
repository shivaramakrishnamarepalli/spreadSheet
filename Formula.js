export function parseFormula(formula) {
  const regex = /([\/*+-])/g; //matches only operators paranthesis keep the delimiters in the array after split()
  const splittedArray = formula.split(regex);
  return splittedArray
    .map((item) => {
      if (item.search(/[\/*+-]/) !== -1) {
        return "---";
      }
      return item;
    })
    .join("");
}
