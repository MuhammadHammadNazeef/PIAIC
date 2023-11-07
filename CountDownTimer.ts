#!/user/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";

let input = await inquirer.prompt({
    name: "seconds",
    type: "number",
    message: "Enter Seconds for timer:",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please Enter Number of Seonds";
        }
        else if (input > 60) {
            return "Seconds must be 01-60"
        }
        else {
            return true;
        }
    }
});


async function Timer(val: number) {

    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const timerTime = new Date(intTime);

    setInterval(() => {
        const currentTime = new Date();
        const timeDif = differenceInSeconds(timerTime, currentTime);
        if (timeDif <= 0) {
            console.log("Timer Expired!");
            process.exit();

        }

        const min = Math.floor((timeDif % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDif % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000)

}

await Timer(input.seconds);