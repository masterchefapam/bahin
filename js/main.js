 const events = {
 
     "2025-06-16": [
      {title: "Click to view", image: "images/June16-22.jpg" },
   
    ],
     "2025-06-23": [
      {title: "Click to view",image: "images/June23-29.jpg" },
   
    ],
     "2025-06-30": [
      {title: "Click to view", image: "images/June30-July6.jpg" },
   
    ],
      "2025-07-07": [
      {title: "Click to view", image: "images/July7-July13.jpg" },
   
    ],
    "2025-07-14": [
      {title: "Regional Convention", image: "images/regional.jpg" },
   
    ],
     
     
  
    
  };

  const regional ={
    "Regional Convention Week": [
      {title: "Regional Convention",image: "images/regional.png" },
   
    ]
  }

  const todayStr = new Date().toISOString().split('T')[0];

  function getWeekRange(dateInput) {
  const date = new Date(dateInput);
  const day = date.getDay(); // 0 (Sun) to 6 (Sat)
  const diffToMonday = (day === 0 ? -6 : 1 - day); // move back to Monday
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  return dates; // Monday to Sunday
}


function formatDateToMonthDay(dateStr) {
  const options = { month: 'long', day: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options); // auto-locale
}

  function generateWeeks(startDate, numWeeks) {
    const container = document.getElementById('calendar');
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
        none.textContent = 'No events';
        card.appendChild(none);
      }

      container.appendChild(card);
    }
  }

    function generateRegional(startDate, numWeeks) {
    const container = document.getElementById('calendar');
    for (let w = 1; w < numWeeks; w++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(weekStart.getDate() + w * 6);
      const weekDates = getWeekRange(weekStart);

      const card = document.createElement('div');
      card.className = 'week-card';
      card.onclick = () => showModalRegional(weekDates);

      if (weekDates.includes(todayStr)) {
        card.classList.add('current-week');
      }

      const weekRange = document.createElement('div');
      weekRange.className = 'week-range';
      weekRange.textContent = `${formatDateToMonthDay(weekDates[0])} – ${formatDateToMonthDay(weekDates[6])}`;

      card.appendChild(weekRange);

      let added = false;
      weekDates.forEach(dateStr => {
        (regional[dateStr] || []).forEach(event => {
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
        none.textContent = 'Regional Convention';
        card.appendChild(none);
      }

      container.appendChild(card);
    }
  }

 function scrollToCurrentWeek() {
  const current = document.querySelector('.week-card.current-week');
  const container = document.getElementById('calendar');

  if (current) {
    const cardRect = current.getBoundingClientRect();
    const scrollLeft = current.offsetLeft - (container.offsetWidth / 2) + (cardRect.width / 2);
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }
}


  function showModal(weekDates) {
    const modal = document.getElementById('eventModal');
    const modalDate = document.getElementById('modalDate');
    const modalEvents = document.getElementById('modalEvents');

   modalDate.textContent = `Meeting Schedule for ${formatDateToMonthDay(weekDates[0])} – ${formatDateToMonthDay(weekDates[6])}`;

    modalEvents.innerHTML = "";

    let added = false;
    weekDates.forEach(dateStr => {
      (events[dateStr] || []).forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'modal-event';

        const img = document.createElement('img');
        img.src = event.image;
      

        const title = document.createElement('span');
        title.textContent = `${formatDateToMonthDay(dateStr)}: ${event.title}`;


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

  function scrollCalendar(dir) {
    const container = document.getElementById('calendar');
    const scrollAmount = container.querySelector('.week-card').offsetWidth * 2.5;
    container.scrollBy({ left: scrollAmount * dir, behavior: 'smooth' });
  }

  window.onclick = function(event) {
    const modal = document.getElementById('eventModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  generateWeeks(new Date("2025-06-16"), 4);
   generateWeeks(new Date("2025-07-07"), 3);
 
  scrollToCurrentWeek();
