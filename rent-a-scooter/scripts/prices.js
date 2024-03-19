// Get JSON
const pricesURL = "https://ysmoser.github.io/wdd230/rent-a-scooter/data/prices.json";
const pricesTable = document.querySelector('.table tbody');

async function getPrices() {
    const response = await fetch(pricesURL);
    const data = await response.json();
    displayCompany(data.prices);
}

const displayCompany = (pricesArray) => {
    pricesArray.forEach((price) => {
        // Create a new row for each set of price data
        let row = document.createElement('tr');

        let product = document.createElement('td');
        //let persons = document.createElement('td');
        let halfday = document.createElement('td');
        let fullday = document.createElement('td');
        let wkinHalf = document.createElement('td');
        let wkinFull = document.createElement('td');

        product.textContent = price.name;
        //persons.textContent = price.persons;
        halfday.textContent = price.halfday;
        fullday.textContent = price.fullday;
        wkinHalf.textContent = price['wkin-half'];
        wkinFull.textContent = price['wkin-full'];

        row.appendChild(product);
        //row.appendChild(persons);
        row.appendChild(halfday);
        row.appendChild(fullday);
        row.appendChild(wkinHalf);
        row.appendChild(wkinFull);

        // Append the new row to the table body
        pricesTable.appendChild(row);
    });
}

getPrices(); 
