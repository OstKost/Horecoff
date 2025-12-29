export function initBurger() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const closeElem = document.querySelector('.menu__close');
  const menuLinks = document.querySelectorAll('.menu__link');

  if (!hamburger || !menu || !closeElem) return;

  hamburger.addEventListener('click', () => {
    menu.classList.add('active');
  });

  closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
  });

  if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
        }
      });
    });
  }
}

