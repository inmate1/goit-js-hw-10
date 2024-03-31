import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.disabled = true;

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true, 
  defaultDate: new Date(), 
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      iziToast.show({
        titleColor: '#fff',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '150%',
        backgroundColor: ' #ef4040',
        iconUrl: '/img/error.svg',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};


flatpickr(datePicker, options);

let countdownInterval;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  countdownInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  if (userSelectedDate) {
    startBtn.disabled = true;
    datePicker.disabled = true;
    const currentTime = new Date().getTime();
    const selectedTime = userSelectedDate.getTime();
    const timeDifference = selectedTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      startBtn.disabled = true;
      datePicker.disabled = false;
    } else {
      const time = convertMs(timeDifference);
      updateTime(time);
    }
  }
}

function updateTime({ days, hours, minutes, seconds }) {
  const daysInfo = document.querySelector('.value[data-days]');
  const hoursInfo = document.querySelector('.value[data-hours]');
  const minutesInfo = document.querySelector('.value[data-minutes]');
  const secondsInfo = document.querySelector('.value[data-seconds]');
  daysInfo.textContent = `${days}`;
  hoursInfo.textContent = `${hours}`;
  minutesInfo.textContent = `${minutes}`;
  secondsInfo.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
