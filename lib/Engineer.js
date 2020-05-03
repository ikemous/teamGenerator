// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// Import Employee Class
const Employee = require("./Employee");

//Create Employee Subclass Engineer
class Engineer extends Employee{

    constructor(name, id, email, gitHub)
    {
        //Send name, id and email to Employee Class
        super(name,id,email);
        //Add Employee Role
        this.role = "Engineer";
        //Add Employee Github
        this.github = gitHub;
    }

    /**
     * getGitHub()
     * Purpose: To send back employee github username
     * Return: this.github - employees github username
     */
    getGithub()
    {
        //Send back egineers github username
        return this.github;
    }//End getGitHub()

}//End Engineer

module.exports = Engineer;