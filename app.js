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

/**
 *      promptEmployeeQuestions()
 * Purpose: prompt the user for basic employee information
 * Parameters: None
 * Return: obj of the answers given from the user
 */
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

}//End promptEmployeeQuestions()

/**
 *      promptRole()
 * Purpose: prompt the user to see what role the employee has
 * Parameters: None
 * Return: obj of the answer from the prompt choices
 */
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
}//End promptRole()

/**
 *      promptEngineerQuestion()
 * Purpose: prompt the user for the Engineers github username
 * Parameters: None
 * Return: obj of the answer from the prompt question
 */
function promptEngineerQuestion()
{
    return inquirer.prompt([
        {
            type: "input",
            name: "employeeGitHub",
            message: "What is the employees github username?"
        },
    ]);
}//End promptEngineerQuestion()

/**
 *      promptInternQuestion()
 * Purpose: prompt the user for the interns school name
 * Parameters: None
 * Return: obj of the answer from the prompt question
 */
function promptInternQuestion()
{
    return inquirer.prompt([
        {
            type: "input",
            name: "internSchoolName",
            message: "What school is the intern attending?"
        }    
    ]);
}//End promptInternQuestion()

/**
 *      promptVerifyInformation()
 * Purpose: prompt the user for the managers office number
 * Parameters: None
 * Return: obj of the answer from the prompt question
 */
function promptManagerQuestion()
{
    return inquirer.prompt([
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is the managers office number?"
        }
    ]);
}//End promptManagerQuestion()

/**
 *      promptVerifyInformation()
 * Purpose: prompt the user if the information displayed is correct
 * Parameters: None
 * Return: True for the answer yes and False for the answer no
 */
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
}//end promptVerifyInformation()

/**
 *      promptForContinue()
 * Purpose: prompt the user if they want to continue adding more employees
 * Parameters: None
 * Return: True for the answer yes and False for the answer no
 */
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
}//End promptForContinue()

/**
 *      init()
 * Purpose: To initialize creation of the employees index.html using the prompt functions to ask the user questions
 * Parameters: None
 * Return: None
 */
async function init(){
    //declare variable to be used for while loop
    let continueAdding = true;

    //Keep creating employees 
    while(continueAdding === true)
    {
        //Create variable to store the Employee
        let newEmployee;

        //Prompt General Employee Answers
        let answers = await promptEmployeeQuestions();
        //As what role the employee is
        let role = await promptRole();

        //Check which role the employee is placed under
        switch(role.employeeRole)
        {
            ///Employee is an engineer
            case "Engineer":
                //Prompt user for the Engineer question and combine the answers
                Object.assign(answers, await promptEngineerQuestion());
                //Assign the new employee as an Engineer
                newEmployee = new Engineer(...Object.values(answers));
                break;
            //Employee is an Intern
            case "Intern":
                //Prompt user for the Engineer question and combine the answers
                Object.assign(answers, await promptInternQuestion());
                //Assign the new employee as an Intern
                newEmployee = new Intern(...Object.values(answers));
                break;
                //Emplyee is an Manager
            case "Manager":
                //Prompt user for the Engineer question and combine the answers
                Object.assign(answers, await promptManagerQuestion());
                //Assign the new employee as an Manager
                newEmployee = new Manager(...Object.values(answers));
                break;
            default:
                break;
        }//End Checking Employee Role
        
        //Display Employee Information To The User
        console.log(newEmployee);

        //Ask if the information generated is correct
        let correctInformation = await promptVerifyInformation();
        //Information wasn't correct
        if(correctInformation === false)
            continue;//Go back to the beginning of the while loop

        //Add the employee in the employees array
        employees.push(newEmployee);

        //Ask the user if they want to add another employee
        let addAnotherEmployee = await promptForContinue();
        //User didnt want to add another employee
        if(addAnotherEmployee === false)
            continueAdding = false;//Make continue adding false

    }//End Employee Creation 
    
    //Create HTML using render 
    let htmlString = render(employees)

    //Create index.html file
    fs.writeFile("index.html", htmlString, (err)=>{
        if(err)
            throw err;
        //Tell the user that the file has been created
        console.log("Employee Files Have Been Created");
    });

}//end init()

//Intialize 
init();