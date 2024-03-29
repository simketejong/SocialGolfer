let golverDiv = []
let schedule = []

document.addEventListener('DOMContentLoaded', () => {
    const golfers = 'ABCDEFGHIJKLMNOPQRST'.split('');
    schedule = generateSchedule(golfers, 5); // 5 days of tournament
    const playMatrix = generatePlayMatrix(schedule);
    displayPlayMatrix(playMatrix);    
    displaySchedule(schedule);
    assignDragAndDrop();
});

function generateSchedule(golfers, days) {
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
        dayDiv.innerHTML = `<h2 class-"day">Day ${index + 1}</h2>`;
        day.forEach((flight, fIndex) => {
            const flightDiv = document.createElement('div');
            flightDiv.className = 'flight';
            flightDiv.innerHTML = `<h3>Flight ${fIndex + 1}</h3>`;
            flight.forEach(golfer => {
                golferDiv = document.createElement('div');
                golferDiv.className = 'golfer';
                golferDiv.setAttribute('golfer', golfer);
                golferDiv.style.backgroundColor = golferColors[golfer];
                golferDiv.innerHTML = `<span class="span" onclick="displayGolferInfoPopup('${golfer}')">
                    ${golfer}
                    </span>
                    <input type="checkbox" class="checkbox" />
                `;               
                golferDiv.setAttribute('draggable', true);
                flightDiv.appendChild(golferDiv);

                const menu = document.createElement('div');
                menu.className = 'hamburger-menu';
                menu.setAttribute("onclick","openPopup(this.closest('.golfer'))")
                menu.innerHTML = '&#9776;';
                golferDiv.appendChild(menu);

//                menu.addEventListener('click', function(event) {
  //                  event.stopPropagation();
    //                const golferDiv = this.closest('.golfer');
      //              openPopup(golferDiv);
        //        })
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
            const targetGolfer = this.getAttribute("golfer");
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

            this.setAttribute("golfer",draggedItem.getAttribute('golfer'))
            draggedItem.setAttribute("golfer",targetGolfer);

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

function openPopup(golferDiv) {
    const popup = document.getElementById('popup');
    const identifierInput = document.getElementById('identifier-input'); // New input for the identifier
    const colorPicker = document.getElementById('color-picker');
    const buggyCheckbox = document.getElementById('buggy-checkbox');
    const proCheckbox = document.getElementById('pro-checkbox');
    const cri1Checkbox = document.getElementById('criteria_1-checkbox');
    const cri2Checkbox = document.getElementById('criteria_2-checkbox');
    const cri3Checkbox = document.getElementById('criteria_3-checkbox');    
    const cri4Checkbox = document.getElementById('criteria_4-checkbox');        
    const okButton = document.getElementById('ok-button');

    // Initialize identifier input with golfer's current identifier
  //  identifierInput.value = golferDiv.textContent.trim()    
    golfers=golferDiv.getAttribute("golfer");
    // Show popup
    const nameSpan = golferDiv.querySelector('.span');
//    alert(nameSpan.textContent.trim());
    identifierInput.value = nameSpan.textContent.trim()
    popup.style.display = 'block';

    // Initialize color picker with golfer's current background color
    colorPicker.value = rgbToHex(golferDiv.style.backgroundColor); 
    // Initialize checkboxes based on existing classes or data attributes
    buggyCheckbox.checked = golferDiv.classList.contains('buggy');
    proCheckbox.checked = golferDiv.classList.contains('pro');
    cri1Checkbox.checked = golferDiv.classList.contains('cri1');
    cri2Checkbox.checked = golferDiv.classList.contains('cri2');
    cri3Checkbox.checked = golferDiv.classList.contains('cri3');
    cri4Checkbox.checked = golferDiv.classList.contains('cri4');

    okButton.onclick = function() {
        const originalName = golferDiv.dataset.originalName;
        document.querySelectorAll('.golfer').forEach(golferDiv => {
            if (golferDiv.getAttribute("golfer") === golfers) {
                // Update the golfer's display name if you have a specific spanss or div for it
                const nameSpan = golferDiv.querySelector('.span');
                golferDiv.style.backgroundColor = colorPicker.value;;
                nameSpan.textContent = identifierInput.value
                golferDiv.classList.toggle('buggy', buggyCheckbox.checked);
                golferDiv.classList.toggle('pro', proCheckbox.checked);
                golferDiv.classList.toggle('cri1', cri1Checkbox.checked);
                golferDiv.classList.toggle('cri2', cri2Checkbox.checked);
                golferDiv.classList.toggle('cri3', cri3Checkbox.checked);
                golferDiv.classList.toggle('cri4', cri4Checkbox.checked);    
                updateIcons(golferDiv, buggyCheckbox.checked, proCheckbox.checked, cri1Checkbox.checked , cri2Checkbox.checked, cri3Checkbox.checked, cri4Checkbox.checked);
            }
        });
        // Hide popup
        popup.style.display = 'none';
    };
}

function updateIcons(golferDiv, isBuggy, isPro, isCri1, isCri2, isCri3, isCri4) {
    // Remove existing icons/circles
    golferDiv.querySelectorAll('.buggy-icon, .pro-icon, .cri1-icon, .cri2-icon, .cri3-icon, .cri4-icon').forEach(icon => icon.remove());

    // Add "buggy" icon/circle if checked
    if (isBuggy) {
        const buggyIcon = document.createElement('div');
        buggyIcon.className = 'buggy-icon';
        golferDiv.appendChild(buggyIcon);
    }

    // Add "pro" icon/circle if checked
    if (isPro) {
        const proIcon = document.createElement('div');
        proIcon.className = 'pro-icon';
        golferDiv.appendChild(proIcon);
    }

    if (isCri1) {
        const cri1Icon = document.createElement('div');
        cri1Icon.className = 'cri1-icon';
        golferDiv.appendChild(cri1Icon);
    }
    if (isCri2) {
        const cri2Icon = document.createElement('div');
        cri2Icon.className = 'cri2-icon';
        golferDiv.appendChild(cri2Icon);
    }
    if (isCri3) {
        const cri3Icon = document.createElement('div');
        cri3Icon.className = 'cri3-icon';
        golferDiv.appendChild(cri3Icon);
    }
    if (isCri4) {
        const cri4Icon = document.createElement('div');
        cri4Icon.className = 'cri4-icon';
        golferDiv.appendChild(cri4Icon);
    }

}

function rgbToHex(rgb) {
    if (!rgb) return '#000000'; // Default color if none is set
    let [r, g, b] = rgb.match(/\d+/g).map(Number);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function displayGolferInfoPopup(golferName) {
    const popup = document.getElementById('golferInfoPopup');
    const nameDisplay = document.getElementById('golferInfoName');
    const matrixDisplay = document.getElementById('golferInfoMatrix');

    document.querySelectorAll('.golfer').forEach(golferDiv => {
        if (golferDiv.getAttribute("golfer") === golferName) {
            // Update the golfer's display name if you have a specific spanss or div for it
            nameSpan = golferDiv.querySelector('.span');
    }})
    nameDisplay.textContent = 'Naam speler ' + nameSpan.textContent.trim();

    matrixDisplay.innerHTML = ''; // Proceed if the element exists
    
    // Assuming `schedule` is your global schedule variable
    const interactions = {}; // Object to track interactions {opponentName: {day1_flight1: count, ...}, ...}

    let tableContent = '<table border="1"><tr><th>Day and Flight</th><th>Golfers</th></tr>';

    schedule = [];
    schedule = rebuildScheduleFromDOM();

    schedule.forEach((day, dayIndex) => {
        day.forEach((flight, flightIndex) => {
            if (flight.includes(golferName)) {
                flight.forEach(otherGolfer => {
                    if (otherGolfer !== golferName) {
                        interactions[otherGolfer] = (interactions[otherGolfer] || 0) + 1;
                    }
                });

                // Generate flight details
                const flightString = `Day ${dayIndex + 1} Flight ${flightIndex + 1}`;
                const golfersString = flight.map(otherGolfer => {
                    if (otherGolfer === golferName || interactions[otherGolfer] <= 1) {
                        return otherGolfer;
                    } else {
                        return `<span style='color:red;'>${otherGolfer}</span>`;
                    }
                }).join(" ");

                // Append a row to the table for this flight
                tableContent += `<tr><td>${flightString}</td><td>${golfersString}</td></tr>`;
            }
        });
    });

    // Close the table and update the matrix display
    tableContent += '</table>';
    matrixDisplay.innerHTML = tableContent;

    //displayGlobalSchedule(); // Call this after the schedule is set or updated
    //schedule = [];
    //schedule = rebuildScheduleFromDOM();
    //rebuildScheduleFromDOM();
    //displayGlobalSchedule(); // Call this after the schedule is set or updated

    // Show popup
    popup.style.display = 'block';
}

function generatePlayMatrix(schedule) {
    const playMatrix = {};
    // Initialize matrix with golfer keys
    schedule.forEach(day => {
        day.forEach(flight => {
            flight.forEach(golfer => {
                if (!playMatrix[golfer]) {
                    playMatrix[golfer] = {};
                    schedule.forEach(day => day.forEach(flight => flight.forEach(otherGolfer => {
                        if (!playMatrix[golfer][otherGolfer]) {
                            playMatrix[golfer][otherGolfer] = 0;
                        }
                    })));
                }
            });
        });
    });

    // Populate the matrix with play counts
    schedule.forEach(day => {
        day.forEach(flight => {
            flight.forEach((golfer, _, flight) => {
                flight.forEach(otherGolfer => {
                    if (golfer !== otherGolfer) {
                        playMatrix[golfer][otherGolfer]++;
                    }
                });
            });
        });
    });

    return playMatrix;
}

function displayPlayMatrix(playMatrix) {
    const matrixDiv = document.createElement('div');
    const table = document.createElement('table');
    table.border = 1; // Add border for visibility, adjust styling as needed

    const golfers = Object.keys(playMatrix);
    const headerRow = table.insertRow();
    headerRow.insertCell().textContent = 'Golfer'; // Top-left cell
    golfers.forEach(golfer => headerRow.insertCell().textContent = golfer);

    golfers.forEach(golfer => {
        const row = table.insertRow();
        row.insertCell().textContent = golfer; // Row header
        golfers.forEach(otherGolfer => {
            row.insertCell().textContent = playMatrix[golfer][otherGolfer];
        });
    });

    matrixDiv.appendChild(table);
    document.body.appendChild(matrixDiv); // Or append to another element as needed
}

function displayGlobalSchedule() {
    console.log(JSON.stringify(schedule));
    const scheduleContainer = document.getElementById('scheduleDisplay');
    scheduleContainer.innerHTML = ''; // Clear previous content

    schedule.forEach((day, dayIndex) => {
        // Create a div for each day
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerHTML = `<h2>Day ${dayIndex + 1}</h2>`;

        day.forEach((flight, flightIndex) => {
            // Create a div for each flight
            const flightDiv = document.createElement('div');
            flightDiv.classList.add('flight');
            flightDiv.innerHTML = `<h3>Flight ${flightIndex + 1}</h3><ul>`;

            flight.forEach(golfer => {
                // List each golfer in the flight
                flightDiv.innerHTML += `<li>${golfer}</li>`;
            });

            flightDiv.innerHTML += `</ul>`;
            dayDiv.appendChild(flightDiv); // Add this flight to the day's div
        });

        scheduleContainer.appendChild(dayDiv); // Add this day to the schedule container
    });
}

function rebuildScheduleFromDOM() {
        const scheduleTest = [];
        const days = document.querySelectorAll('#schedule > div');
    
        days.forEach((dayDiv) => {
            const flightsForDay = [];
            const flights = dayDiv.querySelectorAll('.flight');
    
            flights.forEach((flightDiv) => {
                const golfersInFlight = [];
                const golfers = flightDiv.querySelectorAll('.golfer');
    
                golfers.forEach((golferDiv) => {
                    const golferId = golferDiv.getAttribute('golfer'); // assuming golfer attribute holds the identifier
                    golfersInFlight.push(golferId);
                });
    
                flightsForDay.push(golfersInFlight);
            });
    
            scheduleTest.push(flightsForDay);
        });
        console.log(JSON.stringify(schedule));
        console.log(JSON.stringify(scheduleTest));   
        return scheduleTest;
    }