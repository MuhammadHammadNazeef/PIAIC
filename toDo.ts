#!/usr/bin/env node
import inquirer from "inquirer";

// interface for todo input varaibles
interface ansType {
    todoMenu: string;
    todoTask: string;
}

// todo list and input varibales
let todoList: string[] = [];
let inputMenuAns: ansType;
let inputTodoAns: ansType;
let todoRepeat = true;

// todo app main function
async function todoMain() {
    while (todoRepeat === true) {
        await todoMenu();

    }
}

// todo app menu display
async function todoMenu() {
    inputMenuAns = await inquirer.prompt({
        name: "todoMenu",
        type: "list",
        choices: ["a) Add todo item", "b) Delete todo item", "c) Show todo", "d) Exit"],
        message: "Select Operation."
    });

    switch (inputMenuAns.todoMenu) {
        case `a) Add todo item`:
            await todoAddItem();
            break;

        case `b) Delete todo item`:
            await todoRemoveItem();
            break;

        case `c) Show todo`:
            await showTodo();
            break;

        case `d) Exit`:
            todoRepeat = false;
            break;

        default:
            break;

    }
}

// Display todo list function
async function showTodo() {
    console.clear();
    if (todoList.length > 0) {
        console.log("Tasks in Todo List.");
        for (let index = 0; index < todoList.length; index++) {
            console.log(`${index + 1}) ${todoList[index]}`);
        }
    }
    else {
        console.clear();
        console.log("No Tasks in Todo.");

    }
}

// Adding item on todo list function
async function todoAddItem() {
    do {
        inputTodoAns = await inquirer.prompt({
            name: "todoTask",
            type: "input",
            message: "Enter todo Task:",
        });
        todoList.push(inputTodoAns.todoTask);
        console.log(`Todo Added: ${inputTodoAns.todoTask}`);

        var re = await inquirer.prompt({
            name: "again",
            type: "list",
            choices: ["Yes", "No"],
            message: "Do you want to add more tasks?"
        });
    }
    while (re.again === "Yes");
    console.clear();
}

// deleting item on todo list function
async function todoRemoveItem() {
    if (todoList.length > 0) {
        console.log("Tasks in Todo List.");
        for (let index = 0; index < todoList.length; index++) {
            console.log(`${index + 1}) ${todoList[index]}`);
        }

        let inputRemoveAns = await inquirer.prompt({
            name: "removetodo",
            type: "list",
            choices: todoList,
            message: "Select todo you want to remove:"
        });

        let i = 0;
        do {
            if (todoList[i] === inputRemoveAns.removetodo) {

                let deletedTodo = todoList.splice(i, 1);
                console.clear();
                console.log(`Todo Removed: ${deletedTodo}`);

            }
            i++;
        }
        while (i < todoList.length);

    }
    else {
        console.clear();
        console.log("No Tasks in Todo.");
    }

}

// calling main function to execute app
todoMain();