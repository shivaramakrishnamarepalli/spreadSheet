export function compute(expression) {
  let operators = {
    "/": { precedence: 4 },
    "*": { precedence: 3 },
    "+": { precedence: 2 },
    "-": { precedence: 2 },
    "^": { precedence: 5 },
  };

  let num = "";
  let postfix = [];
  let stack = [];
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];
    if (!isNaN(char) || char === ".") {
      num += char;
    } else {
      if (num !== "") {
        postfix[postfix.length] = num;
        num = "";
      }
      if (char === "(") {
        stack.push(char);
      } else if (char === ")") {
        let ele;
        while ((ele = stack.pop()) !== "(") {
          postfix[postfix.length] = ele;
        }
      } else if (operators[char]) {
        let o1 = char;
        let o2 = stack[stack.length - 1];
        while (
          operators[o2] &&
          operators[o1].precedence <= operators[o2].precedence
        ) {
          postfix[postfix.length] = stack.pop();
          o2 = stack[stack.length - 1];
        }
        stack.push(o1);
      }
    }
  }
  if (num !== "") {
    postfix[postfix.length] = num;
  }
  while (stack.length > 0) {
    postfix[postfix.length] = stack.pop();
  }

  stack = [];
  for (let i = 0; i < postfix.length; i++) {
    let val = postfix[i];
    if (!isNaN(val)) {
      stack.push(val);
    } else {
      let a = parseFloat(stack.pop());
      let b = parseFloat(stack.pop());
      switch (val) {
        case "+":
          stack.push(b + a);
          break;
        case "-":
          stack.push(b - a);
          break;
        case "*":
          stack.push(b * a);
          break;
        case "/":
          stack.push(b / a);
          break;
        case "^":
          stack.push(Math.pow(b, a));
          break;
      }
    }
  }
  return stack.pop();
}
