const link = document.querySelector('.header__logo-link')
const footer = document.querySelector('.footer__social-list')
const currentPath = window.location.pathname

if (!currentPath.includes('index.html')) {
  link.href = 'index.html'
  footer.classList.remove('footer__social-list--active')
}
