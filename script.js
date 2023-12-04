const API_KEY = '87a59ac6db2bcfce9d1ae135183b1952';

const cityNameEl = document.getElementById("cityNameEl");
const searchedCity = document.getElementById("searchHistory");
const cityDropDown = document.getElementById("cities");
const goBtn = document.getElementById("goBtn");
const searchBtn = document.getElementById("searchBtn");
const displayDataContent = document.getElementById("container");
let cityName;
let lat;
let lon;

searchBtn.addEventListener('click', getCity);

function renderHistory() {
    // display local storage array into dropdown el using for loop
}

function getCity(event) {


    event.preventDefault();
    cityName = cityNameEl.value;
    // LOCAL STORAGE TO HAPPEN HERE
    // could use if statement 
    var cityHistory = JSON.parse(localStorage.getItem("location")) || [];
    cityHistory.push(cityName);
    localStorage.setItem("location", JSON.stringify(cityHistory));
    getGeolocation()


}

goBtn.addEventListener('click', callSavedCity);

function callSavedCity(event) {
    event.preventDefault();

    cityName = cityDropDown.value;
    console.log(cityName)

    getGeolocation()
}

function getGeolocation() {
    var requestGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(requestGeo)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            getWeather()
        });
}

function getWeather() {
    var requestWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`

    fetch(requestWeather)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            displayDataContent.innerHTML = "";
            console.log(data.list)


            for (var i = 0; i < 40; i += 8) {
                var theDate = data.list[i].dt_txt;
                var mainTemp = data.list[i].main.temp;
                var humidLevel = data.list[i].main.humidity;
                var windSpeed = data.list[i].wind.speed;
                var weatherConditions = data.list[i].weather[0].description;
                var weatherIcon = data.list[i].weather[0].icon;

                displayDataContent.innerHTML +=
                    `<div id="dayBox">
                    <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="icon of todays weather conditions" id="iconImg" />
                    <h4>${theDate}</h4>
        <h6>The temperature outside in ${cityName} is ${mainTemp} ºF.</h6>
        <h6>Weather conditions: ${weatherConditions}</h6>
        <h6>Humidity level: ${humidLevel}</h6>
        <h6>Wind speed: ${windSpeed} mph</h6>
        </div>`

                // displayDataContent.appendChild(pageContent);
            }
        })
        .catch(function (err) {
            console.error(err)
        })
}








