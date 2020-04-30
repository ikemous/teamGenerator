// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name,id,email)
    {
        //Employee Variables
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }

};

Employee.prototype.getName = function()
{
    return this.name;
}
Employee.prototype.setName = function(newName)
{
    this.name = newName;
}
Employee.prototype.getId = function()
{
    return this.id;
}
Employee.prototype.setId = function(newId)
{
    this.id = newId;
}
Employee.prototype.getEmail = function()
{
    return this.email;
}
Employee.prototype.setEmail = function(newEmail)
{
    this.email = newEmail;
}
Employee.prototype.getRole = function()
{
    return this.role;
}
Employee.prototype.setRole = function(newRole)
{
    this.role = newRole;
}

module.exports = Employee;