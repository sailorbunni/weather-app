let h2 = document.querySelector("h2");
let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let fullMinutes = ("0" + now.getMinutes()).slice(-2);
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let month = months[now.getMonth()];

h2.innerHTML = `Last Updated: ${month}/${date}/${year} <br /> ${day} ${hours}:${fullMinutes}`;

function changePlace(event) {
  event.preventDefault();
  let input = document.querySelector("#new");
  let newPlace = input.value;
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newPlace}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateData);
}

function forecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");
  forecastElement.innerHTML = `
    <li>
      <img src="http://openweathermap.org/img/wn/${
        forecast[0].weather[0].icon
      }@2x.png" id="firstIcon" />
      <span class="firstDate">${formatDay(
        forecast[0].dt
      )}</span> <span class="firstHigh">${Math.round(
    forecast[0].temp.max
  )}º</span> |
      <span class="firstLow">${Math.round(forecast[0].temp.min)}º</span>
    </li>
    <li>
      <img src="http://openweathermap.org/img/wn/${
        forecast[1].weather[0].icon
      }@2x.png" id="secondIcon" />
      <span class="secondDate">${formatDay(
        forecast[1].dt
      )}</span> <span class="secondHigh">${Math.round(
    forecast[1].temp.max
  )}º</span> |
      <span class="secondLow">${Math.round(forecast[1].temp.min)}º</span>
    </li>
    <li>
      <img src="http://openweathermap.org/img/wn/${
        forecast[2].weather[0].icon
      }@2x.png" id="thirdIcon" />
      <span class="thirdDate">${formatDay(
        forecast[2].dt
      )}</span> <span class="thirdHigh">${Math.round(
    forecast[2].temp.max
  )}º</span> |
      <span class="thirdLow">${Math.round(forecast[2].temp.min)}º</span>
    </li>
    <li>
      <img src="http://openweathermap.org/img/wn/${
        forecast[3].weather[0].icon
      }@2x.png" id="forthIcon" />
      <span class="forthDate">${formatDay(
        forecast[3].dt
      )}</span> <span class="forthHigh">${Math.round(
    forecast[3].temp.max
  )}º</span> |
      <span class="forthLow">${Math.round(forecast[3].temp.min)}º</span>
    </li>
    <li>
      <img src="http://openweathermap.org/img/wn/${
        forecast[4].weather[0].icon
      }@2x.png" id="fifthIcon" />
      <span class="fifthDate">${formatDay(
        forecast[4].dt
      )}</span> <span class="fifthHigh">${Math.round(
    forecast[4].temp.max
  )}º</span> |
      <span class="fifthLow">${Math.round(forecast[4].temp.min)}º</span>
    </li>`;
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateData);
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let form = document.querySelector("#cityForm");
form.addEventListener("submit", changePlace);

let button = document.querySelector("#current");
button.addEventListener("click", getPosition);

function updateData(response) {
  console.log(response);

  forecast(response.data.coord);

  let h1 = document.querySelector(".location");
  h1.innerHTML = `${response.data.name}`;

  let country = document.querySelector(".country");
  country.innerHTML = `${response.data.sys.country}`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  calTemperature = response.data.main.temp;

  let currentTemp = document.querySelector(".currentDegree");
  currentTemp.innerHTML = `${Math.round(calTemperature)}`;

  highCel = response.data.main.temp_max;

  let highTemp = document.querySelector(".high");
  highTemp.innerHTML = `${Math.round(highCel)}`;

  lowCel = response.data.main.temp_min;

  let lowTemp = document.querySelector(".low");
  lowTemp.innerHTML = `${Math.round(lowCel)}`;

  let weather = document.querySelector(".weatherState");
  weather.innerHTML = `${response.data.weather[0].main}`;

  let wind = document.querySelector(".windSpeed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let iconElement = document.querySelector("#mainIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function changeToFahr(event) {
  event.preventDefault();
  let temp = document.querySelector(".currentDegree");
  let fahrTemp = (calTemperature * 9) / 5 + 32;
  temp.innerHTML = `${Math.round(fahrTemp)}`;
  let fahrHigh = document.querySelector(".high");
  let newFahrHigh = (highCel * 9) / 5 + 32;
  fahrHigh.innerHTML = `${Math.round(newFahrHigh)}`;
  let fahrLow = document.querySelector(".low");
  let newFahrLow = (lowCel * 9) / 5 + 32;
  fahrLow.innerHTML = `${Math.round(newFahrLow)}`;
}
function changeBack(event) {
  event.preventDefault();
  let temp = document.querySelector(".currentDegree");
  temp.innerHTML = `${Math.round(calTemperature)}`;
  let high = document.querySelector(".high");
  high.innerHTML = `${Math.round(highCel)}`;
  let low = document.querySelector(".low");
  low.innerHTML = `${Math.round(lowCel)}`;
}

let fahrChange = document.querySelector("#unitFahr");
fahrChange.addEventListener("click", changeToFahr);

let calChange = document.querySelector("#unitCal");
calChange.addEventListener("click", changeBack);
