
// jshint esversion:6

// Countdown Timer
const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    setInterval(() => {
        minutes = parseInt( timer / 60, 10);
        seconds = parseInt( timer % 60, 10);

        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        display.textContent = `${minutes}:${seconds}`;

        if(--timer < 0) {
            timer = duration;
        }
    }, 1000);
};

const pomoTimer = () => {
    let timer = 60 * 25,
    display = document.querySelector('#clock-timer');
    startTimer(timer, display);
};

const playButton = document.querySelector('#play-btn');
playButton.addEventListener("click", pomoTimer);