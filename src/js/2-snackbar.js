import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const userInput = document.querySelector('input[name="delay"]');
const checkFulfill = form.querySelector('input[name="state"]');
const checkRejected = form.querySelector('input[value = "rejected"]');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const delay = parseInt(userInput.value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!checkFulfill.checked) {
        reject(delay);
        checkRejected.checked = false;
      } else {
        resolve(delay);
        checkFulfill.checked = false;
      }
    }, delay);
  });

  promise
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.show({
        title: 'Ok',
        titleColor: '#fff',
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '150%',
        backgroundColor: '#59a10d',
        iconUrl: 'img/ok.svg',
        position: 'topRight',
        close: false,
      });
      
    })
    .catch(error => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.show({
        title: 'Error',
        titleColor: '#fff',
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '150%',
        backgroundColor: ' #ef4040',
        iconUrl: 'img/error.svg',
        position: 'topRight',
        close: false,
      });
    });

  userInput.value = '';
}