import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const dateNow =  Date.now();
let selectedDate = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates);
        selectedDate = selectedDates[0]
       
        isDateInTheFuture(selectedDate)          
    },   
}
 
const refs ={
    dataTime: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysNumber: document.querySelector('[data-days]'),
    hoursNumber: document.querySelector('[data-hours]'),
    minutesNumber: document.querySelector('[data-minutes]'),
    secondsNumber: document.querySelector('[data-seconds]'),
}

refs.startBtn.disabled = true;
 

refs.dataTime.addEventListener('focus', flatpickr('#datetime-picker', options));
refs.startBtn.addEventListener('click', () => {timer.start()});

function isDateInTheFuture(selectedDate) {
    console.log(" line 30 ~ isDateInTheFuture ~ selectedDate", selectedDate)
    if (selectedDate > dateNow) {
        refs.startBtn.disabled = false;
        return
    }
    refs.startBtn.disabled = true;
    Notiflix.Notify.failure("Please choose a date in the future");
}

const timer = {
    intervalId: null,
    isActive: false,
    
    start() {
        if (this.isActive) {
            return
        }
        this.intervalId = setInterval(() => {
            this.isActive = true;
            const currentTime = Date.now();
            const deltaTime = selectedDate - currentTime;
           
            const timeLeft = convertMs(deltaTime);
            console.log("🚀 ~ file: 02-timer.js ~ line 51 ~ this.intervalId=setInterval ~ deltaTime", deltaTime)
            console.log(timeLeft);
            this.stop(timeLeft);
            onTick(timeLeft);
        }, 1000)
        
    },

    stop({ days, hours, minutes, seconds }) {
        if (days === 0 && hours===0 && minutes===0 && seconds===0) {
            clearInterval(this.intervalId);
       }
    },

    
}    

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function onTick({ days, hours, minutes, seconds }) {
    refs.daysNumber.textContent = days;
    refs.hoursNumber.textContent = hours;
    refs.minutesNumber.textContent = minutes;
    refs.secondsNumber.textContent = seconds;
}