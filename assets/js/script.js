var apiKey = "11a245f3d50237252d19b41b74296a4b";

var cityName = document.getElementById("city-name");
var searchButton = document.getElementById("search-button");
var clearSearch = document.getElementById("clear-searches");
var currentWeather = document.getElementById("current-weather");
var citySelect = document.getElementById("city-select");
var currentTemp = document.getElementById("current-temp");
var currentIcon = document.getElementById("current-icon");
var currentHumidity = document.getElementById("humidity");
var currentSpeed = document.getElementById("wind-speed");
var weekForecast = document.getElementById("week-header");
var currentHistory = document.getElementById("history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];


var weather = {
  updateWeather: function(city) {
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q="
        + city
        + "&units=imperial&appid="
        + apiKey
    )
        .then((response) => {
            return response.json();
        })
        .then ((data) => {
            this.weatherStat(data);
        });
  },
  weatherStat: function(response){
    currentWeather.classList.remove("d-none");

    var todayDate = new Date(response.list[0].dt * 1000);
    var tDay = todayDate.getDate();
    var tMonth = todayDate.getMonth() + 1;
    var tYear = todayDate.getFullYear();
    cityName.innerHTML = response.city.name + " (" + tMonth + "/" + tDay + "/" + tYear + ") ";
    currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
    currentIcon.setAttribute("alt", response.list[0].weather[0].description);
    currentTemp.innerHTML = "Temperature: " + Math.floor(response.list[0].main.temp) + " &#176F";
    currentHumidity.innerHTML = "Humidity: " + response.list[0].main.humidity + "%";
    currentSpeed.innerHTML = "Wind Speed: " + response.list[0].wind.speed + " MPH";

    weekForecast.classList.remove("d-none");

    var forecastList = document.querySelectorAll(".fl");
    for (i = 0; i < forecastList.length; i++) {
        forecastList[i].innerHTML = "";
        var listIndex = i * 8 + 4;
        var listDate = new Date(response.list[listIndex].dt * 1000);
        var listDay = listDate.getDate();
        var listMonth = listDate.getMonth() + 1;
        var listYear = listDate.getFullYear();
        var listDateP = document.createElement("p");
        var weatherIcon = document.createElement("img");
        var weatherTemp = document.createElement("p");
        var weatherHumidity = document.createElement("p");

        listDateP.setAttribute("class", "mt-3 mb-0 forecast-date");
        listDateP.innerHTML = listMonth + "/" + listDay + "/" + listYear;
        forecastList[i].append(listDateP);
        weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + response.list[listIndex].weather[0].icon + "@2x.png");
        weatherIcon.setAttribute("alt", response.list[listIndex].weather[0].description);
        weatherTemp.innerHTML = "Temperature: " + Math.floor(response.list[listIndex].main.temp) + " &#176F";
        weatherHumidity.innerHTML = "Humidity: " + response.list[listIndex].main.humidity + "%";
        forecastList[i].append(weatherIcon);
        forecastList[i].append(weatherTemp);
        forecastList[i].append(weatherHumidity);
    }
  },

  triggerSearchHistory: function() {
    currentHistory.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
      var historyEntry = document.createElement("input");
      historyEntry.setAttribute("type", "text");
      historyEntry.setAttribute("readonly", true);
      historyEntry.setAttribute("class", "form-control d-block bg-secondary text-white fw-bold text-center");
      historyEntry.setAttribute("value", searchHistory[i]);
      
  
      // Create a closure to capture the correct value of searchHistory[i]
      (function(entry) {
        historyEntry.addEventListener("click", function () {
          weather.updateWeather(entry);
        });
      })(searchHistory[i]);
  
      currentHistory.append(historyEntry);
    }
  }
}

  

searchButton.addEventListener("click", function () {
  var searchEntry = citySelect.value;
  weather.updateWeather(searchEntry);
  searchHistory.push(searchEntry);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  weather.triggerSearchHistory();
});

clearSearch.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  weather.triggerSearchHistory();
});

weather.triggerSearchHistory();
if (searchHistory.length > 0) {
  weather.updateWeather(searchHistory[searchHistory.length - 1]);
}
