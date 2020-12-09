const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");
var employees=[];

const addEmployee = () => {
  inquirer
  .prompt ([
    {type: "list",
     message: "What type of employee would you like to add?",
     name:"Employee",
     choices: ["manager", "engineer", "intern"]
    }
  ]).then ((res)=> {
    console.log(res.Employee)
    switch (res.Employee){
      case "manager" : 
      addManager();
      break;
      case "intern":
      addIntern();
      break;
      case "engineer":
      addEngineer();
      break;  
    }
  })

}

const addNewEmployee = () => {
  inquirer
  .prompt (
    {
type: 'list',
message: 'Would you like to add another employee?',
choices: ["yes", "no"],
name: 'start'
  }
  ).then ((response)=> {
    if(response.start == "yes"){
      addEmployee()
    } else if (response.start == "no") {
      //console.table(employees)
      render(employees);
    } else if (err) { console.log(err)}
  })
}

const addManager=() => {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter Manager Name:',
      name: 'managerName',
    },
    {
      type: 'number',
      message: 'Enter employee ID:',
      name: 'managerId',
    },
    {
      type: 'input',
      message: 'Enter manager email:',
      name: 'managerEmail',
    },
    {
      type: 'input',
      message: 'Enter office number:',
      name: 'managerOfficeNumber',
    },
  
  ])
  .then((response) =>{

    const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
   employees.push (manager);
   addNewEmployee();
  }
  );
  const addEngineer=() => {
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter Engineer Name:',
        name: 'engineerName',
      },
      {
        type: 'number',
        message: 'Enter employee ID:',
        name: 'engineerId',
      },
      {
        type: 'input',
        message: 'Enter engineer email:',
        name: 'engineerEmail',
      },
      {
        type: 'input',
        message: 'Enter git hub user name:',
        name: 'github',
      },
    
    ])
    .then((response) =>{
  
      const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.github);
     employees.push (engineer);
     addNewEmployee();
  
    }
    
    );

  
}
addEmployee();
// inquirer
//   .prompt([
//     {
//       type: 'input',
//       message: 'What is your name?',
//       name: 'name',
//     },
//     {
//       type: 'number',
//       message: 'What is your employee ID?',
//       name: 'id',
//     },
//     {
//       type: 'input',
//       message: 'Please enter your email:',
//       name: 'email',
//     },
//   ])
//   .then((response) =>
//   console.log(response)
//   );
// }gf


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
