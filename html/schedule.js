let golverDiv = []
let schedule = []
let flightsPerDay = []
var Golfers = {};

document.addEventListener('DOMContentLoaded', () => {
//    const golfers = 'ABCDEFGHIJKLMNOPQRST'.split('');
//    schedule = generateSchedule(golfers, 5); // 5 days of tournament
//    const playMatrix = generatePlayMatrix(schedule);
//    displayPlayMatrix(playMatrix);    
//    displaySchedule(schedule);
//    assignDragAndDrop();
});
/*function generateSchedule(golfers, days) {
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
// TODO: Bij het maken koppel moet ergens naam en aan letter koppelen met attributen
//    schedule = [[["L","H","S","J"],["D","R","F","N"],["G","T","M",],["O","Q","A"],["I","P","B"],["E","K","C"]],
//                [["D","B","A","M"],["I","C","P","L"],["J","S","T","Q"],["K","F","R","E"],["N","O","H","G"]],
//                [["T","K","L","S"],["Q","D","R","F"],["N","H","G","M"],["A","C","J","B"],["O","P","E","I"]],
//                [["I","O","E","P"],["J","L","S","N"],["D","Q","K","H"],["F","T","R","C"],["G","B","A","M"]],
//                [["O","B","K","L"],["H","D","Q","M"],["N","I","A","S"],["R","T","E","G"],["C","F","P","J"]]]
      schedule = [[['I', 'R', 'T', 'A'], ['S', 'U', 'N', 'M'], ['W', 'E', 'K', 'D'], ['V', 'P', 'X', 'L'], ['Q', 'F', 'H', 'B'], ['Y', 'C', 'G'], ['O', 'J', 'Z']], [['R', 'Y', 'J', 'L'], ['W', 'Q', 'V', 'A'], ['T', 'U', 'G', 'H'], ['E', 'N', 'B', 'Z'], ['C', 'M', 'P', 'D'], ['I', 'S', 'X'], ['K', 'F', 'O']], [['Q', 'K', 'T', 'Z'], ['W', 'I', 'M', 'H'], ['E', 'O', 'A', 'L'], ['G', 'N', 'J', 'P'], ['R', 'S', 'V', 'F'], ['C', 'X', 'B'], ['Y', 'U', 'D']], [['H', 'A', 'Z'], ['I', 'O', 'D'], ['T', 'J', 'X'], ['Q', 'G', 'L'], ['E', 'F', 'M'], ['R', 'U', 'P'], ['K', 'C', 'V', 'N'], ['W', 'Y', 'S', 'B']], [['Q', 'E', 'C', 'J'], ['K', 'S', 'P', 'A'], ['I', 'U', 'B', 'L'], ['Y', 'O', 'M', 'X'], ['V', 'G', 'D', 'Z'], ['R', 'N', 'H'], ['W', 'T', 'F']]]
//    console.log(JSON.stringify(schedule))
    
    return schedule;
}
*/
function populateGolfers() {
    const numGolfers = document.getElementById('numGolfers').value; // Assuming this input exists and captures the total number of golfers.
    for (let i = 0; i < numGolfers; i++) {
        const name = document.getElementById(`golferName${i}`).value; // Get golfer's name
        const hcp = document.getElementById(`golferHcp${i}`).value; // Get golfer's handicap
        const color = generateGolferColor(name); // Placeholder for a function that determines golfer's color
        // Generate or assign other attributes as needed

 
        Golfers[name] = {
            hcp: hcp,
            color: color,
        };
    }
}

