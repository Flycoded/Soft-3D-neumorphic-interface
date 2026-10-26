'use strict';

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const switchButton = document.getElementById('switch-auth');
const layout = document.querySelector('.auth-layout');
const title = document.getElementById('form-title');
const subtitle = document.getElementById('form-subtitle');
const prompt = document.getElementById('switch-prompt');
const switchLabel = document.getElementById('switch-label');

const eyeIcon = (visible) => visible
  ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18M10.59 10.59a2 2 0 0 0 2.82 2.82"/><path d="M9.88 5.12A10.85 10.85 0 0 1 12 4.9c5 0 8.8 3.7 10 7.1a11.9 11.9 0 0 1-3.02 4.6M6.16 6.16C4.1 7.35 2.75 9.32 2 12c1.2 3.4 5 7.1 10 7.1a9.8 9.8 0 0 0 4.14-.9"/></svg>'
  : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.65-7 10-7 10 7 10 7-3.65 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';

document.querySelectorAll('[data-toggle-password]').forEach(button => {
  const input = document.getElementById(button.dataset.togglePassword);
  button.innerHTML = eyeIcon(false);
  button.addEventListener('click', () => {
    const visible = input.type === 'password';
    input.type = visible ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(visible));
    button.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
    button.innerHTML = eyeIcon(visible);
  });
});

function setMode(mode) {
  const isLogin = mode === 'login';
  registerForm.hidden = isLogin;
  loginForm.hidden = !isLogin;
  layout.classList.toggle('is-login', isLogin);
  title.textContent = isLogin ? 'Welcome Back' : 'Create Account';
  subtitle.textContent = isLogin ? 'Sign in to continue your journey' : 'Start your journey with us';
  prompt.textContent = isLogin ? "Don't have an account?" : 'Already have an account?';
  switchLabel.textContent = isLogin ? 'Create account' : 'Log in';
  clearValidation(registerForm);
  clearValidation(loginForm);
}

switchButton.addEventListener('click', () => {
  setMode(registerForm.hidden ? 'register' : 'login');
});

function clearValidation(form) {
  form.querySelectorAll('[aria-invalid]').forEach(input => input.removeAttribute('aria-invalid'));
  const status = form.querySelector('.form-status');
  status.textContent = '';
  status.className = 'form-status';
}

function showMessage(form, message, kind, input = null) {
  clearValidation(form);
  const status = form.querySelector('.form-status');
  status.textContent = message;
  status.classList.add(kind);
  if (input) {
    input.setAttribute('aria-invalid', 'true');
    input.focus();
  }
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('register-name');
  const email = document.getElementById('register-email');
  const password = document.getElementById('register-password');
  const confirm = document.getElementById('register-confirm');

  if (name.value.trim().length < 2) return showMessage(registerForm, 'Enter your full name (at least 2 characters).', 'error', name);
  if (!validEmail(email.value.trim())) return showMessage(registerForm, 'Enter a valid email address.', 'error', email);
  if (password.value.length < 8) return showMessage(registerForm, 'Password must contain at least 8 characters.', 'error', password);
  if (password.value !== confirm.value) return showMessage(registerForm, 'Your passwords do not match.', 'error', confirm);

  // Demo UI only. Send the data to a secure HTTPS backend to actually register users.
  showMessage(registerForm, 'Form validated! Registration is a demo. Connect a backend to create real accounts.', 'info');
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('login-email');
  const password = document.getElementById('login-password');
  if (!validEmail(email.value.trim())) return showMessage(loginForm, 'Enter a valid email address.', 'error', email);
  if (!password.value) return showMessage(loginForm, 'Enter your password.', 'error', password);

  // Demo UI only. Verify credentials on a secure backend; never trust client-side checks.
  showMessage(loginForm, 'Form validated! Login is a demo. Connect a backend to authenticate users.', 'info');
});

registerForm.addEventListener('input', () => clearValidation(registerForm));
loginForm.addEventListener('input', () => clearValidation(loginForm));
