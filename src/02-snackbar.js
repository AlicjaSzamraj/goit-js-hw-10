const button = document.querySelector('.button');
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

button.addEventListener('click', evt => {
  evt.preventDefault();

  const delay = document.querySelector('.delay').value;
  const isFulfilled = document.querySelector(
    'input[name="state"]:checked'
  ).value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
      console.log(`Fulfilled promise in ${delay}ms`);
    })
    .catch(error => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
      });
      console.log(`Rejected promise in ${delay}ms`);
    });
});
