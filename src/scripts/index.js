const validator = document.querySelector('.validator');
const email = validator.querySelector('#email');
const country = validator.querySelector('#country');
const zipcode = validator.querySelector('#zipcode');
const password = validator.querySelector('#password');
const confirmation = validator.querySelector('#confirmation');

const animsToBeCleared = {};

const zipcodePatterns = {
  'United States': /^\d\d\d\d\d(-\d\d\d\d)?$/,
  'Canada': /^\w\d\w \w\d\w$/,
  'Bulgaria': /^\d\d\d\d$/,
  'Bohemia': /^\d\d\d \d\d$/
};

let confirmationHasBeenFocused  = false;


validator.addEventListener('input', (e) => {validateValidatorField(e)});

validator.addEventListener('focusout', (e) => {validateValidatorField(e)});


function validateValidatorField(e) {
  switch (e.target.id) {
    case 'email':
      if (e.target.validity.typeMismatch || !e.target.value) {
        if (!animsToBeCleared['email']) {
          animsToBeCleared['email'] = startInvalidAnim(email);
        }
      } else {
        clearInterval(animsToBeCleared['email']);
        delete animsToBeCleared['email'];
      }
      break;

    case 'country':
    case 'zipcode':
      const regex = zipcodePatterns[country.value];
      if (!regex.exec(zipcode.value) || !e.target.value) {
        if (!animsToBeCleared['zipcode']) {
          animsToBeCleared['zipcode'] = startInvalidAnim(zipcode);
        }
      } else {
        clearInterval(animsToBeCleared['zipcode']);
        delete animsToBeCleared['zipcode'];
      }
      break;

    case 'password':
      if (!e.target.value) {
        if (!animsToBeCleared['password']) {
          animsToBeCleared['password'] = startInvalidAnim(password);
        }
      } else {
        clearInterval(animsToBeCleared['password']);
        delete animsToBeCleared['password'];
      }
    case 'confirmation':
      if (!confirmationHasBeenFocused) return;
      if (password.value !== confirmation.value || !confirmation.value) {
        if (!animsToBeCleared['confirmation']) {
          animsToBeCleared['confirmation'] = startInvalidAnim(confirmation);
        }
      } else {
        clearInterval(animsToBeCleared['confirmation']);
        delete animsToBeCleared['confirmation'];
      }
      break;
  }
}


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


// trivial: confirmation can only glow after it has been focused once

confirmation.addEventListener('focus', function handler() {
  console.log('focus');
  confirmationHasBeenFocused  = true;
  confirmation.removeEventListener('focus', handler);
});
