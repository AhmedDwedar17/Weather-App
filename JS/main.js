// Variables
let currentLocation = "cairo"
// Today Var
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")

// Next And Third Day Var
let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")

// Search Input Var
let searchInput = document.getElementById("search")


// API Data
const apiKey = "1226cfa1d0cf4a1eace123243241801"
const baseUrl = "https://api.weatherapi.com/v1/forecast.json"

async function getWeatherData(location) {
    const response = await fetch(`${baseUrl}?key=${apiKey}&days=3&q=${location}`)
    if(response.status != 200) return
    const responseData = await response.json()
    displayWeather(responseData)

}

// Functions

function success(position) {
    const currentLocation = `${position.coords.latitude},${position.coords.longitude}`
    getWeatherData(currentLocation)
}

function displayWeather(responseData) {
    // Today Weather
    let todayDate = new Date()
    
    todayName.innerHTML =  todayDate.toLocaleString("en-us", {weekday:"long"})
    todayNumber.innerHTML =  todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us", {month:"long"})
    todayLocation.innerHTML = responseData.location.name
    todayTemp.innerHTML = responseData.current.temp_c
    todayConditionText.innerHTML = responseData.current.condition.text
    todayConditionImg.setAttribute("src", responseData.current.condition.icon)
    humidity.innerHTML = responseData.current.humidity+" %"
    wind.innerHTML = responseData.current.wind_kph+" KM/H"
    windDirection.innerHTML = responseData.current.wind_dir

    // Next And Third Day Weather
    let forecastData = responseData.forecast.forecastday
    for(let i = 0; i < 2 ; i++){
        let nextDate = new Date(forecastData[i+1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us", {weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}


// Events

window.addEventListener("load", function() {
    navigator.geolocation.getCurrentPosition(success)
})


searchInput.addEventListener("input", function(){
    getWeatherData(this.value)
})