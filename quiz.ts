#!/usr/bin/env node
import inquirer from "inquirer";

const apiLink:string="https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";

let quizData=async (data:string) => {
    let fetchData:any= await fetch(data);
    let res=await fetchData.json();
    return res.results;
}


let data= await quizData(apiLink);


let startQuiz=async () => {
    let score:number=0;
    let answers=await inquirer.prompt({
        name:"name",
        type:"input",
        message:"Enter Name: "
    });

    for(let i =0;i<5;i++){
        let quizAns=[...data[i].incorrect_answers, data[i].correct_answer];

        let question=await inquirer.prompt({
            name:"ans",
            type:"list",
            message:data[i].question,
            choices:quizAns.map((val:any)=>val),
        });


        if (question.ans==data[i].correct_answer) {
            ++score;
        }
    }
        
console.log(`${answers.name} Your Score is: ${score}`);


}



await startQuiz();