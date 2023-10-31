
var citySearch = $("#city-search")
var currentWeather = $("#current-weather")
var forecast = $("#forecast")
var cityHistory = $("#saved-city")
var currentDay = dayjs().format("MMMM, DD, YYYY")
$(document).ready(function () {
    // everthing in this function runs on page load and when the given parameters are met


    $("#search-btn").on("click", function () {
        var cityName = citySearch.val();
        console.log("search button")
        // this function will run when the search button is clicked
        console.log(cityName)
        // searches the 
        if (cityName) {
            weatherData(cityName);
        }
        createHistory(cityName)

    })

})
function weatherData(cityName) {

    var cityName = citySearch.val()

    var currWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=9f2db7bcc59386b227ecd49ea3d0414a`
    console.log(currWeatherApi)
    currentWeather.innerHTML = ""
    forecast.innerHTML = ""
    fetch(currWeatherApi)
        .then(function (response) {
            return response.json()

            // this pulls the information from the API and returns it to the webpage
        })
        .then(function (data) {
            console.log(data);
            // this pulls the specified data from the API
            currentWeather.empty()
            // this clears the page so that mulitple weather point aren't displayed at the same time
            var iconData = data.list[1].weather[0].icon;
            var iconURL = `https://openweathermap.org/img/w/${iconData}.png`


            var temp = document.createElement("h2")
            var humid = document.createElement("h2")
            var wind = document.createElement("h2")
            var todayIcon = document.createElement("img")
            var todayDate = document.createElement("h2")
            todayDate.textContent = dayjs().format("MMMM, DD, YYYY")

            temp.textContent = "Today's Temperature:" + data.list[1].main.temp + "°F"
            humid.textContent = "Humidity" + data.list[1].main.humidity + "%"
            wind.textContent = "Wind Speed:" + data.list[1].wind.speed + "MPH"
            todayIcon.setAttribute("src", iconURL)



            currentWeather.append(todayDate)
            currentWeather.append(temp)
            currentWeather.append(humid)
            currentWeather.append(wind)
            currentWeather.append(todayIcon)

            // currentWeather.append($("<h2>").text("Today's Weather:" + temp + " °F " + humid + " % " + wind + " MPH "));
            // appends the current coniditons to the page asone element


            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;


            var forecastAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=` + lat + "&lon=" + lon + "&exclude={part}&units=imperial&appid=f30dc0b71f772a037a522282770190be"
            console.log(forecastAPI)


            fetch(forecastAPI)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data)

                    forecast.empty()
                    for (var i = 1; i < 6; i++) {
                        var forecastDate = document.createElement("h3")
                        forecastDate.textContent = dayjs().add(i, "days").format("MMMM, DD, YYYY")
                        console.log("here", forecastDate)
                        forecast.append(forecastDate)

                        var forecastTemp = document.createElement("h3")
                        forecastTemp.textContent = "Temp:" + data.daily[i].temp.day + "°F"
                        var forecastWind = document.createElement("h3")
                        forecastWind.textContent = "Wind:" + data.daily[i].wind_speed + "MPH"
                        var forecastHumid = document.createElement("h3")
                        forecastHumid.textContent = "Humidity: " + data.daily[i].humidity + "%"
                        var icon = document.createElement("img")
                        icon.setAttribute("src", iconURL)

                        forecast.append(forecastTemp)
                        forecast.append(forecastWind)
                        forecast.append(forecastHumid)
                        forecast.append(icon)
                    }
                })
        })





}

function createHistory(name) {
    console.log("history", name)
    if (name === "") {
        alert("Please enter a valid city");
        // invoke function to get current history
        return;
    }
    var historyStorage = JSON.parse(localStorage.getItem("saveCity"));
    if (historyStorage === null) {
        historyStorage = [];
        // if there is nothing to save
    }

    // Check if the city name already exists in historyStorage
    if (historyStorage.indexOf(name) === -1) {
        historyStorage.push(name);
        localStorage.setItem("saveCity", JSON.stringify(historyStorage));
        
        // Clear the cityHistory container and recreate all buttons
        cityHistory.innerHTML = "";
        for (var i = 0; i < historyStorage.length; i++) {
            var prevCity = document.createElement("button");
            prevCity.textContent = historyStorage[i];
            prevCity.setAttribute("id", historyStorage[i]);
            cityHistory.append(prevCity);
            // creates a button element for the city names in local storage
            prevCity.addEventListener("click", function (event) {
                var cityClick = event.target.id;
                weatherData(cityClick);
                // when you click on that button, it will display the weather again
            });
        }
    }
}







