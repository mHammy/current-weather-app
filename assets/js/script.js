var apiKey = "11a245f3d50237252d19b41b74296a4b";

var searchButton = document.getElementById("search-button");
var clearSearch = document.getElementById("clear-searches");
var currentWeather = document.getElementById("current-weather");
var citySelect = document.getElementById("city-select");
var currentTemp = document.getElementById("current-temp");
var currentPic = document.getElementById("current-pic");
var currentHumidity = document.getElementById("humidity");
var currentSpeed = document.getElementById("wind-speed");
var weekForecast = document.getElementById("week-header");
var currentHistory = document.getElementById("history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];


function updateWeather(city) {
    fetch (
        "api.openweathermap.org/data/2.5/forecast?q="
        + city
        + "&units=imperial&appid="
        + apiKey
    )
        .then (function (response) {
            return response.json();
          })
        .then (function (data) {
            weatherInfo(data);
        })
}

function weatherInfo() {
    currentWeather.classList.remove("d-none");
    // Need to add an array
}

searchButton.addEventListener("click", function () {
    var searchEntry = citySelect.value;
    updateWeather(searchEntry);
    searchHistory.push(searchEntry);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    // Need search history render
})