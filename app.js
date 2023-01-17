window.addEventListener("load", () => {
  const API_KEY = "VPBZUUWPE38MTV2K4WY8WCDYT";
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

  let lat;
  let lon;

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
          const { conditions, temp, icon, feelslike, humidity, datetime } = data.currentConditions;
          temperature.innerHTML = `${Math.floor(temp)}<sup>°c</sup>`;
          timezone.textContent = data.timezone;
          description.textContent = data.description;
          condition.textContent = conditions;
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
});

// const fetchLocationName = async (lat, lng) => {
//   await fetch(
//     "https://www.mapquestapi.com/geocoding/v1/reverse?key=pd7N5vPXLU69iBsbGOm4TxDzQqjMGqNj&location=" +
//       lat +
//       "%2C" +
//       lng +
//       "&outFormat=json&thumbMaps=false"
//   )
//     .then((response) => response.json())
//     .then((responseJson) => {
//       console.log(responseJson.results);
//     });
// };
