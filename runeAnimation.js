document.addEventListener('DOMContentLoaded', function () {
  const elements = document.getElementsByClassName('has-animation');
  const className = 'end';

  setInterval(() => {
    for (const element of elements) {
      element.classList.toggle(className);
    }
  }, 2000);
});
