const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function promptEmployeeQuestions()
{
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the employee name?"
        },
        {
            type: "input",
            name: "employeeId",
            message: "What is thier employee ID?"
        },
        {
            type: "input",
            name: "employeeEmail",
            message: "What is the employee email?"
        }
    ]);

}

function promptRole()
{
    return inquirer.prompt([
        {
            type: "list",
            name: "employeeRole",
            message: "What is the employees role?",
            choices: ["Engineer", "Intern", "Manager"]
        }
    ])
}

function promptEngineerQuestion()
{
    return inquirer.prompt([
        {
            type: "input",
            name: "employeeGitHub",
            message: "What is the employees github username?"
        },
    ]);
}

function promptInternQuestion()
{
    return inquirer.prompt([
        {
            type: "input",
            name: "internSchoolName",
            message: "What school is the intern attending?"
        }    
    ]);
}

function promptManagerQuestion()
{
    return inquirer.prompt([
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is the managers office number?"
        }
    ]);
}

function promptVerifyInformation()
{
    return inquirer.prompt([
        {
            type: "list",
            name: "verified",
            message: "Does the employee information look correct?",
            choices: ["yes", "no"]
        }
    ]).then(answers => {
        if(answers.verified === "yes")
            return true;
        return false;
    });
}

function promptForContinue()
{
    return inquirer.prompt([
        {
            type: "list",
            name: "continue",
            message: "Do you want to add another employee?",
            choices: ["yes", "no"]
        }
    ]).then(answers => {
        if(answers.continue === "yes")
            return true;
        return false;
    });
}


async function init(){

    let continueAdding = true;

    while(continueAdding === true)
    {
        
        let newEmployee;
        
        let answers = await promptEmployeeQuestions();
        let role = await promptRole();

        switch(role.employeeRole)
        {
            case "Engineer":
                Object.assign(answers, await promptEngineerQuestion());
                newEmployee = new Engineer(...Object.values(answers));
                break;
            case "Intern":
                Object.assign(answers, await promptInternQuestion());
                newEmployee = new Intern(...Object.values(answers));
                break;
            case "Manager":
                Object.assign(answers, await promptManagerQuestion());
                newEmployee = new Manager(...Object.values(answers));
                break;
            default:
                break;
        }
        
        console.log(newEmployee);

        let correctInformation = await promptVerifyInformation();
        if(correctInformation === false)
            continue;

        employees.push(newEmployee);

        let addAnotherEmployee = await promptForContinue();
        if(addAnotherEmployee === false)
            continueAdding = false;

    }    
    console.log(employees);
    let htmlString = render(employees)

    fs.writeFile("index.html", htmlString, (err)=>{
        if(err)
            throw err;
        console.log("Employee Files Have Been Created");
    });

}

init();