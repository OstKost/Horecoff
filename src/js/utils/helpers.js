export function setCurrentYear() {
  const curYear = document.querySelector('.copyright-year');
  if (curYear) {
    curYear.innerText = new Date().getFullYear();
  }
}