function generateGolferColors() {
    const golfers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
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
    const buggyCheckbox = document.getElementById('buggy-checkbox');
    const proCheckbox = document.getElementById('pro-checkbox');
    const cri1Checkbox = document.getElementById('criteria_1-checkbox');
    const cri2Checkbox = document.getElementById('criteria_2-checkbox');
    const cri3Checkbox = document.getElementById('criteria_3-checkbox');    
    const cri4Checkbox = document.getElementById('criteria_4-checkbox');

    const scheduleDiv = document.getElementById('schedule');
    const golferColors = generateGolferColors(); // Assuming this function generates colors for each golfer

    schedule.forEach((day, index) => {
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `<h2 class="day">Day ${index + 1}</h2>`; // Fix class assignment syntax
        day.forEach((flight, fIndex) => {
            const flightDiv = document.createElement('div');
            flightDiv.className = 'flight';
            flightDiv.innerHTML = `<h3>Flight ${fIndex + 1}</h3>`;
            let hcpSum = 0;
            let hcpMax = -Infinity;
            let hcpMin = Infinity;

            flight.forEach(golfer => {
                const golferDiv = document.createElement('div');
                golferDiv.className = 'golfer';
                golferDiv.setAttribute('golfer', golfer);
                // Assuming hcp is set here as an example. You should adjust this according to your actual data.
                //golferDiv.setAttribute('hcp', Math.floor(Math.random() * 36)); // Example hcp setting
                if (Golfers[golfer]) {
                    golferDiv.setAttribute('hcp', Golfers[golfer].hcp);
                    golferDiv.style.backgroundColor = Golfers[golfer].color;
                }
                
                // Insert the golfer span, checkbox, and hcp display in the correct order
                displayName=Golfers[golfer].realName;
                displayHcp=Golfers[golfer].hcp;
                golferDiv.innerHTML = `
                    <span class="span" onclick="displayGolferInfoPopup('${golfer}')">${displayName}</span>
                    <div class="hcp-display">${golferDiv.getAttribute('hcp')}</div> 
                    <input type="checkbox" class="checkbox">
                `; // HCP is displayed here as requested

                golferDiv.setAttribute('draggable', true);
                
                const menu = document.createElement('div');
                menu.className = 'hamburger-menu';
                menu.setAttribute("onclick", "openPopup(this.closest('.golfer'))");
                menu.innerHTML = '&#9776;';
                golferDiv.insertBefore(menu, golferDiv.firstChild); // Insert the menu at the beginning

// Icons
                buggyCheckbox.checked = Golfers[golfer].buggy;
                proCheckbox.checked = Golfers[golfer].pro;
                cri1Checkbox.checked = Golfers[golfer].criteria1;
                cri2Checkbox.checked = Golfers[golfer].criteria2;
                cri3Checkbox.checked = Golfers[golfer].criteria3;
                cri4Checkbox.checked = Golfers[golfer].criteria4;
                updateIcons(golferDiv, buggyCheckbox.checked, proCheckbox.checked, cri1Checkbox.checked , cri2Checkbox.checked, cri3Checkbox.checked, cri4Checkbox.checked);

                flightDiv.appendChild(golferDiv);

                // Update hcp calculations
                const hcp = parseInt(golferDiv.getAttribute('hcp'), 10);
                hcpSum += hcp;
                hcpMax = Math.max(hcpMax, hcp);
                hcpMin = Math.min(hcpMin, hcp);
            });

            // Append HCP summary to flightDiv
            const hcpSummaryDiv = document.createElement('div');
            hcpSummaryDiv.className = `hcp-summary`
            hcpSummaryDiv.innerHTML = `Total HCP: ${hcpSum}' Highest HCP: ${hcpMax}, Lowest HCP: ${hcpMin}`;
            flightDiv.appendChild(hcpSummaryDiv);

            dayDiv.appendChild(flightDiv);
        });
        scheduleDiv.appendChild(dayDiv);
    });        
    console.log(JSON.stringify(Golfers))
}
function assignDragAndDrop() {
    //FIXIT: Now drag and drop doesnt work
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
            const targetHcp = this.getAttribute("hcp");
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

            this.setAttribute("hcp",draggedItem.getAttribute('hcp'))
            draggedItem.setAttribute("hcp",targetHcp);

            recalculateHcpForFlights();
            // If you're using IDs or any other attributes that should be unique, swap them here as well
        }
    }

    function handleDragEnd(e) {
        // Cleanup class 'over' from all golfer divs
        document.querySelectorAll('.golfer').forEach(golferDiv => {
            golferDiv.classList.remove('over');
        });
        recalculateHcpForFlights();
    }
}
function openPopup(golferDiv) {
    const popup = document.getElementById('popup');
    const naam = document.getElementById('naam-input');
    HCP = document.getElementById('hcp-input'); // New input for the identifier
    const colorPicker = document.getElementById('color-picker');
    const buggyCheckbox = document.getElementById('buggy-checkbox');
    const proCheckbox = document.getElementById('pro-checkbox');
    const cri1Checkbox = document.getElementById('criteria_1-checkbox');
    const cri2Checkbox = document.getElementById('criteria_2-checkbox');
    const cri3Checkbox = document.getElementById('criteria_3-checkbox');    
    const cri4Checkbox = document.getElementById('criteria_4-checkbox');        
    const okButton = document.getElementById('ok-button');
    
    golfers=golferDiv.getAttribute("golfer");
    HCP.value=golferDiv.getAttribute("hcp");
    
    // Show popup
    const nameSpan = golferDiv.querySelector('.span');
//    alert(nameSpan.textContent.trim());
    naam.value = nameSpan.textContent.trim()
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
                const hcpDisplayDiv = golferDiv.querySelector('.hcp-display');
                if (hcpDisplayDiv) {
                    hcpDisplayDiv.textContent = HCP.value;
                }         
                // Update the golfer's display name if you have a specific spanss or div for it
                const nameSpan = golferDiv.querySelector('.span');
                golferDiv.style.backgroundColor = colorPicker.value;
                Golfers[golfers].color = colorPicker.value;
                nameSpan.textContent = naam.value;
                Golfers[golfers].realName = naam.value;
                alert(naam.value)
                golferDiv.classList.toggle('buggy', buggyCheckbox.checked);
                Golfers[golfers].buggy = buggyCheckbox.checked;
                golferDiv.classList.toggle('pro', proCheckbox.checked);
                Golfers[golfers].pro = proCheckbox.checked;                
                golferDiv.classList.toggle('cri1', cri1Checkbox.checked);
                Golfers[golfers].criteria1 = cri1Checkbox.checked;                
                golferDiv.classList.toggle('cri2', cri2Checkbox.checked);
                Golfers[golfers].criteria2 = cri2Checkbox.checked;                
                golferDiv.classList.toggle('cri3', cri3Checkbox.checked);
                Golfers[golfers].criteria3 = cri3Checkbox.checked;                
                golferDiv.classList.toggle('cri4', cri4Checkbox.checked); 
                Golfers[golfers].criteria4 = cri4Checkbox.checked;                
                golferDiv.setAttribute("hcp",HCP.value);  
                Golfers[golfers].hcp = HCP.value
                updateIcons(golferDiv, buggyCheckbox.checked, proCheckbox.checked, cri1Checkbox.checked , cri2Checkbox.checked, cri3Checkbox.checked, cri4Checkbox.checked);
            }
        });
