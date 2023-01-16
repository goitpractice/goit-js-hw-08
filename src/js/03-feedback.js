import throttle from 'lodash.throttle';

const formDataKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const storeFormElementDataThrottled = throttle(storeFormElementData, 500);

window.onload = function () {
  loadSavedFormData();

  form.addEventListener('input', storeFormElementDataThrottled);
  form.addEventListener('submit', handleFormSubmit);
};

function loadSavedFormData() {
  const formData = getStoredFormData();

  if (!formData) {
    return;
  }

  Object.entries(formData).forEach(([elementName, value]) => {
    form.elements[elementName].value = value;
  });
}

function storeFormElementData(ev) {
  const { name, value } = ev.target;
  const storedData = getStoredFormData() || {};

  storedData[name] = value;

  localStorage.setItem(formDataKey, JSON.stringify(storedData));
}

function getStoredFormData() {
  try {
    return JSON.parse(localStorage.getItem(formDataKey));
  } catch {
    return;
  }
}

function handleFormSubmit(ev) {
  ev.preventDefault();

  // avoid refactoring in case of html form structure change
  const formData = Object.fromEntries(new FormData(ev.target).entries());

  console.log(formData);

  ev.target.reset();
  localStorage.removeItem(formDataKey);
}
