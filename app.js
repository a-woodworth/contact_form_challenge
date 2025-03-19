const contactForm = document.forms['contact'];
const firstName = contactForm.elements.firstname;
const lastName = contactForm.elements.lastname;
const email = contactForm.elements.email;
const radioBtnInputs = contactForm.elements.query;
const message = contactForm.elements.message;
const consent = contactForm.elements.consent;
const toast = document.querySelector('.toast-success');

function showNotification() {
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
    contactForm.reset();
  }, 5000);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  setTimeout(() => {
    showNotification();
  }, 500);
});
