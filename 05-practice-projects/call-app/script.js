// --- DOM ---
const formContainer = document.querySelector('.form-container');
const callForm = document.querySelector('.call-form');
const stack = document.querySelector('.stack');
const rightColors = document.querySelector('.right-colors');

let currentIndex = 0;

// --- Storage helpers ---
function getCards() {
  return JSON.parse(sessionStorage.getItem('Cards') || '[]');
}

function saveCard(card) {
  const cards = getCards();
  cards.push(card);
  sessionStorage.setItem('Cards', JSON.stringify(cards));
}

// --- Form open / close ---
document.querySelector('#add-note').addEventListener('click', () => {
  formContainer.style.display = 'flex';
});

document.querySelector('.close-form').addEventListener('click', () => {
  formContainer.style.display = 'none';
});

// --- Form submit & validation ---
callForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const { image, name, hometown, purpose, category } = e.target.elements;

  if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}.*$/i.test(image.value)) return alert('Invalid image URL');
  if (!/^[A-Za-z ]{2,50}$/.test(name.value)) return alert('Invalid name');
  if (!/^[A-Za-z ]{2,50}$/.test(hometown.value)) return alert('Invalid hometown');
  if (!/^.{3,100}$/.test(purpose.value)) return alert('Invalid purpose');
  if (!/^(emergency|important|urgent|no-rush)$/.test(category.value)) return alert('Please select a category');

  saveCard({
    image: image.value,
    name: name.value,
    hometown: hometown.value,
    purpose: purpose.value,
    category: category.value,
  });

  callForm.reset();
  formContainer.style.display = 'none';
  renderCard();
});

// --- Render current card ---
function renderCard() {
  const cards = getCards();

  // Keep index in bounds
  currentIndex = Math.max(0, Math.min(currentIndex, cards.length - 1));

  // Clear previous card and dot
  stack.querySelector('.main-card')?.remove();
  rightColors.innerHTML = '';

  if (cards.length === 0) return;

  const card = cards[currentIndex];

  // Card element
  const cardEl = document.createElement('div');
  cardEl.className = 'note-card main-card';
  cardEl.innerHTML = `
    <div class="card-header">
      <img src="${card.image}" alt="Profile">
      <div class="info">
        <p><strong>Name:</strong> ${card.name}</p>
        <p><strong>Address:</strong> ${card.hometown}</p>
        <p><strong>Purpose:</strong> ${card.purpose}</p>
      </div>
    </div>
    <div class="card-actions">
      <button>Call</button>
      <button>Message</button>
    </div>
  `;
  stack.appendChild(cardEl);

  // Category color dot
  const dot = document.createElement('span');
  dot.className = `color-dot ${card.category}`;
  rightColors.appendChild(dot);
}

// --- Navigation ---
document.querySelectorAll('.move-button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const cards = getCards();
    if (btn.dataset.direction === 'down' && currentIndex < cards.length - 1) currentIndex++;
    if (btn.dataset.direction === 'up' && currentIndex > 0) currentIndex--;
    renderCard();
  });
});

// --- Init ---
renderCard();
