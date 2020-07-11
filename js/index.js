// jshint esversion:6

// Countdown Timer
let countdown,
    alarm,
    secondsLeft;
let storedTime = 0;
let defaultSeconds = 10;
const timerDisplay = document.querySelector('#clock-timer');
const playButton = document.querySelector('#play-btn');
const pauseButton = document.querySelector('#pause-btn');
const resetTimerButton = document.querySelector('#reset-timer-btn');
let alarmSound = new Audio('assets/complete.wav');
alarmSound.volume = 0.5;

const timer = (seconds) => {

    // Check if time has been paused
    storedTime === 0 ? seconds = defaultSeconds : seconds = storedTime;

    const now = Date.now();
    const then = now + seconds * 1000;

    // clear any existing timers
    clearAllIntervals();
    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);

        // play alarm at 0 seconds
        if (secondsLeft === 1) {
            alarm = setTimeout(() => {
                alarmSound.play();
                
                return;
            }, 1000);
        }

        // check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(countdown);
            alert("Your Pomodoro cycle has ended!");
            return;
        }

        // display timer
        displayTimeLeft(secondsLeft);
    }, 1000);


};

const displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    // Store remaining time left constantly
    storedTime = remainderSeconds;
    // Put time remaining in the title of the tab
    document.title = `${display} Left This Cycle`;
    //console.log({minutes,remainderSeconds});
    //console.log(timerDisplay.textContent);
};

const clearAllIntervals = () => {
    clearInterval(countdown);
};

const pauseInterval = () => {
    clearInterval(countdown);
};

const resetTimer = () => {
    storedTime = defaultSeconds;
    return displayTimeLeft(storedTime);
};

playButton.addEventListener("click", timer);
pauseButton.addEventListener("click", pauseInterval);
resetTimerButton.addEventListener("click", resetTimer);