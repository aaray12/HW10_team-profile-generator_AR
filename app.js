const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

const qs = [
    {
    type: 'list',
    name: 'roleType',
    message: 'Choose role:',
    choices: ['Manager', 'Engineer', 'Intern'],
    default: 'Engineer'
    },
    {
    type: 'input',
    name: 'name',
    message: "What is the employee's name?"
    },
    {
    type: 'input',
    name: 'id',
    message: "What is the employee's ID number?"   
    },
    {
    type: 'input',
    name: 'email',
    message: "What is the employee's email address?"   
    },
    {
    type: 'input',
    name: 'officeNumber',
    message: "What is the manager's office number?",
    when: (answers) => answers.roleType === 'Manager',
    },
    {
    type: 'input',
    name: 'school',
    message: "What school is the intern from?",
    when: (answers) => answers.roleType === 'Intern',
    },
    {
    type: 'input',
    name: 'github',
    message: "What is the Engineer's Github username?",
    when: (answers) => answers.roleType === 'Engineer',
    },
    ]
function init(){
    inquirer.prompt(qs).then(function(res){
        if(res.roleType === "Manager"){
            const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
            team.push(manager);
        }
        else  if(res.roleType === "Engineer"){
            const engineer = new Engineer(res.name, res.id, res.email, res.github);
            team.push(engineer);
        }
        else  if(res.roleType === "Intern"){
            const intern = new Intern(res.name, res.id, res.email, res.school);
            team.push(intern);
        }
        addMember();
    })
}

function addMember(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'addMember',
            message: "Do you want to add another team member?",
            choices: ['Yes', 'No'],
            default: 'No'
        }
    ]).then(function(res){
        if(res.addMember === "Yes"){
            init()
        }
        else{
            fs.writeFileSync(outputPath, render(team), "utf8")
        }
    })
}
init();


