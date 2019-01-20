#!/usr/bin/env node

var figlet = require('figlet');
var chalk = require('chalk');
var inquirer = require('inquirer');
const Store = require('data-store')

const store = new Store('beautiful-habitica-cli');
const API_TOKEN = 'habitica-api-token';
const USER_IDENTITY = 'habitica-user-idenity';

// Testing the Chalk and Figlet Output
console.log(chalk.redBright(figlet.textSync('Beautiful')));
console.log(chalk.cyanBright(figlet.textSync('Habitica')));

// Testting the Data-Store
// console.log(store.set(API_TOKEN, "hello world"));
let getApiToken = () => { return store.get(API_TOKEN)};
let getUserIdentity = () => { return store.get(USER_IDENTITY)};
let setApiToken = (s) => { return store.set(API_TOKEN, s)};
let setUserIdentity = (s) => { return store.set(USER_IDENTITY, s)};
let apiTokenExists = () => { return !(store.get(API_TOKEN) === undefined) };
let userIdentityExists = () => { return !(store.get(USER_IDENTITY) === undefined) };
let clearDataStore = function() {
  setApiToken(undefined);
  setUserIdentity(undefined);
};

// use to 'clear' the data-store
// clearDataStore();

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
}

let questions = []
if(!userIdentityExists()) questions.push(userIdentityQuestion);
if(!apiTokenExists()) questions.push(apiTokenQuestion);

inquirer.prompt(questions)
  .then(answers => {
    console.log(answers);
});
