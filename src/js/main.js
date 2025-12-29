import '/styles/main.scss';
import { initBurger } from './modules/burger.js';
import { initForm } from './modules/form.js';
import { initPopup } from './modules/popup.js';
import { initBackTop } from './modules/backToTop.js';
import { initApparatusSlider } from './modules/apparatus.js';
import { initDocumentLinks } from './modules/documents.js';
import { setCurrentYear } from './utils/helpers.js';

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  setCurrentYear();
  initBurger();
  initBackTop();
  initForm();
  initPopup();
  initApparatusSlider();
  initDocumentLinks();
});

