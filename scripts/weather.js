// select HTML elements in the document

const currentTemp = document.querySelector('#current-temp');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=41.73&lon=-111.83&units=imperial&appid=8af9626bf1661ea0eedbcd82ab4f1be4';
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
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
    let weatherCond = document.createElement('div');
    weatherCond.style.display = 'flex';
    weatherCond.style.alignItems = 'center';

    data.weather.forEach((event) => {
        const iconsrc = `https://openweathermap.org/img/w/${event.icon}.png`;
        let desc = capEachWord(event.description);

        let iconEl = document.createElement('img');
        iconEl.setAttribute('src', iconsrc);
        iconEl.setAttribute('alt', desc);

        // Append icon 
        weatherCond.appendChild(iconEl);
    });


    let tempEl = document.createElement('span');
    tempEl.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    tempEl.style.margin = '0 10px';

    // Append temperature next to the icon
    weatherCond.appendChild(tempEl);

    if (data.weather.length > 0) {
        let desc = capEachWord(data.weather[0].description);

        let descEl = document.createElement('span');
        descEl.textContent = `${desc}`;

        // Append description 
        weatherCond.appendChild(descEl);
    }

    currentTemp.parentElement.appendChild(weatherCond);
}

apiFetch();

