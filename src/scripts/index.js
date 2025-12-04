const validator = document.querySelector('.validator');
const email = validator.querySelector('#email');
const country = validator.querySelector('#country');
const zipcode = validator.querySelector('#zipcode');
const password = validator.querySelector('#password');
const confirmation = validator.querySelector('#confirmation');

const animsToBeCleared = {};

window.addEventListener('input', (e) => {
  switch (e.target.id) {
    case 'email':
      console.log(e.target.validity);
      if (e.target.validity.typeMismatch || !e.target.value) {
        console.log('startin');
        if (!animsToBeCleared['email']) {
          animsToBeCleared['email'] = startInvalidAnim(e.target);
        }
      } else {
        console.log(animsToBeCleared['email']);
        clearInterval(animsToBeCleared['email']);
        delete animsToBeCleared['email'];
      }
      break;
  }
});


function startInvalidAnim(elem) {
  const keyframes = [
    {offset: 0.0, easing: 'ease', backgroundColor: 'transparent'},
    {offset: 0.5, easing: 'ease', backgroundColor: 'rgba(255, 0, 0, 0.25)'},
    {offset: 1.0, easing: 'ease', backgroundColor: 'transparent'}
  ];
  const animOptions = {
    duration: 1.375 * 1000,
    iterations: 1,
  };

  elem.animate(keyframes, animOptions);
  return setInterval(() => {
    elem.animate(keyframes, animOptions);
  }, 1.375 * 1000);
}
