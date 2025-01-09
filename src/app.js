document.getElementById("tournament-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const tournamentName = document.getElementById("tournament-name").value;
    const playerCount = parseInt(document.getElementById("player-count").value);
  
    if (playerCount < 2) {
      alert("A tournament needs at least 2 players!");
      return;
    }
  
    // Generate tournament brackets
    const bracketsDiv = document.getElementById("brackets");
    bracketsDiv.innerHTML = `<h3>${tournamentName} Brackets</h3>`;
    
    let players = [];
    for (let i = 1; i <= playerCount; i++) {
      players.push(`Player ${i}`);
    }
  
    while (players.length > 1) {
      const round = document.createElement("div");
      round.classList.add("round");
      round.innerHTML = `<h4>Round ${Math.ceil(Math.log2(playerCount / players.length))}</h4>`;
      for (let i = 0; i < players.length; i += 2) {
        const match = document.createElement("p");
        match.textContent = `${players[i]} vs ${players[i + 1] || "Bye"}`;
        round.appendChild(match);
      }
      bracketsDiv.appendChild(round);
      players = players.slice(0, Math.ceil(players.length / 2)); // Eliminate half of the players
    }
  
    bracketsDiv.innerHTML += `<p>Winner: ${players[0]}</p>`;
  });
  