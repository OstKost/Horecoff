import { getApparatus, getTechs, fillModalWindow, getApparatusData, getTechsData } from './airtable.js';
import { popupOpen } from './popup.js';
import { nextSlide } from './slider.js';

export async function initApparatusSlider() {
  let interval = null;

  const apparatusData = await getApparatus();
  await getTechs();

  const machines = (apparatusData && apparatusData.records) || [];

  machines.sort((a, b) => {
    const { Position: p1 = 0 } = a.fields || {};
    const { Position: p2 = 0 } = b.fields || {};
    return p1 > p2 ? 1 : -1;
  });

  const slider = document.querySelector('.apparatus__slider');
  const sliderName = '.apparatus__slider';

  if (!slider) {
    console.warn('Apparatus slider not found');
    return;
  }

  slider.addEventListener('mouseover', stopSlider);
  slider.addEventListener('mouseout', startSlider);
  slider.addEventListener('touchmove', stopSlider);
  slider.addEventListener('touchend', startSlider);

  const controls = document.querySelectorAll('.apparatus__control-btn');
  if (controls.length >= 2) {
    controls[0].addEventListener('click', () => nextSlide(false, sliderName));
    controls[1].addEventListener('click', () => nextSlide(true, sliderName));
    controls.forEach((btn) => {
      btn.addEventListener('mouseover', stopSlider);
      btn.addEventListener('mouseout', startSlider);
    });
  }

  const coffeeMobileSlider = document.querySelector('.sorts_column');
  if (coffeeMobileSlider) {
    coffeeMobileSlider.addEventListener('mouseover', stopSlider);
    coffeeMobileSlider.addEventListener('mouseout', startSlider);
    coffeeMobileSlider.addEventListener('touchmove', stopSlider);
    coffeeMobileSlider.addEventListener('touchend', startSlider);
  }

    function openModal(id) {
      return () => {
        const currentPopup = document.getElementById('popup');
        if (!currentPopup) return;
        popupOpen(currentPopup);
        // fillModalWindow использует глобальные переменные из airtable.js
        fillModalWindow(id);
      };
    }

  function render() {
    machines.forEach((machine) => {
      const id = machine.id;
      const { Photo, Name } = machine.fields || {};
      const hasImage = Array.isArray(Photo) && Photo.length > 0;
      const imageUrl = hasImage ? Photo[0].url : '/img/coffgear.png';

      const sliderItem = document.createElement('li');
      sliderItem.classList.toggle('apparatus__slider-item', true);

      const apparatEl = document.createElement('div');
      apparatEl.classList.toggle('apparat', true);
      apparatEl.addEventListener('click', openModal(id));

      const apparatImageEl = document.createElement('div');
      apparatImageEl.classList.toggle('apparat__image', true);
      apparatImageEl.style.backgroundImage = `url(${imageUrl})`;

      const apparatNameEl = document.createElement('div');
      apparatNameEl.classList.toggle('apparat__name', true);
      apparatNameEl.innerText = Name;

      const apparatBtnEl = document.createElement('div');
      apparatBtnEl.classList.toggle('apparat__btn', true);
      apparatBtnEl.innerText = 'Подробнее';

      apparatEl.appendChild(apparatImageEl);
      apparatEl.appendChild(apparatNameEl);
      apparatEl.appendChild(apparatBtnEl);
      sliderItem.appendChild(apparatEl);
      slider.appendChild(sliderItem);
    });
  }

  function startSlider() {
    interval = setInterval(() => {
      nextSlide(true, '.apparatus__slider');
      nextSlide(true, '.sorts_column');
    }, 4100);
  }

  function stopSlider() {
    clearInterval(interval);
  }

  render();
  startSlider();
}

