function nextSlide(up = true, elemName) {
  const slider = document.querySelector(elemName);
  if (!slider) return;

  const slides = slider.childNodes;
  const sliderWidth = slider.offsetWidth;
  const sliderFullWidth = slider.scrollWidth;
  const sliderScrolled = slider.scrollLeft;
  const itemWidth = sliderFullWidth / slides.length;
  const maxItems = Math.round(sliderWidth / itemWidth);
  const maxScroll = (slides.length - maxItems) * itemWidth;

  let left = 0;

  if (up) {
    left = sliderScrolled >= maxScroll ? 0 : sliderScrolled + itemWidth;
  } else {
    left = sliderScrolled <= 0 ? maxScroll : sliderScrolled - itemWidth;
  }

  slider.scrollTo({
    left,
    behavior: 'smooth',
  });
}

export { nextSlide };

