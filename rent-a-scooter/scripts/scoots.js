// Add a hamburger menu icon 

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const logo = document.querySelector('#logo');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
    logo.classList.toggle('open');
});

// Remove the "open" class when the screen is bigger than 600px
function closeMenuOnResize() {
    if (window.innerWidth > 600) {
        navigation.classList.remove('open');
        hamButton.classList.remove('open');
        logo.classList.remove('open');
    }
}

window.addEventListener('resize', closeMenuOnResize);

// Current Dates in Footer

let currentYear = new Date().getFullYear();
document.getElementById("year").innerHTML = currentYear;
let modifiedDate = document.lastModified;
document.getElementById('lastModified').innerHTML = `Last Modification: ${modifiedDate}`;