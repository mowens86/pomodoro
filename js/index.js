// jshint esversion:6

// Variables
let countdown,
    alarm,
    secondsLeft;
let storedTime = 0;
let cycleNumber = 0;
let defaultSeconds = 1500;
const timerDisplay = document.querySelector('#clock-timer');
const playButton = document.querySelector('#play-btn');
const pauseButton = document.querySelector('#pause-btn');
const resetTimerButton = document.querySelector('#reset-timer-btn');
const resetProgramButton = document.querySelector('#reset-program-btn');
const completeCycle = document.querySelector("#complete-cycle");
const alarmSound = new Audio('assets/complete.wav');
const playSound = new Audio("assets/play.wav");
const pauseSound = new Audio("assets/pause.wav");
const resetTimerSound = new Audio("assets/resettimer.wav");
const resetProgramSound = new Audio("assets/resetprogram.wav");
const menuOpen = new Audio("assets/menuopen.wav");
const menuClose = new Audio("assets/menuclose.wav");
alarmSound.volume = 1;
playSound.volume = 0.5;
pauseSound.volume = 0.5;
resetTimerSound.volume = 0.5;
resetProgramSound.volume = 0.5;
menuOpen.volume = 0.5;
menuClose.volume = 0.5;

const overlayModal = document.querySelector("#overlay-modal");
const openModalButton = document.querySelector(".open-modal-btn");
const closeModalButton = document.querySelector(".close-modal-btn");

// Countdown timer function
const timer = (seconds) => {

    playSound.play();

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
            if (cycleNumber < 3) {
                updateCycleNumber();
                alert("Your Pomodoro cycle has ended!");
            } else if (cycleNumber === 3) {
                updateCycleNumber();
                alert("You've completed the entire cycle and have earned a 15 minute break! Be sure to reset the program to start over again.");
            } else {
                cycleNumber = 0;
                updateCycleNumber();
                alert("Your Pomodoro cycle has ended and the completions have been reset!");
            }
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
    storedTime = (minutes * 60) + remainderSeconds;
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
    pauseSound.play();
};

const resetTimer = () => {
    resetTimerSound.play();
    clearInterval(countdown);
    storedTime = defaultSeconds;
    return displayTimeLeft(storedTime);
};

const resetProgram = () => {
    resetProgramSound.play();
    cycleNumber = 0;
    storedTime = 0;
    displayTimeLeft(defaultSeconds);
    completeCycle.textContent = `${cycleNumber}/4`;
    document.title = `Your Pomodoro Clock`;
    clearAllIntervals();
};

const updateCycleNumber = () => {
    cycleNumber++;
    completeCycle.textContent = `${cycleNumber}/4`;
};

console.log(window.innerWidth);


const openModal = () => {
    menuOpen.play();
    window.innerWidth <= 600 ? overlayModal.style.width = "100%" : overlayModal.style.width = "70%";
};

const closeModal = () => {
    menuClose.play();
    overlayModal.style.width = "0%";
};


playButton.addEventListener("click", timer);
pauseButton.addEventListener("click", pauseInterval);
resetTimerButton.addEventListener("click", resetTimer);
resetProgramButton.addEventListener("click", resetProgram);
openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);