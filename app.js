const contactForm = document.forms['contact'];
const firstName = contactForm.elements.firstname;
const lastName = contactForm.elements.lastname;
const email = contactForm.elements.email;
const radioBtnInputs = contactForm.elements.query;
const message = contactForm.elements.message;
const consent = contactForm.elements.consent;
const toast = document.querySelector('.toast-success');
const radioGroup = document.querySelector('.form__radio-group');
const formFields = [
  firstName,
  lastName,
  email,
  ...radioBtnInputs,
  message,
  consent,
];

const errorMessages = {
  invalidText: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidQuery: 'Please select a query type',
  invalidConsent:
    'To submit this form, please consent to being contacted',
};

function removeError(input) {
  const errorElement = document.querySelector(`#${input.name}-error`);

  if (input.type === 'checkbox') {
    consent.classList.remove('error');
    consent.removeAttribute('aria-live', 'polite');
    errorElement.classList.add('hidden');
    errorElement.textContent = '';
    return;
  }

  if (input.type === 'radio') {
    radioGroup.classList.remove('error');
    radioGroup.removeAttribute('aria-live', 'polite');
    errorElement.classList.add('hidden');
    errorElement.textContent = '';
    return;
  }

  // Update aria attribute on text/textarea input fields
  input.setAttribute('aria-invalid', 'false');
  input.removeAttribute('aria-live', 'polite');
  input.classList.remove('error');

  // Remove error message on text/textarea input fields
  errorElement.classList.add('hidden');
  errorElement.textContent = '';
}

function showError(input) {
  const errorElement = document.querySelector(`#${input.name}-error`);

  if (input.type === 'checkbox') {
    consent.classList.add('error');
    consent.setAttribute('aria-live', 'polite');
    errorElement.classList.remove('hidden');
    errorElement.textContent = errorMessages.invalidConsent;
    return;
  }

  if (input.type === 'email') {
    email.classList.add('error');
    email.setAttribute('aria-live', 'polite');
    errorElement.classList.remove('hidden');
    errorElement.textContent = errorMessages.invalidEmail;
    return;
  }

  if (input.type === 'radio') {
    radioGroup.classList.add('error');
    radioGroup.setAttribute('aria-live', 'polite');
    errorElement.classList.remove('hidden');
    errorElement.textContent = errorMessages.invalidQuery;
    return;
  }

  // Update aria attribute on input field
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-live', 'polite');
  input.classList.add('error');

  // Add error message or use default message
  errorElement.classList.remove('hidden');
  errorElement.textContent = errorMessages.invalidText;
}

function showNotification() {
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
    contactForm.reset();
  }, 5000);
}

function validateConsent() {
  const validConsent = consent.checked === true;

  if (!validConsent) {
    showError(consent);
  }
}

function validateEmail(input) {
  const validEmail =
    input.value.trim() !== '' && input.validity.typeMismatch !== true;

  if (!validEmail) {
    showError(input);
  }
}

function validateRadioInput() {
  const validQuery = [...radioBtnInputs].some(
    (input) => input.checked
  );

  if (!validQuery) {
    showError(radioBtnInputs[0]);
  }
}

function validateText(input) {
  const validText = input.value.trim() !== '';

  if (!validText) {
    showError(input);
  }
}

// Show error when exiting input field
formFields.forEach((field) => {
  field.addEventListener('blur', () => {
    if (field.type === 'text' || field.type === 'textarea') {
      validateText(field);
    } else if (field.type === 'email') {
      validateEmail(field);
    } else if (field.type === 'radio') {
      validateRadioInput();
    } else if (field.type === 'checkbox') {
      validateConsent();
    }
  });
});

// Check for error correction
formFields.forEach((field) => {
  field.addEventListener('input', () => {
    const validField = field.checkValidity();

    if (validField) {
      removeError(field);
    }
  });
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const validForm = contactForm.checkValidity();

  if (!validForm) {
    validateText(firstName);
    validateText(lastName);
    validateEmail(email);
    validateRadioInput();
    validateText(message);
    validateConsent();
  }

  const errors = [...document.querySelectorAll('.error')];

  if (errors.length > 0) {
    errors[0].focus();
  } else {
    // Form is valid, proceed with submission
    // For demo, just logging the form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted successfully:', data);

    // Show success message
    setTimeout(() => {
      showNotification();
    }, 500);
  }
});
