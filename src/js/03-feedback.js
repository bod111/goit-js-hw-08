import storage from '../services/localStorage';

const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');

const FORM_KEY = 'feedback-form-state';

let data = {};

const parsedData = storage.get(FORM_KEY);
console.log('parsedData', parsedData);

if (parsedData) {
  data = parsedData;
  // const keys = Object.keys(parsedData);
  // keys.forEach(key => {
  //   const input = form.elements[key];
  //   input.value = parsedData[key];
  // });
  form.elements.email.value = parsedData.email || '';
  form.elements.message.value = parsedData.message || '';
}

const inputHandler = e => {
  const { name, value } = e.target;

  data = {
    ...data,
    [name]: value,
  };
  // const serializedData = JSON.stringify(data);
  // localStorage.setItem(FORM_KEY, serializedData);
  storage.save(FORM_KEY, data);
};

function onFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  const finalData = {};
  const entries = formData.entries();

  for (const [name, value] of entries) {
    if (!value) {
      console.log('Fill in all fields!');
      return;
    }
    finalData[name] = value;
  }

  finalData.canBeSpammed = !!formData.get('canBeSpammed');

  console.log(finalData);

  form.reset();
  storage.remove(FORM_KEY);
  data = {};
}
form.addEventListener('input', throttle(inputHandler, 500));

form.addEventListener('submit', onFormSubmit);
