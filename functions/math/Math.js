import { Grid } from "/Grid.js";
import { Cell } from "/Cell.js";
export const MathFn = {
  mathFunctions: ["SUM", "AVG"],
  SUM(argsExpr) {
    const parseExpression = (expr) => {
      const argsArray = expr
        .slice(1, expr.length - 1)
        .split(",")
        .map((a) => {
          if (a.match(/^[A-Z][0-9]+:[A-Z][0-9]+$/)) {
            //TODO (extract range function)
          } else if (a.match(/^[A-Z][0-9]+$/)) {
            const [row, col] = Cell.extractRowAndColumn(a);
            if (Grid.cellsArray[row][col]) {
              const val = Grid.cellsArray[row][col].getValue();
              if (val) return parseFloat(val);
              return 0;
            }
          }
          return parseFloat(a);
        });
      return argsArray;
    };
    const sum = (args) => {
      return args.reduce((a, b) => a + b, 0);
    };
    return sum(parseExpression(argsExpr)).toString();
  },
  AVG(args) {
    return "A";
  },
};
