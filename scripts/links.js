const baseURL = "https://ysmoser.github.io/wdd230/";
const linksURL = "https://ysmoser.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.weeks);
}

getLinks();

const displayLinks = (weeks) => {
    const ul = document.querySelector('#homework');
    ul.innerHTML = '';

    weeks.forEach((week) => {
        let homework = document.createElement('li');
        let span1 = document.createElement('span');
        span1.textContent = `${week.lesson}:`;
        homework.appendChild(span1);

        week.links.forEach((linkInfo, index) => {
            let link = document.createElement('a');
            link.setAttribute('href', linkInfo.url);
            link.textContent = linkInfo.title;
            link.setAttribute('target', '_blank');
            homework.appendChild(link);

            // Add a separator
            if (index < week.links.length - 1) {
                homework.appendChild(document.createTextNode(' | '));
            }
        });

        ul.appendChild(homework);
    });
};





