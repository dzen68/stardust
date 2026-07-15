import './style.css';

const API_KEY  = import.meta.env.VITE_NASA_API_KEY;
const API_BASE = `http://${window.location.hostname}:5000/api/auth`;

// ── DOM refs ──────────────────────────────────
const authView   = document.getElementById('auth-view');
const appView    = document.getElementById('app-view');
const appContainer = document.getElementById('app');
const dateInput  = document.getElementById('datepicker');
const welcomeMsg = document.getElementById('welcome-msg');

const prevDayBtn = document.getElementById('prev-day-btn');
const nextDayBtn = document.getElementById('next-day-btn');
const randomDayBtn = document.getElementById('random-day-btn');

let currentDateString = '';

// ── Helpers ───────────────────────────────────
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ── Auth state ────────────────────────────────
function isLoggedIn() {
  return !!localStorage.getItem('stardust_token');
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('stardust_user')); }
  catch { return null; }
}

function showApp() {
  authView.classList.add('hidden');
  appView.classList.remove('hidden');
  const user = getUser();
  if (user) welcomeMsg.textContent = `Hi, ${user.username}`;
  getAstronomyData('');
}

function showAuth() {
  appView.classList.add('hidden');
  authView.classList.remove('hidden');
}

// Boot
if (isLoggedIn()) {
  showApp();
} else {
  showAuth();
}

