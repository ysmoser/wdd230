const apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=41.73&lon=-111.83&units=imperial&appid=8af9626bf1661ea0eedbcd82ab4f1be4';
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
        document.getElementById(`dayofweek${day + 1}`).textContent = weekdays[d.getDay()];
        document.getElementById(`forecast${day + 1}`).textContent = `${Math.round(forecast.main.temp_max)}°F`;
        day++;
    });
}

apiFetch()

