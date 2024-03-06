const tempDay = document.querySelector('#temp-day');
const weatherCond = document.querySelector('#weather-forecast');

const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=41.73&lon=-111.83&exclude=minutely,hourly,alerts&units=imperial&appid=8af9626bf1661ea0eedbcd82ab4f1be4';
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