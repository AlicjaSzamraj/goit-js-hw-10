const button = document.querySelector('.button');
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

button.addEventListener('click', evt => {
  evt.preventDefault();

  const timeout = document.querySelector('.timeout').value;
  const isFulfilled = document.querySelector(
    'input[name="state"]:checked'
  ).value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled === 'fulfilled') {
        resolve(timeout);
      } else {
        reject(timeout);
      }
    }, timeout);
  });

  promise
    .then(message => {
      iziToast.show({
        title: 'Fulfill',
        message: `Fulfilled promise in ${timeout}ms`,
      });
      console.log(`Fulfilled promise in ${timeout}ms`);
    })
    .catch(error => {
      iziToast.error({
        title: 'Reject',
        message: `Rejected promise in ${timeout}ms`,
      });
      console.log(`Rejected promise in ${timeout}ms`);
    });
});