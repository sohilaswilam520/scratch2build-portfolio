const STORAGE_KEY = 'portfolio_prefs';
const defaultPrefs = {
  theme: 'light',
  activeCategory: 'all'
};

function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved || { ...defaultPrefs };
  } catch (error) {
    return { ...defaultPrefs };
  }
}

function savePreferences(prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

let userPrefs = loadPreferences();
const themeToggleBtn = document.querySelector('#theme-toggle');
const filterContainer = document.querySelector('#filter-buttons');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#sender-name');
const emailInput = document.querySelector('#sender-email');
const messageInput = document.querySelector('#sender-message');
const feedbackMsg = document.querySelector('#form-feedback');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = 'Light Mode';
  } else {
    document.body.classList.remove('dark-theme');
    themeToggleBtn.textContent = 'Dark Mode';
  }
}

function applyCategoryFilter(category) {
  filterButtons.forEach((btn) => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  projectCards.forEach((card) => {
    const cardCat = card.dataset.category;
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

themeToggleBtn.addEventListener('click', () => {
  userPrefs.theme = userPrefs.theme === 'light' ? 'dark' : 'light';
  applyTheme(userPrefs.theme);
  savePreferences(userPrefs);
});

filterContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    const selectedCategory = e.target.dataset.category;
    userPrefs.activeCategory = selectedCategory;
    applyCategoryFilter(selectedCategory);
    savePreferences(userPrefs);
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (name.length < 2 || !email.includes('@') || message.length < 5) {
    feedbackMsg.textContent = 'Please fill out all fields with valid details.';
    feedbackMsg.className = 'feedback-msg error';
    feedbackMsg.hidden = false;
    return;
  }

  feedbackMsg.textContent = 'Thank you! Your message has been sent.';
  feedbackMsg.className = 'feedback-msg success';
  feedbackMsg.hidden = false;
  contactForm.reset();
});

applyTheme(userPrefs.theme);
applyCategoryFilter(userPrefs.activeCategory);