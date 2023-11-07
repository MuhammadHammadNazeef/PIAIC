#! /usr/bin/env node
// calling inquirer from lib
import inquirer from "inquirer";
let score = 0;

// perfom repeat operation
do {
    await guessNum();
    var again = await inquirer.prompt({
        name: "re",
        type: "list",
        message: "would Like to try again, please select one",
        choices: ["Yes", "No"]
    });
}
while (again.re === "Yes");



// number guess function [main logic]
async function guessNum() {
    console.log("Welcome to Number Guess Game....!");
    // generatinf random number
    let num = Math.floor(Math.random() * 10);
    let tip;
    if (num % 2 == 0) {
        tip = "Tip: Number is Even!";
    }
    else {
        tip = "Tip: Number is Odd!";
    }
    console.log(tip);
    // getting input from user
    const input = await inquirer.prompt({
        name: "guessedNum",
        type: "number",
        message: "Enter your Number between 0-10",
        default: 0,
        validate: (req) => {
            if (!req) {
                return "Please Enter Number";

            }
            return true;
        }
    });
    // comparing system generated number with user entered number
    if (num === input.guessedNum) {
        score++;
        console.log(`Congratulation you have guessed number successfuly.\nyour score is ${score}.\nSystem Generated number: ${num} your guessed number: ${input.guessedNum}`);
    }
    else {
        console.log(`You Failed to guess number, Try Again! Score: ${score}`);

    }

}