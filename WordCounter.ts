#!/usr/bin/env node
import inquirer from "inquirer";

async function wordCounter() {
    let answer = await inquirer.prompt({
        name: "text",
        type: "input",
        message: "Enter Some Text: "
    });

    console.log(`Words Counted: ${counter(answer.text)}`);

}

function counter(text: string): number {
    if (text.length > 0) {
        const words = text.split(" ");
        console.log(words);
        return words.length;
    }
    return 0;
}

async function counterMain() {
    do {
        await wordCounter();
        var re = await inquirer.prompt({
            name: "again",
            type: "list",
            choices: ["Yes", "No"],
            message: "Do you want to count more sentences?"
        });
    }
    while (re.again === "Yes");
    console.clear();
}

await counterMain();
