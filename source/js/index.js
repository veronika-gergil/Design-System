import './utils/changeColor';

const form = document.querySelector('.form-area')

console.log(form)

const regExp = {
  name: /^[A-Za-zА-Яа-я]+$/u,
  email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
}

form.addEventListener('focusout', (e) => {
  if (e.target.classList.contains('form-area__input')) {
    const check = regExp[e.target.name].test(e.target.value)
    check ? e.target.classList.add('form-area__input--error') : e.target.classList.remove('form-area__input--error')
  }
})
