// Toggle Switch on Header for Dark Mode

const modeButton = document.querySelector("input");
const main = document.querySelector("body");
const lightBg = document.querySelector(".light-bg");

modeButton.addEventListener("change", () => {
    if (modeButton.checked) {
        main.style.background = "#000";
        main.style.color = "#fff";
        // Check if the lidght background section is present and change its color
        if (lightBg) {
            lightBg.style.color = "#2A2E30"; // Set font color to black
        }
    } else {
        main.style.background = "#fff";
        main.style.color = "#000";
    }
});


// Add a hamburger menu icon 

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// Remove the "open" class when the screen is bigger than 600px
function closeMenuOnResize() {
    if (window.innerWidth > 600) {
        navigation.classList.remove('open');
        hamButton.classList.remove('open');
    }
}

window.addEventListener('resize', closeMenuOnResize);

// Current Dates in Footer

let currentYear = new Date().getFullYear();
document.getElementById("year").innerHTML = currentYear;
let modifiedDate = document.lastModified;
document.getElementById('lastModified').innerHTML = `Last Modification: ${modifiedDate}`;