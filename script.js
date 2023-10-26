
var citySearch=$("#city-search")
var currentWeather=$("#current-weather")
var forecast=$("#forecast")
$(document).ready(function(){
    // everthing in this function runs on page load and when the given parameters are met
    function weatherData(cityName){
        var weatherApi=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=9f2db7bcc59386b227ecd49ea3d0414a`
        console.log(weatherApi) 
        

        fetch(weatherApi)
            .then(function(response){
                return response.json()
                
                // this pulls the information from the API and returns it to the webpage
                
            .then(function (data) {
                    console.log(data);
                    // this pulls the specified data from the API
                    currentWeather.empty 
                    // this clears the page so that mulitple weather point aren't displayed at the same time
            if (data.list.length>0){
                var allData=data.list[0].main;
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

            }       
                
                        
                        
                    })
            })
        }
        
        $("#search-btn").on("click", function(){
            console.log("search button")
            // this function will run when the search button is clicked
            var cityName=citySearch.val();
            // searches the 
            if(cityName){
                weatherData(cityName);
            }
        })       
            
        })
       
     
        
    



