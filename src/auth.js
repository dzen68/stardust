/* auth.js — Stardust Login / Register Logic */

const API_BASE = 'http://localhost:5000/api/auth';

// ── Tab switching ─────────────────────────────
function switchTab(tab) {
  const loginPanel    = document.getElementById('panel-login');
  const registerPanel = document.getElementById('panel-register');
  const tabLogin      = document.getElementById('tab-login');
  const tabRegister   = document.getElementById('tab-register');

  clearAlert();

  if (tab === 'login') {
    loginPanel.classList.remove('hidden');
    registerPanel.classList.add('hidden');
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    tabLogin.setAttribute('aria-selected', 'true');
    tabRegister.setAttribute('aria-selected', 'false');
  } else {
    registerPanel.classList.remove('hidden');
    loginPanel.classList.add('hidden');
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    tabRegister.setAttribute('aria-selected', 'true');
    tabLogin.setAttribute('aria-selected', 'false');
  }
}

// ── Alert helpers ─────────────────────────────
function showAlert(message, type = 'error') {
  const el = document.getElementById('alert');
  el.textContent = message;
  el.className = `alert ${type}`;
}

function clearAlert() {
  const el = document.getElementById('alert');
  el.textContent = '';
  el.className = 'alert';
}

// ── Toggle password visibility ────────────────
function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  const show  = input.type === 'password';
  input.type  = show ? 'text' : 'password';

  btn.innerHTML = show
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2">
         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
                  a18.45 18.45 0 0 1 5.06-5.94"/>
         <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
                  a18.5 18.5 0 0 1-2.16 3.19"/>
         <line x1="1" y1="1" x2="23" y2="23"/>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2">
         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
         <circle cx="12" cy="12" r="3"/>
       </svg>`;
}

// ── Loading state ─────────────────────────────
function setLoading(btnId, loading) {
  const btn    = document.getElementById(btnId);
  const text   = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  const arrow  = btn.querySelector('.btn-arrow');
  btn.disabled  = loading;
  text.hidden   = loading;
  loader.hidden = !loading;
  if (arrow) arrow.hidden = loading;
}

// ── Auth success ──────────────────────────────
function onAuthSuccess(data) {
  localStorage.setItem('stardust_token', data.token);
  localStorage.setItem('stardust_user', JSON.stringify({
    username: data.username,
    email: data.email,
  }));
  showAlert(`Welcome, ${data.username}! Launching…`, 'success');
  setTimeout(() => { window.location.href = '/'; }, 1200);
}

// ── Login ─────────────────────────────────────
async function handleLogin(event) {
  event.preventDefault();
  clearAlert();
  setLoading('login-btn', true);

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const res  = await fetch(`${API_BASE}/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    onAuthSuccess(data);
  } catch (err) {
    showAlert(err.message);
  } finally {
    setLoading('login-btn', false);
  }
}

// ── Register ──────────────────────────────────
async function handleRegister(event) {
  event.preventDefault();
  clearAlert();
  setLoading('register-btn', true);

  const username = document.getElementById('reg-username').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  if (password.length < 6) {
    showAlert('Password must be at least 6 characters');
    setLoading('register-btn', false);
    return;
  }

  try {
    const res  = await fetch(`${API_BASE}/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    onAuthSuccess(data);
  } catch (err) {
    showAlert(err.message);
  } finally {
    setLoading('register-btn', false);
  }
}

// ── Auto-redirect if already logged in ───────
if (localStorage.getItem('stardust_token')) {
  window.location.href = '/';
}
