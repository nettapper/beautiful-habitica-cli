#!/usr/bin/env node

var figlet = require("figlet");
var chalk = require("chalk");
var inquirer = require("inquirer");
const persistence = require("./persistence/index.js");

// Testing the Chalk and Figlet Output
console.log(chalk.redBright(figlet.textSync("Beautiful")));
console.log(chalk.cyanBright(figlet.textSync("Habitica")));

// Testing the user input with Inquirer
let isSomething = function(s) {
  if(typeof(s) === undefined) return "Please enter a value";
  if(s === "") return "Please enter a value";
  return true;
};

let userIdentityQuestion = {
  "type": "input",
  "name": "userIdentity",
  "message": "Please enter your User ID:",
  "validate": isSomething
};
let apiTokenQuestion = {
  "type": "input",
  "name": "apiToken",
  "message": "Please enter your API Token:",
  "validate": isSomething
};

let questions = [];
if(!persistence.userIdentityExists()) questions.push(userIdentityQuestion);
if(!persistence.apiTokenExists()) questions.push(apiTokenQuestion);

inquirer.prompt(questions)
  .then(answers => {
    if(answers.userIdentity !== undefined)
      persistence.setUserIdentity(answers.userIdentity);
    if(answers.apiToken !== undefined)
      persistence.setApiToken(answers.apiToken);
  });
