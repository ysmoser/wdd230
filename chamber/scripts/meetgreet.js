document.addEventListener('DOMContentLoaded', function () {
    var closeButton = document.getElementById('meet-greet');
    var banner = document.getElementById('meetAndGreet');
    var currentDate = new Date();
    var dayOfWeek = currentDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 3) {
        banner.style.display = 'block';
    }

    closeButton.addEventListener('click', function () {
        banner.style.display = 'none';
    });
});