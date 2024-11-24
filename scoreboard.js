// Initialize scores
let homeScore = 0;
let guestScore = 0;
let scoreLog = [];

// Function to format time
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
}

// Function to update winner display
function updateWinnerDisplay() {
    const display = document.getElementById('winner-display');
    const homeSection = document.querySelector('.team-section:first-child');
    const guestSection = document.querySelector('.team-section:last-child');
    
    // Remove previous winning classes
    homeSection.classList.remove('winning');
    guestSection.classList.remove('winning');

    if (homeScore > guestScore) {
        display.textContent = "HOME TEAM LEADING!";
        homeSection.classList.add('winning');
    } else if (guestScore > homeScore) {
        display.textContent = "GUEST TEAM LEADING!";
        guestSection.classList.add('winning');
    } else {
        display.textContent = "GAME IS TIED!";
    }
}

// Function to add log entry
function addLogEntry(team, points) {
    const now = new Date();
    const logEntry = {
        team: team,
        points: points,
        time: now,
        score: {
            home: homeScore,
            guest: guestScore
        }
    };
    
    scoreLog.unshift(logEntry); // Add to beginning of array
    updateLogDisplay();
}

// Function to update log display
function updateLogDisplay() {
    const logContainer = document.getElementById('score-log');
    logContainer.innerHTML = scoreLog.map(entry => `
        <div class="log-entry">
            <span class="action">
                ${entry.team.toUpperCase()} team scored ${entry.points} point${entry.points > 1 ? 's' : ''}
                (HOME: ${entry.score.home} - GUEST: ${entry.score.guest})
            </span>
            <span class="time">${formatTime(entry.time)}</span>
        </div>
    `).join('');
}

// Function to add score to either team
function addScore(team) {
    // Get the selected points from the dropdown
    const points = parseInt(document.getElementById(`${team}-points`).value);
    
    // Update the appropriate score
    if (team === 'home') {
        homeScore += points;
        document.getElementById('home-score').textContent = homeScore;
    } else {
        guestScore += points;
        document.getElementById('guest-score').textContent = guestScore;
    }

    // Add highlight effect to the updated score
    const scoreElement = document.getElementById(`${team}-score`);
    scoreElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        scoreElement.style.transform = 'scale(1)';
    }, 200);

    // Update winner display and add log entry
    updateWinnerDisplay();
    addLogEntry(team, points);
}

// Function to reset scores
function resetScores() {
    homeScore = 0;
    guestScore = 0;
    scoreLog = [];
    document.getElementById('home-score').textContent = '0';
    document.getElementById('guest-score').textContent = '0';
    document.getElementById('winner-display').textContent = 'Game in Progress';
    updateLogDisplay();
    updateWinnerDisplay();

    // Remove winning classes
    document.querySelector('.team-section:first-child').classList.remove('winning');
    document.querySelector('.team-section:last-child').classList.remove('winning');
}

// Initialize the display
updateWinnerDisplay();
updateLogDisplay();