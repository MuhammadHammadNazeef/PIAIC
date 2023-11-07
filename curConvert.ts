#!/usr/bin/env node
import inquirer from "inquirer";

// Currency List and Currency Rate Objects
let curList = ["GBP", "USD", "PKR", "INR", "YAUN"];
let conversion = {
    "GBP":
    {
        "GBP": 1.0,
        "USD": 1.21,
        "PKR": 348.59,
        "INR": 101.09,
        "YAUN": 8.88

    },
    "USD":
    {
        "GBP": 0.82,
        "USD": 1.0,
        "PKR": 286.98,
        "INR": 83.23,
        "YAUN": 7.31
    },
    "PKR":
    {
        "GBP": 0.0028,
        "USD": 1.21,
        "PKR": 1.0,
        "INR": 0.29,
        "YAUN": 0.025

    },
    "YAUN":
    {
        "GBP": 0.11,
        "USD": 0.14,
        "PKR": 39.27,
        "INR": 11.39,
        "YAUN": 1.0
    },
    "INR":
    {
        "GBP": 0.0099,
        "USD": 0.012,
        "PKR": 3.45,
        "INR": 1.0,
        "YAUN": 0.088
    }

}

// Currency input and conversion 
async function setCurrency() {
    console.log("Currency Converter:");


    let inputAns: {
        curFrom: "GBP" | "USD";
        curTo: "GBP" | "USD";
        amount: number;

    } = await inquirer.prompt([{
        name: "curFrom",
        type: "list",
        choices: curList,
        message: "Select Currency [From]."
    },
    {
        name: "curTo",
        type: "list",
        choices: curList,
        message: "Select Currency [To]."
    },
    {
        name: "amount",
        type: "number",
        message: "Enter Amount to Convert:"
    },
    ]);


    const { curFrom, curTo, amount } = inputAns;

    if (curFrom && curTo && amount) {

        let curCnvrted = conversion[curFrom][curTo] * amount;
        console.log(`${amount} ${curFrom} is ${curCnvrted} ${curTo}`);

    }
}


// currency main function 
async function curMain() {
    do {
        await setCurrency();
        var re = await inquirer.prompt({
            name: "again",
            type: "list",
            choices: ["Yes", "No"],
            message: "Do you want to perform more operations?"
        });
        console.clear();
    }
    while (re.again === "Yes");
    console.clear();
}

curMain();