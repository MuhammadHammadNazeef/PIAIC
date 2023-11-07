#!usr/bin/env node
import inquirer from "inquirer";

class Student {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

}

class Person {
    students: Student[] = [];
    addStudent(std: Student) {
        this.students.push(std);
    }
}

const persons = new Person();

const programRun = async (persons: Person) => {

    console.log("-==Welcome Dear!==-");

    let input = await inquirer.prompt({
        name: "choice",
        type: "list",
        choices: ["Self", "Student", "Exit"],
        message: "Select any one to Talk."
    })

    if (input.choice == "Self") {
        console.log("Hello, I am talking to my Self.");
        console.log("I am Fine.");
    }
    else if (input.choice == "Student") {
        const ans = await inquirer.prompt({
            name: "std",
            type: "input",
            message: "Enter Student Name you want to talk."
        })
        const findStd = persons.students.find(val => val.name == ans.std);
        if (!findStd) {
            const newName = new Student(ans.std);
            persons.addStudent(newName);
            console.log(`Hello, My Name is ${newName.name} and I am Ok.`);
            console.log(persons.students);
        }

        if (findStd) {
            console.log(`Hello, My Name is ${findStd} and I am Ok.`);
            console.log(persons.students);
        }

    }
    else {
        process.exit();
    }

}

await programRun(persons);