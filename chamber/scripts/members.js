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
        icon.setAttribute('width', '200');
        icon.setAttribute('height', '200');

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