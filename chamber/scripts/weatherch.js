const tempDay = document.querySelector('#temp-day');
const weatherCond = document.querySelector('#weather-forecast');

const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=41.73&lon=-111.83&units=imperial&appid=8af9626bf1661ea0eedbcd82ab4f1be4';
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
    const currentForecast = data.list[0]; 
    tempDay.innerHTML = `${Math.round(currentForecast.main.temp)}&deg;F`;
    const currentDesc = document.querySelector('#current-desc');
    currentDesc.textContent = capEachWord(currentForecast.weather[0].description);

    weatherCond.innerHTML = '';


    const firstDayForecasts = data.list.slice(0, 8); 

    firstDayForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const temp = `${Math.round(forecast.main.temp)}&deg;F`;

        const iconsrc = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        let desc = capEachWord(forecast.weather[0].description);

        let weatherEl = document.createElement('figure');
        let dateEl = document.createElement('figcaption');
        dateEl.textContent = date.toDateString();
        let iconEl = document.createElement('img');

        iconEl.setAttribute('src', iconsrc);
        iconEl.setAttribute('alt', desc);
        let captionEl = document.createElement('figcaption');
        captionEl.innerHTML = `${desc} - ${temp}`;

        weatherEl.appendChild(dateEl);
        weatherEl.appendChild(iconEl);
        weatherEl.appendChild(captionEl);

        weatherCond.appendChild(weatherEl);
    });
}

apiFetch();