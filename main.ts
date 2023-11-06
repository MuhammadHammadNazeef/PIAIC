var prompt = require("prompt-sync")();
let n1 = parseInt(prompt('Kindly enter your fisrt number: '));
let n2 = parseInt(prompt('Kindly enter your second number: '));
let operator = prompt('Kindly enter your respecive operator for plus, minus, mupltyply, and devide (+, -, *, /): ');
if (operator == '+'){
    console.log(`The answer of ${n1} ${operator} ${n2} = ${n1+n2} `);
}
else if (operator == '-'){
    console.log(`The answer of ${n1} ${operator} ${n2} = ${n1-n2} `);
}
else if (operator == '*'){
    console.log(`The answer of ${n1} ${operator} ${n2} = ${n1*n2} `);
}
else if (operator == '/'){
    console.log(`The answer of ${n1} ${operator} ${n2} = ${n1/n2} `);
}
else {
    console.log("Kindly select the correct operator");
}
export{};