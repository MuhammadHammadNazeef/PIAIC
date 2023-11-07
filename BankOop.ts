#!usr/bin/env node
import inquirer from "inquirer";
import { faker } from "@faker-js/faker"
class Customer {
    fName: string; lName: string; age: number; gender: string; phone: number; accNum: number;
    constructor(fName: string, lName: string, age: number, gender: string, phone: number, accNum: number) {
        this.fName = fName; this.lName = lName; this.age = age; this.gender = gender; this.phone = phone; this.accNum = accNum;
    }
}

interface bankAccount {
    accountNumber: number;
    balance: number;
}

class Bank {
    customers: Customer[] = [];
    accounts: bankAccount[] = [];


    addCustomer(obj: Customer) {
        this.customers.push(obj);
    }
    addAccounNumber(obj: bankAccount) {
        this.accounts.push(obj);
    }

    transaction(accobj: bankAccount) {
        let newAccount = this.accounts.filter((acc) => acc.accountNumber !== accobj.accountNumber);
        this.accounts = [...newAccount, accobj];
    }
}
let myBank = new Bank();

for (let i = 1; i <= 3; i++) {
    let FirstName = faker.person.firstName(`male`)
    let LastName = faker.person.lastName();
    let phoneNumber = parseInt(faker.phone.number());
    const myCustomer = new Customer(FirstName, LastName, 25 * i, `Male`, phoneNumber, 100 + i);
    myBank.addCustomer(myCustomer);
    myBank.addAccounNumber({ accountNumber: myCustomer.accNum, balance: 1000 * i })

}

async function bankServices(bank: Bank) {
    do{

    let serv = await inquirer.prompt({
        name: "service",
        type: "list",
        choices: ["View Balance", "Cash Withdrawl", "Cash Deposite", "Exit"],
        message: "Select Procedure"
    });

    if (serv.service == "View Balance") {

        let ans = await inquirer.prompt({
            name: "acc",
            type: "number",
            message: "Enter your Account Number"
        });

        let accountNum = myBank.accounts.find((acc) => acc.accountNumber == ans.acc);

        if (!accountNum) {
            console.log("Inavlid Account Number");

        }
        if (accountNum) {
            let name = myBank.customers.find((item) => item.accNum == accountNum?.accountNumber);
            console.log(`${name?.fName} your account balance is ${accountNum.balance} `);


        }




    }

    if (serv.service == "Cash Withdrawl") {
        let ans = await inquirer.prompt({
            name: "acc",
            type: "number",
            message: "Enter your Account Number"
        });
        let accountNum = myBank.accounts.find((acc) => acc.accountNumber == ans.acc);

        if (!accountNum) {
            console.log("Inavlid Account Number");

        }
        if (accountNum) {
            let ans = await inquirer.prompt({
                name: "cash",
                type: "number",
                message: "Enter Amount"
            });

            if (accountNum.balance < ans.cash) {
                console.log("Transaction Failed! Balance Not Sufficiant.");

            }
            else {
                let newBalance = accountNum.balance - ans.cash;
                bank.transaction({ accountNumber: accountNum.accountNumber, balance: newBalance });
                console.log(`Transaaction Successful. Ramaining Blanace is: ${newBalance}`);
            }
        }

    }

    if (serv.service == "Cash Deposite") {
        let ans = await inquirer.prompt({
            name: "acc",
            type: "number",
            message: "Enter your Account Number"
        });
        let accountNum = myBank.accounts.find((acc) => acc.accountNumber == ans.acc);

        if (!accountNum) {
            console.log("Inavlid Account Number");

        }
        if (accountNum) {
            let ans = await inquirer.prompt({
                name: "cash",
                type: "number",
                message: "Enter Amount"
            });

            let newBalance = accountNum.balance + ans.cash;
            bank.transaction({ accountNumber: accountNum.accountNumber, balance: newBalance });
            console.log(`Transaaction Successful. New Blanace is: ${newBalance}`)
        }
    }

    if (serv.service == "Exit") { process.exit() }

}while(true);
}

bankServices(myBank);
