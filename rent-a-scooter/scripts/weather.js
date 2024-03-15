const apiKey = '8af9626bf1661ea0eedbcd82ab4f1be4';

// API fetch 
async function fetchWeatherData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        return null;
    }
}

// Capitalize 
function capitalizeEachWord(description) {
    return description
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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
function displayOneDayForecast(data, containerPrefix) {
    // Assuming you want the forecast for the next occurrence of 15:00:00
    const forecast = data.list.find(x => x.dt_txt.includes('15:00:00'));
    if (forecast) {
        const dayOfWeek = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = `${Math.round(forecast.main.temp_max)}°F`;

        // Assuming containerPrefix includes the '#' symbol or any other selector prefix
        document.querySelector(`${containerPrefix}dayofweek1`).textContent = dayOfWeek;
        document.querySelector(`${containerPrefix}forecast1`).textContent = temp;
    } 
}


// Helper function to create and append weather condition elements
function createWeatherElement(weatherItem, parentElement) {
    const main = weatherItem.main; 
    const iconsrc = `https://openweathermap.org/img/w/${weatherItem.icon}.png`; 
    let desc = capitalizeEachWord(weatherItem.description); 

    const mainEl = document.createElement('div');
    mainEl.textContent = main; 

    const descEl = document.createElement('div');
    descEl.textContent = desc; 

    let weatherEl = document.createElement('figure');
    let iconEl = document.createElement('img');
    let captionEl = document.createElement('figcaption');

    iconEl.src = iconsrc; 
    iconEl.alt = desc; 
    captionEl.textContent = desc; 

    weatherEl.appendChild(mainEl); 
    weatherEl.appendChild(iconEl); 
    weatherEl.appendChild(captionEl); 
    parentElement.appendChild(weatherEl);
}


// Close the high temp message
function closeMessage() {
    document.querySelector('#high-temp-message').style.display = 'none';
}

/*
// Example usage
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=41.73&lon=-111.83&units=imperial&appid=${apiKey}`;

fetchWeatherData(currentWeatherUrl).then(data => {
    if (data) displayCurrentWeather(data, '#current-temp');
});

fetchWeatherData(forecastUrl).then(data => {
    if (data) displayThreeDayForecast(data, '#');
});
*/