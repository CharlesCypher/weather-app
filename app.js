const API_KEY = "422NLP2KD74JLEZVLT8RH3T4Q";
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const options = {
  method: "GET",
  headers: {},
};

const timezone = document.querySelector(".weather-timezone");
const temperature = document.querySelector(".weather-temperature");
const description = document.querySelector(".weather-description");
const condition = document.querySelector(".weather-condition");
const feelsLike = document.querySelector(".weather-feels_like");
const weather = document.querySelector(".weather");

let lat;
let lon;

weather.innerHTML = '<div class="loading"></div>';

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    fetch(`${BASE_URL}${lat}%2C${lon}?unitGroup=metric&key=${API_KEY}&contentType=json`, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        document.querySelector(".weather").style.visibility = "visible";

        const { conditions, temp, icon, feelslike, humidity, datetime } = data.currentConditions;
        weather.innerHTML = `
        <h2 class="weather-timezone">${data.timezone}</h2>
        <div class="div">
          <h1 class="weather-temperature">${Math.floor(temp)}<sup>°c</sup></h1>
          <h3 class="weather-condition">${conditions}</h3>
          <h3 class="weather-feels_like"></h3>
        </div>
        <h4 class="weather-description">${data.description}</h4>`;
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
