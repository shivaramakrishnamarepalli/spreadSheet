export function compute(expression){
    let operators = {
        "/": { precedence: 3 },
        "*": { precedence: 3 },
        "+": { precedence: 2 },
        "-": { precedence: 2 }
    }
    let outputQueue = "";
    let operatorStack = [];
    let number = "";
    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        if (!isNaN(char) || char === ".") {
            number += char;
        } else {
            if (number !== "") {
                outputQueue += number + " ";
                number = "";
            }
            if (operators[char]) {
                let o1 = char;
                let o2 = operatorStack[operatorStack.length - 1];
                while (operators[o2] && (operators[o1].precedence <= operators[o2].precedence)) {
                    outputQueue += operatorStack.pop() + " ";
                    o2 = operatorStack[operatorStack.length - 1];
                }
                operatorStack.push(o1);
            }
        }
    }
    if (number !== "") {
        outputQueue += number + " ";
    }
    while (operatorStack.length > 0) {
        outputQueue += operatorStack.pop() + " ";
    }
    let postfix = outputQueue.split(" ");
  
    let stack = [];
    for (let i = 0; i < postfix.length; i++) {
        let token = postfix[i];
        if (!isNaN(token)) {
            stack.push(token);
        } else {
            let a = parseFloat(stack.pop());
            let b = parseFloat(stack.pop());
            switch(token){
                case '+':
                    stack.push(b+a);
                    break;
                case '-':
                    stack.push(b-a);
                    break;
                case '*':
                    stack.push(b*a);
                    break;
                case '/':
                    stack.push(b/a);
                    break;
            }
        }
    }
    stack.pop()
    return stack.pop();
}
