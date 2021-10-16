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
