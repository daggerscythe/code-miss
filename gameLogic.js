let timeLeft = 180; // 3 minutes in seconds
let peopleJoined = 0;
let gameTimer;
let gameWon = false;
let requiredJoins = 5; // Increased from 3 to match more characters

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
  document.getElementById("timer").innerHTML = `<span style="color: ${timeLeft < 30 ? '#ff5555' : '#fff'}">Time Left: ${timeLeft}s</span>`;
  document.getElementById("joinedCounter").innerHTML = 
    `<span>People Joined: <span style="color: ${peopleJoined >= requiredJoins ? '#5aed5a' : '#fff'}">${peopleJoined}/${requiredJoins}</span></span>`;
}

// Make personJoined globally available for character interaction
window.personJoined = function () {
  console.log("Person joined through character interaction");
  if (gameWon) return;
  
  // Play a sound effect
  playSound("click");
  
  peopleJoined++;
  if (peopleJoined >= requiredJoins) {
    clearInterval(gameTimer);
    gameWon = true;
    gameWonDisplay();
  }
  updateTimerDisplay();
};

function gameWonDisplay() {
  // Play win sound
  playSound("win");
  
  const winContainer = document.createElement("div");
  winContainer.style.position = "fixed";
  winContainer.style.top = "0";
  winContainer.style.left = "0";
  winContainer.style.width = "100%";
  winContainer.style.height = "100%";
  winContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  winContainer.style.display = "flex";
  winContainer.style.flexDirection = "column";
  winContainer.style.justifyContent = "center";
  winContainer.style.alignItems = "center";
  winContainer.style.zIndex = "2000";
  
  const winText = document.createElement("div");
  winText.innerHTML = "🎉 MISSION ACCOMPLISHED! 🎉";
  winText.style.fontSize = "3em";
  winText.style.color = "#5aed5a";
  winText.style.fontFamily = "'Orbitron', sans-serif";
  winText.style.textShadow = "0 0 10px rgba(90, 237, 90, 0.8)";
  winText.style.marginBottom = "20px";
  
  const winSubText = document.createElement("div");
  winSubText.innerHTML = "You've recruited enough characters!";
  winSubText.style.fontSize = "1.5em";
  winSubText.style.color = "#fff";
  winSubText.style.fontFamily = "'Orbitron', sans-serif";
  winSubText.style.marginBottom = "30px";
  
  const playAgainBtn = document.createElement("button");
  playAgainBtn.innerText = "Play Again";
  playAgainBtn.style.padding = "15px 30px";
  playAgainBtn.style.fontSize = "1.2em";
  playAgainBtn.style.backgroundColor = "#4cc3d9";
  playAgainBtn.style.color = "#fff";
  playAgainBtn.style.border = "none";
  playAgainBtn.style.borderRadius = "5px";
  playAgainBtn.style.cursor = "pointer";
  playAgainBtn.style.fontFamily = "'Orbitron', sans-serif";
  playAgainBtn.onclick = () => location.reload();
  
  winContainer.appendChild(winText);
  winContainer.appendChild(winSubText);
  winContainer.appendChild(playAgainBtn);
  document.body.appendChild(winContainer);
}

function gameLost() {
  // Play lose sound
  playSound("lose");
  
  const loseContainer = document.createElement("div");
  loseContainer.style.position = "fixed";
  loseContainer.style.top = "0";
  loseContainer.style.left = "0";
  loseContainer.style.width = "100%";
  loseContainer.style.height = "100%";
  loseContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  loseContainer.style.display = "flex";
  loseContainer.style.flexDirection = "column";
  loseContainer.style.justifyContent = "center";
  loseContainer.style.alignItems = "center";
  loseContainer.style.zIndex = "2000";
  
  const loseText = document.createElement("div");
  loseText.innerHTML = "⏱️ TIME'S UP! ⏱️";
  loseText.style.fontSize = "3em";
  loseText.style.color = "#ff5555";
  loseText.style.fontFamily = "'Orbitron', sans-serif";
  loseText.style.textShadow = "0 0 10px rgba(255, 85, 85, 0.8)";
  loseText.style.marginBottom = "20px";
  
  const loseSubText = document.createElement("div");
  loseSubText.innerHTML = `You only recruited ${peopleJoined} out of ${requiredJoins} characters!`;
  loseSubText.style.fontSize = "1.5em";
  loseSubText.style.color = "#fff";
  loseSubText.style.fontFamily = "'Orbitron', sans-serif";
  loseSubText.style.marginBottom = "30px";
  
  const tryAgainBtn = document.createElement("button");
  tryAgainBtn.innerText = "Try Again";
  tryAgainBtn.style.padding = "15px 30px";
  tryAgainBtn.style.fontSize = "1.2em";
  tryAgainBtn.style.backgroundColor = "#ff5555";
  tryAgainBtn.style.color = "#fff";
  tryAgainBtn.style.border = "none";
  tryAgainBtn.style.borderRadius = "5px";
  tryAgainBtn.style.cursor = "pointer";
  tryAgainBtn.style.fontFamily = "'Orbitron', sans-serif";
  tryAgainBtn.onclick = () => location.reload();
  
  loseContainer.appendChild(loseText);
  loseContainer.appendChild(loseSubText);
  loseContainer.appendChild(tryAgainBtn);
  document.body.appendChild(loseContainer);
}

