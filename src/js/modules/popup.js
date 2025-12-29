export function popupOpen(currentPopup) {
  if (currentPopup) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive);
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

export function popupClose(popupActive) {
  if (popupActive) {
    popupActive.classList.remove('open');
  }
}

export function initPopup() {
  const popupCloseIcons = document.querySelectorAll('.close-popup');
  
  if (popupCloseIcons.length > 0) {
    popupCloseIcons.forEach((el) => {
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    });
  }

  // Close popup on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.which === 27 || e.key === 'Escape') {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });
}

