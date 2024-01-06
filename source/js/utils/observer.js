const scrollSections = document.querySelectorAll('.observed-section');
const menuItems = document.querySelectorAll('.nav-list__accordion.active .inner-nav__link');

const removeClass = (nodeList, className) => nodeList.forEach((elem) => elem.classList.remove(className));

const findElemByDataId = (nodeList, dataId, value) => Array.from(nodeList).find((elem) => elem.dataset[dataId] === value);

if (scrollSections.length > 0) {
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        removeClass(menuItems, 'active');
        const targetElement = findElemByDataId(menuItems, 'link', entry.target.id);
        targetElement.classList.add('active');
      }
    });
  }, {
    threshold: 0.5,
  });
  scrollSections.forEach((section) => scrollObserver.observe(section));
}
