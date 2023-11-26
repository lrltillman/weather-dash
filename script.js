const API_KEY = '87a59ac6db2bcfce9d1ae135183b1952';
const cityNameEl = document.getElementById("cityNameEl");
const searchBtn = document.getElementById("searchBtn");
const displayDataContent = document.getElementById("container");
let cityName;
let lat;
let lon;

function getCity(event) {
    event.preventDefault();
    cityName = cityNameEl.value;
    console.log('you hit this function!')
    getGeolocation()


}


function getWeather() {
    var requestWeather = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`

    fetch(requestWeather)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {


            //build two buttons here, one for today, one for future? each onclick has different for loop? or no?

            //need icons still

            //need dayjs? possibly?

            for (var i = 0; i < 5; i++) {
                var theDate = data.list[i].dt_txt;
                var mainTemp = data.list[i].main.temp;
                var humidLevel = data.list[i].main.humidity;
                var windSpeed = data.list[i].wind.speed;
                var weatherConditions = data.list[i].weather[0].description;
                const pageContent = document.createElement('div');
                pageContent.innerHTML =
                    `<div id="dayBox">
                    <h4>${theDate}</h4>
        <h6>The temperature outside is ${mainTemp} ºF.</h6>
        <h6>Weather conditions: ${weatherConditions}</h6>
        <h6>Humidity level: ${humidLevel}</h6>
        <h6>Wind speed: ${windSpeed} mph</h6>
        </div>`

                displayDataContent.appendChild(pageContent);
            }
        })
        .catch(function (err) {
            console.error(err)
        })
}






searchBtn.addEventListener('click', getCity);

function getGeolocation() {
    var requestGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(requestGeo)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            getWeather()

            // will get the weather data then maybe call another function
            // that will render the data, or add it the html



        });
}
