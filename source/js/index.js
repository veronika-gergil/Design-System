import './utils/changeColor';

const form = document.querySelector('.form-area');
const formInputs = document.querySelectorAll('.form-area__input');
const comment = document.querySelector('.form-area__comment');
const submitButton = document.querySelector('.form-area__button');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.modal__body-button');

const allInputs = Array.from(formInputs);
allInputs.push(comment);

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const checkEmpty = () => allInputs.every((elem) => elem.value.trim() !== '');

form.addEventListener('input', debounce(() => {
  const isEmpty = checkEmpty();
  submitButton.disabled = !isEmpty;
}, 500));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  modal.classList.add('modal--active');
});

closeButton.addEventListener('click', () => {
  modal.classList.remove('modal--active');
});
