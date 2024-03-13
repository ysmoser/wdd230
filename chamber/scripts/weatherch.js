const apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&units=imperial&appid=8af9626bf1661ea0eedbcd82ab4f1be4';
async function apiFetch() {
    try {
        const response = await fetch(apiURL);
        if (response.ok) {
            const data = await response.json();
            //console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function capEachWord(description) {
    return description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function displayResults(data) {
    const fiveDayForecast = data.list.filter(x => x.dt_txt.includes('15:00:00'));
    console.log(fiveDayForecast);
    let day = 0;
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Limiting to the first 3 entries for a 3-day forecast
    const threeDayForecast = fiveDayForecast.slice(0, 3);
    threeDayForecast.forEach(forecast => {
        const d = new Date(forecast.dt_txt);
        document.getElementById(`dayofweek${day+1}`).textContent = weekdays[d.getDay()];
        document.getElementById(`forecast${day+1}`).textContent = `${Math.round(forecast.main.temp_max)}°F`;
        day++;
    });
}



/*
const tempDay = document.querySelector('#temp-day');
const weatherCond = document.querySelector('#weather-forecast');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=8af9626bf1661ea0eedbcd82ab4f1be4';
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            //console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

// Add catpitalization to the first letter of each word
function capEachWord(description) {
    return description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function displayResults(data) {
    tempDay.innerHTML = `${Math.round(data.current.temp)}&deg;F`;
    const currentDesc = document.querySelector('#current-desc');
    currentDesc.textContent = capEachWord(data.current.weather[0].description);

    weatherCond.innerHTML = '';

    // The first 3 days 
    const threeDays = data.daily.slice(0, 3); //this includes the second and the third day

    threeDays.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dailyTemp = `${Math.round(day.temp.day)}&deg;F`;


        const iconsrc = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
        let desc = capEachWord(day.weather[0].description);


        let weatherEl = document.createElement('figure');
        let dateEl = document.createElement('figcaption');
        dateEl.textContent = date.toDateString();
        let iconEl = document.createElement('img');


        iconEl.setAttribute('src', iconsrc);
        iconEl.setAttribute('alt', desc);
        let captionEl = document.createElement('figcaption');
        captionEl.innerHTML = `${desc} - ${dailyTemp}`;

        weatherEl.appendChild(dateEl);
        weatherEl.appendChild(iconEl);
        weatherEl.appendChild(captionEl);

        weatherCond.appendChild(weatherEl);
    });
}

apiFetch();
*/