//      Golfers[golfers].realName = "Simke"
        console.log(JSON.stringify(Golfers[golfers]))
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
    matrixDiv.setAttribute("id","Matrix");
    matrixDiv.setAttribute('style',"display:none")
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
        //data=JSON.stringify(schedule)
        console.log(JSON.stringify(schedule));
        console.log(JSON.stringify(scheduleTest));   
        return scheduleTest;
}
function searchSolution() {
        const scheduleTest = [];
        const days = document.querySelectorAll('#schedule > div');
    
        days.forEach((dayDiv) => {
            const flightsForDay = [];
            const flights = dayDiv.querySelectorAll('.flight');
    
            flights.forEach((flightDiv) => {
                const golfersInFlight = [];
                const golfers = flightDiv.querySelectorAll('.golfer');
    
                golfers.forEach((golferDiv) => { // TODO: Speler staat op verkeerde positie in array
                    checkPush=false
                    const golferId = golferDiv.getAttribute('golfer'); // assuming golfer attribute holds the identifier
                    const checkboxe = flightDiv.querySelectorAll('.golfer .checkbox');
                    checkboxe.forEach(checkbox => {
                        if (checkbox.checked && !checkPush) {
                            // Find the closest parent golfer div to access golfer attributes
                            const golferElement = checkbox.closest('.golfer');
                            if (!golfersInFlight.includes(golferElement.getAttribute('golfer'))){
                                    golfersInFlight.push(golferElement.getAttribute('golfer'));                            
                                    checkPush=true
                                }
                        }
                    })
                    if (!checkPush){
                        golfersInFlight.push("?");    
                    }
                });
                flightsForDay.push(golfersInFlight);
            });
    
            scheduleTest.push(flightsForDay);
        });
//        console.log(JSON.stringify(schedule));       
//        console.log(JSON.stringify(scheduleTest));   
        return scheduleTest;
}
function pythonReturn(data){
    jsonString=data.trim();
    let validJsonString = jsonString.replace(/'/g, '"');    
    schedule=JSON.parse(validJsonString);
    var scheduleDiv = document.getElementById('schedule');
    scheduleDiv.innerHTML = '';
    document.getElementById("finalFlightsSummary").style.display="none";
 //   document.getElementById("SaveData").style.display="block";
    document.getElementById("SaveData").style.display="block";
    document.getElementById("schedule").style.display="block";
    displaySchedule(schedule)
    assignDragAndDrop();
}
function recalculateHcpForFlights() {
    document.querySelectorAll('.flight').forEach(flightDiv => {
        let hcpSum = 0;
        let hcpMax = -Infinity;
        let hcpMin = Infinity;

        const golfers = flightDiv.querySelectorAll('.golfer');
        golfers.forEach(golferDiv => {
            const hcp = parseInt(golferDiv.getAttribute('hcp'), 10);
            hcpSum += hcp;
            hcpMax = Math.max(hcpMax, hcp);
            hcpMin = Math.min(hcpMin, hcp);
        });

        // Assuming there's only one summary div per flight, update it
        const hcpSummaryDiv = flightDiv.querySelector('.hcp-summary');
        if(hcpSummaryDiv) {
            hcpSummaryDiv.innerHTML = `Total HCP: ${hcpSum}, Highest HCP: ${hcpMax}, Lowest HCP: ${hcpMin}`;
        } else {
            // If there's no summary div (first drag-and-drop operation), create and append it
            const newHcpSummaryDiv = document.createElement('div');
            newHcpSummaryDiv.className = 'hcp-summary';
            newHcpSummaryDiv.innerHTML = `Total HCP: ${hcpSum}, Highest HCP: ${hcpMax}, Lowest HCP: ${hcpMin}`;
            flightDiv.appendChild(newHcpSummaryDiv);
        }
    });
}
function suggestFlights() {
    const numGolfers = parseInt(document.getElementById('numGolfers').value, 10);
    const numDays = parseInt(document.getElementById('numDays').value, 10);
    let flightsPerDay = new Array(numDays).fill(0).map(() => []);
    for (let day = 0; day < numDays; day++) {
        golfersRemaining = numGolfers;
        while (golfersRemaining > 0) {
            if (golfersRemaining == 10) {
                flightsPerDay[day].push(4);
                flightsPerDay[day].push(3);
                flightsPerDay[day].push(3);    
                golfersRemaining=0;
            }
            if (golfersRemaining == 9) {
                flightsPerDay[day].push(3);
                flightsPerDay[day].push(3);
                flightsPerDay[day].push(3);    
                golfersRemaining=0;
            }
            if (golfersRemaining == 8) {
                flightsPerDay[day].push(3);
                flightsPerDay[day].push(3);
                flightsPerDay[day].push(3);    
                golfersRemaining=0;
            }
            if (golfersRemaining == 7) {
                flightsPerDay[day].push(4);
                flightsPerDay[day].push(3);
                golfersRemaining=0;        
            }
            if (golfersRemaining == 6) {
                flightsPerDay[day].push(3);
                flightsPerDay[day].push(3);
                flightsPerDay[day].push(3);    
                golfersRemaining=0;
            }
            if (golfersRemaining > 10){
                flightsPerDay[day].push(4);
                golfersRemaining=golfersRemaining-4;    
            }
        }
    }
    displayFlightSuggestion(flightsPerDay);
}
function displayFlightSuggestion(flightsPerDay) {
    const suggestionDiv = document.getElementById('flightSuggestion');
    suggestionDiv.innerHTML = ''; // Clear previous content

    flightsPerDay.forEach((flights, dayIndex) => {
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `<strong>Day ${dayIndex + 1}:</strong> `;

        const flightsContainer = document.createElement('div');
        flights.forEach((flight, flightIndex) => {
            const flightDiv = document.createElement('div');

            const flightInput = document.createElement('input');
            flightInput.type = 'number';
            flightInput.value = flight;
            flightInput.className = `day${dayIndex}-flight`;
            flightDiv.appendChild(flightInput);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '-';
            deleteButton.onclick = function() { removeFlight(flightDiv, dayIndex); };
            flightDiv.appendChild(deleteButton);

            flightsContainer.appendChild(flightDiv);
        });

        dayDiv.appendChild(flightsContainer);

        const addButton = document.createElement('button');
        addButton.textContent = '+ Add Flight';
        addButton.onclick = function() { addFlight(flightsContainer, dayIndex); };
        dayDiv.appendChild(addButton);

        suggestionDiv.appendChild(dayDiv);
    });

    const finalizeButton = document.createElement('button');
    finalizeButton.textContent = 'Finalize Flights';
    finalizeButton.onclick = finalizeFlights;
    suggestionDiv.appendChild(finalizeButton);
}
function addFlight(container, dayIndex) {
    const flightDiv = document.createElement('div');

    const flightInput = document.createElement('input');
    flightInput.type = 'number';
    flightInput.value = 4; // Default value for a new flight
    flightInput.className = `day${dayIndex}-flight`;
    flightDiv.appendChild(flightInput);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '-';
    deleteButton.onclick = function() { removeFlight(flightDiv, dayIndex); };
    flightDiv.appendChild(deleteButton);

    container.appendChild(flightDiv);
}
function removeFlight(flightDiv, dayIndex) {
    flightDiv.remove();
}
function finalizeFlights() {
    const numGolfers = parseInt(document.getElementById('numGolfers').value, 10);
    let totalGolfersCounted = 0;
    let updatedFlightsPerDay = [];

    // Iterate through each day to collect flight information
    const numDays = parseInt(document.getElementById('numDays').value, 10);   
    for (let day = 0; day < numDays; day++) {
        const flights = document.querySelectorAll(`.day${day}-flight`);
        let dayFlights = [];

        flights.forEach(flightInput => {
            const golfersInFlight = parseInt(flightInput.value, 10);
            totalGolfersCounted += golfersInFlight;
            dayFlights.push(golfersInFlight); // Add this flight's golfer count to the day's flights
        });

        updatedFlightsPerDay.push(dayFlights); // Add the day's flights to the updated structure
    }
    // Validation to ensure the total number of players matches the input
    if (totalGolfersCounted !== numGolfers*numDays) {
        alert("Amount not correct");
        return;
    }

    // Rebuild the DOM based on the updated flights structure
    console.log(updatedFlightsPerDay)
//    rebuildDOMWithFinalizedFlights(updatedFlightsPerDay);
    document.getElementById("golfer-setup").style.display="none";
    document.getElementById("golfer-details").style.display="none";
    document.getElementById("finalFlightsSummary").style.display="block";

//  populateGolfers
    for (let i = 0; i < numGolfers; i++) {
        const name = String.fromCharCode(65 + i); // Get golfer's name
        const realName = String.fromCharCode(65 + i); // Get golfer's name
        const hcp = Math.floor(Math.random() * 36);
//        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const color = `#${(16211215 + i*50).toString(16)}`;
//        const color = "#"+"7393B3"
        // Generate or assign other attributes as needed

        Golfers[name] = {
            realName: realName,
            hcp: hcp,
            color: color,
            buggy : false,
            pro : false,
            criteria1 : false,
            criteria2 : false,
            criteria3 : false,
            criteria4 : false,
        };
    }
    return updatedFlightsPerDay
}

/*function rebuildDOMWithFinalizedFlights(updatedFlightsPerDay) {
    const flightsSummaryDiv = document.getElementById('finalFlightsSummary');
    flightsSummaryDiv.innerHTML = ''; // Clear existing summary

    updatedFlightsPerDay.forEach((flights, dayIndex) => {
        const daySummaryDiv = document.createElement('div');
        daySummaryDiv.innerHTML = `<strong>Day ${dayIndex + 1}:</strong> ${flights.length} flights`;

        flights.forEach((golfers, flightIndex) => {
            const flightInfo = document.createElement('p');
            flightInfo.innerHTML = `Flight ${flightIndex + 1}: ${golfers} golfers`;
            daySummaryDiv.appendChild(flightInfo);
        });

        flightsSummaryDiv.appendChild(daySummaryDiv);
    });
}
*/