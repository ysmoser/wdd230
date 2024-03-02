// Get JSON
const baseURL = "https://ysmoser.github.io/wdd230/chamber/directory.html";
const membersURL = "https://ysmoser.github.io/wdd230/chamber/data/members.json";
const members = document.querySelector('#members');

async function getMembers() {
    const response = await fetch(membersURL);
    const data = await response.json();
    displayCompany(data.companies);
}

getMembers();

const displayCompany = (companies) => {
    companies.forEach((company) => {

        let member = document.createElement('section');
        let compName = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let webURL = document.createElement('a');
        let icon = document.createElement('img');

        compName.textContent = company.name;

        icon.setAttribute('alt', `${company.name} Icon`);
        icon.setAttribute('src', company.imageurl);
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('width', '150');
        icon.setAttribute('height', '150');

        address.textContent = company.address;
        phone.textContent = company.phone;
        webURL.href = company.url;
        webURL.textContent = company.url;
        webURL.setAttribute('target', '_blank');




        member.appendChild(icon);
        member.appendChild(compName);
        member.appendChild(address);
        member.appendChild(phone);
        member.appendChild(webURL);


        members.appendChild(member);
    });
};

// Grid and List toggles

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#members");

gridbutton.addEventListener("click", () => {
    // example using arrow function
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}