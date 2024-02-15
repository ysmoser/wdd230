let currentYear = new Date().getFullYear();
document.getElementById("year").innerHTML = currentYear;
let modifiedDate = document.lastModified;
document.getElementById('lastModified').innerHTML = `Last Modification: ${modifiedDate}`;