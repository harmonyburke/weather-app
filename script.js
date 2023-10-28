
var citySearch = $("#city-search")
var currentWeather = $("#current-weather")
var forecast = $("#forecast")
var cityHistory = $("#saved-city")
var currentDay = dayjs().format("MM, DD, YYYY")
$(document).ready(function () {
    // everthing in this function runs on page load and when the given parameters are met


    $("#search-btn").on("click", function () {
        console.log("search button")
        // this function will run when the search button is clicked
        var cityName = citySearch.val();
        console.log(cityName)
        // searches the 
        if (cityName) {
            weatherData(cityName);
        }
        createHistory(cityName)
    })
    weatherData()

})
function weatherData(cityName){
    var weatherApi=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=9f2db7bcc59386b227ecd49ea3d0414a`
    // var weatherApi=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=9f2db7bcc59386b227ecd49ea3d0414a`
    console.log(weatherApi) 
    container.innerHTML = ""
    forecast.innerHTML = ""
    fetch(weatherApi)
    .then(function(response){
        return response.json()
        
        // this pulls the information from the API and returns it to the webpage
        
        .then(function (data) {
            console.log(data);
            // this pulls the specified data from the API
            currentWeather.empty 
            // this clears the page so that mulitple weather point aren't displayed at the same time
            var lat=data.coord.lat
            var lon=data.coord.lon

              
        if (data.main>0){
            var allData=data.main;
            var temp=allData.temp;
            // var for current temperature
            currentWeather.append($("<h3>").text("Today's Weather:"+ temp + "F"))
            // this adds the current temperature to the page so the user can see it 
            var humidity=allData.humidity
            // var for current humidity
            currentWeather.append($("<h3>").text("Humidity: "+ humidity + "%"))
            // adds humidity level to the page
            var wind=data.list[0].wind.speed
            // var for current wind
            currentWeather.append($("<h3>").text("Wind: " + wind + "mph"))
            // adds wind speed to the page

            // to add 5day forecast- use 1-5 in the list array????

        }       
            var forecastAPI=`https://api.openweathermap.org/data/2.5/onecall?lat=` + lat + "&lon=" + lon + "&exclude={part}&units=imperial&appid=f30dc0b71f772a037a522282770190be"
            

            fetch(forecastAPI)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                for(var i=1; i<6; i++){
                    var forecastDate=document.createElement("h3")
                    forecastDate.textContent=dayjs().add(i,"days").format("MM, DD, YYYY")
                    console.log("here",forecastDate)
                    forecast.append(forecastDate)
                    
                    var forecastTemp=document.createElement("h3")
                    forecastTemp.textContent="Temp:" + data.daily[i].temp.day
                    forecast.append(forecastTemp)
                }
            })
                    
                    
                })
        })
    }

function createHistory(name) {
    console.log("history", name)
    if (name === "") {
        alert("Please enter a valid city")
        // invoke function to get current history
        return
    }
    var historyStorage = JSON.parse(localStorage.getItem("saveCity"))
    if (historyStorage === null) {
        historyStorage = []

    }
    historyStorage.push(name)
    localStorage.setItem("saveCity", JSON.stringify(historyStorage))
    for (var i = 0; i < historyStorage.length; i++) {
        var prevCity = document.createElement("button")
        prevCity.textContent = historyStorage[i]
        prevCity.setAttribute("id", historyStorage[i])
        cityHistory.append(prevCity)
        prevCity.addEventListener("click", function (event) {
            var cityClick = event.target.id
            weatherData(cityClick)
        })

    }

}







