#!/usr/bin/env node
import inquirer from "inquirer";
// interface describing input varibales and types
interface ansType {
    userID: string,
    userPin: number,
    acctType: string,
    transType: string,
    amount: number,
    again: string
}
let answer1: ansType;
let answer2: ansType;

// user type declaration
type User = {
    userID: string,
    userPin: number
}

// sample users data
let users: User[] = [{ userID: "test", userPin: 123 }, { userID: "allauddin", userPin: 456 }, { userID: "abc", userPin: 789 }];

// sample bank balance
let balance: number = Math.floor(Math.random() * 100000);

// user login function
async function atmMain() {
    await getUser();
    await transMenu();

}


// user login function
async function getUser() {
    answer1 = await inquirer.prompt([{
        name: "userID",
        type: "input",
        message: "Enter User ID: "
    },
    {
        name: "userPin",
        type: "number",
        message: "Enter User PIN: "
    }])

    let isUser = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userID === answer1.userID && users[i].userPin === answer1.userPin) {
            isUser = true;
            console.log(`Welcome: ${answer1.userID}`);
            break;
        }
    }
    if (!isUser) {
        console.clear();
        console.log("Inavlid User ID/PIN, Try Again.");
        await getUser();
    }

}

// Transaction Function

async function transMenu() {
    answer2 = await inquirer.prompt([{
        name: "acctType",
        type: "list",
        choices: ["Current", "Saving"],
        message: "Select Account:"
    },
    {
        name: "transType",
        type: "list",
        choices: ["Fast Cash", "Withdraw", "Balance Inquiry"],
        message: "Select Transaction:",
        when(answer2) {
            return answer2.acctType;
        },
    },

    {
        name: "amount",
        type: "list",
        choices: [500, 1000, 50000, 10000],
        message: "Select Transaction:",
        when(answer2) {
            return answer2.transType == "Fast Cash"
        },
    },

    {
        name: "amount",
        type: "number",
        message: "Enter Amount:",
        when(answer2) {
            return answer2.transType == "Withdraw";
        },
    }])


    if (answer2.transType == "Balance Inquiry") {
        console.log(`Your Balance is: ${balance}`);

    }
    else {
        if (balance >= answer2.amount) {
            console.clear();
            balance = balance - answer2.amount;
            console.log(`Transaction of Amount ${answer2.amount} Performed Successfully Remaining Balanace is: ${balance}`);

        }
        else {
            console.log(`Low Balance! \t Balance: ${balance}`);
        }
    }

    // perfomr another operation
    do {
        answer2 = await inquirer.prompt({
            name: "again",
            type: "list",
            choices: ["Yes", "No"],
            message: "Do you want to perfom another transaction:"
        })

        if (answer2.again === "Yes") {
            await transMenu();
        }
        else {
            console.clear();
        }
    }
    while (answer2.again === "Yes");


}


// calling main ATM function
await atmMain();