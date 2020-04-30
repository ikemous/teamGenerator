// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, school)
    {
        super(name, id, email);
        this.role = "Intern";
        this.school = school;

    }
}

Intern.prototype.getSchool = function()
{
    return this.school;
}
Intern.prototype.setSchool = function(newSchool)
{
    return this.school = newSchool;
}
Intern.prototype.getRole = function()
{
    return this.role;
}
Intern.prototype.setRole = function(newRole)
{
    this.role = newRole
}
module.exports = Intern;