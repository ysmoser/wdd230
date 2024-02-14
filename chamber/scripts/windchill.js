function calculateWindChill() {
    const temperature = parseFloat(document.getElementById("temperatureInput").value);
    const windSpeed = parseFloat(document.getElementById("windSpeedInput").value);
    const windChillElement = document.getElementById("windChillValue");
    if (temperature <= 50 && windSpeed > 3.0) {
        const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
        windChillElement.textContent = "Wind Chill: " + windChill.toFixed(2);
    } else {
        windChillElement.textContent = "N/A";
    }
}
