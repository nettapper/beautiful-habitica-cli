const axios = require("axios");

const BASE_URL = "https://habitica.com/api/v3";
const API_KEY = "";
const API_USER = "";

var api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "x-api-key": API_KEY,
    "x-api-user": API_USER,
  }
});

async function getAvailableGear() {
  api.get("/user/inventory/buy")
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

getAvailableGear();

