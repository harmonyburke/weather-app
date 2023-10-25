var weatherApi="https://api.openweathermap.org/data/2.5/forecast?q=Dallas&appid=9f2db7bcc59386b227ecd49ea3d0414a"

var citySearch=$("#city-search")
var currentWeather=$("#current-weather")
var forecast=$("#forecast")
$(document).ready(function(){
    // everthing in this function runs on page load and when the given parameters are met
    $("#search-btn").on("click",function(){
        console.log("search button")
        // this function will run when the search button is clicked
        console.log(weatherApi)
        // checking to make sure the API is working
        fetch(weatherApi)
        .then(function(response){
            return response.json()
            console.log(response)
            // this pulls the information from the API and returns it to the webpage
            
        })
        .then(function (data) {
            console.log(data);
            // this pulls the specified data from the API
            for (i=0;i<data.length; i++){
                var todayWeather=$("<h3>")
                  todayWeather.textContent=data.list.main.temp;

                  currentWeather.appendChild(todayWeather);
                  console.log(todayWeather)
                  
             };

        })

    })
})
       
     
        
    



