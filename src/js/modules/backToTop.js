export function initBackTop() {
  const goTopBtn = document.querySelector('.back_to_top');
  if (!goTopBtn) return;

  window.addEventListener('scroll', trackScroll);

  function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if (scrolled > coords) {
      goTopBtn.classList.add('back_to_top-show');
    }
    if (scrolled < 50) {
      goTopBtn.classList.remove('back_to_top-show');
    }
  }
}

