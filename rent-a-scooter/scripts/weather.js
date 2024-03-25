// Fetch current weather
async function fetchCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=20.50&lon=-86.94&units=imperial&appid=8af9626bf1661ea0eedbcd82ab4f1be4`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        displayCurrentWeather(data, '#current-temp');
    } catch (error) {
        console.error('Failed to fetch current weather:', error);
    }
}

// Fetch weather forecast
async function fetchForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=20.50&lon=-86.94&units=imperial&appid=8af9626bf1661ea0eedbcd82ab4f1be4`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        displayOneDayForecast(data, '#forecast');
    } catch (error) {
        console.error('Failed to fetch forecast:', error);
    }
}


function capitalizeEachWord(description) {
    return description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Display current temperature and weather conditions
function displayCurrentWeather(data, containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;
    container.innerHTML = `${Math.round(data.main.temp)}&deg;F`;

    const weatherCond = document.createElement('div');
    data.weather.forEach(event => createWeatherElement(event, weatherCond));
    container.appendChild(weatherCond);

    document.querySelector('#humidity').textContent = data.main.humidity;
    document.querySelector('#high-temp').textContent = Math.round(data.main.temp_max);
}


// Display one-day forecast
function displayOneDayForecast(data, containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    const forecast = data.list.find(x => x.dt_txt.includes('15:00:00'));
    if (forecast) {
        const dateParts = forecast.dt_txt.split(/[- :]/);
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
        const day = parseInt(dateParts[2], 10);

        const forecastDate = new Date(year, month, day);
        const dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = `${Math.round(forecast.main.temp_max)}°F`;

        // Create and append weather conditions
        const weatherCond = document.createElement('div');
        forecast.weather.forEach(event => createWeatherElement(event, weatherCond));
        container.appendChild(weatherCond);

        // Update day and temperature
        const dayOfWeekElement = document.querySelector('#dayofweek1');
        const tempElement = document.querySelector('#forecast1');

        if (dayOfWeekElement && tempElement) {
            dayOfWeekElement.textContent = dayOfWeek;
            tempElement.textContent = temp;
        } else {
            console.error('One or more elements could not be found:', dayOfWeekElement, tempElement);
        }
    }
}



function createWeatherElement(event, parentElement) {
    const iconsrc = `https://openweathermap.org/img/w/${event.icon}.png`;
    let desc = capitalizeEachWord(event.description);

    let weatherEl = document.createElement('figure');
    let iconEl = document.createElement('img');
    let captionEl = document.createElement('figcaption');

    iconEl.src = iconsrc;
    iconEl.alt = desc;
    captionEl.textContent = desc;

    weatherEl.appendChild(iconEl);
    weatherEl.appendChild(captionEl);
    parentElement.appendChild(weatherEl);
}

// Close the high temp message
function closeMessage() {
    document.querySelector('#high-temp-message').style.display = 'none';
}

fetchCurrentWeather();
fetchForecast();