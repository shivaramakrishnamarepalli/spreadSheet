export function compute(expression){
    let operators = {
        "/": { precedence: 3 },
        "*": { precedence: 3 },
        "+": { precedence: 2 },
        "-": { precedence: 2 }
    }
    let outputQueue = "";       //for getting postfix
    let Stack = [];
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
                let o2 = Stack[Stack.length - 1];
                while (operators[o2] && (operators[o1].precedence <= operators[o2].precedence)) {
                    outputQueue += Stack.pop() + " ";
                    o2 = Stack[Stack.length - 1];
                }
                Stack.push(o1);
            }
        }
    }
    if (number !== "") {
        outputQueue += number + " ";
    }
    while (Stack.length > 0) {
        outputQueue += Stack.pop() + " ";
    }
    let postfix = outputQueue.split(" ");// infix to postfix done
  
    //postfix evaluation
    let stack = [];
    for (let i = 0; i < postfix.length; i++) {
        let val = postfix[i];
        if (!isNaN(val)) {
            stack.push(val);
        } else {
            let a = parseFloat(stack.pop());
            let b = parseFloat(stack.pop());
            switch(val){
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
