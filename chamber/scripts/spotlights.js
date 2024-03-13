// Get JSON
const baseURL = "https://ysmoser.github.io/wdd230/chamber/directory.html";
const membersURL = "https://ysmoser.github.io/wdd230/chamber/data/members.json";
const members = document.querySelector('#spotlights');

async function getSpotlights() {
    const response = await fetch(membersURL);
    const data = await response.json();
    const eligibleComp = data.companies.filter(company => company.membership === "Silver" || company.membership === "Gold");
    const selectedComp = randomComp(eligibleComp, 3);
    displayCompany(selectedComp);
}

// Function to randomly select n companies
function randomComp(companies, n) {
    let shuffled = companies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}


const displayCompany = (companies) => {
    companies.forEach((company) => {

        let member = document.createElement('div');
        member.className = 'company-info';
        let compName = document.createElement('h2');
        let memberShip = document.createElement('p');
        let desc = document.createElement('p');
        let webURL = document.createElement('a');
        let icon = document.createElement('img');

        compName.textContent = company.name;
        desc.textContent = company.other;

        icon.setAttribute('alt', `${company.name} Icon`);
        icon.setAttribute('src', company.imageurl);
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('width', '150');
        icon.setAttribute('height', '150');

        webURL.href = company.url;
        webURL.textContent = company.url;
        webURL.setAttribute('target', '_blank');

        member.appendChild(icon);
        member.appendChild(compName);
        member.appendChild(desc);
        member.appendChild(webURL);


        members.appendChild(member);
    });
}

getSpotlights();