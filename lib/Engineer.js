// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee{

    constructor(name, id, email, gitHub)
    {
        super(name,id,email);
        this.role = "Engineer";
        this.gitHub = gitHub;
    }

}

Engineer.prototype.role = function()
{
    return this.profession;
}
Engineer.prototype.role = function(newProfession)
{
    this.profession = newProfession;
}

Engineer.prototype.getGitHub = function()
{
    return this.gitHub;
}
Engineer.prototype.setGitHub = function(newGitHub)
{
    this.gitHub = newGitHub;
}

module.exports = Engineer;