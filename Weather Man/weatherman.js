let locn = document.getElementById('location');
let tempicon = document.getElementById('tempicon');
let tempvalue = document.getElementById('tempvalue');
let climate = document.getElementById('weather');
const searchInp = document.getElementById('search');
const searchButton = document.getElementById('searchbtn');

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(searchInp.value);
    searchInp.value = '';
});

function getIcon(id) {

    let d = new Date();

    //2xx Thunderstorm
    if (id >= 200 && id < 300) {
        tempicon.src = "./icons/thunder.svg";
    }

    //3xx Drizzle
    else if (id >= 300 && id < 500) {
        tempicon.src = "./icons/rainy-4.svg";
    }

    //5xx Rain
    else if (id >= 500 && id < 600) {
        if (id <= 504) {
            tempicon.src = "./icons/rainy-3.svg";
        }
        else {
            tempicon.src = "./icons/rainy-6.svg";
        }
    }

    //6xx Snow
    else if (id >= 600 && id < 700) {
        tempicon.src = "./icons/snowy-1.svg";
    }

    //7xx Atmosphere
    else if (id < 700 && id < 800) {
        tempicon.src = "./icons/weather.svg";
    }

    //800 Clear
    else if (id == 800) {
        if (d.getHours() < 18)
            tempicon.src = "./icons/day.svg";
        else
            tempicon.src = "./icons/night.svg";
    }

    //8XX Clouds
    else if (id > 800) {
        if (d.getHours() < 18)
            tempicon.src = "./icons/cloudy-day-2.svg";
        else
            tempicon.src = "./icons/cloudy-night-2.svg";
    }
}

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={apikey}`,
            { mode: 'cors' }
        );

        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];

        locn.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);

        getIcon(id);

    }

    catch (error) {
        alert("Invalid Input");
    }
}

window.addEventListener("load", () => {
    let long;
    let lat;
    const proxy = "https://cors-anywhere.herokuapp.com/";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={apikey}`;

            fetch(api).then((response) => {
                return response.json();
            })

                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    locn.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);

                    console.log(data);

                    getIcon(id);


                });
        }

        )
    }

});