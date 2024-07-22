import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('.button');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
let countdownInterval;
const inputEl = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);
    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  },
};

const datetimePicker = flatpickr('#datetime-picker', options);

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown(targetDate) {
  const now = new Date().getTime();
  const difference = targetDate.getTime() - now;

  const { days, hours, minutes, seconds } = convertMs(difference);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(countdownInterval);
    button.disabled = false;
    inputEl.removeAttribute('disabled');
  }
}

button.addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];

  updateCountdown(selectedDate);

  countdownInterval = setInterval(() => {
    updateCountdown(selectedDate);
  }, 1000);

  button.disabled = true;

  inputEl.setAttribute('disabled', '');
});
