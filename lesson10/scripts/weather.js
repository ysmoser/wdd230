// select HTML elements in the document

const currentTemp = document.querySelector('#current-temp');
//const weatherIcon = document.querySelector('#weather-icon');
//const captionDesc = document.querySelector('figcaption');

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
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;


    let weatherCond = document.createElement('div');

    data.weather.forEach((event) => {
        const iconsrc = `https://openweathermap.org/img/w/${event.icon}.png`;
        let desc = capEachWord(event.description);


        let weatherEl = document.createElement('figure');
        let iconEl = document.createElement('img');
        let captionEl = document.createElement('figcaption');

        iconEl.setAttribute('src', iconsrc);
        iconEl.setAttribute('alt', desc);
        captionEl.textContent = desc;

        weatherEl.appendChild(iconEl);
        weatherEl.appendChild(captionEl);

        weatherCond.appendChild(weatherEl);
    });

    currentTemp.parentElement.appendChild(weatherCond);
}

apiFetch();

/*
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
  } 
*/