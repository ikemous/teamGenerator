const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const promptQuestions = require("./lib/promptQuestions")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

async function createEmployee(answers, roleChoice)
{
    let newEmployee;
    //Check which role the employee is placed under
    switch(roleChoice.employeeRole)
    {
        ///Employee is an engineer
        case "Engineer":
            //Prompt user for the Engineer question and combine the answers
            Object.assign(answers, await promptQuestions.promptEngineerQuestion());
            //Assign the new employee as an Engineer
            newEmployee = new Engineer(...Object.values(answers));
            break;
        //Employee is an Intern
        case "Intern":
            //Prompt user for the Engineer question and combine the answers
            Object.assign(answers, await promptQuestions.promptInternQuestion());
            //Assign the new employee as an Intern
            newEmployee = new Intern(...Object.values(answers));
            break;
            //Emplyee is an Manager
        case "Manager":
            //Prompt user for the Engineer question and combine the answers
            Object.assign(answers, await promptQuestions.promptManagerQuestion());
            //Assign the new employee as an Manager
            newEmployee = new Manager(...Object.values(answers));
            break;
        default:
            break;
    }//End Checking Employee Role

    return newEmployee;

}

/**
 *      init()
 * Purpose: To initialize creation of the employees index.html using the prompt functions to ask the user questions
 * Parameters: None
 * Return: None
 */
async function init()
{
    //declare variable to be used for while loop
    let continueAdding = true;

    //Keep creating employees 
    while(continueAdding === true)
    {

        //Prompt General Employee Answers
        let answers = await promptQuestions.promptEmployeeQuestions();

        //As what role the employee is
        let role = await promptQuestions.promptRole();


        //Create variable to store the Employee
        let newEmployee = await createEmployee(answers, role);

        //Display Employee Information To The User
        console.log(newEmployee);

        //Ask if the information generated is correct
        let correctInformation = await promptQuestions.promptVerifyInformation();

        //Information wasn't correct
        if(correctInformation === false)
            continue;//Go back to the beginning of the while loop

        //Add the employee in the employees array
        employees.push(newEmployee);

        //Ask the user if they want to add another employee
        let addAnotherEmployee = await promptQuestions.promptForContinue();

        //User didnt want to add another employee
        if(addAnotherEmployee === false)
            continueAdding = false;//Make continue adding false

    }//End Employee Creation 
    
    //Create HTML using render 
    let htmlString = render(employees)

    //Create index.html file
    fs.writeFile(outputPath, htmlString, (err)=>{
        if(err)
            throw err;
        //Tell the user that the file has been created
        console.log("Employee Files Have Been Created");
    });

}//end init()

//Intialize 
init();