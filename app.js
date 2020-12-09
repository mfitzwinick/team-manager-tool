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
  )
};
  
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
        message: 'Enter github user name:',
        name: 'github',
      },
    
    ])
    .then((response) =>{
  
      const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.github);
      employees.push (engineer);
      addNewEmployee();
    }
    )
  };
    const addIntern=() => {
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter intern Name:',
          name: 'internName',
        },
        {
          type: 'number',
          message: 'Enter employee ID:',
          name: 'internId',
        },
        {
          type: 'input',
          message: 'Enter intern email:',
          name: 'internEmail',
        },
        {
          type: 'input',
          message: 'Enter school name:',
          name: 'schoolName',
        },
      
      ])
      .then((response) =>{
    
        const intern = new Intern(response.internName, response.internId, response.internEmail, response.schoolName);
        employees.push (intern);
        addNewEmployee();
      }
      )
    };
addEmployee();


// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


