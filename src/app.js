const tournaments = []; // Array to store tournaments

// Convert UTC time to local time
function getUserLocalTime(utcTime) {
  const userTime = new Date(utcTime); // Convert UTC time to local time
  return userTime.toLocaleString(); // Format as per user's local timezone
}

// Handle Tournament Creation
document.getElementById("tournament-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const tournamentName = document.getElementById("tournament-name").value;
  const tournamentDesc = document.getElementById("tournament-desc").value;
  const tournamentTime = document.getElementById("tournament-time").value;

  // Create a new tournament object
  const newTournament = {
    id: Date.now(),
    name: tournamentName,
    desc: tournamentDesc,
    utcTime: tournamentTime, // Store in UTC format
    players: [],
  };

  tournaments.push(newTournament);
  updateTournamentList();
  document.getElementById("tournament-form").reset();
});

// Update Tournament List with Local Time Display
function updateTournamentList() {
  const tournamentDisplay = document.getElementById("tournament-display");
  tournamentDisplay.innerHTML = ""; // Clear current list

  tournaments.forEach((tournament) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <h3>${tournament.name}</h3>
      <p>${tournament.desc || "No description provided."}</p>
      <p>Start Time: ${getUserLocalTime(tournament.utcTime)}</p>
      <p>Players: ${tournament.players.length}</p>
      <button onclick="joinTournament(${tournament.id})">Join</button>
    `;
    tournamentDisplay.appendChild(listItem);
  });
}

// Handle Joining a Tournament
function joinTournament(tournamentId) {
  const playerName = prompt("Enter your name to join the tournament:");
  if (!playerName) return;

  const tournament = tournaments.find((t) => t.id === tournamentId);
  if (tournament) {
    tournament.players.push(playerName);
    updateTournamentList();
    generateBrackets(tournament);
  }
}

// Generate Tournament Brackets
function generateBrackets(tournament) {
  const bracketsDiv = document.getElementById("brackets");
  bracketsDiv.innerHTML = `<h3>${tournament.name} Brackets</h3>`;

  let players = [...tournament.players];
  let roundNumber = 1; // Start from Round 1

  while (players.length > 1) {
    const round = document.createElement("div");
    round.classList.add("round");

    round.innerHTML = `<h4>Round ${roundNumber}</h4>`;
    for (let i = 0; i < players.length; i += 2) {
      const match = document.createElement("p");
      match.textContent = `${players[i]} vs ${players[i + 1] || "Bye"}`;
      round.appendChild(match);
    }
    bracketsDiv.appendChild(round);

    players = players.slice(0, Math.ceil(players.length / 2)); // Eliminate half the players
    roundNumber++;
  }

  bracketsDiv.innerHTML += `<p>Winner: ${players[0]}</p>`;
}
