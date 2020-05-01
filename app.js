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


async function init(){

    let continueAdding = true;

    while(continueAdding === true)
    {
        let answers = await promptEmployeeQuestions();

        let role = await promptRole();

        switch(role.employeeRole)
        {
            case "Engineer":
                Object.assign(answers, await promptEngineerQuestion());
                break;
            case "Intern":
                Object.assign(answers, await promptInternQuestion());
                break;
            case "Manager":
                Object.assign(answers, await promptManagerQuestion());
                break;
            default:
                break;
        }
        
        console.log(answers);
    }

    
}

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
