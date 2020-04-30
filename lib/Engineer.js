// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee{

    constructor(name, id, email, gitHub)
    {
        super(name,id,email);
        this.role = "Engineer";
        this.github = gitHub;
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

Engineer.prototype.getGithub = function()
{
    return this.github;
}
Engineer.prototype.setGithub = function(newGitHub)
{
    this.github = newGitHub;
}

module.exports = Engineer;