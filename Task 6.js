const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const policyModal = document.getElementById('policyModal');
const openPolicy = document.getElementById('openPolicy');
const closeModal = document.getElementById('closeModal');

// Modal controls
openPolicy.addEventListener('click', e => {
  e.preventDefault();
  policyModal.classList.add('show');
  policyModal.querySelector('.modal-content').focus();
});
closeModal.addEventListener('click', () => policyModal.classList.remove('show'));
window.addEventListener('click', e => {
  if (e.target === policyModal) policyModal.classList.remove('show');
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') policyModal.classList.remove('show');
});

// Validation helper
function showError(id, message) {
  document.getElementById(`error-${id}`).textContent = message;
}
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^\d{6,15}$/.test(phone);
}

// Form submit
form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();
  let valid = true;

  const fields = ['firstName', 'lastName', 'email', 'subject', 'message'];
  fields.forEach(id => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      showError(id, 'This field is required');
      valid = false;
    }
  });

  const emailVal = document.getElementById('email').value.trim();
  if (emailVal && !isValidEmail(emailVal)) {
    showError('email', 'Enter a valid email address');
    valid = false;
  }

  const phoneVal = document.getElementById('phone').value.trim();
  if (phoneVal && !isValidPhone(phoneVal)) {
    showError('phone', 'Enter a valid phone number');
    valid = false;
  }

  if (!document.getElementById('consent').checked) {
    showError('consent', 'You must agree to the privacy policy');
    valid = false;
  }

  if (valid) {
    successMessage.classList.remove('hidden');
    form.reset();
    setTimeout(() => successMessage.classList.add('hidden'), 4000);
  }
});
