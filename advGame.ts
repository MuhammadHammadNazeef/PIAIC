#!/user/bin/env node
import inquirer from "inquirer";

// Player 1 Class and Methods
class player1 {
    name: string;
    fuel: number = 100;
    constructor(name: string) { this.name = name }
    increaseFuel() { this.fuel = 100 }
    decreaseFuel() { this.fuel = this.fuel - 25 }
}

// Player 2 Class and Methods
class player2 {
    name: string;
    fuel: number = 100;
    constructor(name: string) { this.name = name }
    increaseFuel() { this.fuel = 100 }
    decreaseFuel() { this.fuel = this.fuel - 25 }
}

// main function start of program execution
async function mainMenu() {

    // players data gathring
    let players = await inquirer.prompt([{
        name: "player1",
        type: "input",
        message: "Enter Player 1 Name:"
    },
    {
        name: "player2",
        type: "list",
        choices: ["Skeleton", "Assasin", "Zoombie"],
        message: "Select Player 2:"
    }
    ]);

    // players object declaration with constructor parametor
    let p1 = new player1(players.player1);
    let p2 = new player2(players.player2);

    do {
        // Play with Skeleton
        if (players.player2 === "Skeleton") {
            console.log(`${players.player1} VS ${players.player2}`);


            let actions = await inquirer.prompt([{
                name: "action",
                type: "list",
                choices: ["Attack", "Bonus Life", "Quit Game"],
                message: "Select to Play:"
            }]);

            if (actions.action == "Attack") {
                let score = Math.floor(Math.random() * 2);
                if (score > 0) {
                    p1.decreaseFuel();
                    console.log(`${p1.name} Life ${p1.fuel}%`);
                    console.log(`${p2.name} Life ${p2.fuel}%`);

                    if (p1.fuel <= 0) {
                        console.log(`${p2.name} You Win!`);
                        process.exit();
                    }
                }
                if (score <= 0) {
                    p2.decreaseFuel();
                    console.log(`${p2.name} Life ${p2.fuel}%`);
                    console.log(`${p1.name} Life ${p1.fuel}%`);
                    if (p2.fuel <= 0) {
                        console.log(`${p1.name} You Win!`);
                        process.exit();
                    }

                }
            }
            if (actions.action == "Bonus Life") {
                p1.increaseFuel();
                p2.increaseFuel();
            }
            if (actions.action == "Quit Game") {
                console.clear();
                console.log(`You loss Game..! Try Again.`);
                process.exit();

            }
        }

        // Play with Assasin
        if (players.player2 === "Assasin") {
            console.log(`${players.player1} VS ${players.player2}`);


            let actions = await inquirer.prompt([{
                name: "action",
                type: "list",
                choices: ["Attack", "Bonus Life", "Quit Game"],
                message: "Select to Play:"
            }]);

            if (actions.action == "Attack") {
                let score = Math.floor(Math.random() * 2);
                if (score > 0) {
                    p1.decreaseFuel();
                    console.log(`${p1.name} Life ${p1.fuel}%`);
                    console.log(`${p2.name} Life ${p2.fuel}%`);

                    if (p1.fuel <= 0) {
                        console.log(`${p2.name} You Win!`);
                        process.exit();
                    }
                }
                if (score <= 0) {
                    p2.decreaseFuel();
                    console.log(`${p2.name} Life ${p2.fuel}%`);
                    console.log(`${p1.name} Life ${p1.fuel}%`);
                    if (p2.fuel <= 0) {
                        console.log(`${p1.name} You Win!`);
                        process.exit();
                    }

                }

            }
            if (actions.action == "Bonus Life") {
                p1.increaseFuel();
                p2.increaseFuel();
            }
            if (actions.action == "Quit Game") {
                console.clear();
                console.log(`You loss Game..! Try Again.`);
                process.exit();

            }
        }

        // Play with Zoombie
        if (players.player2 === "Zoombie") {
            console.log(`${players.player1} VS ${players.player2}`);


            let actions = await inquirer.prompt([{
                name: "action",
                type: "list",
                choices: ["Attack", "Bonus Life", "Quit Game"],
                message: "Select to Play:"
            }]);

            if (actions.action == "Attack") {
                let score = Math.floor(Math.random() * 2);
                if (score > 0) {
                    p1.decreaseFuel();
                    console.log(`${p1.name} Life ${p1.fuel}%`);
                    console.log(`${p2.name} Life ${p2.fuel}%`);

                    if (p1.fuel <= 0) {
                        console.log(`${p2.name} You Win!`);
                        process.exit();
                    }
                }
                if (score <= 0) {
                    p2.decreaseFuel();
                    console.log(`${p2.name} Life ${p2.fuel}%`);
                    console.log(`${p1.name} Life ${p1.fuel}%`);
                    if (p2.fuel <= 0) {
                        console.log(`${p1.name} You Win!`);
                        process.exit();
                    }

                }

            }
            if (actions.action == "Bonus Life") {
                p1.increaseFuel();
                p2.increaseFuel();
            }
            if (actions.action == "Quit Game") {
                console.clear();
                console.log(`You loss Game..! Try Again.`);
                process.exit();

            }

        }

    } while (true);
}


// calling main function
await mainMenu();