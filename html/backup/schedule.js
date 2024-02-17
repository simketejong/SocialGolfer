document.addEventListener('DOMContentLoaded', () => {
    const golfers = 'ABCDEFGHIJKLMNOPQRST'.split('');
    const schedule = generateSchedule(golfers, 5); // 5 days of tournament
    displaySchedule(schedule);
    assignDragAndDrop();
});

function generateSchedule(golfers, days) {
    const schedule = [];
    for (let day = 0; day < days; day++) {
        const dailyFlights = [];
        let availableGolfers = [...golfers];

        for (let flight = 0; flight < 5; flight++) {
            dailyFlights.push([]);
            for (let golfer = 0; golfer < 4; golfer++) {
                const randomIndex = Math.floor(Math.random() * availableGolfers.length);
                dailyFlights[flight].push(availableGolfers.splice(randomIndex, 1)[0]);
            }
        }
        schedule.push(dailyFlights);
    }
    return schedule;
}

function generateGolferColors() {
    const golfers = 'ABCDEFGHIJKLMNOPQRST'.split('');
    const colors = {};
    golfers.forEach(golfer => {
        let color = '';
        do {
            color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        } while (color === '#FFFFFF' || color.length < 7); // Ensure color is not white and valid
        colors[golfer] = color;
    });
    return colors;
}

function displaySchedule(schedule) {
    const scheduleDiv = document.getElementById('schedule');
    const golferColors = generateGolferColors();
    schedule.forEach((day, index) => {
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `<h2>Day ${index + 1}</h2>`;
        day.forEach((flight, fIndex) => {
            const flightDiv = document.createElement('div');
            flightDiv.className = 'flight';
            flightDiv.innerHTML = `<h3>Flight ${fIndex + 1}</h3>`;
            flight.forEach(golfer => {
                const golferDiv = document.createElement('div');
                golferDiv.className = 'golfer';
                golferDiv.style.backgroundColor = golferColors[golfer];
                golferDiv.innerHTML = `
                    ${golfer}
                    <input type="checkbox" class="checkbox" />
                `;
                golferDiv.setAttribute('draggable', true);
                flightDiv.appendChild(golferDiv);
            });
            dayDiv.appendChild(flightDiv);
        });
        scheduleDiv.appendChild(dayDiv);
    });
}

function assignDragAndDrop() {
    let draggedItem = null;

    document.querySelectorAll('.golfer').forEach(golferDiv => {
        golferDiv.addEventListener('dragstart', handleDragStart);
        golferDiv.addEventListener('dragover', handleDragOver);
        golferDiv.addEventListener('dragenter', handleDragEnter);
        golferDiv.addEventListener('dragleave', handleDragLeave);
        golferDiv.addEventListener('drop', handleDrop);
        golferDiv.addEventListener('dragend', handleDragEnd);
    });

    function handleDragStart(e) {
        draggedItem = this; // 'this' refers to the golfer div being dragged
        if (this.querySelector('input[type="checkbox"]').checked) {exit}
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML); // Use outerHTML to include the golfer div itself

    }

    function handleDragOver(e) {
        e.preventDefault(); // Necessary to allow dropping
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation(); // Stops some browsers from redirecting.
        e.preventDefault();
        if (draggedItem !== this && this.className.includes('golfer')) {
            if (this.querySelector('input[type="checkbox"]').checked) {exit}
            // Swap the contents and styles of the dragged and target elements
            const targetHTML = this.innerHTML;
            const targetBackgroundColor = this.style.backgroundColor;
            const targetClass = this.className;
            //alert(this.querySelector('input[type="checkbox"]').checked)
            // Swapping HTML content
            this.innerHTML = draggedItem.innerHTML;
            draggedItem.innerHTML = targetHTML;
    
            // Swapping background color
            this.style.backgroundColor = draggedItem.style.backgroundColor;
            draggedItem.style.backgroundColor = targetBackgroundColor;
    
            // Swapping classes (if any specific classes need to be swapped)
            this.className = draggedItem.className;
            draggedItem.className = targetClass;
    
            // If you're using IDs or any other attributes that should be unique, swap them here as well
        }
    }

    function handleDragEnd(e) {
        // Cleanup class 'over' from all golfer divs
        document.querySelectorAll('.golfer').forEach(golferDiv => {
            golferDiv.classList.remove('over');
        });
    }
    
}
