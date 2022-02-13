
const bodyRef = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
console.log("🚀 ~ file: 01-color-switcher.js ~ line 4 ~ startBtn", startBtn)
const stopBtn = document.querySelector('[data-stop]');
console.log("🚀 ~ file: 01-color-switcher.js ~ line 6 ~ stopBtn", stopBtn)
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let intervalId = null;

function onStartBtnClick(e) {
    startBtn.disabled = true;
    myTimer()
}

function onStopBtnClick(e) {
    clearInterval(intervalId) 
    startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


function myTimer(e) {
  intervalId = setInterval(startChangingColor, 1000);
}

function startChangingColor() {
    const color = getRandomHexColor();
    bodyRef.style.backgroundColor = color;
}

