import { Carousel } from 'bootstrap';

new Carousel('#hero-banner');
new Carousel('#text-media-gallery-1');

observeCounterRow();

function observeCounterRow() {
  const couterRowEl = document.querySelector('#counter-row');

  const callback = (entries, observer) => {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);

        const counters = couterRowEl.getElementsByClassName('animated-counter');
        new Array(...counters).forEach(el => counterAnimation(el));
      }
    });
  }

  const observer = new IntersectionObserver(callback);

  observer.observe(couterRowEl);
}

/**
 * @param {Element} target 
 */
function counterAnimation(target) {
  const initial = +(target.dataset.initial ?? 0);
  const limit = +target.innerText;
  const direction = target.dataset.direction ?? 'up';
  const tick = target.dataset.tick ?? 10;

  let counter = initial;

  const interval = setInterval(() => {
    if (direction === 'down') {
      counter--;

      if (counter < limit) {
        clearInterval(interval);
        return;
      }
    } else {
      counter++;

      if (counter > limit) {
        clearInterval(interval);
        return;
      }
    }

    target.innerText = counter;
  }, tick);
}
