// ---- SAFARI-SAFE VERSION ----

// Events data
const events = {


  
 

 
   
   
  

    
    
    
      
          "2026-02-08": [{ title: "Click to view", image: "images/Feb2-8.jpg" }],
          "2026-02-15": [{ title: "Click to view", image: "images/Feb9-15.jpg" }],
          "2026-02-22": [{ title: "Click to view", image: "images/Feb16-22.jpg" }],
          "2026-03-01": [{ title: "Click to view", image: "images/feb23-march1.jpg" }],
};

// --- SAFARI SAFE DATE HELPERS ---
function safeDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d); // avoids Safari UTC bug
}

const today = new Date();
// Local YYYY-MM-DD instead of UTC ISO
const todayStr = today.toLocaleDateString('en-CA');

// --- DATE HELPERS ---
function getWeekRange(dateInput) {
  const date = new Date(dateInput);
  const day = date.getDay(); // 0 (Sun) - 6 (Sat)
  const diffToMonday = (day === 0 ? -6 : 1 - day);
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toLocaleDateString('en-CA'));
  }
  return dates; // Monday to Sunday
}

function formatDateToMonthDay(dateStr) {
  const options = { month: 'long', day: 'numeric' };
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, options);
}

// --- GENERATORS ---
function generateWeeks(startDate, numWeeks) {
  const container = document.getElementById('calendar');
  if (!container) return;

  for (let w = 1; w < numWeeks; w++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + w * 6);
    const weekDates = getWeekRange(weekStart);

    const card = document.createElement('div');
    card.className = 'week-card';
    card.onclick = () => showModal(weekDates);

    if (weekDates.includes(todayStr)) {
      card.classList.add('current-week');
    }

    const weekRange = document.createElement('div');
    weekRange.className = 'week-range';
    weekRange.textContent = `${formatDateToMonthDay(weekDates[0])} – ${formatDateToMonthDay(weekDates[6])}`;
    card.appendChild(weekRange);

    let added = false;
    weekDates.forEach(dateStr => {
      (events[dateStr] || []).forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';

        const img = document.createElement('img');
        img.src = event.image;
        img.alt = event.title;

        const title = document.createElement('span');
        title.textContent = event.title;

        eventDiv.appendChild(img);
        eventDiv.appendChild(title);
        card.appendChild(eventDiv);
        added = true;
      });
    });

    if (!added) {
      const none = document.createElement('div');
      none.textContent = '-Forthcoming-';
      card.appendChild(none);
    }

    container.appendChild(card);
  }
}

// --- MODAL ---
function showModal(weekDates) {
  const modal = document.getElementById('eventModal');
  const modalDate = document.getElementById('modalDate');
  const modalEvents = document.getElementById('modalEvents');
  if (!modal) return;

  modalDate.textContent = `Meeting Schedule for ${formatDateToMonthDay(weekDates[0])} – ${formatDateToMonthDay(weekDates[6])}`;
  modalEvents.innerHTML = "";

  let added = false;
  weekDates.forEach(dateStr => {
    (events[dateStr] || []).forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'modal-event';

      const img = document.createElement('img');
      img.src = event.image;

      eventDiv.appendChild(img);
      modalEvents.appendChild(eventDiv);
      added = true;
    });
  });

  if (!added) {
    modalEvents.innerHTML = '<p>No events this week.</p>';
  }

  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('eventModal').style.display = 'none';
}

window.onclick = function (event) {
  const modal = document.getElementById('eventModal');
  if (event.target === modal) modal.style.display = 'none';
};

// --- SCROLL ---
function scrollToCurrentWeek() {
  const current = document.querySelector('.week-card.current-week');
  const container = document.getElementById('calendar');
  if (!current || !container) return;

  const cardRect = current.getBoundingClientRect();
  const scrollLeft = current.offsetLeft - (container.offsetWidth / 2) + (cardRect.width / 2);

  // Safari smooth scroll fallback
  setTimeout(() => {
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, 100);
}

function scrollCalendar(dir) {
  const container = document.getElementById('calendar');
  if (!container) return;
  requestAnimationFrame(() => {
    const card = container.querySelector('.week-card');
    if (card) {
      const scrollAmount = card.offsetWidth * 2.5;
      container.scrollBy({ left: scrollAmount * dir, behavior: 'smooth' });
    }
  });
}

// --- MENU ---
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('actives');
  document.querySelector('.overlay').classList.toggle('active');
}

// --- INITIALIZE WHEN DOM READY ---
window.addEventListener('DOMContentLoaded', () => {
 
 
 
 generateWeeks(safeDate("2026-02-02"),4);
    generateWeeks(safeDate("2026-02-23"),2);
    
  scrollToCurrentWeek();
});
