let locn = document.getElementById('location');
let tempicon = document.getElementById('tempicon');
let tempvalue = document.getElementById('tempvalue');
let weather = document.getElementById('weather');
let humidityPerc = document.getElementById('humidity');
let windspeedval = document.getElementById('wind');
let symbol = document.getElementById('metric');
let visibVal = document.getElementById('visibility');
const searchInp = document.getElementById('search');
const searchButton = document.getElementById('searchbtn');
const resetButton = document.getElementById('reset');
const apikey = "API KEY GOES HERE";

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!onlySpaces(searchInp.value) && searchInp.value != "") {
        getWeather(searchInp.value);
    }
    searchInp.value = '';
});

resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    reset();
});

function reset() {
    locn.textContent = "Hi there! I am your Weather Man.";
    weather.textContent = "";
    humidityPerc.textContent = "Enter the name of a state, city, district, or locality, and I'll get you the details in a jiffy.";
    windspeedval.textContent = "";
    visibVal.textContent = "";    
    tempvalue.textContent = "";
    tempicon.style.visibility = "visible";
    tempicon.src = "./icons/wman.png";
    symbol.style.visibility = "hidden";
    searchInp.value = '';
}

function onlySpaces(str) {
    return /^\s*$/.test(str);
}

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);


        const weatherData = await response.json();
        console.log(weatherData);
        const { name, visibility } = weatherData;
        const { speed } = weatherData.wind;
        const { feels_like, humidity } = weatherData.main;
        const { icon, description } = weatherData.weather[0];

        locn.textContent = "Weather in " + name;
        weather.textContent = "Description: " + description;
        humidityPerc.textContent = "Humidity: " + humidity + " %";
        windspeedval.textContent = "Wind Speed: " + speed + " kmph";
        visibVal.textContent = "Visibility: " + (visibility / 1000) + " km(s)";
        tempvalue.textContent = Math.round(feels_like);
        tempicon.style.visibility = "visible";
        symbol.style.visibility = "visible";
        tempicon.src = "./icons/" + icon + ".png";


    }

    catch (error) {
        locn.textContent = "Data Unavailable";
        weather.textContent = "Possible Causes:";
        humidityPerc.textContent = "1. No Internet Connection.";
        windspeedval.textContent = "2. Either the input value is invalid or the weather station database does not contain it.";
        visibVal.textContent = "3. Javascript is disabled, or the API Key used in the script is inactive or invalid.";
        tempvalue.textContent = "";
        tempicon.style.visibility = "visible";
        tempicon.src = "./icons/unavailable.png";
        symbol.style.visibility = "hidden";

    }
}

$(document).ready(function () {
    reset();
});
