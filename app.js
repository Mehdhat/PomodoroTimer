var interval;
var elapsedTime = 0;
var isPaused = false;
var start;
var timerType = 'focus'; 

function startTimer() {
  const time = document.getElementById("time").value * 60000;
  var display = document.getElementById("display");

  start = Date.now();
  interval = setInterval(function() {
    const timeLeft = time - (Date.now() - start + elapsedTime);
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    const centiseconds = Math.floor((timeLeft % 1000) / 10);

    if (timeLeft <= 0) {
      clearInterval(interval);
      display.classList.add("Set-Duration-Please");
      display.textContent = "Set Duration Please";
      document.getElementById("startBtn").disabled = false;
      document.getElementById("pauseBtn").disabled = true;
      audio.play();
      // Handle timer type change at the end of each period
      if (timerType === 'focus') {
        setTimerType('break');
      } else {
        setTimerType('focus');
      }
    } else {
      display.innerHTML = `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}:${(centiseconds < 10 ? "0" : "")}${centiseconds}`;
    }
  }, 10);

  document.getElementById("startBtn").disabled = true;
  document.getElementById("pauseBtn").innerHTML = "Pause";
  document.getElementById("pauseBtn").disabled = false;
  document.getElementById("resetBtn").disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  isPaused = !isPaused;
  if (isPaused) {
    elapsedTime += Date.now() - start;
  } else {
    start = Date.now();
    startTimer();
  }
  document.getElementById("startBtn").disabled = true;
}

function resetTimer() {
  clearInterval(interval);
  document.getElementById("display").textContent = "";
  document.getElementById("startBtn").disabled = false;
  document.getElementById("pauseBtn").innerHTML = "Pause";
  document.getElementById("pauseBtn").disabled = true;
  document.getElementById("resetBtn").disabled = true;
  elapsedTime = 0;
  isPaused = false;
}

function setTimerType(type) {
  timerType = type;
  resetTimer();
  // Add logic to set the timer duration based on the timer type
  if (type === 'focus') {
    document.getElementById("time").value = 25;
  } else if (type === 'break') {
    document.getElementById("time").value = 5;
  }
  startTimer(); 
}

document.getElementById("focusBtn").addEventListener("click", function() {
  setTimerType("focus");
});

document.getElementById("breakBtn").addEventListener("click", function() {
  setTimerType("break");
});

window.onload = function() {
  setVolume();
}

function setVolume() {
  audio.volume = document.getElementById("volumeControl").value;
}
