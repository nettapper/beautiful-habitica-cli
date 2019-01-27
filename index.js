#!/usr/bin/env node

var figlet = require("figlet");
var chalk = require("chalk");
var inquirer = require("inquirer");
var rx = require("rxjs");
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

const AUTHENTICATION_CHOICE_NAME = "authenticationChoice";
const USERPASS_OPTION = "username/password";
const IDTOKEN_OPTION = "userid/apitoken";
const EXIT_OPTION = "exit";
let authenticationChoiceQuestion = {
  "type": "list",
  "name": AUTHENTICATION_CHOICE_NAME,
  "message": "How would you like to authenticate?",
  "choices": [USERPASS_OPTION, IDTOKEN_OPTION, new inquirer.Separator(), EXIT_OPTION]
};
const USER_IDENTITY_NAME = "userIdentity";
let userIdentityQuestion = {
  "type": "input",
  "name": USER_IDENTITY_NAME,
  "message": "Please enter your User ID:",
  "validate": isSomething
};
const API_TOKEN_NAME = "apiToken";
let apiTokenQuestion = {
  "type": "input",
  "name": API_TOKEN_NAME,
  "message": "Please enter your API Token:",
  "validate": isSomething
};

let questions = [];
let prompts = new rx.Subject();

// NOTE: you must register the observers before notifying them
// ie. add the questions AFTER passing the rx.Observable to inquirer
inquirer.prompt(prompts.asObservable()).ui.process.subscribe(
  function (answers) {
    // how does the user want to authenticate?
    if(answers.name === AUTHENTICATION_CHOICE_NAME) {
      if(answers.answer === EXIT_OPTION) prompts.complete();
      if(answers.answer === USERPASS_OPTION) prompts.complete();
      if(answers.answer === IDTOKEN_OPTION) {
        if(!persistence.userIdentityExists()) prompts.next(userIdentityQuestion);
        if(!persistence.apiTokenExists()) prompts.next(apiTokenQuestion);
      }
    }
    if(answers.name === USER_IDENTITY_NAME) {
      persistence.setUserIdentity(answers.answer);
    }
    if(answers.name === API_TOKEN_NAME)
      persistence.setApiToken(answers.answer);
    // does the datastore have the creds?
    // if so, then nothing more to ask the user
    if(persistence.userIdentityExists() && persistence.apiTokenExists()) prompts.complete();
  },
  function (err) {
    console.log("Error: ", err);
  },
  function () {
    console.log("Completed");
  }
);

// initializing the questions to ask the user
// NOTE: we must always have the complete case reachable by user action / state
if(!persistence.userIdentityExists() && !persistence.apiTokenExists()) prompts.next(authenticationChoiceQuestion);
// does the datastore have the creds?
// if so, then nothing more to ask the user
if(persistence.userIdentityExists() && persistence.apiTokenExists()) prompts.complete();