// Sound effects function
function playSound(type) {
  let sound;
  switch(type) {
    case "click":
      sound = new Audio("data:audio/wav;base64,UklGRpQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXAFAACAgICAgICAgICAgICAgICAgICAgICAgIA2dbj++jV7ofkrf6f3G4ay9A2LzPBRk/brbZ0C5hO9GOYy3R7hSfoq3CP+ONpEDD7WaRVJ0nwbV86JIVnLkydX5/1DPeMKVjPoJWgh4T58GdJ4kxLFdqkLuXTMBK9z9P2lch/3nHFI8JdwceqQb5zkjG7a3ohtuteEbKzRgGud0nxrjs94a3/MdGtwynFrYMhvazTGbWsKxGxr4MFra7m/amuRvWlrabloa0G3Z2sPtWZr3bJla6ywZGt5rmNrTaxia2GqYGtLqF9rKaZea0WkXWsnoluA22BKgQRdMIQlWB6HRlMOim1O+YyUSeOMg0X5jW1B8I5WPeaPPTnQkCo1vZEbMauS/S6Zk+IqlpTHJpOVrSKQlpMe7KM+G9SkJxjFpRYVtqYFEqWnAA+Tp/sLvYSfBwmtnwQHHKABBXCg/gOEoPsCtKD4AMyg9f/moPL/AKHv/xqh7P80oer/TaHo/2ah5v99oeX/lKHk/6uh4//Cod//3qHe//Wh3f8Lotz/IKLb/zWi2v9Ootj/Y6LX/3mi1v+Potb/pqLV/7ui1P/Qos//56LP//2izv8Uo83/KqPN/0CizP9WosvIc7vAHG3EuvlnzLH0Ydao7lvfn+NU6JbdT/GP1Un8kc5FB5vHPRigwDUjrbkrLsSyITnbqxhEL6UOS5OeA1LTl/ZYL5HrXneK4GKVg9NnsnzGbNd1um/VdK1yuXOfdcJyn3b/cZ947nF/edRxyXrBcTh8rHGlfZhx032EcRB+b3F7fl1x6X5KcVZ/MXHDfxlxMYAGcZ+A83AlgeJwrYHRcDWCwHC9grBwRYOgcMeGZnAnij5wh40ecOmQ/G9Nk9pvs5W6bxea2m9/nMRv5KC7byalvG+Eqbdvy628b/2xuG880bxvfeC+b8jvwG8T/8JvXg7FbxMdx2+MK8lvADrLb1tIzW+2Vc9vElPRb25g028JbtVvZnvXbwp/2G9tgtlvEYXab3aH226ZidxusYvcbrON3G60j9xt"
      break;
    case "win":
      sound = new Audio("data:audio/wav;base64,UklGRvQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YdAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFt+ehJrj3ose6JxQounbV2brmmBqLJkt7ClX+utmFr3s4pWALp8Ugm/OFEMQ+s6EvPGGhjapfoc+37eIPVS0CTuJ8QA+vyz+vDmsfjm2aj25M6a9OHEjPLfunXw3bBe7tymR+zZnDDq15Ia6NWJ/ObThO3k0Xzc4tN0C+PWbDPi2WRd4dxcheDeVK3f4UzU3uREAd7nPCbd6jUP3O0u+NrwJ+HY9CDD1vcQpNT6+ITS/d+A0ACHfdMDbnrWBlZ32AlEdtsMLHXeDhN04xD+cu0S6nH3FNZw/xa9bwwZpG4XG4ptIR1zbOwdWmv2HzdqAyHvaDUir2dPJB5pTiXtaEcm1GguJxtq9SfjbJcox2tBKa1qAiqUaf8qe2kJLGFpEi1IaR8uMGkvLx9pQDDFalUxnGt0Mr1snDJtbaIyJm9wMuFwQDKccgwyYnS+MTp2CjH8d44wzXkKMO97jS/jfQsvzH8TLrWB4yydhHcrjYdEKn6KUSl3jVsoUJDPJy6TOSYTlnYk9ZiaI9Wbviato+QgLqzkHwmz5R49uOYdWr3nG3HC8BoTx+gZQcuYGbTPpBma03AZldbjGZbZ+xlm3IMaON6lGhfgzxro4YMbyOOZHHfk5xwf5TQd4+WYHP3m0Bu35v4aYeYxGgbmTxm95n4YdOfKF2/oCBdm6TQWOOpmFR/rkRQS7KsTAe3SE/nt/xLz7iQS7e9NEdLwJRG98hkRqvQFEZr26BCO+LwQiPqpED38nRA7/poQQACOEEgCfxBTBGYQYwZHEHMIPBCDCi0QkgwWEKMO/g+0ENIPxBK1EMoUnRHbFn0S7RhZE/8aLRT0HA8VBh/7FfsgARc0Iv8XRSPrGFQkyBlgJaAabCaGG3YnQxxzKPAcbCmZHWQqNx5VK84eRixxH6UszR8BLWYgWi3xIG0teiGALQQiyi2DIgguAiM0LngjWS7zI3suTSSdLqck0C70JPwuPyU7L7ElhC8nJskviCYTMP4mWTB1J6Uw3SfvMEQoSzGiKKAx+ij4MUspcTKaKe0y4ylmMx8q2zNWKkc0jCqzNLkqHjXfKoQ1ACvpNRgrTjZAK7M2XCsWN3QrfzeJK+M3nCtIOKsrszi3Kxk5wCt/OcgrBDrTK5A66ivqOvgrifQNLHfuFCxw6Bgs3OONLRngzS6e3SgwdturMY7bcTMf254089vONnnc9Dhq3Rs7UN5GPDvfbD0f4JQ+AeG+P+Lh8EDI4iFCrOM4Q5LkUUTZ5cFFF+tMR1Lw90g79ZhK5fnzS/D9Y025AB1PugPIUMcGOVI3CgZTrA1tUxURzFMUFRtUGRhsVDcbvFThHbZVEiBgVjUiD1dbI8ZXfSR+WJolMFm2JuRZvSeXWsEoTFvFKQhc/SoPXJYr5VvpK5LbgywH27AsldrdLCTaaS3C2XAtUtlHLeTY9CxP2KosytfyKzzXfCvC1hMrYtZZKsjV5ymf1RMpZdUiKFjVRCdL1XIm19XrJWzWRCX51Zokj9XhI3bVECN41UwigNWQIYbV0yCO1RUgmtVcH6rVpR7A1e8d2dVCHfTVmBwW1vQbO9ZaG2DWwRqJ1i0artacGXLXERkN2IAY4tgLGEfekxcA4SEXxeW6GNLqUhpq8Accc/ZtHUQ=");
      break;
    case "lose":
      sound = new Audio("data:audio/wav;base64,UklGRqQGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YYAGAAB6gXqBe4B7f3x+fH18fXx9e317fXt9e357f3t/e4B7gHyAfIB8gX2BfYF+gX6BfoF+gH6AfoB+gH5/fn9+f35/fn9+f35/fn9+f35/fn9+f39/f4CAgICAgICAgICBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgICAf4B/gH+Af4CAgICAf39/f39/f4B/gH+Af4B/gH+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGBgYGBgYGBgYGBgYGBgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af39/f39/f39/f39/f39/f39/f39/f39/f39/f39/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gICAf4CAf4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCBgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAf4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+AfH98f3x/fH98f3x/fH98f3x/fH98f3x/fX99f31/fX99f31/fX99f31/fX99f31/fX99f31/fX99f31/fX99f31/fX99f31/fX99f31/fX99f31/fX99f31/fX99f31/fX9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9+f35/fn9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/");
      break;
  }
  
  if (sound) {
    sound.volume = 0.4;
    sound.play();
  }
}

// Wait for the scene to load before starting the timer
document.addEventListener("DOMContentLoaded", function () {
  // Delay starting the timer until after the cutscene
  setTimeout(() => {
    startTimer();
    updateTimerDisplay(); // Initialize display immediately
  }, 15000); // Wait for the cutscene to complete (approximately)
});
