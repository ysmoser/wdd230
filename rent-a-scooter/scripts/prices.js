// Get JSON
const pricesURL = "https://ysmoser.github.io/wdd230/rent-a-scooter/data/prices.json";
const prices = document.querySelector('#max-prices');

async function getPricess() {
    const response = await fetch(pricesURL);
    const data = await response.json();
    displayCompany(data);
}

const displayCompany = (data) => {
    data.forEach((price) => {

        let product = document.createElement('td');
        let persons = document.createElement('td');
        let halfday = document.createElement('td');
        let fullday = document.createElement('td');
        let wkinHalf = document.createElement('td');
        let wkinFull = document.createElement('td');

       product.textContent = price.name;
       persons.textContent = price.persons;
       halfday.textContent = price.halfday;
       fullday.textContent = price.fullday;
       wkinHalf.textContent = price.wkin-half;
       wkinFull.textContent = price.wkin-full;

        cost.appendChild(product);
        cost.appendChild(persons);
        cost.appendChild(halfday);
        cost.appendChild(fullday);
        cost.appendChild(wkinHalf);
        cost.appendChild(wkinFull);



        prices.appendChild(cost);
    });
}

getPricess();