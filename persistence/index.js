const Store = require("data-store");

const store = new Store("beautiful-habitica-cli");
const API_TOKEN = "habitica-api-token";
const USER_IDENTITY = "habitica-user-idenity";

let getApiToken = () => { return store.get(API_TOKEN);};
let getUserIdentity = () => { return store.get(USER_IDENTITY);};
let setApiToken = (s) => { return store.set(API_TOKEN, s);};
let setUserIdentity = (s) => { return store.set(USER_IDENTITY, s);};
let apiTokenExists = () => { return store.has(API_TOKEN);};
let userIdentityExists = () => { return store.has(USER_IDENTITY);};
let clearDataStore = () => { store.clear();};

module.exports = {
  getApiToken,
  getUserIdentity,
  setApiToken,
  setUserIdentity,
  apiTokenExists,
  userIdentityExists,
  clearDataStore
};
