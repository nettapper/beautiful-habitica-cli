const axios = require("axios");
const persistence = require("../persistence/index.js");

const BASE_URL = "https://habitica.com/api/v3";
const API_KEY = persistence.getApiToken();
const API_USER = persistence.getUserIdentity();

var api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "x-api-key": API_KEY ? API_KEY : "",
    "x-api-user": API_USER ? API_USER : "",
  }
});

async function getAvailableGear() {
  api.get("/user/inventory/buy")
  .then(function (response) {
    // console.log(response.data);
    console.log("it works");
  })
  .catch(function (error) {
    // console.log(error);
    console.log("it doesn't work");
  });
}

async function getTokenAndUserIdPromise(username, password) {
  return api.post("/user/auth/local/login", {
    username,
    password
  });
}

module.exports = {
  getAvailableGear,
  getTokenAndUserIdPromise
};
