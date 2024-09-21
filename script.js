const eventsData = [
    {
        "club_name": "Tech Innovators Club",
        "club_desc": "A club dedicated to exploring new technological advancements and organizing hands-on workshops.",
        "events_list": [
            {
                "event_name": "AI and Machine Learning Workshop",
                "event_desc": "An introductory workshop on artificial intelligence and machine learning algorithms.",
                "day1": "2024-09-25",
                "day2": "2024-09-26",
                "venue1": "Room 101, Tech Building",
                "venue2": "Room 202, Tech Building",
                "image_url": "wp13348042-4k-desktop-samurai-wallpapers.jpg"
            },
            {
                "event_name": "Blockchain Basics",
                "event_desc": "A session to learn the fundamentals of blockchain technology and its applications.",
                "day1": "2024-10-01",
                "day2": "2024-10-02",
                "venue1": "Room 303, Tech Building",
                "venue2": "Room 304, Tech Building",
                "image_url": "wp6177714-samurai-4k-wallpapers.jpg"
            },
            {
                "event_name": "Robotics Hackathon",
                "event_desc": "A 24-hour hackathon focused on building robotics projects using open-source platforms.",
                "day1": "2024-11-05",
                "day2": "2024-11-06",
                "venue1": "Workshop Hall A",
                "venue2": "Workshop Hall B",
                "image_url": "wp6177877-samurai-4k-wallpapers.jpg"
            }
        ]
    },
    {
        "club_name": "Cybersecurity Enthusiasts",
        "club_desc": "A community focused on learning and practicing ethical hacking and cybersecurity skills.",
        "events_list": [
            {
                "event_name": "Capture the Flag Challenge",
                "event_desc": "A fun cybersecurity challenge where participants solve puzzles to find hidden flags.",
                "day1": "2024-10-10",
                "day2": "2024-10-11",
                "venue1": "Main Auditorium",
                "venue2": "Computer Lab 3",
                "image_url": "wp6177890-samurai-4k-wallpapers.jpg"
            },
            {
                "event_name": "Ethical Hacking Workshop",
                "event_desc": "A hands-on workshop on ethical hacking techniques and how to protect against cyber threats.",
                "day1": "2024-10-20",
                "day2": "2024-10-21",
                "venue1": "Room 401, Security Wing",
                "venue2": "Room 402, Security Wing",
                "image_url": "wp13348042-4k-desktop-samurai-wallpapers.jpg"
            },
            {
                "event_name": "Cybersecurity Trends Seminar",
                "event_desc": "A seminar discussing the latest trends and advancements in cybersecurity.",
                "day1": "2024-11-15",
                "day2": "2024-11-16",
                "venue1": "Conference Hall 1",
                "venue2": "Conference Hall 2",
                "image_url": "wp6177714-samurai-4k-wallpapers.jpg"
            }
        ]
    }
];


document.addEventListener('DOMContentLoaded', function() {
    const eventList = document.getElementById('eventList');
    const thumbnailList = document.getElementById('thumbnailList');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentClubIndex = 0;
    let currentEventIndex = 0;

    function populateEvents() {
        eventList.innerHTML = '';
        thumbnailList.innerHTML = '';

        eventsData.forEach((club, clubIndex) => {
            club.events_list.forEach((event, eventIndex) => {
                const eventItem = document.createElement('div');
                eventItem.className = 'item';
                eventItem.innerHTML = `
                    <img src="${event.image_url}" alt="${event.event_name}">
                    <div class="content">
                        <div class="title">${event.event_name}</div>
                        <div class="type">${club.club_name}</div>
                        <div class="description">${event.event_desc}</div>
                        <div class="dates">
                            <p>Day 1: ${event.day1} - ${event.venue1}</p>
                            <p>Day 2: ${event.day2} - ${event.venue2}</p>
                        </div>
                        <div class="button">
                            <button>SEE MORE</button>
                        </div>
                    </div>
                `;
                eventList.appendChild(eventItem);

                const thumbnailItem = document.createElement('div');
                thumbnailItem.className = 'item';
                thumbnailItem.innerHTML = `<img src="${event.image_url}" alt="${event.event_name}">`;
                thumbnailList.appendChild(thumbnailItem);
            });
        });

        showCurrentEvent();
    }

    function showCurrentEvent() {
        const eventItems = eventList.querySelectorAll('.item');
        const thumbnailItems = thumbnailList.querySelectorAll('.item');

        eventItems.forEach((item, index) => {
            if (index === getCurrentEventIndex()) {
                item.style.display = 'block';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.5s ease-in-out';
                    item.style.opacity = '1';
                }, 50);
            } else {
                item.style.display = 'none';
            }
        });

        thumbnailItems.forEach((item, index) => {
            item.classList.toggle('active', index === getCurrentEventIndex());
        });
    }

    function getCurrentEventIndex() {
        let index = 0;
        for (let i = 0; i < currentClubIndex; i++) {
            index += eventsData[i].events_list.length;
        }
        return index + currentEventIndex;
    }

    function navigateEvent(direction) {
        currentEventIndex += direction;

        if (currentEventIndex < 0) {
            currentClubIndex = (currentClubIndex - 1 + eventsData.length) % eventsData.length;
            currentEventIndex = eventsData[currentClubIndex].events_list.length - 1;
        } else if (currentEventIndex >= eventsData[currentClubIndex].events_list.length) {
            currentClubIndex = (currentClubIndex + 1) % eventsData.length;
            currentEventIndex = 0;
        }

        showCurrentEvent();
    }

    function startAutoSlide() {
        setInterval(() => {
            navigateEvent(1);
        }, 5000); // Change event every 5 seconds
    }

    prevButton.addEventListener('click', () => navigateEvent(-1));
    nextButton.addEventListener('click', () => navigateEvent(1));

    populateEvents();
    startAutoSlide();
});