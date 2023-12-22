const { body } = document;
const changeButton = document.querySelector('.theme-button');

const getCurrentTheme = () => (body.classList.contains('dark') ? 'dark' : 'light');

const getCurrentIcon = () => (changeButton.classList.contains('theme-button--dark') ? 'dark' : 'light');

changeButton.addEventListener('click', () => {
  changeButton.classList.toggle('theme-button--dark');
  body.classList.toggle('dark');

  localStorage.setItem('saved-theme', getCurrentTheme());
  localStorage.setItem('saved-icon', getCurrentIcon());
});

const savedTheme = localStorage.getItem('saved-theme');
const savedIcon = localStorage.getItem('saved-icon');

if (savedTheme) {
  body.classList[savedTheme === 'dark' ? 'add' : 'remove']('dark');
  changeButton.classList[savedIcon === 'dark' ? 'add' : 'remove']('theme-button--dark');
}