// ── NASA APOD ─────────────────────────────────
async function getAstronomyData(date) {
  renderSkeletons();

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
    );
    const data = await response.json();
    
    if (data.code && data.code !== 200) {
      throw new Error(data.msg || 'Error loading NASA data');
    }

    currentDateString = data.date;
    if (dateInput) dateInput.value = data.date;

    let media;
    if (data.media_type === 'image') {
      media = `<img src="${data.url}" alt="${data.title}" />`;
    } else if (data.url && data.url.includes('youtube')) {
      media = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      media = `<video src="${data.url}" controls></video>`;
    }

    const copyright = data.copyright ? data.copyright.replace(/\n/g, ' ').trim() : 'Public Domain / NASA';

    appContainer.innerHTML = `
      <!-- Left Column: Viewport Panel -->
      <div class="viewport-panel">
        <div class="viewport-frame">
          ${media}
        </div>
        <div class="viewport-toolbar">
          <span class="hd-badge">${data.media_type}</span>
          <div class="toolbar-actions">
            ${data.hdurl ? `
              <a href="${data.hdurl}" target="_blank" class="toolbar-btn" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                <span>HD View</span>
              </a>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Right Column: Metadata Panel -->
      <div class="metadata-panel">
        <div class="metadata-header">
          <span class="cosmic-date">${data.date}</span>
          <h2 class="cosmic-title">${data.title}</h2>
        </div>
        
        <div class="explanation-card">
          <p>${data.explanation || 'No explanation provided for this visual.'}</p>
        </div>

        <div class="details-box">
          <div class="detail-item">
            <span class="detail-label">Origin / Copyright</span>
            <span class="detail-value" title="${copyright}">${copyright}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Service Link</span>
            <span class="detail-value">NASA APOD API</span>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    appContainer.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 4rem 2rem; text-align: center; color: var(--text-secondary);">
        <p style="font-size: 1.2rem; margin-bottom: 1rem;">Oops! Orbit connection lost.</p>
        <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">${error.message}</p>
      </div>
    `;
  }
}

function renderSkeletons() {
  appContainer.innerHTML = `
    <!-- Left Column: Viewport skeleton -->
    <div class="viewport-panel">
      <div class="viewport-frame skeleton-loader"></div>
      <div class="viewport-toolbar">
        <div class="hd-badge skeleton-loader" style="width: 50px; height: 20px; border: none;"></div>
        <div class="toolbar-actions">
          <div class="skeleton-loader" style="width: 100px; height: 32px; border-radius: var(--radius-md);"></div>
        </div>
      </div>
    </div>
    <!-- Right Column: Metadata skeleton -->
    <div class="metadata-panel">
      <div class="metadata-header">
        <div class="cosmic-date skeleton-loader" style="width: 80px; height: 14px; border-radius: 4px; margin-bottom: 6px;"></div>
        <div class="skeleton-title skeleton-loader" style="height: 38px; border-radius: var(--radius-sm);"></div>
      </div>
      <div class="explanation-card">
        <div class="skeleton-text skeleton-loader" style="height: 16px; margin-bottom: 0.75rem; border-radius: 4px;"></div>
        <div class="skeleton-text skeleton-loader" style="height: 16px; margin-bottom: 0.75rem; border-radius: 4px;"></div>
        <div class="skeleton-text skeleton-loader" style="height: 16px; margin-bottom: 0.75rem; border-radius: 4px;"></div>
        <div class="skeleton-text skeleton-loader" style="height: 16px; width: 60%; border-radius: 4px;"></div>
      </div>
      <div class="details-box">
        <div class="detail-item">
          <div class="detail-label skeleton-loader" style="width: 100px; height: 10px; border-radius: 2px; margin-bottom: 6px;"></div>
          <div class="detail-value skeleton-loader" style="width: 140px; height: 14px; border-radius: 4px;"></div>
        </div>
        <div class="detail-item">
          <div class="detail-label skeleton-loader" style="width: 100px; height: 10px; border-radius: 2px; margin-bottom: 6px;"></div>
          <div class="detail-value skeleton-loader" style="width: 140px; height: 14px; border-radius: 4px;"></div>
        </div>
      </div>
    </div>
  `;
}

// ── Interactive Navigation Events ─────────────
if (dateInput) {
  dateInput.addEventListener('change', (e) => {
    if (e.target.value) {
      getAstronomyData(e.target.value);
    }
  });
}

function stepDay(offset) {
  if (!currentDateString) {
    currentDateString = formatDate(new Date());
  }
  const dateObj = new Date(currentDateString);
  dateObj.setDate(dateObj.getDate() + offset);

  // Don't navigate to the future
  const today = new Date();
  if (dateObj > today) return;

  getAstronomyData(formatDate(dateObj));
}

if (prevDayBtn) {
  prevDayBtn.addEventListener('click', () => stepDay(-1));
}

if (nextDayBtn) {
  nextDayBtn.addEventListener('click', () => stepDay(1));
}

if (randomDayBtn) {
  randomDayBtn.addEventListener('click', () => {
    // APOD launch date: June 16, 1995
    const start = new Date(1995, 5, 16).getTime();
    const end = new Date().getTime();
    const randomDate = new Date(start + Math.random() * (end - start));
    getAstronomyData(formatDate(randomDate));
  });
}

// ── Tab switching ─────────────────────────────
window.switchTab = function (tab) {
  clearAlert();
  const loginPanel    = document.getElementById('panel-login');
  const registerPanel = document.getElementById('panel-register');
  const tabLogin      = document.getElementById('tab-login');
  const tabRegister   = document.getElementById('tab-register');

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
};

// ── Alert helpers ─────────────────────────────
function showAlert(message, type = 'error') {
  const el = document.getElementById('auth-alert');
  if (el) {
    el.textContent = message;
    el.className = `auth-alert ${type}`;
  }
}

function clearAlert() {
  const el = document.getElementById('auth-alert');
  if (el) {
    el.textContent = '';
    el.className = 'auth-alert';
  }
}

// ── Password toggle ───────────────────────────
window.togglePass = function (inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const show  = input.type === 'password';
  input.type  = show ? 'text' : 'password';
  btn.innerHTML = show
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2">
         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
                  a18.45 18.45 0 0 1 5.06-5.94"/>
         <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
                  a18.5 18.5 0 0 1-2.16 3.19"/>
         <line x1="1" y1="1" x2="23" y2="23"/>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2">
         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
         <circle cx="12" cy="12" r="3"/>
       </svg>`;
};

// ── Loading state ─────────────────────────────
function setLoading(btnId, loading) {
  const btn    = document.getElementById(btnId);
  if (!btn) return;
  const text   = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  btn.disabled  = loading;
  if (text) text.hidden   = loading;
  if (loader) loader.hidden = !loading;
}

// ── On success: store token, show app ─────────
function onAuthSuccess(data) {
  localStorage.setItem('stardust_token', data.token);
  localStorage.setItem('stardust_user', JSON.stringify({
    username: data.username,
    email: data.email,
  }));
  showAlert(`Welcome, ${data.username}!`, 'success');
  setTimeout(() => showApp(), 900);
}

// ── Login ─────────────────────────────────────
window.handleLogin = async function (event) {
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
};

// ── Register ──────────────────────────────────
window.handleRegister = async function (event) {
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
};

// ── Logout ────────────────────────────────────
window.handleLogout = function () {
  localStorage.removeItem('stardust_token');
  localStorage.removeItem('stardust_user');
  showAuth();
};