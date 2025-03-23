let timeLeft = 180; // 3 minutes in seconds
 let peopleJoined = 0;
 let gameTimer;
 let gameWon = false;
 
 
 function startTimer() {
   gameTimer = setInterval(() => {
     timeLeft--;
     if (timeLeft <= 0) {
       clearInterval(gameTimer);
       gameLost();
     }
     updateTimerDisplay();
   }, 1000);
 }
 
 function updateTimerDisplay() {
   document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
   document.getElementById('joinedCounter').innerText = `People Joined: ${peopleJoined}/3`;
 }
 
 function personJoined() {
     console.log("clicked");
     if (gameWon) return;
     peopleJoined++;
     if (peopleJoined >= 3) {
         clearInterval(gameTimer);
         gameWon = true;
         gameWonDisplay();
     }
     updateTimerDisplay();
 }
 
 function gameWonDisplay() {
   const winText = document.createElement('div');
   winText.innerHTML = "You Win!";
   winText.style.position = "absolute";
   winText.style.top = "50%";
   winText.style.left = "50%";
   winText.style.transform = "translate(-50%, -50%)";
   winText.style.fontSize = "3em";
   winText.style.color = "green";
   document.body.appendChild(winText);
 }
 
 function gameLost() {
   const loseText = document.createElement('div');
   loseText.innerHTML = "You Lost!";
   loseText.style.position = "absolute";
   loseText.style.top = "50%";
   loseText.style.left = "50%";
   loseText.style.transform = "translate(-50%, -50%)";
   loseText.style.fontSize = "3em";
   loseText.style.color = "red";
   document.body.appendChild(loseText);
 }

 startTimer();