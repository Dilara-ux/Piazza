document.addEventListener('DOMContentLoaded', () => {
    const eventList = [
        { date: '2024-07-01', title: 'Hunde-Treffen am Abend', description: 'Treffen Sie andere Hundebesitzer und genießen Sie einen Abend mit Ihren Hunden.', time: '18:00 - 20:00' },
        { date: '2024-07-15', title: 'Grillabend für Mensch und Hund', description: 'Grillen Sie mit Ihren Hunden und anderen Gästen.', time: '17:00 - 19:00' },
        { date: '2024-07-29', title: 'Veggie Tag', description: 'Ein spezieller Tag für Vegetarier und ihre Hunde.', time: '16:00 - 18:00' },
        { date: '2024-08-05', title: 'Sommerfest', description: 'Feiern Sie den Sommer mit uns.', time: '14:00 - 18:00' },
        { date: '2024-08-18', title: 'Hundetraining Workshop', description: 'Lernen Sie neue Trainingstechniken für Ihre Hunde.', time: '10:00 - 12:00' },
        { date: '2024-08-25', title: 'Hunde-Yoga', description: 'Yoga für Mensch und Hund.', time: '09:00 - 11:00' }
    ];

    const calendarDays = document.getElementById('calendar-days');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let today = new Date('2024-07-02');
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function generateCalendar(month, year) {
        calendarDays.innerHTML = '';
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.innerText = new Date(year, month).toLocaleString('de-DE', { month: 'long', year: 'numeric' });

        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            calendarDays.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.innerText = day;

            const eventForDay = eventList.find(event => new Date(event.date).toLocaleDateString('de-DE') === new Date(year, month, day).toLocaleDateString('de-DE'));
            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.innerText = eventForDay.title;

                const eventDetailsDiv = document.createElement('div');
                eventDetailsDiv.className = 'event-details';
                eventDetailsDiv.innerHTML = `<strong>${eventForDay.title}</strong><p>${eventForDay.description}</p><p>Uhrzeit: ${eventForDay.time}</p>`;
                eventDiv.appendChild(eventDetailsDiv);
                dayDiv.appendChild(eventDiv);
            }

            calendarDays.appendChild(dayDiv);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
        generateCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        generateCalendar(currentMonth, currentYear);
    });

    generateCalendar(currentMonth, currentYear);
});

document.addEventListener('DOMContentLoaded', () => {
    const emailRecipient = 'sascha.meyer@edu.techstarter.de';

    if (document.getElementById('reservation-form')) {
        const reservationForm = document.getElementById('reservation-form');
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            emailjs.send('service_8l17jem', 'template_aj1lw72', {
                name: reservationForm.name.value,
                email: reservationForm.email.value,
                date: reservationForm.date.value,
                time: reservationForm.time.value,
                guests: reservationForm.guests.value,
                to_email: emailRecipient
            }).then(() => {
                alert('Ihre Reservierung wurde erfolgreich gesendet!');
                reservationForm.reset();
            }, (error) => {
                alert('Ein Fehler ist aufgetreten: ' + error.text);
            });
        });
    }

    if (document.getElementById('contact-form')) {
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                name: contactForm.name.value,
                email: contactForm.email.value,
                message: contactForm.message.value,
                to_email: emailRecipient
            }).then(() => {
                alert('Danke für Ihre Nachricht!');
                contactForm.reset();
            }, (error) => {
                alert('Ein Fehler ist aufgetreten: ' + error.text);
            });
        });
    }
});