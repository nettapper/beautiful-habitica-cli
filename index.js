#!/usr/bin/env node

var figlet = require('figlet');
var chalk = require('chalk');
const Store = require('data-store')
const store = new Store('beautiful-habitica-cli');
const API_TOKEN = 'habitica-api-token';
// console.log(store.set(API_TOKEN, "hello world"));
console.log(store.get(API_TOKEN));
console.log(typeof(store.get('test'))); // undefined if not present

console.log(chalk.redBright(figlet.textSync('Beautiful')));
console.log(chalk.cyanBright(figlet.textSync('Habitica')));
